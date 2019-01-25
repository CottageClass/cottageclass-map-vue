<template>
<div class="body" id="top-of-form">
  <MainNav />
  <div class="container w-container">
  <h1 class="heading-1">Edit profile</h1>
  <OnboardingStyleWrapper styleIs="editing" class="cards" v-if="currentUser">
      <div v-if="showError && error" class="onb-error-container"><div class="onb-error-text">Your form has errors. Please fix them to continue...</div></div>
      <div v-if="showError && error" id="error" class="onb-error-container"><div class="onb-error-text">{{ phone.err}}</div></div>
    <Phone v-model="phone" :currentPhone="currentUser.phone" :required="false" />
      <div v-if="showError && error" id="error" class="onb-error-container"><div class="onb-error-text">{{ location.err }}</div></div>
    <Location :currentAddress="currentUser.fullAddress" :currentApartment="currentUser.apartment" v-model="location" :required="false" />
      <div v-if="showError && error" id="error" class="onb-error-container"><div class="onb-error-text">{{ availability.err }}</div></div>
    <Availability v-model="availability" :required="false"/>

    <!-- But children back in once I have it
      <div v-if="showError && error" id="error" class="onb-error-container"><div class="onb-error-text">{{ children.err }}</div></div>
    <Children v-model="children" :required="false" />
  -->
  </OnboardingStyleWrapper>
  <PageActionsFooter :buttonText="saveButtonText" />
  </div>
</div>

</template>

<script>
import Location from '@/components/onboarding/Location.vue'
import Phone from '@/components/onboarding/Phone.vue'
import Availability from '@/components/onboarding/Availability.vue'
import MainNav from '@/components/MainNav.vue'
import PageActionsFooter from '@/components/PageActionsFooter.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
var VueScrollTo = require('vue-scrollto')

export default {
  name: 'ProfileEdit',
  components: { Location, Phone, Availability, MainNav, OnboardingStyleWrapper, PageActionsFooter },
  data () {
    return {
      currentUser: null,
      currentUserId: null,
      isAuthenticated: null,
      location: {},
      phone: {},
      availability: {},
      showError: false,
      children: {},
      saveButtonText: 'Save'
    }
  },
  mounted: function () {
    if (this.$auth && this.$auth.isAuthenticated()) {
      this.isAuthenticated = true
      this.currentUserId = Token.currentUserId(this.$auth)
      this.fetchCurrentUser()
    }
  },
  computed: {
    error: function () {
      if (!!this.phone.err || !!this.availability.err || !!this.location.err || !!this.children.err) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    fetchCurrentUser: function () {
      this.currentUser = window.globalCurrentUser
      api.fetchCurrentUserNew(Token.currentUserId(this.$auth)).then(currentUser => {
        this.currentUser = currentUser
        this.children.list = this.currentUser.children
        this.availability = {
          availableAfternoons: this.currentUser.availableAfternoons,
          availableMornings: this.currentUser.availableMornings,
          availableEvenings: this.currentUser.availableEvenings,
          availableWeekends: this.currentUser.availableWeekends
        }
        window.globalCurrentUser = currentUser
      })
    },
    submitUserInformation: function () {
      if (!this.error) {
        this.saveButtonText = 'Saving...'
        api.submitUserInfo(this.currentUserId, this.phone, this.location, this.availability, this.children).then(res => {
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
