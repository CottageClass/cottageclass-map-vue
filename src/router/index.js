import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings'
import EmergencyInfo from '@/components/EmergencyInfo'
import Splash from '@/components/Splash.vue'
import EnterCode from '@/components/EnterCode.vue'
import ProviderProfile from '@/components/ProviderProfile.vue'
import RequestModal from '@/components/RequestModal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
    	path: 'emergency-info/:id',
    	name: 'emergencyInfo',
    	component: EmergencyInfo
    },
    {
    	path: '/home',
    	name: 'MainView',
    	component: MainView 
    },
    {
    	path: '/enter-code',
    	name: 'EnterCode',
    	component: EnterCode
    },
    {
    	path: '/provider-profile/:id',
    	name: 'ProviderProfile',
    	component: ProviderProfile
    },
    {
    	path: '/request/:id',
    	name: 'RequestModal',
    	component: RequestModal
    }
  ],
 scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
})
