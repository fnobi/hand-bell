<template lang="pug">
.root
    p(v-if="!initialized") loading...
    template(v-else-if="!user")
        button(v-on:click="startGoogleAuth") ログインする
    template(v-else)
        p user: {{ user.email }}
        Recorder(v-on:blob="handleWavFile")
        Player(v-bind:sound-key="user.uid")
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
            if (this.user) {
                audioManager.loadAudioFile(this.user.uid).catch((e) => {
                    /* do nothing */
                });
            }
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
            audioManager.saveAudioFile(this.user.uid, blob).catch(() => {
                alert('アップロードに失敗しました。');
            });
        }
    }
}
</script>
