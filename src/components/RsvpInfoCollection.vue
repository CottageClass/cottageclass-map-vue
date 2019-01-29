<template>
<OnboardingStyleWrapper styleIs="onboarding">

  <!-- wrapper for desktop screens -->

    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">

  <!-- nav -->

  <Nav
  :button="nextButtonState"
  @next="nextStep"
  @prev="$router.go(-1)" />

  <!-- error message -->

  <ErrorMessage v-if="error" :text="error" />

<!-- Show loading indicator until we know how many children there are. If there is an error, show the error only. -->

  <OAuthCallback v-if="!allInformationLoaded"/>

<!-- Once we have child and event information, ask user which child/children they want to RSVP -->

  <div v-if="allInformationLoaded" class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Which children would you like to RSVP?</h1>
      <p
      class="onb-paragraph-subheading-2"
      v-if="Number.isInteger(spotsRemaining)">There <span v-if="spotsRemaining === 1">is</span><span v-else>are</span> {{ spotsRemaining }} spot<span v-if="spotsRemaining !== 1">s</span> remaining.</p>
    </div>
   <MultipleChoice
   type="checkbox"
   v-model="childrenSelected"
   :labelsAndOrder="labelsAndOrder"/>
  </div>
</div>
</div>
</div>
</OnboardingStyleWrapper>
</template>

<script>

import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
import * as utils from '@/utils/utils.js'
import Nav from '@/components/onboarding/Nav.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import MultipleChoice from '@/components/onboarding/MultipleChoice.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import sheetsu from 'sheetsu-node'
// this component has a working loading indicator and no other logic. todo: break out and rename.
import OAuthCallback from '@/components/OAuthCallback.vue'
var moment = require('moment')
// create a config file to identify which spreadsheet we push to.
var client = sheetsu({ address: 'https://sheetsu.com/apis/v1.0su/62cd725d6088' })

export default {
  name: 'RsvpInfoCollection',
  components: { Nav, OAuthCallback, ErrorMessage, MultipleChoice, OnboardingStyleWrapper },
  data () {
    return {
      children: [],
      currentUser: false,
      childrenSelected: [],
      error: '',
      eventId: this.$route.params.eventId,
      event: false,
      isAuthenticated: this.$auth.isAuthenticated()
    }
  },
  mounted: function () {
    this.redirectToSignupIfNotAuthenticated()
    // get info about current user to display list of children
    this.fetchUserInformation()
    // get data about the current event to determine max attendees.
    this.fetchEventInformation()
  },
  computed: {
    labelsAndOrder: function () {
      return this.children.map(child => [child.id, child.firstName + ', ' + this.calculateAge(child.birthday)])
    },
    allInformationLoaded: function () {
      return this.currentUser && this.event
    },
    tooManyChildren: function () {
      return this.childrenSelected.length > this.event.maximumChildren - this.event.participantsCount
    },
    nextButtonState: function () {
      if (this.tooManyChildren || this.childrenSelected.length === 0) {
        return 'inactive'
      } else {
        return 'next'
      }
    },
    spotsRemaining: function () {
      return Math.max(0, this.event.maximumChildren - this.event.participantsCount - this.childrenSelected.length)
    },
    guestChildrenNamesAgesFormatted: function () {
      return utils.arrayToSentence(this.children.filter(child => this.childrenSelected.includes(child.id)).map(child => child.firstName + ' (age ' + this.calculateAge(child.birthday) + ')')) // 'Suzie (5)'
    },
    eventDateFormattedMonthDay: function () {
      return moment(this.event.startsAt).format('MMMM D')
    },
    notificationToHost: function () {
      return 'Congratulations, ' + this.event.hostFirstName + '! ' + this.currentUser.firstName + ' booked a playdate with you for ' + this.guestChildrenNamesAgesFormatted + ' on ' + this.eventDateFormattedMonthDay + '! Visit https://kidsclub.io/faq or reply with any questions!'
    },
    notificationBackToUser: function () {
      return 'Congratulations ' + this.currentUser.firstName + '! You\'ve booked a playdate with ' + this.event.hostFirstName + ' for ' + this.guestChildrenNamesAgesFormatted + ' on ' + this.eventDateFormattedMonthDay + '. We\'ll email you shortly to confirm your RSVP.'
    }
  },
  methods: {
    fetchUserInformation: function () {
      api.fetchCurrentUser(Token.currentUserId(this.$auth)).then(currentUser => {
        console.log(currentUser)
        this.currentUser = currentUser
        this.children = currentUser.children
        this.redirectToOnboardingIfNotOnboarded()
        // if we don't have children for this user (which should never be true) show an error. (Todo: let user enter child info here in this case.)
        if (!this.children || this.children.length === 0) {
          this.error = 'Sorry, but we cannot retrieve your children\'s information. Are you sure you have signed in? To resolve this, please email us at: contact@cottageclass.com.'
        }
      }).catch(err => {
        console.log('Error fetching user info', err)
      })
    },
    redirectToSignupIfNotAuthenticated: function () {
      if (!this.$auth.isAuthenticated()) {
        console.log('User attempted to RSVP without being authenticated')
        this.$cookies.set('rsvpAttempted', this.eventId)
        this.$router.push('/?activeScreen=signup')
      }
    },
    redirectToOnboardingIfNotOnboarded: function () {
      if (!this.currentUser.hasAllRequiredFields) {
      // send them back to onboarding.
        console.log('user doesnt have required fields on rsvpinfocollection step, sending them back to onboarding', this.currentUser)
        this.$cookies.set('rsvpAttempted', this.eventId)
        this.$router.push('/')
      } else {
        console.log('user already onboarded, not redirecting')
      }
    },
    calculateAge: function (birthdate) {
      return moment().diff(birthdate, 'years')
    },
    fetchEventInformation: function () {
      api.fetchEvents(this.$route.params.eventId).then(
        (res) => {
          this.event = res[0]
          if (this.event.full || this.event.maximumChildren === 0) {
            this.error = 'We\'re sorry, this event is full!'
          }
        }).catch(
        (err) => {
          console.log(err.stack)
          this.error = 'Sorry, there was a problem retrieving information about the event. Go back and try again?'
        })
    },
    nextStep: function () {
      if (this.tooManyChildren) {
        let numChildren = this.childrenSelected.length
        let childrenSingularOrPlural = numChildren === 1 ? 'child' : 'children'
        this.error = 'Sorry, but there are not enough spots available for ' + numChildren + ' ' + childrenSingularOrPlural + '.'
      } else if (this.childrenSelected.length === 0) {
        this.error = 'Please choose at least one child to RSVP.'
      } else {
        this.submitRsvp()
      }
    },
    forgetRsvpAttempted: function () {
      this.$cookies.remove('rsvpAttempted')
    },
    submitRsvp: function () {
      this.error = ''
      console.log('rsvping children ' + this.childrenSelected + ' to event ID' + this.eventId)
      this.submitToSheetsu()
      let component = this
      api.submitEventParticipant(this.eventId, this.childrenSelected).then(res => {
      // open event page where user will see success message
        component.sendNotifications()
        component.forgetRsvpAttempted()
        component.$router.push({ name: 'EventPage', params: { id: this.eventId } })
      }).catch(err => {
        console.log(err)
        this.error = 'Sorry, there was a problem submittting your RSVP. Try again?'
        // fetch event information again, which will update the error message if the event is full, e.g. in the case where another user RSVP'ed a the same time, just before this user did.
        this.fetchEventInformation()
      })
    },
    submitToSheetsu: function () {
      // submit user to sheetsu which gives us notifications of new RSVPs
      client.create({
        'Event ID': this.eventId,
        'Event title': this.event.name,
        'Event host': this.event.hostFirstName,
        'Event date': this.event.startsAt,
        'Date submitted': moment(Date()).format('L'),
        'Parent first name': this.currentUser.firstName,
        'Parent last name': this.currentUser.lastInitial,
        'Parent phone': this.currentUser.phone,
        'Parent email': this.currentUser.email,
        'IDs of RSVPed children': this.childrenSelected,
        'All children': this.currentUser.children
      }, 'RSVPs').then((data) => {
        console.log('Successfully submitted RSVP to Sheetsu: ' + data)
      }, (err) => {
        console.log(err)
      })
    },
    isSelected: function (id) {
      return this.childrenSelected.includes(id)
    },
    toggleSelected: function (id) {
      this.error = ''
      if (this.isSelected(id)) {
        this.childrenSelected = this.childrenSelected.filter((aChildId) => aChildId !== id)
      } else {
        this.childrenSelected.push(id)
      }
    },
    sendNotifications: function () {
      api.submitNotification(this.event.hostId, this.notificationToHost)
      api.submitNotification(Token.currentUserId(this.$auth), this.notificationBackToUser)
    }
  }
}
</script>
