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
import DirectLogin from '@/components/onboarding/DirectLogin.vue';
import TabNav from '@/components/TabNav.vue'
import RequestModal2 from '@/components/RequestModal2.vue'
import RequestRecipients from '@/components/RequestRecipients.vue'
import AdminMessages from '@/components/AdminMessages.vue'
import EventPage from '@/components/EventPage.vue'

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
      path: '/event/:id',
      name: 'EventPage',
      component: EventPage
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
    {
      path: '/splash',
      name: 'Splash',
      component: Splash
    },
    {
      path: '/request',
      name: 'RequestModal2',
      component: RequestModal2
    },
    {
      path: '/request-recipients',
      name: 'RequestRecipients',
      component: RequestRecipients
    },
    // Admin Routes
    {
      path: '/admin-messages',
      name: 'AdminMessages',
      component: AdminMessages,
      // NB: this route has beforeRouteEnter redirect in the component
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
