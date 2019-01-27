<template>
<div class="body" id="top-of-form">
  <MainNav />
  <div class="container w-container">
  <h1 class="heading-1">Editing event #{{ eventId }} </h1>
  <OnboardingStyleWrapper styleIs="editing" class="cards" v-if="event">
      <ErrorMessage v-if="showError && error" text="Your form has errors. Please fix them to continue..." />
      <EventActivity v-model="event.activity" />

      <!-- <edit date & time> -->

      <Question title="When is your event?" subtitle="From...">
      	<DateTimePicker v-model="event.startsAt" showDate="true" />
      	<br>
      	To...
      	<br><br>
      	<DateTimePicker v-model="event.endsAt" showDate="true" />
      </Question>

      <!-- </edit date & time> -->

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
  <PageActionsFooter :buttonText="saveButtonText" @click="saveEvent"/>
  </div>
</div>

</template>

<script>
// todo: 
// make sure user auth'd to edit

/*        
					'name': this.eventName,
          'child_age_minimum': defaultChildAgeMinimum,
          'child_age_maximum': defaultChildAgeMaximum
*/ 
import YesOrNo from '@/components/onboarding/YesOrNo.vue'
import MainNav from '@/components/MainNav.vue'
import DateTimePicker from '@/components/DateTimePicker.vue'
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
import Question from '@/components/onboarding/Question.vue'

var VueScrollTo = require('vue-scrollto')

// todo: 
// resolve API issue
// use 'datetimepicker' component for start and end times. 
// fix warning about modifying 'value' in multiple choice component
// make error messages real
// add title
// add max / min ages
// ensure user is host if not throw error. 

export default {
  name: 'ProfileEdit',
  components: { EventActivity, Food, HouseRules, PetsDescription, EventTime, EventDate, MaxChildren, MainNav, OnboardingStyleWrapper, PageActionsFooter, ErrorMessage, YesOrNo, Question, DateTimePicker },
  data () {
    return {
    	eventId: this.$route.params.id,
      saveButtonText: 'Save',
      eventDataFromAPI: null,
      event: null, // the client-side data model for events
      showError: false
    }
  },
  mounted: function () {
      this.fetchEvent()
  },
  computed: {
    error: function () {
    	// add validation here
        return false
    },
    eventDataForSubmissionToAPI: function () {
      return {
        'event': {
          'name': this.event.name,
          'start_date': this.event.date.selected,
          'starts_at': this.event.time.start,
          'ends_at': this.event.time.end,
          'has_pet': this.event.hasPet.isTrue,
          'activity_names': [this.event.activity.selected],
          'foods': [this.event.food.selected],
          'house_rules': this.event.houseRules.text,
          'pet_description': this.event.petDescription.text,
          'maximum_children': this.event.maximumChildren,
          'child_age_minimum': this.event.childAgeMinimum,
          'child_age_maximum': this.event.childAgeMaximum
        }
      }
    }    
  },
  methods: {
  	fetchEvent: function () {
      api.fetchEvents(this.eventId).then(
        (res) => {
          this.eventDataFromAPI = res[0]
          this.event = this.parseEventDataFromAPI(this.eventDataFromAPI)
        })
    },
    parseEventDataFromAPI: function (dataFromAPI) {
    	let e = dataFromAPI;
    	return {
    		   name: e.name,
    		   date: {
    		     selected: 'Other',
    		     otherDate: e.startDate
    		   },
    		   startsAt: e.startsAt,
    		   endsAt: e.endsAt,
    		   hasPet: {
    		     isTrue: e.hasPet
    		   },
    		   activity: {
    		   	 selected: e.activityNames[0]
    		   	},
    		   food: {
    		   	selected: e.foods[0]
    		   },
    		   houseRules: {
    		   	text: e.houseRules
    		   },
    		   petDescription: {
    		   	text: e.petDescription
    		   },
    		   maximumChildren: e.maximumChildren,
    		   childAgeMaximum: e.childAgeMaximum,
    		   childAgeMinimum: e.childAgeMinimum
    	}
    },
    submitEventData: function () {
    	return this.axios.post(`${process.env.BASE_URL_API}/api/events/${this.eventId}`, this.eventDataForSubmissionToAPI)
    },
    saveEvent: function () {
      if (this.error) {
        this.showError = true
        VueScrollTo.scrollTo('#top-of-form')
      } else {
        this.saveButtonText = 'Saving...'
         this.submitEventData().then(res => {
          this.saveButtonText = ' \u2714 Saved'
          console.log('event update SUCCESS')
          console.log(res)
          return res
        }).catch(err => {
          console.log('Error saving', err)
          this.saveButtonText = 'Problem saving. Click to try again.'
        })
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

