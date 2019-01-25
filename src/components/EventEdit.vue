<template>
<div class="body" id="top-of-form">
  <MainNav />
  <div class="container w-container">
  <h1 class="heading-1">Editing event #{{ id }} </h1>
  <OnboardingStyleWrapper styleIs="editing" class="cards" v-if="event">
      <ErrorMessage v-if="showError && error" text="Your form has errors. Please fix them to continue..." />
      <EventActivity v-model="event.activityName" />
      <MaxChildren v-model="event.maximumChildren" />
      <Food v-model="event.food" />
      <HouseRules v-model="event.houseRules"/>
      <YesOrNo
      question="Do you have pets?"
      description="This is often very important for parents (and children) to know."
      v-model="event.hasPet"
      />      
      <PetsDescription v-model="event.petDescription" />
  </OnboardingStyleWrapper>
  <PageActionsFooter :buttonText="saveButtonText" @click="submitUserInformation"/>
  </div>
</div>

</template>

<script>

// todo: 
// make sure user auth'd to edit
// make forms for:
// 
/*        
					'name': this.eventName,
          'start_date': this.eventDate.selected,
          'starts_at': this.eventTime.start,
          'ends_at': this.eventTime.end,
          'activity_names': [this.eventActivity.selected],
          'maximum_children': this.maxChildren,
          'child_age_minimum': defaultChildAgeMinimum,
          'child_age_maximum': defaultChildAgeMaximum
          'foods': [this.food.selected],
          'house_rules': this.houseRules.text,
          'has_pet': this.hasPets.isTrue,          
          'pet_description': this.petsDescription.text,          
*/ 
import YesOrNo from '@/components/onboarding/YesOrNo.vue'
import MainNav from '@/components/MainNav.vue'
import PageActionsFooter from '@/components/PageActionsFooter.vue'
import ErrorMessage from '@/components/onboarding/ErrorMessage.vue'
import * as Token from '@/utils/tokens.js'
import * as api from '@/utils/api.js'
import EventActivity from '@/components/onboarding/EventActivity.vue'
import Food from '@/components/onboarding/Food.vue'
import HouseRules from '@/components/onboarding/HouseRules.vue'
import PetsDescription from '@/components/onboarding/PetsDescription.vue'
import EventTime from '@/components/onboarding/EventTime.vue'
import EventDate from '@/components/onboarding/EventDate.vue'
import MaxChildren from '@/components/onboarding/MaxChildren.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'
var VueScrollTo = require('vue-scrollto')

export default {
  name: 'ProfileEdit',
  components: { EventActivity, Food, HouseRules, PetsDescription, EventTime, EventDate, MaxChildren, MainNav, OnboardingStyleWrapper, PageActionsFooter, ErrorMessage, YesOrNo },
  data () {
    return {
      saveButtonText: 'Save',
      event: null
    }
  },
  mounted: function () {
      this.fetchEvent()
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
  	fetchEvent: function () {
      api.fetchEvents(this.$route.params.id).then(
        (res) => {
          this.event = res[0]
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

