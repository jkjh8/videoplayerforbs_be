import vlc
import sys, os, socket, struct, json, logging, copy
from PySide2.QtWidgets import QApplication, QWidget, QLabel
from PySide2.QtCore import Slot, Signal, QThread
from PySide2.QtGui import QIcon
import socketio

_status = {
    "type": "status",
    "command": "status",
    "status": 0,
    "isFullscreen": False,
    "duration": 0,
    "curTime": 0,
    "position": 0,
    "os": None,
    "file": None,
    "volume": None,
    "mute": False,
    # "scale": None,
    # "rate": None,
    "loop": False,
    "loopAll": False,
    "playMode": 'Nomal',
    "playing": 0
}

#  status codes
# {0: 'NothingSpecial',
#  1: 'Opening',
#  2: 'Buffering',
#  3: 'Playing',
#  4: 'Paused',
#  5: 'Stopped',
#  6: 'Ended',
#  7: 'Error'}
 
class PlayerWindow(QWidget):
    global _status
    sender = Signal(object)
    def __init__(self):
        super().__init__()
        self.player = None
        self.file = None
        self.socketClient = SocketClient()
        self.instance = vlc.Instance()
        self.setupUi()

    def setupUi(self):
        self.socketClient.status.connect(self.recv_status)
        self.socketClient.command.connect(self.recv_comm)
        self.sender.connect(self.socketClient.sender)
        
        self.setWindowIcon(QIcon('./python/logo.png'))
        self.setWindowTitle("Video Player For BS")
        self.setGeometry(100,100,800,450)
        self.setStyleSheet("background: #000;")
        self.show()
        self.socketClient.start()
        # self.load_player()
        # self.showFullScreen()
        self.rt_status('player_loaded')
        
    @Slot()
    def recv_status(self, args):
        print('recv_status', args)
        
    def rt_status(self, command):
        self.getStatus()
        _status['type'] = 'status'
        _status['command'] = command
        self.sender.emit(_status)
    
    def rt_error(self, command):
        self.getStatus()
        _status['type'] = 'error'
        _status['command'] = command
        self.sender.emit(_status)
        
        
    def set_window(self):
        if sys.platform.startswith('linux'):
            self.player.set_xwidnow(self.winId())
            _status['os'] = "linux"
        elif sys.platform.startswith('win32'):
            self.player.set_hwnd(self.winId())
            _status['os'] = "win32"
        elif sys.platform.startswith('darwin'):
            self.player.set_nsobject(int(self.winId()))
            _status['os'] = "darwin"
        else:
            _status['type'] = "error"
            _status['message'] = "player load failed"
            return self.rt_error('set_window')
        self.rt_status('set_window')
        
    def load_player(self):
        if self.player == None:
            self.player = self.instance.media_player_new()
            
    def load_file(self, file):
        # 파일 교체전 정지
        self.load_player()
        # 파일 학인후 교체
        if os.path.isfile(file['path']):
            print(file['path'])
            _status['file'] = file
            media = self.instance.media_new(_status['file']['path'])
            self.player.set_media(media)
            self.set_window()
            
            # set event manager
            self.event_manager = self.player.event_manager()
            self.event_manager.event_attach(vlc.EventType.MediaPlayerEndReached, self.finished)
            self.event_manager.event_attach(vlc.EventType.MediaPlayerLengthChanged, self.get_media_length)
            self.event_manager.event_attach(vlc.EventType.MediaPlayerTimeChanged, self.play_time_change)
            
            self.rt_status('load_file')
        else:
            logging.error("file dose not exist {}".format(file))
            self.rt_error('load_file')
            
    def play(self):
        if _status['file'] != None:
            self.player.play()
            self.rt_status('play')
        else:
            self.rt_error('play')

    def stop(self):
        try:
            self.player.stop()
            self.setWindowTitle("Video Player")
            _status['file'] = None
            self.rt_status("stop")
        except Exception as e:
            self.rt_error("stop")
            pass
        
    def set_position(self, value):
        try:
            self.player.set_position(value)
            self.rt_status('set_position')
        except:
            self.rt_error('set_position')
            pass
        
    def setFullScreen(self, value):
        try:
            self.player.set_fullscreen(value)
            if value == True:
                self.showFullScreen()
                _status['isFullscreen'] = True
            else:
                self.showNormal()
                _status['isFullscreen'] = False
            self.rt_status("set_fullscreen")
        except:
            self.rt("set_fullscreen")
            pass
    
    def getStatus(self):
        try:
            if (self.player):
                _status['type'] = "status"
                _status['command'] = 'get_status'
                _status['status'] = str(self.player.get_state())
                _status['playing'] = self.player.is_playing()
                _status['volume'] = self.player.audio_get_volume()
                _status['mute'] = self.player.audio_get_mute()
                # _status['scale'] = self.player.video_get_scale(),
                _status['curTime'] = self.player.get_time()
                if _status['curTime'] < 0:
                    _status['curTime'] = 0
                _status['duration'] = self.player.get_length()
                if _status['duration'] < 0:
                    _status['duration'] = 0
                _status['position'] = self.player.get_position()
                if _status['position'] < 0:
                    _status['position'] = 0
                # _status['rate'] = self.player.get_rate(),
        except Exception as e:
            print(e)
            self.rt_error('get_status')
            pass
   
        
    # player callback event  
    def finished(self, _event):
        self.setWindowTitle("Video Player For BS")
        self.rt_status('ended')

    def get_media_length(self, event):
        # _status['duration'] = round(self.player.get_length() / 1000)
        self.rt_status('duration')
    
    def play_time_change(self, event):
        # _status['curTime'] = round(self.player.get_time() / 1000)
        # _status['positon'] = round(self.player.get_position(),3)
        self.rt_status('current_time')
     
        
    @Slot(str)
    def recv_comm(self, data):
        print(data)
        self.data = data
        if self.data["command"] == "play":
            if "file" in self.data:
                self.load_file(self.data["file"])
            self.play()
        elif self.data["command"] == "stop":
            self.player.stop()
        elif self.data["command"] == "load":
            self.load_file(self.data["file"])
        elif self.data["command"] == "fullscreen":
            self.setFullScreen(self.data['value'])
        elif self.data["command"] == "status":
            self.getStatus()
        elif self.data["command"] == "setposition":
            self.set_position(self.data["value"])
        else:
            self.rt_error("unknown_command")
        self.rt_status('comm')
class SocketClient(QThread):
    sio = socketio.Client()
    command = Signal(object)
    status = Signal(object)
    def __init__(self, parent=None):
        super(SocketClient, self).__init__(parent)
        
    def call_connect(self):
        print('connection established')

    def call_command(self, args):
        self.command.emit(args)
        # await sio.emit('my response', {'response': 'my response'})
        
    def call_status(self, args):
        self.status.emit(args)
        
    def call_disconnect(self):
        print('disconnected from server')
    
    @Slot()
    def sender(self, args):
        SocketClient.sio.emit('data', args)

    def run(self):
        SocketClient.sio.on('data', self.call_status)
        SocketClient.sio.on('command', self.call_command)
        SocketClient.sio.on('connect', self.call_connect)
        SocketClient.sio.on('disconnect', self.call_disconnect)
        SocketClient.sio.connect('http://localhost:3000')

if __name__=="__main__":
    app = QApplication(sys.argv)
    main = PlayerWindow()
    sys.exit(app.exec_())
