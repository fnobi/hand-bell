<template lang="pug">
.note-key
    p {{ label }}
    template(v-if="hasFile")
        Player(v-bind:sound-key="uid")
    template(v-else)
        Recorder(v-on:blob="handleWavFile")
</template>

<style lang="scss" scoped>
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
        Recorder,
        Player
    },
    data () {
        return {
            hasFile: false
        }
    },
    mounted () {
        audioManager.on(`set:${this.uid}`, () => {
            this.hasFile = true;
        });
        audioManager.loadAudioFile(this.uid).catch((e) => {
            /* do nothing */
        });
    },
    destroyed () {
        audioManager.off(`set:${this.uid}`);
    },
    methods: {
        handleWavFile (blob) {
            audioManager.saveAudioFile(this.uid, blob).catch(() => {
                alert('アップロードに失敗しました。');
            });
        }
    }
}
</script>
