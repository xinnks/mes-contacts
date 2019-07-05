import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'abstract',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact/:id',
      name: 'contact-page',
      component: () => import('./views/Contact.vue')
    },
    {
      path: '/add-contact',
      name: 'add-contact-page',
      component: () => import('./views/AddContact.vue')
    }
  ]
})
