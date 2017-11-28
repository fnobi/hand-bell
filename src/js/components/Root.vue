<template lang="pug">
.root
    p(v-if="!initialized") loading...
    template(v-else-if="!user")
        button(v-on:click="startGoogleAuth") ログインする
    template(v-else)
        p user: {{ user.email }}
        Recorder(v-on:blob="handleWavFile")
        Player(sound-key="default")
        p: button(v-on:click="logout") ログアウト
</template>

<style lang="scss" scoped>
.root {
    margin: 1em;
}
</style>

<script>
import Recorder from './Recorder.vue';
import Player from './Player.vue';
import audioManager from '../lib/audioManager';

export default {
    name: 'Root',
    components: {
        Recorder,
        Player
    },
    data () {
        return {
            initialized: false,
            user: null
        };
    },
    mounted () {
        firebase.auth().onAuthStateChanged((res) => {
            this.initialized = true;
            this.user = res;
        });
        firebase.auth().getRedirectResult();
    },
    methods: {
        startGoogleAuth () {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);
        },
        logout () {
            firebase.auth().signOut().then(() => {
                this.user = null;
            });
        },
        handleWavFile (blob) {
            const url = (window.URL || window.webkitURL).createObjectURL(blob);
            audioManager.setAudio('default', url);
        }
    }
}
</script>
