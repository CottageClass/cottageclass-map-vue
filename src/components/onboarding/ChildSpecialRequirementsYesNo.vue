<template>
  <OnboardingStyleWrapper styleIs="onboarding">
    <!-- wrapper for desktop screens -->
    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">
          <Nav :button="nextButtonState" @next="nextStep" @prev="prevStep" />
          <ErrorMessage v-if="error && showError" :text="error" />
          <YesOrNo
          v-model="childHasSpecialNeeds"
          question="Allergies and Special Requirements"
          description="Do any of your children have allergies, dietary restrictions, or special needs that you would like to share with the host?" />
        </div>
      </div>
    </div>
  </OnboardingStyleWrapper>
</template>

<script>
import YesOrNo from '@/components/onboarding/YesOrNo.vue'
import Nav from '@/components/onboarding/Nav.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'

export default {
  name: 'ChildSpecialNeedsYesNo',
  components: { YesOrNo, OnboardingStyleWrapper, ErrorMessage, Nav },
  data () {
    return {
      childHasSpecialNeeds: {},
      showError: false,
      eventId: this.$router.params.eventId || ''
    }
  },
  methods: {
    nextStep: function () {
      if (this.childHasSpecialNeeds.err) {
        this.showError = true
      } else if (this.childHasSpecialNeeds.isTrue) {
        this.$router.push('/onboarding/child-special-requirements-2/' + this.eventIdOrNothing)
      } else {
        this.$router.push('/rsvp/' + this.eventId)
      }
    },
    prevStep: function () {
      console.log('previous step')
    }
  },
  computed: {
    error: function () {
      return this.childHasSpecialNeeds.err
    },
    nextButtonState: function () {
      return this.childHasSpecialNeeds.isTrue === null ? 'inactive' : 'next'
    }
  }
}
</script>
