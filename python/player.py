import vlc
import sys, os, platform, json, time
from PySide2.QtWidgets import QApplication, QWidget, QMainWindow
from PySide2.QtCore import Slot, Signal, QThread, QTimer, Qt
from PySide2.QtGui import QIcon, QCursor, QPixmap
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
 
class PlayerWindow(QMainWindow):
    sender = Signal(object); status = Signal(object); error = Signal(object); message = Signal(object)
    rt_playlist = Signal(list)
    def __init__(self, master=None):
        QMainWindow.__init__(self, master)
        self.setWindowTitle("Video Player For BS")
        self.io = IO() # socket.io
        self.timer = QTimer(self)
        self.timer.setInterval(1000)
        self.instance = vlc.Instance()
        self.media = None
        
        self.io.command.connect(self.recv_comm)
        self.io.get_connected.connect(self.rt_status)
        self.timer.timeout.connect(self.update_status)
        self.status.connect(self.io.send_status)
        self.rt_playlist.connect(self.io.send_playlist)
        self.message.connect(self.io.send_message)
        self.error.connect(self.io.send_error)
        self.io.start()
        
        self.mediaplayer = self.instance.media_player_new()
        self._status = {
            "paused": False,
            "fullscreen": False,
            "play_mode": "Nomal",
            "loaded": False,
            "position": False,
            "status": str(self.mediaplayer.get_state()),
            "volume": int(self.mediaplayer.audio_get_volume()),
            "mute": bool(self.mediaplayer.audio_get_mute()),
            "end_of_list": 0,
            "play_index": 0,
            "repeat_one": False,
            "repeat_all": False,
            "rt_ipaddr": '0.0.0.0',
            "rt_port": 12302,
            "rt_type": 'AMX'
        }
        self.playlist = []
        self.setupUi()
        
        
        self.load_setup_from_file()
        self.load_playlist_from_file()
        
    def save_setup_to_file(self):
        with open('./setup.json', 'w', encoding='UTF8') as make_file:
            json.dump({
                "fullscreen": self._status['fullscreen'],
                "play_mode": self._status['play_mode'],
                "volume": self._status['volume'],
                "mute": self._status['mute'],
                "repeat_one": self._status['repeat_one'],
                "repeat_all": self._status['repeat_all'],
                "rt_ipaddr": self._status["rt_ipaddr"],
                "rt_port": self._status['rt_port'],
                "rt_type": self._status['rt_type']
            }, make_file, indent="\t")
            
    def load_setup_from_file(self):
        try:
            if os.path.isfile('./setup.json'):
                with open('./setup.json', 'r',  encoding='UTF8') as f:
                    json_data = json.load(f)
                    if 'fullscreen' in json_data:
                        self._status["fullscreen"] = json_data['fullscreen']
                    if 'play_mode' in json_data:
                        self._status["play_mode"] = json_data["play_mode"]
                    if "volume" in json_data:
                        self._status["volume"] = json_data["volume"]
                    if "mute" in json_data:
                        self._status["mute"] = json_data["mute"]
                    if "repeat_all" in json_data:
                        self._status["repeat_all"] = json_data["repeat_all"]
                    if "repeat_one" in json_data:
                        self._status["repeat_one"] = json_data["repeat_one"]
                    if "rt_ipaddr" in json_data:
                        self._status["rt_ipaddr"] = json_data['rt_ipaddr']
                    if "rt_port" in json_data:
                        self._status["rt_port"] = json_data["rt_port"]
                    if "rt_type" in json_data:
                        self._status["rt_type"] = json_data["rt_type"]
                    self.set_fullscreen(self._status['fullscreen'])
                    self.set_repeat_one(self._status['repeat_one'])
                    self.set_mute(self._status['mute'])
                    self.set_repeat_all(self._status['repeat_all'])
                    self.set_volume(self._status['volume'])
                    self.set_play_mode(self._status['play_mode'])
        except Exception as e:
            print(e)
    
    def load_playlist_from_file(self):
        if os.path.isfile('./playlist.json'):
            with open('./playlist.json', 'r', encoding='utf-8') as f:
                self.update_playlist(json.load(f))
    
    def update_playlist(self, plist):
        self.playlist = plist
        self._status['end_of_list'] = len(plist)
        self.rt_playlist.emit(plist)

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
        try:
            if not self._status['loaded']:
                self.error.emit({ "command":"play_pause", "message": 'not loaded' })
                return
            if self.mediaplayer.is_playing():
                self.mediaplayer.pause()
                self._status['paused'] = True
            else:
                if self.mediaplayer.play() == -1:
                    if self._status["play_mode"] == "Playlist":
                        if self._status["play_index"] >= len(self.playlist) -1:
                            self.stop()
                            return
                        self.open_file(self.playlist[self._status["play_index"]])
                    else:
                        if "file" in self._status:
                            self.open_file(self._status['file'])
                self._status['paused'] = False
                self.mediaplayer.play()
                self.timer.start()
            self.rt_status()
        except Exception as e:
            print(e)

    def stop(self):
        self.timer.stop()
        self.mediaplayer.stop()
        self._status['position'] = 0
        self._status['duration'] = 0
        self._status['curTime'] = 0
        self._status['loaded'] = False
        self.rt_status()
        
    def open_file(self, file):
        try:
            if not os.path.isfile(file['path']):
                self.stop()
                self.error.emit({ "command":"open_file", "message": 'the file dose not exist' })
                self._status["loaded"] = False
                return
            self._status['file'] = file
            self.media = self.instance.media_new(file['path'])
            self.mediaplayer.set_media(self.media)
            self._status["loaded"] = True
            # self.media.parse()
            # print(self.media.get_meta(0))
            
            if platform.system() == "Linux": # for Linux using the X Server
                self.mediaplayer.set_xwindow(int(self.winId()))
            elif platform.system() == "Windows": # for Windows
                self.mediaplayer.set_hwnd(int(self.winId()))
            elif platform.system() == "Darwin": # for MacOS
                self.mediaplayer.set_nsobject(int(self.winId()))
                
            self._status['position'] = int(self.mediaplayer.get_position() * 1000)
            self._status['duration'] = int(self.mediaplayer.get_length() / 1000)
            self._status['curTime'] = int(self.mediaplayer.get_time() / 1000)
            
            self.rt_status()
            # self.play_pause()
        
        except Exception as e:
            self.error.emit({'command': "open_file", "message": str(e)})
        
    def set_volume(self, volume):
        self.mediaplayer.audio.set_volume(volume)
        self._status['volume'] = volume
        self.save_setup_to_file()
        
    def set_position(self, position):
        self.mediaplayer.set_time(position * 1000)
        
    def set_fullscreen(self, value):
        try:
            self.mediaplayer.set_fullscreen(value)
            self._status['fullscreen'] = value
            if (value == True):
                self.showFullScreen()
                self.setCursor(Qt.BlankCursor)
            else:
                self.showNormal()
                self.setCursor(Qt.ArrowCursor)
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command": "set_fullscreen", "message": str(e)})   
        
    def set_mute(self, value):
        try:
            self.mediaplayer.audio_set_mute(value)
            self._status['mute'] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command": "set_mute", "message": str(e)})
    
    def set_volume(self, value):
        try:
            self.mediaplayer.audio_set_volume(value)
            self._status["volume"] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":str(e)})
            
    def set_play_mode(self, mode):
        try:
            self._status["play_mode"] = mode
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":str(e)})
    
    def set_repeat_one(self, value):
        try:
            self._status["repeat_one"] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":str(e)})
    
    def set_repeat_all(self, value):
        try:
            self._status["repeat_all"] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":str(e)})
    def set_rt_type(self, value):
        try:
            self._status["rt_type"] = value
            self.rt_status()
            self.save_setup_to_file()
        except Exception as e:
            self.error.emit({"command":"set_volume", "message":str(e)})
        
    def update_status(self):
        self._status['position'] = int(self.mediaplayer.get_position() * 1000)
        self._status['duration'] = int(self.mediaplayer.get_length() / 1000)
        self._status['curTime'] = int(self.mediaplayer.get_time() / 1000)
        
        if not self.mediaplayer.is_playing():
            self.timer.stop()
            if not self._status['paused']:
                if self._status['repeat_one']:
                    self.stop()
                    self.play_pause()
                else:
                    self.stop()
                    if self._status['play_mode'] == 'Playlist':
                        self.playlist_foward()
        self.rt_status()
    
    def playlist_play(self):
        for i in range(self._status['play_index'], len(self.playlist) - 1):
            self.open_file(self.playlist[self._status["play_index"]])
            if self._status['loaded']:
                self.play_pause()
                return
            else:
                self._status["play_index"] = self._status["play_index"] + 1
        
    def playlist_index(self):
        if self._status['play_index'] >= len(self.playlist) -1:
            self._status['play_index'] = 0
            if not self._status["repeat_all"]:
                print("repeat stop return")
                self.stop()
                return
        else:
            self._status["play_index"] = self._status["play_index"] + 1
        print(self._status['play_index'])
        self.open_file(self.playlist[self._status["play_index"]])
        self.play_pause()
    
    def playlist_foward(self):
        self._status["play_index"] = self._status["play_index"] + 1
        if self._status['play_index'] >= len(self.playlist):
            if self._status["repeat_all"]:
                self._status['play_index'] = 0
            else:
                self.stop()
                return
        self.playlist_play()

    def playlist_rewind(self):
        self._status["play_index"] = self._status["play_index"] - 1
        if self._status["play_index"] < 0:
            self._status["play_index"] = 0
            self.playlist_play()
            return
        for i in range(0, self._status["play_index"]):
            self.open_file(self.playlist[self._status["play_index"]])
            if self._status['loaded']:
                self.play_pause()
                return
            else:
                self._status["play_index"] = self._status["play_index"] - 1
        
    @Slot(object)
    def recv_comm(self, data):
        print(data)
        if data["command"] == "play_pause":
            if self._status["play_mode"] == "Playlist":
                self.playlist_play()
                return
            self.play_pause()
        elif data["command"] == "stop":
            self.stop()
        elif data["command"] == "open_file":
            self._status["play_mode"] = "Normal"
            self.open_file(data["file"])
        elif data["command"] == "play_direct":
            self._status["play_mode"] = "Normal"
            self.open_file(data["file"])
            self.play_pause()
        elif data["command"] == "set_fullscreen":
            self.set_fullscreen(data['value'])
        elif data["command"] == "get_status":
            self.rt_status()
        elif data["command"] == "set_position":
            self.set_position(data["value"])
        elif data["command"] == "start_position":
            self.timer.stop()
            self.mediaplayer.pause()
        elif data["command"] == "end_position":
            self.timer.start()
            self.mediaplayer.play()
        elif data["command"] == "set_volume":
            self.set_volume(data["value"])
        elif data["command"] == "set_mute":
            self.set_mute(data["value"])
        elif data["command"] == "update_playlist":
            self.update_playlist(data["playlist"])
        elif data["command"] == "set_play_mode":
            self.set_play_mode(data["value"])
        elif data["command"] == "set_repeat_all":
            self.set_repeat_all(data["value"])
        elif data["command"] == "set_repeat_one":
            self.set_repeat_one(data["value"])
        elif data["command"] == "set_ff":
            self.playlist_foward()
        elif data["command"] == "set_rew":
            self.playlist_rewind()
        elif data["command"] == "play_id":
            self._status["play_mode"] = "Playlist"
            if data["index"] < 0:
                # self._status["play_index"] = 0
                return
            if data["index"] >= len(self.playlist):
                # self._status["play_index"] = 0
                return
            self._status["play_index"] = data["index"]
            self.playlist_play()
            # self.open_file(self.playlist[data["index"]])
            # self.play_pause()
        elif data["command"] == "set_rt_ipaddr":
            self._status["rt_ipaddr"] = data["ipaddr"]
            self.save_setup_to_file()
            self.rt_status()
        elif data["command"] == "set_rt_port":
            self._status["rt_port"] = int(data["port"])
            self.save_setup_to_file()
            self.rt_status()
        elif data["command"] == "get_playlist":
            self.rt_playlist.emit(self.playlist)
        elif data["command"] == "set_rt_type":
            self.set_rt_type(data["value"])
        else:
            self.error.emit({ "command":"unknown_command", "command":"unknown_command" })
        # self.rt_status()
        
class IO(QThread):
    sio = socketio.Client()
    command = Signal(object)
    status = Signal(object)
    get_connected = Signal()
    def __init__(self, parent=None):
        super(IO, self).__init__(parent)
        self.connected = False
        
    def call_connect(self):
        self.connected = True
        self.get_connected.emit()

    def call_command(self, args):
        self.command.emit(args)
        # await sio.emit('my response', {'response': 'my response'})
        
    def call_status(self, args):
        self.status.emit(args)
        
    def call_disconnect(self):
        self.connected = False
    
    @Slot()
    def send_status(self, args):
        if self.connected:
            IO.sio.emit('status', args)
        else:
            print('socket io not connected')
    
    @Slot()
    def send_playlist(self, pl):
        if self.connected:
            IO.sio.emit('playlist', pl)
        else:
            print('socket io not connected')
    
    @Slot()
    def send_error(self, args):
        if self.connected:
            IO.sio.emit('error', args)
        else:
            print('socket io not connected')
        
    @Slot()
    def send_message(self, args):
        if self.connected:
            IO.sio.emit('message', args)
        else:
            print('socket io not connected')

    def run(self):
        IO.sio.on('data', self.call_status)
        IO.sio.on('command', self.call_command)
        IO.sio.on('connect', self.call_connect)
        IO.sio.on('disconnect', self.call_disconnect)
        IO.sio.connect('http://localhost:3000?client=player')

if __name__=="__main__":
    app = QApplication(sys.argv)
    main = PlayerWindow()
    sys.exit(app.exec_())
