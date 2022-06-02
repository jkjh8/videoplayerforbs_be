import vlc
import sys, os, platform, json
from PySide2.QtWidgets import QApplication, QWidget, QMainWindow
from PySide2.QtCore import Slot, Signal, QThread, QTimer
from PySide2.QtGui import QIcon
import socketio

#  status codes
# {0: 'NothingSpecial',
#  1: 'Opening',
#  2: 'Buffering',
#  3: 'Playing',
#  4: 'Paused',
#  5: 'Stopped',
#  6: 'Ended',
#  7: 'Error'}

# _status = {
#     "type": "status",
#     "command": "status",
#     "status": 0,
#     "isFullscreen": False,
#     "duration": 0,
#     "curTime": 0,
#     "position": 0,
#     "os": None,
#     "file": None,
#     "volume": None,
#     "mute": False,
#     # "scale": None,
#     # "rate": None,
#     "loop": False,
#     "loopAll": False,
#     "playMode": 'Nomal',
#     "playing": 0
# }

 
class PlayerWindow(QMainWindow):
    sender = Signal(object); status = Signal(object); error = Signal(object); message = Signal(object)
    def __init__(self, master=None):
        QMainWindow.__init__(self, master)
        self.setWindowTitle("Video Player For BS")
        self.io = IO() # socket.io
        self.timer = QTimer(self)
        self.timer.setInterval(1000)
        self.instance = vlc.Instance()
        self.media = None
        
        self.mediaplayer = self.instance.media_player_new()
        self._status = {
            "paused": False,
            "fullscreen": False,
            "status": str(self.mediaplayer.get_state()),
            "volume": int(self.mediaplayer.audio_get_volume()),
            "mute": bool(self.mediaplayer.audio_get_mute())
        }
        self.setupUi()
        
        # self.io.status.connect(self.recv_status)
        self.io.command.connect(self.recv_comm)
        self.timer.timeout.connect(self.update_status)
        self.status.connect(self.io.send_status)
        self.message.connect(self.io.send_message)
        self.error.connect(self.io.send_error)
        
        
        self.io.start()

    def setupUi(self):
        self.setWindowIcon(QIcon('./python/logo.png'))
        self.setWindowTitle("Video Player For BS")
        self.setGeometry(100,100,800,450)
        self.setStyleSheet("background: #000;")
        self.show()

    def rt_status(self):
        self._status['status'] = str(self.mediaplayer.get_state())
        self.status.emit(self._status)

        
    def play_pause(self):
        if self.mediaplayer.is_playing():
            self.mediaplayer.pause()
            self._status['paused'] = True
            self.rt_status()
            
        else:
            if self.mediaplayer.play() == -1:
                self._status['paused'] = False
                self.rt_status()
                return
            self._status['paused'] = False
            self.mediaplayer.play()
            self.timer.start()
            self.rt_status()
    
    def stop(self):
        self.mediaplayer.stop()
        self.rt_status()
        
    def open_file(self, file):
        try:
            if not os.path.isfile(file['path']):
                self.error.emit({ "command":"open_file", "message": 'the file dose not exist' })
                return
            self._status['file'] = file
            self.media = self.instance.media_new(file['path'])
            self.mediaplayer.set_media(self.media)
            self.media.parse()
            print(self.media.get_meta(0))
            
            if platform.system() == "Linux": # for Linux using the X Server
                self.mediaplayer.set_xwindow(int(self.winId()))
            elif platform.system() == "Windows": # for Windows
                self.mediaplayer.set_hwnd(int(self.winId()))
            elif platform.system() == "Darwin": # for MacOS
                self.mediaplayer.set_nsobject(int(self.winId()))

            self.play_pause()
        
        except Exception as e:
            self.error.emit({'command': "open_file", "message": e})
        
    def set_volume(self, volume):
        self.mediaplayer.audio.set_volume(volume)
        self._status['volume'] = volume
        
    def set_position(self, position):
        self.timer.stop()
        self.mediaplayer.set_position(position/1000)
        self.timer.start()
        
    def set_fullscreen(self, value):
        try:
            self.mediaplayer.set_fullscreen(value)
            self._status['fullscreen'] = value
            if (value == True):
                self.showFullScreen()
            else:
                self.showNormal()
            self.rt_status()
        except Exception as e:
            self.error.emit({"command": "set_fullscreen", "message": e})   
        
    def update_status(self):
        self._status['position'] = int(self.mediaplayer.get_position() * 1000)
        self._status['duration'] = int(self.mediaplayer.get_length() / 1000)
        self._status['curTime'] = int(self.mediaplayer.get_time() / 1000)
        self.rt_status()
        
        if not self.mediaplayer.is_playing():
            self.timer.stop()
            
            if not self._status['paused']:
                self.stop()
        
    


        
    # def set_position(self, value):
    #     try:
    #         self.player.set_position(value)
    #         self.rt_status('set_position')
    #     except:
    #         self.rt_error('set_position')
    #         pass
        
    # def setFullScreen(self, value):
    #     try:
    #         self.player.set_fullscreen(value)
    #         if value == True:
    #             self.showFullScreen()
    #             _status['isFullscreen'] = True
    #         else:
    #             self.showNormal()
    #             _status['isFullscreen'] = False
    #         self.rt_status("set_fullscreen")
    #     except:
    #         self.rt("set_fullscreen")
    #         pass
    
    # def getStatus(self):
    #     try:
    #         if (self.player):
    #             _status['type'] = "status"
    #             _status['command'] = 'get_status'
    #             _status['status'] = str(self.player.get_state())
    #             _status['playing'] = self.player.is_playing()
    #             _status['volume'] = self.player.audio_get_volume()
    #             _status['mute'] = self.player.audio_get_mute()
    #             # _status['scale'] = self.player.video_get_scale(),
    #             _status['curTime'] = self.player.get_time()
    #             if _status['curTime'] < 0:
    #                 _status['curTime'] = 0
    #             _status['duration'] = self.player.get_length()
    #             if _status['duration'] < 0:
    #                 _status['duration'] = 0
    #             _status['position'] = self.player.get_position()
    #             if _status['position'] < 0:
    #                 _status['position'] = 0
    #             # _status['rate'] = self.player.get_rate(),
    #     except Exception as e:
    #         print(e)
    #         self.rt_error('get_status')
    #         pass
   
        
    # # player callback event  
    # def finished(self, _event):
    #     self.setWindowTitle("Video Player For BS")
    #     self.rt_status('ended')

    # def get_media_length(self, event):
    #     # _status['duration'] = round(self.player.get_length() / 1000)
    #     self.rt_status('duration')
    
    # def play_time_change(self, event):
    #     # _status['curTime'] = round(self.player.get_time() / 1000)
    #     # _status['positon'] = round(self.player.get_position(),3)
    #     self.rt_status('current_time')
     
        
    @Slot(object)
    def recv_comm(self, data):
        print(data)
        self.data = data
        if self.data["command"] == "playPause":
            self.play_pause()
        elif self.data["command"] == "stop":
            self.stop()
        elif self.data["command"] == "open_file":
            self.open_file(self.data["file"])
        elif self.data["command"] == "fullscreen":
            self.set_fullscreen(self.data['value'])
        elif self.data["command"] == "status":
            self.rt_status()
        elif self.data["command"] == "setposition":
            self.set_position(self.data["value"])
        else:
            self.error.emit({ "command":"unknown_command", "command":"unknown_command" })
        self.rt_status()
class IO(QThread):
    sio = socketio.Client()
    command = Signal(object)
    status = Signal(object)
    def __init__(self, parent=None):
        super(IO, self).__init__(parent)
        
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
    def send_status(self, args):
        IO.sio.emit('status', args)
    
    @Slot()
    def send_error(self, args):
        IO.sio.emit('error', args)
        
    @Slot()
    def send_message(serf, args):
        IO.sio.emit('message', args)

    def run(self):
        IO.sio.on('data', self.call_status)
        IO.sio.on('command', self.call_command)
        IO.sio.on('connect', self.call_connect)
        IO.sio.on('disconnect', self.call_disconnect)
        IO.sio.connect('http://localhost:3000')

if __name__=="__main__":
    app = QApplication(sys.argv)
    main = PlayerWindow()
    sys.exit(app.exec_())
