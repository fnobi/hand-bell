<template lang="pug">
.root
    header.header
        h1.title hand-bell
        .description
            | この場で音を録音して音色をつくる、サンプラーアプリです。
    .content
        template(v-if="!initialized") loading...
        template(v-else-if="user")
            template(v-for="label, id in noteTypes")
                NoteKey(v-bind:uid="user.uid + '.' + id" v-bind:label="label")
    footer.footer
        .user-info(v-if="user")
            | {{ user.email }}
            = ' | '
            a(href="#" v-on:click.prevent="logout") logout
        template(v-else-if="initialized")
            .login(v-on:click="startGoogleAuth") ログインする
</template>

<style lang="scss" scoped>
.root {
    text-align: center;
}

.header {
    background-color: #333;
    color: #fff;
    padding: 20px;
}

.title {
    font-size: 30px;
    font-weight: bold;
}

.description {
    font-size: 12px;
}

.content {
    position: fixed;
    width: 100%;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
}

.login {
    display: inline-block;
    padding: 15px;
    margin: 15px;
    line-height: 1;
    font-weight: bold;
    font-size: 20px;
    background-color: #888;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0px 3px 0px #333;
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0px;
    background-color: #ccc;
    font-size: 14px;
}

.user-info {
    margin: 10px;
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
            this.initialized = false;
            firebase.auth().signOut();
        },
    }
}
</script>
