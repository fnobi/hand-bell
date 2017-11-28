<template lang="pug">
.recorder(v-bind:data-disabled="disabled" v-bind:data-is-recording="isRecording")
    div(v-if="isRecording" v-on:click="stopRecording") STOP
    div(v-else v-on:click="startRecording") REC
</template>

<style lang="scss" scoped>
.recorder {
    background-color: #888;
    border-radius: 5px;
    box-shadow: 0px 4px 0px #333;
    margin: 10px;
    padding: 5px;
    color: #fff;
    font-size: 12px;

    &[data-is-recording] {
        color: #f00;
    }

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
    destroyed () {
        this.micRecording = null;
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
