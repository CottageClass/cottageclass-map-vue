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

    <Question
  title="Allergies & special requirements"
  subtitle="Do any of your children have allergies, dietary restrictions, or special needs that you would like to share with the host?">
    <ManyFormFieldGroups
    :labels="labels"
    :names="names"
    :placeholders="placeholders"
    :types="types"
    :headings="headings"
    v-model="children"
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

export default {
  name: 'ChildAllergiesAndSpecialRequirements',
  components: { ManyFormFieldGroups, Nav, OnboardingStyleWrapper, Question },
  data () {
    return {
      nextButtonState: 'next',
      labels: ['Allergies', 'Dietary Restrictions', 'Special Needs'],
      placeholders: ['(Leave blank if none)', '(Leave blank if none)', '(Leave blank if none)'],
      types: ['text', 'text', 'text'],
      names: ['allergies', 'dietaryRestrictions', 'specialNeeds'],
      showError: false,
      error: 'This is an error',
      children: [
        {
          name: 'Mary',
          age: '12'
        },
        {
          name: 'Alice',
          age: '7'
        },
        {
          name: 'Bob',
          age: '2'
        }
      ]
    }
  },
  computed: {
    headings: function () {
      return this.children.map(child => child.name + ', age ' + child.age)
    }
  },
  methods: {
    nextStep: function () {
      console.log('next step')
    },
    prevStep: function () {
      console.log('previous step')
    }
  }
}
</script>
