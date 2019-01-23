import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings'
import EmergencyInfo from '@/components/EmergencyInfo'
import ProviderProfile from '@/components/ProviderProfile.vue'
import RequestModal from '@/components/RequestModal.vue'
import OAuthCallback from '@/components/OAuthCallback.vue'
import network from '../assets/network-info.json'
import HowItWorks from '@/components/HowItWorks.vue'
import NewUser from '@/components/NewUser.vue'
import DirectLogin from '@/components/onboarding/DirectLogin.vue';
import RequestModal2 from '@/components/RequestModal2.vue'
import RequestRecipients from '@/components/RequestRecipients.vue'
import AdminMessages from '@/components/AdminMessages.vue'
import EventPage from '@/components/EventPage.vue'
import Events from '@/components/Events.vue'
import RsvpInfoCollection from '@/components/RsvpInfoCollection.vue'
import RsvpConfirmation from '@/components/RsvpConfirmation.vue'
import Faq from '@/components/Faq.vue'
import Invite from '@/components/onboarding/Invite.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'NewUser',
      component: NewUser
    },
    {
      path: '/offer',
      name: 'Bookings',
      component: Bookings
    },
    {
      path: '/request',
      name: 'Request',
      component: MainView
    },  
    {
      path: '/bookings',
      redirect: '/offer'
    },      
    {
      path: '/emergency-info/:id',
      name: 'emergencyInfo',
      component: EmergencyInfo
    },
    {
      path: '/home',
      name: 'MainView',
      component: Events
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/provider-profile/:id',
      name: 'ProviderProfile',
      component: ProviderProfile
    },
    {
      path: '/event/:id/share',
      name: 'Invite',
      component: Invite
    },    
    {
      path: '/event/:id/',
      name: 'EventPage',
      component: EventPage
    },
    {
      path: '/rsvp/:eventId',
      name: 'RsvpInfoCollection',
      component: RsvpInfoCollection
    },
    {
      path: '/rsvp-confirmation/:eventId',
      name: 'RsvpConfirmation',
      component: RsvpConfirmation
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
      path: '/oauth-callback',
      name: 'Root',
      component: OAuthCallback
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
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq,
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
