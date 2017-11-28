import EventEmitter from 'events';

class AudioManager extends EventEmitter {
    constructor() {
        super();
        this.audioMap = {};
    }

    setAudio (key, url) {
        this.audioMap[key] = new Audio(url);
        this.emit(`set:${key}`);
    }

    getAudio (key) {
        return this.audioMap[key];
    }

    saveAudioFile (fileName, blob) {
        const rootRef = firebase.storage().ref();
        const fileRef = rootRef.child(`${fileName}.wav`);
        return fileRef.put(blob).then((snapshot) => {
            this.setAudio(fileName, snapshot.downloadURL);
        });
    }

    loadAudioFile (fileName) {
        const rootRef = firebase.storage().ref();
        const fileRef = rootRef.child(`${fileName}.wav`);
        return fileRef.getDownloadURL().then((url) => {
            this.setAudio(fileName, url);
        });
    }
}

export default new AudioManager();
