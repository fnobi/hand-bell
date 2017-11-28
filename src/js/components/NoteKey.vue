<template lang="pug">
.note-key(v-on:click="play" v-bind:data-has-file="hasFile")
    p.label(v-bind:data-has-file="hasFile") {{ label }}
    Recorder(v-if="initialized && !hasFile" v-on:blob="handleWavFile")
</template>

<style lang="scss" scoped>
.note-key {
    display: inline-block;
    position: relative;
    margin: 20px;
    width: 80px;
    height: 80px;
    vertical-align: top;
    background-color: #eee;
    &[data-has-file] {
        $tall: 7px;
        background-color: #888;
        box-shadow: 0px $tall 0px #333;
        border-radius: 5px;
        top: -$tall;
        color: #fff;
    }
}

.label {
    line-height: 1;
    margin-top: 10px;
    &[data-has-file] {
        margin-top: 0;
        font-size: 40px;
        font-weight: bold;
        line-height: 80px;
    }
}
</style>

<script>
import audioManager from '../lib/audioManager';

import Recorder from './Recorder.vue';
import Player from './Player.vue';

export default {
    name: 'NoteKey',
    props: {
        uid: String,
        label: String
    },
    components: {
        Recorder
    },
    data () {
        return {
            hasFile: false,
            initialized: false
        }
    },
    mounted () {
        audioManager.on(`set:${this.uid}`, () => {
            this.hasFile = true;
        });
        audioManager.loadAudioFile(this.uid).then(() => {
            this.initialized = true;
        }).catch((e) => {
            this.initialized = true;
        });
    },
    destroyed () {
        audioManager.removeAllListeners(`set:${this.uid}`);
    },
    methods: {
        handleWavFile (blob) {
            this.initialized = false;
            audioManager.saveAudioFile(this.uid, blob).then(() => {
                this.initialized = true;
            }).catch(() => {
                alert('アップロードに失敗しました。');
            });
        },
        play () {
            const audio = audioManager.getAudio(this.uid);
            if (audio) {
                if (audio.currentTime) audio.currentTime = 0;
                audio.play();
            }
        }
    }
}
</script>
