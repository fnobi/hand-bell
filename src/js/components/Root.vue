<template lang="pug">
.root
    p(v-if="!initialized") loading...
    button(v-else-if="!user" v-on:click="startGoogleAuth") ログインする
    template(v-else)
      p {{ user.email }}
      p: button(v-on:click="logout") ログアウト
</template>

<script>
export default {
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
    }
}
</script>
