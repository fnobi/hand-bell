class AudioManager {
    constructor() {
        this.audioMap = {};
    }

    setAudio (key, url) {
        this.audioMap[key] = new Audio(url);
    }

    getAudio (key) {
        return this.audioMap[key];
    }
}

export default new AudioManager();
