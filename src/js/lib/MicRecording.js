import EventEmitter from 'events';
import Recorder from 'recorderjs';

import SupportedAudioContext from './SupportedAudioContext';

export default class MicRecording extends EventEmitter {
    constructor (opts = {}) {
        super();
        this.type = opts.type || 'audio/wav';
        this.lowpass = isNaN(opts.lowpass) ? 1024 : opts.lowpass;
    }

    start () {
        return new Promise((resolve, reject) => {
            navigator.getUserMedia({
                video: false,
                audio: true
            }, (stream) => {
                const audioContext = new SupportedAudioContext();
                const input = audioContext.createMediaStreamSource(stream);

                const filter = audioContext.createBiquadFilter();
                input.connect(filter);

                filter.type = 'lowpass';
                filter.frequency.value = this.lowpass;

                const rec = new Recorder(filter, {
                    sampleRate: 16000
                });
                rec.record();
                this.rec = rec;
                resolve();
            }, (err) => {
                reject(new Error('fail in recording.'));
            });
        });
    }

    stop () {
        return new Promise((resolve, reject) => {
            const rec = this.rec;
            if (!rec) {
                reject();
                return;
            }

            rec.stop();

            rec.exportWAV((blob) => {
                this.rec = null;
                resolve(blob);
            }, this.type);
        });
    }
};
