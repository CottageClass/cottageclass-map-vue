<template>
  <OnboardingStyleWrapper styleIs="onboarding">
    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">
          <Nav :button="nextButtonState" @next="nextStep" @prev="prevStep" />
          <ErrorMessage v-if="error && showError" :text="error" />
          <Question
            title="Allergies & special requirements"
            subtitle="Please enter any allergies, dietary restrictions, or special needs that you would like to share with the host.">
            <ManyFormFieldGroups
              :labels="labels"
              :names="names"
              :placeholders="placeholders"
              :types="types"
              :headings="headings"
              v-model="childrenSpecialRequirements"
            />
          </Question>
        </div>
      </div>
    </div>
  </OnboardingStyleWrapper>
</template>

<script>
import ManyFormFieldGroups from '@/components/onboarding/ManyFormFieldGroups.vue'
import Question from '@/components/onboarding/Question.vue'
import Nav from '@/components/onboarding/Nav.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import { mapGetters } from 'vuex'
import * as api from '@/utils/api.js'

export default {
  name: 'ChildSpecialRequirements',
  components: { ManyFormFieldGroups, Nav, OnboardingStyleWrapper, Question },
  data () {
    return {
      labels: ['Allergies', 'Dietary Restrictions', 'Special Needs'],
      placeholders: ['(Leave blank if none)', '(Leave blank if none)', '(Leave blank if none)'],
      types: ['text', 'text', 'text'],
      names: ['allergies', 'dietaryRestrictions', 'specialNeeds'],
      showError: false,
      eventId: this.$route.params.eventId,
      error: 'This is an error',
      childrenSpecialRequirements: []
    }
  },
  computed: {
    headings: function () {
      return this.currentUser.children.map(child => child.firstName + ', age ' + child.age)
    },
    nextButtonState: function () {
      if (this.childrenSpecialRequirements.reduce((allChildrenSoFar, child) => allChildrenSoFar && (child.allergies.length > 0 || child.dietaryRestrictions.length > 0 || child.specialNeeds.length > 0), true)) {
        return 'next'
      } else {
        return 'skip'
      }
    },
    newChildren: function () {
      let component = this
      return this.childrenSpecialRequirements.map(function (newReqs, index) {
        let newReqsAsArrays = {
          allergies: [newReqs.allergies],
          dietaryRestrictions: [newReqs.dietaryRestrictions],
          specialNeeds: newReqs.specialNeeds
        }
        return {
          ...component.currentUser.children[index],
          ...newReqsAsArrays // because they are stored as arrays
        }
      })
    },
    ...mapGetters(['currentUser'])
  },
  methods: {
    nextStep: function () {
      this.submitChildSpecialRequirements()
      this.$router.push({
        name: 'RsvpInfoCollection',
        params: {
          eventId: this.eventId
        },
        query: {
          emergencyInfoComplete: 'true'
        }
      })
    },
    prevStep: function () {
      this.$router.go(-1)
    },
    submitChildSpecialRequirements: function () {
      console.log('submitting child requirements', this.newChildren)
      api.submitUserInfo(this.currentUser.id, undefined, undefined, undefined, { list: this.newChildren })
    }
  }
}
</script>
