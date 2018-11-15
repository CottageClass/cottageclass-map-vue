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
import TabNav from '@/components/TabNav.vue'

Vue.use(Router)

// '/:networkId/' is a temporary hack. This should get reworked once we add multiple networks.

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/bookings',
      name: 'Bookings',
      component: Bookings
    },
    {
      path: '/emergency-info/:id',
      name: 'emergencyInfo',
      component: EmergencyInfo
    },
    {
      path: '/home',
      name: 'MainView',
      component: TabNav
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
    },
    {
      path:'/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
    },
    {
      path:'/desktop-warning',
      name: 'DesktopWarningSplash',
      component: DesktopWarningSplash
    },
    {
      path: '/oauth-callback',
      name: 'Root',
      component: OAuthCallback
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
