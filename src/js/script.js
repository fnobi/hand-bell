import initFirebase from './lib/initFirebase';

let user;

function init () {
    firebase.auth().onAuthStateChanged((res) => {
        user = res;
        console.log('user', user);
    });

    firebase.auth().getRedirectResult();

    document.querySelector('.js-button').addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider);
    });
}

init();
