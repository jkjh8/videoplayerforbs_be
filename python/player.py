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
            "play_mode": "Nomal",
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
        
        self.load_setup_from_file()
        self.io.start()
        
    def save_setup_to_file(self):
        with open('./setup.json', 'w', encoding='utf-8') as make_file:
            json.dump({
                "fullscreen": self._status['fullscreen'],
                "play_mode": self._status['play_mode'],
                "volume": self._status['volume'],
                "mute": self._status['mute']
            }, make_file, indent="\t")
            
    def load_setup_from_file(self):
        if os.path.isfile('./setup.json'):
            with open('./setup.json', 'r') as f:
                json_data = json.load(f)
                print(json_data)
                if json_data['fullscreen']:
                    self._status['fullscreen'] = json_data['fullscreen']
                if json_data['play_mode']:
                    self._status['play_mode'] = json_data['play_mode']
                if json_data["volume"]:
                    self._status['volume'] = json_data['volume']
                if json_data["mute"]:
                    self._status['mute'] = json_data['mute']
        self.rt_status()
                

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
        self.save_setup_to_file()
        
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
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command": "set_fullscreen", "message": e})   
        
    def set_mute(self, value):
        try:
            self.mediaplayer.audio_set_mute(value)
            self._status['mute'] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command": "set_mute", "message": e})
    
    def set_volume(self, value):
        try:
            self.mediaplayer.audio_set_volume(value)
            self._status["volume"] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":e})
        
    def update_status(self):
        self._status['position'] = int(self.mediaplayer.get_position() * 1000)
        self._status['duration'] = int(self.mediaplayer.get_length() / 1000)
        self._status['curTime'] = int(self.mediaplayer.get_time() / 1000)
        self.rt_status()
        
        if not self.mediaplayer.is_playing():
            self.timer.stop()
            
            if not self._status['paused']:
                self.stop()
        
    @Slot(object)
    def recv_comm(self, data):
        if data["command"] == "playPause":
            self.play_pause()
        elif data["command"] == "stop":
            self.stop()
        elif data["command"] == "open_file":
            self.open_file(data["file"])
        elif data["command"] == "set_fullscreen":
            self.set_fullscreen(data['value'])
        elif data["command"] == "get_status":
            self.rt_status()
        elif data["command"] == "set_position":
            self.set_position(data["value"])
        elif data["command"] == "set_volume":
            self.set_volume(data["value"])
        elif data["command"] == "set_mute":
            self.set_mute(data["value"])
        else:
            self.error.emit({ "command":"unknown_command", "command":"unknown_command" })
        # self.rt_status()
        
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
