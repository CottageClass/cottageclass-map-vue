<template>
<OnboardingStyleWrapper styleIs="onboarding">
  <div class="onb-body">
    <div class="body">
      <div class="content-wrapper">
        <Nav
            @next="$emit('activateScreen', 'inviteOthers')"
            hidePrevious="true"
          />
          <Question
              title="RSVP to events near you"
              subtitle="Here are some upcoming events in your area that you might be interested in"
          />
          <EventList
              :events="events"
              :showDates="false"
        />
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
