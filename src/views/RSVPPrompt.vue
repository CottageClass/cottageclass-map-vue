<template>
  <div class="onb-body">
    <div class="body">
      <div class="content-wrapper">
        <Nav button="skip" @next="nextStep" hidePrevious="true" />
        <OnboardingStyleWrapper styleIs="onboarding">
          <LoadingSpinner v-if="eventsNotBelongingToCurrentUser.length < 1" />
          <Question
            title="RSVP to a playdate near you"
            subtitle="Would you like to RSVP to one of these upcoming playdates in your area?"
            />
          <EventList
            :events="eventsNotBelongingToCurrentUser"
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
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'RSVPPrompt',
  components: { Question, EventList, OnboardingStyleWrapper, Nav, LoadingSpinner },
  props: [],
  data () {
    return {
      events: []
    }
  },
  computed: {
    eventsNotBelongingToCurrentUser: function () {
      return this.events.filter(event => {
        return (event.full !== 'false') && (event.hostId !== this.currentUser.id)
      })
    },
    ...mapGetters([ 'currentUser' ])
  },
  methods: {
    nextStep () {
      this.$router.push({ name: 'SocialInvite', params: { id: this.firstCreatedEventId } })
    }
  },
  mounted: function () {
    api.fetchUpcomingEventsWithinDistance(20, this.currentUser.latitude, this.currentUser.longitude).then(res => {
      if (res.length > 0) {
        this.events = res
        if (this.eventsNotBelongingToCurrentUser.length < 1) {
          this.nextStep()
        }
      } else {
        this.nextStep() // skip this step if no nearby events
      }
    }).catch(function (err) {
      console.log(err)
      // likely there are no events in the area, proceed to
      this.nextStep()
    })
  }
}
</script>

<style scoped>

</style>
