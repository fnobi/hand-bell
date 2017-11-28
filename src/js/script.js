import Vue from 'vue';

import initFirebase from './lib/initFirebase';
import Root from './components/Root.vue';

new Vue({
    el: document.getElementById('root'),
    render: (h) => h(Root)
});
