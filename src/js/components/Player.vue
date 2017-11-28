<template lang="pug">
.player
    button(v-on:click="play") うぇい
</template>

<style lang="scss" scoped>
.player {
    margin: 1em 0em;
}
</style>

<script>
import audioManager from '../lib/audioManager';

export default {
    name: 'Player',
    props: {
        soundKey: String
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
