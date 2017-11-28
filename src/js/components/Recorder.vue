<template lang="pug">
.recorder(v-bind:data-disabled="disabled")
    button(v-if="isRecording" v-on:click="stopRecording") 止める
    button(v-else v-on:click="startRecording") 録音する
</template>

<style lang="scss" scoped>
.recorder {
    margin: 1em 0em;
    &[data-disabled] {
        pointer-events: none;
        opacity: 0;
    }
}
</style>

<script>
import MicRecording from '../lib/MicRecording';

export default {
    name: 'Recorder',
    data () {
        return {
            disabled: false,
            isRecording: false
        };
    },
    mounted () {
        this.micRecording = new MicRecording();
    },
    methods: {
        startRecording () {
            this.disabled = true;
            this.micRecording.start().then(() => {
                this.isRecording = true;
                this.disabled = false;
            });
        },
        stopRecording () {
            this.disabled = true;
            this.isRecording = false;
            this.micRecording.stop().then((blob) => {
                this.$emit('blob', blob);
                this.disabled = false;
            });
        }
    }
}
</script>
