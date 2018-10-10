import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings'
import EmergencyInfo from '@/components/EmergencyInfo'
import Splash from '@/components/Splash.vue'
import EnterCode from '@/components/EnterCode.vue'
import ProviderProfile from '@/components/ProviderProfile.vue'
import RequestModal from '@/components/RequestModal.vue'
import OAuthCallback from '@/components/OAuthCallback.vue'
import network from '../assets/network-info.json'
import HowItWorks from '@/components/HowItWorks.vue'
import DesktopWarningSplash from '@/components/DesktopWarningSplash.vue'
import NewUser from '@/components/NewUser.vue'

Vue.use(Router)

// '/:networkId/' is a temporary hack. This should get reworked once we add multiple networks. 

export default new Router({
  routes: [
  {
    path: '/new-user',
    name: 'NewUser',
    component: NewUser
  },
  { 
    // necessary to redirect based on earlier error where network name was changed.
    path: '/y723hz', 
    redirect: '/BoCoCaGo'
  }, 
    {
      path: '/oauth-callback',
      name: 'Root',
      component: OAuthCallback
    },
    {
      path: '/:networkId/',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/:networkId/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
    	path: '/:networkId/emergency-info/:id',
    	name: 'emergencyInfo',
    	component: EmergencyInfo
    },
    {
    	path: '/:networkId/home',
    	name: 'MainView',
      component: MainView
    },
    {
    	path: '/:networkId/enter-code',
    	name: 'EnterCode',
    	component: EnterCode
    },
    {
    	path: '/:networkId/provider-profile/:id',
    	name: 'ProviderProfile',
    	component: ProviderProfile
    },
    {
    	path: '/:networkId/request/:id',
    	name: 'RequestModal',
    	component: RequestModal
    },
    {
      path:'/:networkId/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
    },
    {
      path:'/:networkId/desktop-warning',
      name: 'DesktopWarningSplash',
      component: DesktopWarningSplash
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
