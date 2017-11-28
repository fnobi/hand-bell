<template lang="pug">
.player(v-bind:data-disabled="!hasFile")
    button(v-on:click="play") うぇい
</template>

<style lang="scss" scoped>
.player {
    margin: 1em 0em;
    &[data-disabled] {
        pointer-events: none;
        opacity: 0.5;
    }
}
</style>

<script>
import audioManager from '../lib/audioManager';

export default {
    name: 'Player',
    props: {
        soundKey: String
    },
    data () {
        return {
            hasFile: false
        };
    },
    mounted () {
        audioManager.on(`set:${this.soundKey}`, () => {
            this.hasFile = true;
        });
    },
    destroyed () {
        audioManager.off(`set:${this.soundKey}`);
    },
    methods: {
        play () {
            const audio = audioManager.getAudio(this.soundKey);
            if (audio) {
                if (audio.currentTime) audio.currentTime = 0;
                audio.play();
            }
        }
    }
}
</script>
