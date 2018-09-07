import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    }
  ]
})
