import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings'
import EmergencyInfo from '@/components/EmergencyInfo'
import Splash from '@/components/Splash.vue'
import EnterCode from '@/components/EnterCode.vue'
import ProviderProfile from '@/components/ProviderProfile.vue'
import RequestModal from '@/components/RequestModal.vue'
import network from '../assets/network-info.json'
import HowItWorks from '@/components/HowItWorks.vue'

Vue.use(Router)

// '/y723hz/' is a temporary hack. This should get reworked once we add multiple networks. 

export default new Router({
  routes: [
    {
      path: '/y723hz/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/y723hz/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
    	path: '/y723hz/emergency-info/:id',
    	name: 'emergencyInfo',
    	component: EmergencyInfo
    },
    {
    	path: '/y723hz/home',
    	name: 'MainView',
    	component: MainView 
    },
    {
    	path: '/y723hz/enter-code',
    	name: 'EnterCode',
    	component: EnterCode
    },
    {
    	path: '/y723hz/provider-profile/:id',
    	name: 'ProviderProfile',
    	component: ProviderProfile
    },
    {
    	path: '/y723hz/request/:id',
    	name: 'RequestModal',
    	component: RequestModal
    },
    {
      path:'/y723hz/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
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
