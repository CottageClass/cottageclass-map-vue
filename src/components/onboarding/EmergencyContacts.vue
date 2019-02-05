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
  title="Emergency Contacts"
  subtitle="Please enter emergency contacts for your children. If possible, include their primary care physician.">
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
import Question from '@/components/onboarding/Question.vue'
import Nav from '@/components/onboarding/Nav.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import * as api from '@/utils/api.js'
import { mapGetters } from 'vuex'

export default {
  name: 'EmergencyContacts',
  components: { ManyFormFieldGroups, Nav, OnboardingStyleWrapper, Question },
  data () {
    return {
      contacts: [],
      nextButtonState: 'next',
      labels: ['Full Name', 'Phone Number', 'Relationship to Child'],
      types: ['text', 'tel', 'text'],
      names: ['name', 'phoneNumber', 'relationship'],
      showError: false,
      error: 'This is an error',
      eventId: this.$route.params.eventId,
    }
  },
  computed: {
    children: function () {
      return this.currentUser.children
    },
    newChildren: function () {
      return this.children.map(child => {
        let newChild = child
        newChild.emergencyContacts = this.contacts
        return newChild
      })
    },
    newCurrentUser: function () {
      let newUser = this.currentUser
      newUser.children = this.newChildren
      return newUser
    },
    ...mapGetters(['currentUser'])
  },
  methods: {
    nextStep: function () {
      console.log('next step')
      this.submitEmergencyContactsForChildren()
    },
    prevStep: function () {
      console.log('previous step')
    },
    submitEmergencyContactsForChildren: function () {
      // for some reason this isn't necessary. possibly because some two way binding is happening with each child
      // this.store.commit('setCurrentUser', this.newCurrentUser)
      this.children.forEach(child => api.submitEmergencyContacts(child.id, this.contacts))
      this.$router.push('/rsvp/' + this.eventId)
    }
  }
}
</script>
