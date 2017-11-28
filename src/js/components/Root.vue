<template lang="pug">
.root
    p(v-if="!initialized") loading...
    template(v-else-if="!user")
        button(v-on:click="startGoogleAuth") ログインする
    template(v-else)
        p user: {{ user.email }}
        template(v-for="label, id in noteTypes")
          NoteKey(v-bind:uid="user.uid + '.' + id" v-bind:label="label")
        p: button(v-on:click="logout") ログアウト
</template>

<style lang="scss" scoped>
.root {
    margin: 1em;
}
</style>

<script>
import NoteKey from './NoteKey.vue';

export default {
    name: 'Root',
    components: {
        NoteKey,
    },
    data () {
        return {
            initialized: false,
            user: null
        };
    },
    computed: {
        noteTypes () {
            return {
                a: 'A',
                s: 'S',
                d: 'D',
                f: 'F',
                g: 'G'
            }
        },
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
    }
}
</script>
