<template>
  <OnboardingStyleWrapper styleIs="onboarding">
    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">
          <Nav :button="nextButtonState" @next="nextStep" @prev="prevStep" />
          <ErrorMessage v-if="error && showError" :text="error" />
          <Question
            title="Emergency Contacts"
            subtitle="Please provide at least one emergency contact. If possible, include your children's primary care physician.">
            <ManyFormFieldGroups
              :labels="labels"
              :names="names"
              :placeholders="labels"
              :types="types"
              headingWord="Contact"
              v-model="contacts"
              addAndRemove="true"
            />
          </Question>
        </div>
      </div>
    </div>
  </OnboardingStyleWrapper>
</template>

<script>
import ManyFormFieldGroups from '@/components/onboarding/ManyFormFieldGroups.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import Question from '@/components/onboarding/Question.vue'
import Nav from '@/components/onboarding/Nav.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import * as api from '@/utils/api.js'
import { mapGetters } from 'vuex'

export default {
  name: 'EmergencyContacts',
  components: { ManyFormFieldGroups, Nav, OnboardingStyleWrapper, Question, ErrorMessage },
  data () {
    return {
      contacts: [],
      nextButtonState: 'next',
      labels: ['Full Name', 'Phone Number', 'Relationship to Child'],
      types: ['text', 'tel', 'text'],
      names: ['name', 'phoneNumber', 'relationship'],
      showError: false,
      error: 'To be safe, please provide your host with at least one emergency contact.',
      eventId: this.$route.params.eventId,
    }
  },
  computed: {
    children: function () {
      return this.currentUser.children
    },
    firstContactIsComplete: function () {
      return this.contacts[0].name && this.contacts[0].phoneNumber && this.contacts[0].relationship
    },
    ...mapGetters(['currentUser'])
  },
  methods: {
    nextStep: function () {
      if (this.firstContactIsComplete) {
        this.submitEmergencyContactsForChildren()
      } else {
        this.showError = true
      }
    },
    prevStep: function () {
      this.$router.push({
        name: 'EventPage',
        params: {
          id: this.eventId
        }
      })
    },
    submitEmergencyContactsForChildren: function () {
      this.children.forEach(child => api.submitEmergencyContacts(child.id, this.contacts))
      this.$router.push('/onboarding/child-special-requirements-1/' + this.eventId)
    }
  }
}
</script>
