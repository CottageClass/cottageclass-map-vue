<template>
  <OnboardingStyleWrapper styleIs="onboarding">
    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">
          <Nav
            @next="nextStep"
            hidePrevious="true"
            button="skip"
            />
          <Question
            title="RSVP to a playdate near you"
            subtitle="Would you like to RSVP to one of these upcoming playdates in your area?">
            <EventList
              :events="eventsNotBelongingToCurrentUser"
              :showDates="false"
              />
          </Question>
        </div>
      </div>
    </div>
  </OnboardingStyleWrapper>
</template>

<script>
import Question from './Question.vue'
import EventList from '../EventList.vue'
import * as api from '@/utils/api.js'
import OnboardingStyleWrapper from './OnboardingStyleWrapper.vue'
import Nav from '@/components/onboarding/Nav.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'RSVPPrompt',
  components: { Question, EventList, OnboardingStyleWrapper, Nav },
  props: [],
  data () {
    return {
      events: [],
      noNearbyEvents: false
    }
  },
  computed: {
    eventsNotBelongingToCurrentUser: function () {
      return this.events.filter(event => event.hostId != this.currentUser.id)
    },
    ...mapGetters([ 'currentUser' ])
  },
  methods: {
    nextStep: function () {
      this.$emit('activateScreen', 'inviteOthers')
    }
  },
  mounted: function () {
    api.fetchUpcomingEventsWithinDistance(10, this.currentUser.latitude, this.currentUser.longitude).then(res => {
      if (res.length > 0) {
        this.events = res
      } else {
        api.fetchUpcomingEventsWithinDistance(50, this.currentUser.latitude, this.currentUser.longitude).then(res => {
          if (res.length > 0) {
            this.events = res
          } else {
            this.nextStep()
          }
        })
      }
    }).catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>
