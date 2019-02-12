<template>
<div class="body" id="top-of-form">
  <MainNav />
  <div class="container w-container">
  <h1 class="heading-1">Edit profile</h1>
  <OnboardingStyleWrapper styleIs="editing" class="cards" v-if="currentUser">
      <ErrorMessage v-if="showError && error" text="Your form has errors. Please fix them to continue..." />
      <ErrorMessage v-if="showError && error" :text="phone.err" />
    <Phone v-model="phone" :currentPhone="currentUser.phone" :required="false" />
      <ErrorMessage v-if="showError && error" :text="location.err" />
    <Location :currentAddress="currentUser.fullAddress" :currentApartment="currentUser.apartment" v-model="location" :required="false" />
    <ErrorMessage v-if="showError && error" :text="availability.err" />
    <Question
      title="What do you do for a living?"
      subtitle="Tell other families a bit about what you do for work.">
      <FormFieldAndLabel
        placeholder="Your employer"
        label="Where do you work?"
        v-model="currentUser.employer"
        />
      <FormFieldAndLabel
        placeholder="Your title or role"
        label="What do you do?"
        v-model="currentUser.jobPosition"
        />
    </Question>
    <Question
      title="Tell us a bit about yourself"
      subtitle="Other members would love to know a bit more about you and your family.">
      <FormWithTextArea
        v-model="currentUser.profileBlurb"
        placeholder="Your illustrious biography"
        />
    </Question>
    <Availability v-model="availability" :required="false"/>
    <ErrorMessage v-if="showError && error" :text=" children.err" />
    <Children v-model="children" :required="false" />
  </OnboardingStyleWrapper>
  <PageActionsFooter :buttonText="saveButtonText" @click="submitUserInformation"/>
  </div>
</div>

</template>

<script>
import Location from '@/components/onboarding/Location.vue'
import FormFieldAndLabel from '@/components/onboarding/FormFieldAndLabel.vue'
import Children from '@/components/onboarding/Children.vue'
import Question from '@/components/onboarding/Question.vue'
import Phone from '@/components/onboarding/Phone.vue'
import Availability from '@/components/onboarding/Availability.vue'
import MainNav from '@/components/MainNav.vue'
import PageActionsFooter from '@/components/PageActionsFooter.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import FormWithTextArea from '@/components/onboarding/FormWithTextArea.vue'
import * as api from '@/utils/api.js'
import { mapGetters } from 'vuex'

var VueScrollTo = require('vue-scrollto')

export default {
  name: 'ProfileEdit',
  components: { Location, Phone, Availability, MainNav, OnboardingStyleWrapper, PageActionsFooter, ErrorMessage, Children, Question, FormFieldAndLabel, FormWithTextArea },
  data () {
    return {
      location: {},
      phone: {},
      availability: {},
      showError: false,
      saveButtonText: 'Save'
    }
  },
  mounted: function () {
    this.availability = {
      availableAfternoons: this.currentUser.availableAfternoons,
      availableMornings: this.currentUser.availableMornings,
      availableEvenings: this.currentUser.availableEvenings,
      availableWeekends: this.currentUser.availableWeekends
    }
  },
  computed: {
    children: function () { return { 'list': this.currentUser.children } },
    error: function () {
      if (!!this.phone.err || !!this.availability.err || !!this.location.err || !!this.children.err) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters(['currentUser'])
  },
  methods: {
    submitUserInformation: function () {
      if (!this.error) {
        this.saveButtonText = 'Saving...'
        api.submitUserInfo(this.currentUser.id, this.phone, this.location, this.availability, this.children, this.currentUser).then(res => {
          this.saveButtonText = ' \u2714 Saved'
          console.log('user update SUCCESS')
          console.log(res)
          return res
        }).catch(err => {
          console.log('Error saving', err)
          this.saveButtonText = 'Problem saving. Click to try again.'
        })
      } else {
        this.showError = true
        VueScrollTo.scrollTo('#top-of-form')
      }
    }
  }
}
</script>

<style scoped>

.body {
  font-family: soleil;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  background-color: #f5f5f5;
}

.heading-1 {
  margin-bottom: 32px;
}

.container {
  padding: 32px 32px 100px;
}

@media (max-width: 991px) {
  .body {
    padding-bottom: 77px;
  }

  .container {
    padding-bottom: 32px;
  }
}

@media (max-width: 767px) {
  .body {
    padding-bottom: 50px;
  }

  .heading-1 {
    margin-right: 24px;
    margin-left: 24px;
  }

  .container {
    padding-top: 16px;
    padding-right: 0px;
    padding-left: 0px;
  }
}

@media (max-width: 479px) {
  .heading-1 {
    font-size: 34px;
    line-height: 44px;
  }
}

</style>
