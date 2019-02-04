<template>
<OnboardingStyleWrapper styleIs="onboarding">
  <Question title="RSVP to events near you">
  Select an event from upcoming events near you.
  </Question>
  <EventList
      :events="events"
      :showDates="false"
  />
</OnboardingStyleWrapper>
</template>

<script>
import Question from './Question.vue'
import EventList from '../EventList.vue'
import * as api from '@/utils/api.js'
import OnboardingStyleWrapper from './OnboardingStyleWrapper.vue'

export default {
  name: 'RSVPInvite',
  components: { Question, EventList, OnboardingStyleWrapper },
  props: [],
  data () {
    return {
      events: [],
      noNearbyEvents: false
    }
  },
  mounted: function () {
    api.fetchUpcomingEventsWithinDistance(5).then(res => {
      if (res.length > 0) {
        this.events = res
      } else {
        api.fetchUpcomingEventsWithinDistance(50).then(res => {
          if (res.length > 0) {
            this.events = res
          } else {
            this.noNearbyEvents = true
          }
        })
      }
    }).catch(err => console.log(err))
  }
}
</script>

<style scoped>

</style>
