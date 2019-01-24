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

    <!--
      <div v-if="showError && error" id="error" class="onb-error-container"><div class="onb-error-text">{{ children.err }}</div></div>      
	  <Children v-model="children" :required="false" />
  -->
  </OnboardingStyleWrapper>
     <div class="page-actions-wrapper">
     	<a @click="submitUserInformation" class="button-primary w-button">{{ saveButtonText }}</a></div>	
  </div>	
</div>

</template>

<script>
import Location from '@/components/onboarding/Location.vue'
import Phone from '@/components/onboarding/Phone.vue'
import Children from '@/components/onboarding/Children.vue'
import Availability from '@/components/onboarding/Availability.vue'
import MainNav from '@/components/MainNav.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
var VueScrollTo = require('vue-scrollto');


export default {
	name: 'ProfileEdit',
	components: { Location, Phone, Children, Availability, MainNav, OnboardingStyleWrapper },
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
  	},
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
        availableWeekends: this.currentUser.availableWeekends,
        }
        window.globalCurrentUser = currentUser
        })
    },
    submitUserInformation: function () {
      if (!this.error) {
       this.saveButtonText = 'Saving...' 
    	 api.submitUserInfo(this.currentUserId, this.phone, this.location, this.availability, this.children).then(res => {
          this.saveButtonText = ' \u2714 Saved'
          console.log("user update SUCCESS")
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
};
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


.button-primary {
  margin-right: 4px;
  padding: 12px 32px;
  -webkit-align-self: auto;
  -ms-flex-item-align: auto;
  -ms-grid-row-align: auto;
  align-self: auto;
  border-style: solid;
  border-width: 1px;
  border-color: hsla(208.8118811881188, 82.11%, 51.76%, 1.00);
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
}

.button-primary:hover {
  border-color: #1b7bd1;
  background-color: #1b7bd1;
  text-decoration: none;
}

.page-actions-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

@media (max-width: 991px) {

  .button-primary {
    height: auto;
  }

  .button-primary:hover {
    border-color: #1f88e9;
    background-color: #1f88e9;
  }

  .button-primary:active {
    background-color: #1b7bd1;
  }

  .page-actions-wrapper {
    position: fixed;
    left: 0%;
    top: auto;
    right: 0%;
    bottom: 0%;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, .08);
  }
}

@media (max-width: 767px) {


  .button-primary {
    display: block;
    padding-top: 6px;
    padding-bottom: 7px;
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    -ms-grid-row-align: center;
    align-self: center;
    -webkit-box-flex: 0;
    -webkit-flex: 0 auto;
    -ms-flex: 0 auto;
    flex: 0 auto;
  }

  .page-actions-wrapper {
    width: auto;
    min-width: 0px;
    padding-top: 8px;
    padding-bottom: 8px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

@media (max-width: 479px) {
  .button-primary {
    width: 100%;
  }
}

</style>