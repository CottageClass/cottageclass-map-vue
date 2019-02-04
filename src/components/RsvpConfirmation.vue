<template>
<OnboardingStyleWrapper styleIs="onboarding">
    <!-- wrapper for desktop screens -->

    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">

  <!-- nav -->

      <Nav :button="nextButtonState" @next="nextStep" @prev="prevStep" />

  <!-- error message -->

      <ErrorMessage v-if="error && showError" :text="error" />

<!-- Show loading indicator until we can show the event info we're confirming.  there are and there is more than one. If there is an error, show the error only. -->

  <OAuthCallback v-if="!event && !(error && showError)"/>

  <div v-if="!!event" class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Welcome!</h1>
      <p class="onb-paragraph-subheading-2">Would you still like to RSVP to the event below?</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        class="checkbox-field-extra-space"
        :class="{'active-checkbox': yesOrNo === 'yes'}">
          <input
          type="radio"
          id="yes"
          value="yes"
          name="yes"
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label
          for="yes"
          class="onb-checkbox-label w-form-label"
          >
           Yes
         </label>
        </div>
        <div
        class="checkbox-field-extra-space"
        :class="{'active-checkbox': yesOrNo === 'no'}">
          <input
          type="radio"
          id="no"
          value="no"
          name="no"
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label
          for="no"
          class="onb-checkbox-label w-form-label"
          >
           No
         </label>
        </div>
      </form>
    </div>
          <EventListItem :event="event" :index="eventId"/>
  </div>
</div>
</div>
</div>
</OnboardingStyleWrapper>
</template>

<script>

import * as api from '@/utils/api.js'
import EventListItem from '@/components/EventListItem.vue'
import Nav from '@/components/onboarding/Nav.vue'
import OAuthCallback from '@/components/OAuthCallback.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'

export default {
  name: 'RsvpConfirmation',
  components: { EventListItem, Nav, OAuthCallback, ErrorMessage, OnboardingStyleWrapper },
  data () {
    return {
      eventId: this.$route.params.eventId,
      errorMesg: 'Please answer yes or no.',
      event: null,
      yesOrNo: '',
      showError: false
    }
  },
  mounted: function () {
    api.fetchEvents(this.$route.params.eventId).then(
      (res) => {
        this.event = res.find(event => event.id === this.eventId)
      })
  },
  methods: {
    nextStep: function () {
      if (this.yesOrNo === 'yes') {
        this.$router.push({ name: 'RsvpInfoCollection', params: { eventId: this.eventId } })
      } else if (this.yesOrNo === 'no') {
        this.$router.push({ name: 'Home' })
      } else {
        this.showError = true
      }
    },
    prevStep: function () {
      this.$router.go(-1)
    }
  },
  computed: {
    error: function () {
      if (this.yesOrNo === '') {
        return this.errorMesg
      } else {
        this.showError = false
        return false
      }
    },
    nextButtonState: function () {
      if (this.error) {
        return 'inactive'
      } else {
        return 'next'
      }
    }
  }
}
</script>
