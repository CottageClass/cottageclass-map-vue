<template>
  <div class="onb-body">
    <div class="body">
      <div class="content-wrapper">
        <Nav :button="next" @next="nextStep" hidePrevious="true" />
        <OnboardingStyleWrapper styleIs="onboarding">
          <Question
            title="RSVP to a playdate near you"
            subtitle="Would you like to RSVP to one of these upcoming playdates in your area?"
            />
          <EventList
            :events="events"
            :showDates="false"
            />
        </OnboardingStyleWrapper>
      </div>
    </div>
  </div>
</template>

<script>
import Question from '@/components/base/Question.vue'
import EventList from '@/components/EventList.vue'
import * as api from '@/utils/api.js'
import OnboardingStyleWrapper from '@/components/FTE/OnboardingStyleWrapper.vue'
import Nav from '@/components/FTE/Nav.vue'
import { mapGetters } from 'vuex';

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
  methods: {
    nextStep () {
      this.$router.push({ name: 'SocialInvite', params: { id: this.firstCreatedEventId } })
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
  },
  computed: mapGetters([ 'firstCreatedEventId' ])
}
</script>

<style scoped>

</style>
