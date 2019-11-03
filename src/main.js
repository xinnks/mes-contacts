import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.scss'

Vue.config.productionTip = false
Vue.filter('nonce', function(length = 20) {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
})
Vue.filter('currency',(val = 0)=>{
    return val.toLocaleString('en-US')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
