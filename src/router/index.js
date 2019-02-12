import Vue from 'vue'
import Router from 'vue-router'
import RequestCare from '@/components/RequestCare.vue'
import Bookings from '@/components/Bookings'
import EmergencyInfo from '@/components/EmergencyInfo'
import ProviderProfile from '@/components/ProviderProfile.vue'
import RequestModal from '@/components/RequestModal.vue'
import HowItWorks from '@/components/HowItWorks.vue'
import NewUser from '@/components/NewUser.vue'
import RequestModal2 from '@/components/RequestModal2.vue'
import RequestRecipients from '@/components/RequestRecipients.vue'
import AdminMessages from '@/components/AdminMessages.vue'
import EventPage from '@/components/EventPage.vue'
import Events from '@/components/Events.vue'
import RsvpInfoCollection from '@/components/RsvpInfoCollection.vue'
import RsvpConfirmation from '@/components/RsvpConfirmation.vue'
import CancelRSVP from '@/components/CancelRSVP.vue'
import MyRSVPs from '@/components/MyRSVPs.vue'
import Faq from '@/components/Faq.vue'
import MyEvents from '@/components/MyEvents.vue'
import Invite from '@/components/onboarding/Invite.vue'
import EventEdit from '@/components/EventEdit.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import EmergencyContacts from '@/components/onboarding/EmergencyContacts.vue'
import ChildSpecialRequirements from '@/components/onboarding/ChildSpecialRequirements.vue'
import ChildSpecialRequirementsYesNo from '@/components/onboarding/ChildSpecialRequirementsYesNo.vue'
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
      component: RequestCare
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
      name: 'Home',
      component: Events,
      props: true
    },
    {
      path: '/profile/edit',
      name: 'ProfileEdit',
      component: ProfileEdit
    },
    {
      path: '/users/:id',
      name: 'ProviderProfile',
      component: ProviderProfile,
      props: true
    },
    {
      path: '/event/:id/share',
      name: 'Invite',
      component: Invite
    },
    {
      path: '/event/:id/edit',
      name: 'EventEdit',
      component: EventEdit
    },
    {
      path: '/event/:id/',
      name: 'EventPage',
      component: EventPage
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
      path: '/how-it-works',
      name: 'HowItWorks',
      component: HowItWorks
    },
    {
      path: '/request-create',
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
      component: AdminMessages
      // NB: this route has beforeRouteEnter redirect in the component
    },
    {
      path: '/faq',
      name: 'Faq',
      component: Faq
      // NB: this route has beforeRouteEnter redirect in the component
    },
    {
      path: '/my-events',
      name: 'MyEvents',
      component: MyEvents
    },
    {
      path: '/onboarding/emergency-contacts/:eventId?',
      name: 'EmergencyContacts',
      component: EmergencyContacts
    },
    {
      path: '/onboarding/child-special-requirements-2/:eventId?',
      name: 'ChildSpecialRequirements',
      component: ChildSpecialRequirements
    },
    {
      path: '/onboarding/child-special-requirements-1/:eventId?',
      name: 'ChildSpecialRequirementsYesNo',
      component: ChildSpecialRequirementsYesNo
    },
    {
      path: '/my-rsvps',
      name: 'MyRSVPs',
      component: MyRSVPs
    },
    {
      path: '/rsvp/:eventId/cancel',
      name: 'CancelRSVP',
      component: CancelRSVP,
      props: true
    },
    {
      path: '/rsvp/:eventId',
      name: 'RsvpInfoCollection',
      component: RsvpInfoCollection
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
