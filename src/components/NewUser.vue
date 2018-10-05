<template>
<span>
<!-- Login splash -->
<div id="body onb-body-splash" v-if="step === 0">

  <div class="div-block-6"><img src="../assets/cc-splash-logo.svg" width="150" alt=""></div>
  <div class="onb-splash-title-container">
    <h1 class="onb-heading-large-black">Why parent alone?</h1>
    <p class="onb-paragraph-subheading-2-black">Sign in to build the free, flexible, childcare network of your dreams, by connecting with friends and parents in your community.</p>
  </div>
  <div class="embed-facebook-button">
    <div class="w-embed">
      <div @click="nextStep" class="fb-login-button button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false">Continue with Facebook</div>
    </div>
  </div>
</div>

<!-- Accept TOS -->

<div class="onb-body" v-if="step === 1">
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>
  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="agreedToTos">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-if="!agreedToTos">
      <a @click="throwError('To continue, you must agree to our terms of service by checking the box below')" class="onb-title-bar-next-button-inactive w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Terms</h1>
      <p class="onb-paragraph-subheading-2">Please check the box at the bottom to agree to our terms before continuing</p>
    </div>
    <div class="onb-paragraph-align-left">Terms of service<br>Last updated: June 6, 2018<br>If you reside in the United States, please note that section 13 of these terms of service contains an arbitration clause and class action waiver. It affects how disputes with CottageClass are resolved. By accepting these terms of service, you agree to be bound by this arbitration provision. Please read it carefully.Please read these terms of service carefully as they contain important information regarding your legal rights, remedies and obligations. These include various limitations and exclusions, a clause that governs the jurisdiction and venue of disputes, and obligations to comply with applicable laws and regulations.In particular... (ADD LATEST TERMS OF SERVICE HERE)</div>
    <div class="onb-fixed-bottom-actions-checkbox-container">
      <div class="form-block-2 w-form">
        <form id="email-form" name="email-form" data-name="Email Form">
          <div class="checkbox-field w-checkbox"><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" @click="clearError" v-model="agreedToTos" class="w-checkbox-input"><label for="checkbox" class="checkbox-label w-form-label">I agree to the terms</label></div>
        </form>
      </div>
    </div>
  </div>
</div>

<!-- Enter name -->


<div class="onb-body" v-if="step === 2">
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>
  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="(firstName && lastName)">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
      <a @click="throwError('Please enter a first and last name.')" class="onb-title-bar-next-button-inactive w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your name?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
          <input v-model="firstName" type="text" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="First name" id="name">
          <input v-model="lastName" type="text" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="Last name" id="name">
        </form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">We'll only display your first name and initial to others.</p>
  </div>
</div>

<!-- Enter location -->

<div class="onb-body" v-if="step === 3">
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>
  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="addressEntered">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
      <a @click="throwError('Please enter your address to continue.')" class="onb-title-bar-next-button-inactive w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Where do you live?</h1>
      <p class="onb-paragraph-subheading-2">Please enter your address so we can find families near you.</p>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">

        <vue-google-autocomplete
            ref="address"
            id="map"
            classname="email-form-2 w-form location-text-field w-input"
            placeholder="e.g. 10 Main St."
            v-on:placechanged="getAddressData"
            country="us"
        >
        </vue-google-autocomplete>

      </div>
    </div>
    <p class="onb-paragraph-small-50">Only those you invite to your home will see this.</p>
  </div>
</div>

<!-- Enter phone --> 

<div class="onb-body" v-if="step === 4">
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>
  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="phoneValidates">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
      <a @click="throwError('Please enter a valid US phone number to continue.')" class="onb-title-bar-next-button-inactive w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your phone number?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2"><input v-model="phone" type="tel" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="e.g. 1-212-555-1212" id="name"></form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Other families will text you to request or offer care. (We may also send you text messages about special CottageClass  CareShare events or news. Message &amp; data rates apply.)</p>
  </div>
</div>

<!-- Enter child info --> 

<div class="onb-body-full-height" v-if="step === 5">
     <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>

<!--  For testing
   <div class="onb-error-container">
    <div class="onb-error-text">{{ children }}</div>
  </div>
-->

  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>

  <span v-if="noChildren">
     <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">SKIP</div>
    </a>
  </span>

  <span v-else-if="childrenValidates">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
    <a @click="throwError('Please enter a first name and birthdate for each child.')" class="onb-title-bar-next-button-inactive">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  </div>

  <div class="onb-content-container-2">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Child Info</h1>
      <p class="onb-paragraph-subheading-2">Have kids? Please enter their first names (or nicknames) and birthdays.</p>
    </div>
  </div>
  <div class="onb-child-info-container">
    <div class="form-block-3 w-form">
      <form id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-2">
        <div v-for="(child, index) in children" class="onb-child-group-2">
          <div class="onb-group-header" key="index">
            <h2 class="onb-child-group-heading">Child {{ index + 1}}</h2>
            <a @click="removeChild(index)" class="onb-button-delete-child w-inline-block"><img src="../assets/remove.svg" width="24" height="24" alt="" class="image-6"></a>
          </div><label for="birthday-2" class="onb-field-label">Name</label><input type="text" class="name-text-field w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="First Name" id="name-2" v-model="children[index].name"><label for="birthday-3" class="onb-field-label">Birthday</label><input type="date" min="1980-01-01" class="basic-text-field w-input" maxlength="256" name="birthday-2" data-name="Birthday 2" placeholder="MM / DD / YYYY" id="birthday-2" v-model="children[index].birthday"></div>
      </form><a @click="addChild" class="onb-button-add-group w-inline-block"><img src="../assets/add.svg" alt="" class="image-7"><div class="onb-button-add-group-text">Add Another child</div></a>
    </div>
  </div>
</div>

<!-- Choose availability -->

<div class="onb-body-full-height" v-if="step === 6">
  
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>

  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="availability.weekends || availability.mornings || availability.afternoons || availability.evenings">
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
      <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">SKIP</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Availability</h1>
      <p class="onb-paragraph-subheading-2">When are you generally available to offer care or educational activities to other families? Select all that apply.</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form id="email-form" name="email-form" data-name="Email Form" class="onb-form-checkbox-list">
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.mornings}"><input v-model="availability.mornings" type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="onb-checkbox w-checkbox-input" :class="{ 'active-checkbox': availability.mornings }"><label for="checkbox" class="onb-checkbox-label w-form-label">7-3</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.afternoons}"><input v-model="availability.afternoons" type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="onb-checkbox w-checkbox-input"><label for="checkbox-5" class="onb-checkbox-label w-form-label">3-7</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.evenings}"><input v-model="availability.evenings" type="checkbox" id="checkbox-4" name="checkbox-4" data-name="Checkbox 4" class="onb-checkbox w-checkbox-input"><label for="checkbox-4" class="onb-checkbox-label w-form-label">After 7</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.weekends}"><input v-model="availability.weekends" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" class="onb-checkbox w-checkbox-input"><label for="checkbox-3" class="onb-checkbox-label w-form-label">Weekends</label></div>
      </form>
    </div>
    <p class="onb-paragraph-small-50">You&#x27;ll be able to accept or decline any requests. Most families list days and times that they are generally at home with their own children or are doing a fun or educational activity which they&#x27;d like to include other children in.</p>
  </div>
</div>

<!-- Choose activities --> 

<div class="onb-body-full-height" v-if="step === 7">
  
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>

  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span v-if="availability.weekends || availability.mornings || availability.afternoons || availability.evenings">
    <a @click="nextStep();submitData();" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>

  <span v-else>
      <a @click="nextStep();submitData();" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">SKIP</div>
    </a>
  </span>
  </div>

  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Activities</h1>
      <p class="onb-paragraph-subheading-2">What are the activities kids especially love doing with you?</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.playingOutside}"><input v-model="activities.playingOutside" type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="onb-checkbox w-checkbox-input"><label for="checkbox" class="onb-checkbox-label w-form-label">Playing outside</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.artsAndCrafts}"><input v-model="activities.artsAndCrafts" type="checkbox" id="checkbox-1" name="checkbox-1" data-name="Checkbox 1" class="onb-checkbox w-checkbox-input"><label for="checkbox-1" class="onb-checkbox-label w-form-label">Arts &amp; crafts</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.fieldTrips}"><input v-model="activities.fieldTrips" type="checkbox" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" class="onb-checkbox w-checkbox-input"><label for="checkbox-2" class="onb-checkbox-label w-form-label">Field trips</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.cooking}"><input v-model="activities.cooking" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" class="onb-checkbox w-checkbox-input"><label for="checkbox-3" class="onb-checkbox-label w-form-label">Cooking</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.homeworkHelp}"><input v-model="activities.homeworkHelp" type="checkbox" id="checkbox-4" name="checkbox-4" data-name="Checkbox 4" class="onb-checkbox w-checkbox-input"><label for="checkbox-4" class="onb-checkbox-label w-form-label">Homework help</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.bilingualImmersion}"><input v-model="activities.bilingualImmersion" type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="onb-checkbox w-checkbox-input"><label for="checkbox-5" class="onb-checkbox-label w-form-label">Bilingual immersion</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.music}"><input v-model="activities.music" type="checkbox" id="checkbox-6" name="checkbox-6" data-name="Checkbox 6" class="onb-checkbox w-checkbox-input"><label for="checkbox-6" class="onb-checkbox-label w-form-label">Music</label></div>
      </form>
    </div>
    <p class="onb-paragraph-small-50"></p>
  </div>
</div>

<!-- Final screen --> 


<div class="onb-body" v-if="step === 8">
    <div v-if="error" class="onb-error-container">
    <div class="onb-error-text">{{ error }}</div>
  </div>
  <div class="onb-title-bar">
    <a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
  </div>

  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Thanks for signing up!</h1>
      <p class="onb-paragraph-subheading-2">Once there are enough people to start a CareShare group in your area, we'll text you a link to join! Would you like to invite some friends to join now?</p>
    </div>
      <a href="#" class="splash-button w-inline-block button-text">
      SHARE ON FACEBOOK</a>
  </div>
</div>


<!--  

<div class="onb-body-full-height" v-if="step === 8">
  <div class="onb-arrow-animation-container"><img src="../assets/Comp_2.gif" height="60" alt=""></div>

  <div class="onb-title-bar"><a @click="prevStep" class="onb-title-bar-back-button w-inline-block"></a>
    <span>
    <a @click="nextStep" class="onb-title-bar-next-button w-inline-block">
      <div class="onb-title-bar-next-button-text">NEXT</div>
    </a>
  </span>
  </div>


  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Add the App</h1>
      <p class="onb-paragraph-subheading-2">Add CottageClass to your home screen</p>
    </div>

    <div class="onb-step-container">
      <div class="onb-number-circle">
        <div class="text-block-7">1</div>
      </div>
      <div class="onb-step-text">Tap the action icon at the bottom</div>
    </div>

    <div class="onb-step-container">
      <div class="onb-number-circle">
        <div class="text-block-7">2</div>
      </div>
      <div class="onb-step-text">Then tap &#x27;Add to Home Screen&#x27;</div>
    </div>

  </div>
</div>

-->

</span>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
// import google sheets API service
import sheetsu from 'sheetsu-node';

// create a config file to identify which spreadsheet we push to.
var client = sheetsu({ address: 'https://sheetsu.com/apis/v1.0su/e383acab3f80' })

export default {
  components: { VueGoogleAutocomplete },
    data () {
    return {
      step: 0,
      firstName: null,
      lastName: null,
      agreedToTos: false,
      addressEntered: false,
      address: '', // get real location from google maps
      latLng: {},
      phone: null,
      children: [{name: null, birthday: null}],
      availability: {
        mornings: false,
        afternoons: false,
        evenings: false,
        weekends: false
      },
      activities: {
        playingOutside: false,
        artsAndCrafts: false,
        fieldTrips: false,
        cooking: false,
        homeworkHelp: false,
        bilingualImmersion: false,
        bookClub: false
      },
      error: false
    }
  },
  name: 'NewUser',
  methods: {
    submitData: function () {
            client.create({
              "address": this.address,

              "phone": this.phone,
              "children": this.children,
              "availability": this.availability,
              "activities": this.activities,
              "testArray": ["basketball", "soccer", "football"],
            }).then((data) => {
              console.log(data)
            }, (err) => {
              console.log(err)
              });
    },
                /**
            * When the location found
            * @param {Object} addressData Data of the found location
            * @param {Object} placeResultData PlaceResult object
            * @param {String} id Input container ID
            */
            getAddressData: function (addressData, placeResultData, id) {
              this.address = addressData
              this.addressEntered = true
            },
    nextStep: function () {
      this.step = this.step + 1
      this.clearError()
      window.scrollTo(0,0)
    },
    prevStep: function () {
      this.step = this.step - 1
      this.clearError()
    },
    throwError: function (msg) {
      this.error = msg
    },
    clearError: function () {
      this.error = false
    },
    addChild: function () {
      this.children.push({name: null, birthday: null})
    },
    removeChild: function (index) {
      this.children.splice(index, 1);
    }
  },
  computed: {
    noChildren: function() {
      return (this.children.length === 0 || (this.children[0].name === null && this.children[0].birthday === null))
    },
    childrenValidates: function () {
      // child has name and birthday
      let childValidates = function (child) {
        return child.birthday && child.name
      }
      if (this.noChildren ||
        // validate that each child has name, birthday
        (this.children.reduce((soFar, child) => soFar && childValidates(child), true))) {
        this.clearError()
        return true
      } else {        
        return false
    }
  },
    phoneValidates: function () {
      if (this.phone) { 
      var number = this.phone.replace(/[^\d]/g, '')
      if ((number[0] != '1' && number.length === 10) || (number[0] == '1') && number.length === 11) {
        return true 
      } else {
        return false
      }
    } return false
    }
  }
};

</script>



























<!-- this is a giant jumble of all app styles. Would be great to separate it out --> 

<style scoped>

/* child birthdate selector */
::-webkit-datetime-edit-text { color: rgba(0, 0, 0, .3); padding: 0 0.3em; }
::-webkit-datetime-edit-month-field { color: rgba(0, 0, 0, .3); text-transform: uppercase; }
::-webkit-datetime-edit-day-field { color: rgba(0, 0, 0, .3); text-transform: uppercase;}
::-webkit-datetime-edit-year-field { color: rgba(0, 0, 0, .3); text-transform: uppercase;}
::-webkit-inner-spin-button { display: none; }
::-webkit-calendar-picker-indicator { color: rgba(0, 0, 0, .3); }

/* background color state on checkbox list items */

.active-checkbox {
   background-color: #fff !important;
 }

textarea, input[type="text"] {
-webkit-appearance: none;
}

html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.scrolling-wrapper {
  overflow-x: auto;
}

.card {
    flex: 0 0 auto;
 }

.scrolling-wrapper {
  -webkit-overflow-scrolling: touch;
}

.scrolling-wrapper {
  &::-webkit-scrollbar {
    display: none;
  }
}

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

a {
  text-decoration: none;
}

.list-container {
  margin-top: 16px;
}

.list-item-1-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 4px;
  padding: 24px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, .1);
  border-radius: 4px;
  background-color: #fff;
}

.image {
  width: 40px;
  height: 40px;
  border-radius: 100px;
}

.list-item-content-left {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-right: 16px;
  margin-left: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.heading {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 4px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 16px;
  text-align: center;
}

.black-50 {
  color: rgba(0, 0, 0, .5);
}

.invite-friends-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 24px 16px;
  padding: 40px 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
}

.button {
  border-radius: 4px;
  background-color: blue;
  color: white;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.spacer-16 {
  width: 16px;
  height: 16px;
}

.friend-indicator {
  position: absolute;
  left: 13px;
  z-index: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 24px;
  height: 24px;
  clear: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: #0cba52;
}

.map-container {
  position: relative;
}

.calendar-button-2 {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 56px;
  height: 56px;
  clear: none;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: #1c8fe5;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

.avatar-on-map {
  position: absolute;
  left: 102px;
  top: 96px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border: 4px solid #1f88e9;
  border-radius: 100px;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, .2);
}

.avatar-on-map-2 {
  position: absolute;
  left: 217px;
  top: 153px;
  z-index: 3;
  width: 32px;
  height: 32px;
  border: 4px solid #1f88e9;
  border-radius: 100px;
  box-shadow: 0 9px 10px 0 rgba(0, 0, 0, .2);
}

.list-info-1 {
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  text-align: left;
}

.home-on-map {
  position: absolute;
  left: 158px;
  top: 131px;
  z-index: 3;
  box-shadow: none;
}

.body {
  background-color: #f2f2f2;
}

.map {
  height: 250px;
}

.div-block {
  height: 100px;
}

.group-title-container {
  margin-top: 0px;
  padding-top: 40px;
  padding-bottom: 10px;
  background-color: #f2f2f2;
}

.list-title {
  margin-top: 0px;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.onboarding-title-bar-next-button {
  padding: 3px 8px;
  border: 1px none #c5c5c5;
  background-color: #fff;
  box-shadow: none;
  color: #1f88e9;
  font-size: 14px;
  line-height: 23px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.button-text {
  padding-left: 0px;
  color: #1f88e9;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.button-send-message {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .15);
}

.button-send-message-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 38px;
  min-width: 38px;
  padding: 6px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-radius: 4px;
  background-color: rgba(31, 136, 233, .15);
}

.div-block-3 {
  margin-top: 9px;
  padding: 11px 16px;
  border-style: none;
  border-color: #000;
  border-radius: 16px;
  background-color: #ddeefb;
}

.text-block-3 {
  font-size: 12px;
  line-height: 15px;
}

.modal-wrapper {
  position: static;
  z-index: 9999;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 300px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background-color: #fff;
}

.title-bar-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.list-item-1-button {
  margin-left: 6px;
  border-radius: 4px;
  color: #1f88e9;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.heading-3 {
  text-align: left;
}

.title-bar-action-2 {
  width: 24px;
  height: 24px;
}

.title-bar-action-l {
  width: 24px;
  height: 24px;
}

.form-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 32px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.form-block {
  display: block;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.form {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.select-field {
  border: 1px solid #e4e4e4;
  border-radius: 0px;
  background-image: -webkit-linear-gradient(270deg, #fff, #fff);
  background-image: linear-gradient(180deg, #fff, #fff);
}

.page-lead-text {
  margin-top: 0px;
  margin-bottom: 8px;
  text-align: center;
}

.avatar-and-cta-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.text-span {
  font-weight: 700;
}

.small-text-black-40 {
  margin-top: 7px;
  color: rgba(0, 0, 0, .4);
  font-size: 11px;
}

.availability-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 60px;
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  text-align: left;
}

.heading-2-strong {
  margin-top: 0px;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.link-block {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  color: #1f88e9;
  font-weight: 700;
}

.time-block {
  color: #2b8eea;
  font-size: 16px;
}

.image-3 {
  padding-left: 9px;
}

.list-item-container-2 {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 8px;
  padding-bottom: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-style: none none solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.title-bar-and-action {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 12px 16px 6px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.list-item-content-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 0px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  text-align: left;
}

.tags-container {
  display: block;
  width: 100%;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.tag {
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px 6px;
  clear: none;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, .1);
}

.small-text-upper-black-40 {
  margin-top: 1px;
  color: rgba(0, 0, 0, .4);
  font-size: 10px;
  line-height: 9px;
  font-weight: 700;
  letter-spacing: 1.03px;
  text-transform: uppercase;
}

.times-container {
  width: 100%;
}

.time {
  display: inline-block;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 4px 6px;
  clear: none;
  border-radius: 2px;
  background-color: rgba(100, 66, 107, .2);
}

.small-text-upper-purple {
  color: #64426b;
  font-size: 9px;
  line-height: 9px;
  font-weight: 700;
  letter-spacing: 1.03px;
  text-transform: none;
}

.kids-container {
  width: 100%;
  padding-top: 8px;
  padding-right: 16px;
  padding-left: 16px;
}

.image-tag {
  margin-top: 1px;
  margin-right: 6px;
}

.image-time {
  margin-top: 2px;
  margin-right: 6px;
}

.tag-group-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 6px;
  margin-bottom: 8px;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.time-group-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.name-and-caption {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.caption {
  margin-top: 0px;
  margin-bottom: 0px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.scrolling-wrapper {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
}

.card {
  width: 202px;
  height: 111px;
  margin-right: 4px;
  background-color: #fff;
}

.list-item-3-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none none solid;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.top-content-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.list-item-3-title-bar {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.list-item-3-heading {
  margin-left: 12px;
}

.list-item-3-child-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding-left: 16px;
}

.list-item-3-actions {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.list-item-3-link-block {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 48%;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #aff0fc;
}

.splash-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .6);
}

.footer {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100px;
  padding-top: 64px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #f2f2f2;
}

.copyright-text {
  margin-bottom: 8px;
  color: rgba(0, 0, 0, .3);
  font-size: 9px;
  letter-spacing: 0.3px;
}

.footer-link {
  margin-right: 4px;
  margin-left: 4px;
  color: rgba(0, 0, 0, .5);
  font-size: 10px;
  font-weight: 700;
  text-decoration: underline;
}

.footer-links-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 40px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.note-container {
  display: block;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 16px;
  background-color: #fff;
  color: red;
}

.note {
  padding: 16px;
  border-style: solid;
  border-width: 4px;
  border-color: rgba(191, 43, 252, .09);
  background-color: #f6e7ff;
  color: #c200ff;
  font-size: 11px;
  line-height: 15px;
}

.components-container-1 {
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 48px 32px 64px;
  border: 1px none #f3f3f3;
  background-color: #d8d8d8;
}

.components-h3 {
  margin-top: 0px;
  margin-bottom: 48px;
  color: #000;
  font-size: 30px;
  text-align: center;
}

.components-sub-heading {
  margin-top: 56px;
  margin-bottom: 16px;
  color: #00a3ff;
  font-size: 11px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.spacer-300px {
  height: 300px;
}

.emergency-contact-parent-summary {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 24px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.ec-parent-avatar {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.ec-parent-summary-phone {
  margin-bottom: 4px;
}

.ec-parent-summary-action-button-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 150px;
  margin-top: 16px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.ec-parent-summary-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #deedfc;
}

.ec-parent-summary-button-text {
  color: #1f88e9;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.ec-parent-summary-button-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #daf2e4;
}

.ec-parent-summary-button-text-2 {
  color: #2aba5c;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.list-title-2 {
  margin-top: 0px;
  margin-bottom: 0px;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  text-align: left;
}

.group-title-container-2 {
  margin-top: 0px;
  padding-top: 40px;
  padding-bottom: 16px;
  padding-left: 16px;
  background-color: #f2f2f2;
}

.list-item-4-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 16px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background-color: #fff;
}

.phone-text {
  color: #0cba52;
}

.caption-2 {
  margin-top: 0px;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.list-item-4-action-right {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding-top: 4px;
  padding-bottom: 4px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .15);
}

.label-description-block {
  margin-top: 16px;
}

.text-block-5 {
  font-weight: 400;
}

.text-block-6 {
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
}

.list-item-5 {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 8px;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  background-color: #fff;
}

.body-splash {
  background-color: #1f88e9;
}

.splash-h1 {
  margin-top: 48px;
  color: #fff;
  font-size: 25px;
  text-align: center;
}

.splash-text-50 {
  color: hsla(0, 0%, 100%, .5);
  text-align: center;
}

.div-block-4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 85vh;
  margin-top: 24px;
  padding-right: 32px;
  padding-bottom: 32px;
  padding-left: 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.splash-logo {
  margin-bottom: 16px;
}

.splash-text-input {
  width: 220px;
  height: 80px;
  padding-top: 6px;
  padding-bottom: 10px;
  border: 3px none #dbdbdb;
  border-radius: 4px;
  color: #000;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 2px;
}

.splash-text-input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .1);
}

.splash-text-input:-ms-input-placeholder {
  color: rgba(0, 0, 0, .1);
}

.splash-text-input::placeholder {
  color: rgba(0, 0, 0, .1);
}

.splash-content-1 {
  margin-bottom: 24px;
}

.splash-text-small-50 {
  margin-top: -16px;
  color: hsla(0, 0%, 100%, .5);
  font-size: 11px;
  text-align: center;
}

.div-block-5 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.splash-3-h1 {
  margin-top: 48px;
  color: #fff;
  font-size: 25px;
  text-align: center;
}

.body-splash-2 {
  background-color: #1f88e9;
}

.body-splash-3 {
  background-color: #fd6f77;
}

.providerp-button-back {
  width: 24px;
  height: 24px;
  -webkit-align-self: flex-start;
  -ms-flex-item-align: start;
  align-self: flex-start;
}

.providerp-provider-info-section {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px 16px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.providerp-avatar {
  width: 100px;
  height: 100px;
  border-radius: 100px;
}

.providerp-h1 {
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 20px;
  line-height: 30px;
}

.text-span-2 {
  color: rgba(0, 0, 0, .25);
}

.text-span-3 {
  color: rgba(0, 0, 0, .25);
}

.providerp-occupation {
  max-width: 500px;
  margin-top: 0px;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  font-weight: 400;
  text-align: center;
}

.providerp-children {
  max-width: 500px;
  margin-bottom: 12px;
  color: rgba(0, 0, 0, .5);
  font-size: 13px;
  text-align: center;
}

.providerp-chat-bubble-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  max-width: 500px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-justify-content: space-around;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.providerp-chat-bubble-caret {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.providerp-chat-bubble-primary {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  background-color: #f3f3f3;
}

.providerp-provider-info-bullets {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.providerp-background-check-badge {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 5px 10px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 500px;
  background-color: #0cba52;
}

.background-check-text {
  margin-top: 1px;
  color: hsla(0, 0%, 100%, .9);
  font-size: 10px;
  line-height: 9px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.checkmark-image {
  margin-right: 8px;
}

.providerp-background-check-badge-container {
  margin-bottom: 6px;
}

.providerp-user-comments-item {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.providerp-user-comment-avatar {
  width: 40px;
  height: 40px;
}

.providerp-user-comment-username {
  margin-left: 16px;
  font-weight: 700;
}

.providerp-user-comment-text {
  margin-top: 16px;
  font-size: 14px;
}

.providerp-avatar-name-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.providerp-post-comment-container {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-style: none none solid;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1);
  background-color: #fff;
}

.spacer-100px {
  height: 100px;
}

.providerp-book-care-container {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  border-style: none;
  border-width: 1px;
  border-color: rgba(0, 0, 0, .1) #000 #000;
  background-color: #fff;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, .08);
}

.pprovider-book-care-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  padding: 8px 20px 8px 16px;
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
  border-radius: 4px;
  background-color: #deedfc;
}

.pprovider-primary-action-text {
  margin-left: 8px;
  color: #1f88e9;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.pprofile-compose-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  padding: 8px 12px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 10px;
  background-color: #f2f2f2;
}

.pprofile-comment-prompt-button-text {
  margin-top: -2px;
  margin-left: 8px;
  color: rgba(0, 0, 0, .4);
}

.image-5 {
  opacity: 0.3;
}

.econtacts-right-actions-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.econtacts-list-item-icon-1 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .15);
}

.buttons-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 24px 16px;
  padding: 40px 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
}

.check-in-button {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 500;
  margin-right: 168px;
  padding-top: 11px;
  padding-bottom: 9px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(31, 136, 233, .08);
  border-radius: 4px;
  background-color: #deedfc;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
  color: #1f88e9;
  font-size: 13px;
  line-height: 14px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.div-fake-map {
  height: 200px;
  background-image: url('../assets/Screenshot-2018-09-18-15.26.16.png');
  background-position: 50% 50%;
  background-size: 1500px;
  background-repeat: no-repeat;
}

.check-in-button-2 {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 500;
  margin-right: 120px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(31, 136, 233, .08);
  border-radius: 4px;
  background-color: #1f88e9;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
  color: #fff;
  font-size: 13px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.check-in-button-6 {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 58px;
  padding: 9px 15px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #1d8ce7;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

.check-in-button-6-text {
  margin-left: 9px;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.text-span-4 {
  font-size: 10px;
  font-weight: 400;
}

.check-in-button-7 {
  position: absolute;
  top: 16px;
  right: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 168px;
  padding: 9px 15px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #1d8ce7;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

.check-in-button-7-text {
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.check-in-button-7-image {
  margin-bottom: 4px;
  opacity: 1;
}

.text-span-5 {
  color: hsla(0, 0%, 100%, .5);
  font-size: 10px;
  line-height: 15px;
}

.check-in-button-8 {
  position: absolute;
  right: 16px;
  bottom: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 128px;
  margin-bottom: 61px;
  padding: 9px 15px 11px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #1d8ce7;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

.text-span-6 {
  color: hsla(0, 0%, 100%, .5);
  font-size: 10px;
}

.check-in-button-8-image {
  margin-bottom: 4px;
  opacity: 1;
}

.check-in-button-8-text {
  margin-top: -5px;
  border-radius: 4px;
  color: #fff;
  font-size: 13px;
  line-height: 15px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.check-in-button-9 {
  position: absolute;
  top: 16px;
  right: 16px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 65px;
  margin-bottom: 145px;
  padding: 9px 15px 11px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #1d8ce7;
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, .45);
}

.check-in-button-9-text {
  margin-top: -1px;
  border-radius: 4px;
  color: #fff;
  font-size: 11px;
  line-height: 14px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.avatar-name-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  margin-right: 24px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.emergency-image {
  opacity: 0.5;
}

.list-item-4-link-block-copy {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 48%;
  padding: 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #deedfc;
}

.onb-title-bar {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
  border-width: 1px;
  border-color: hsla(0, 0%, 100%, .1);
  background-color: rgba(108, 200, 255, .93);
  background-image: url('../assets/cclogo-house-blue.svg');
  background-position: 50% 13px;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .08);
}

.onb-title-bar-next-button {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
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
  border: 1px none #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
  color: #64426b;
}

.onb-title-bar-next-button:active {
  background-color: #64426b;
  color: #fff;
}

.onb-title-bar-next-button-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.onb-title-bar-back-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 7px;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: transparent;
  background-image: url('../assets/arrow-back-white.svg');
  background-position: 50% 50%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  color: #1f88e9;
}

.onb-title-bar-back-button:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-image: url('../assets/arrow-back-white.svg');
  background-size: 24px;
}

.onb-index-heading {
  margin-top: 0px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #000 #000 rgba(0, 0, 0, .3);
  font-size: 24px;
}

.onb-content-container {
  margin-bottom: 0px;
  padding: 32px 32px 72px;
  background-color: #1d8be7;
}

.onb-content-container._100vh {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 100vh;
}

.onb-heading-large {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}

.onb-heading-small {
  margin-top: 0px;
  margin-bottom: 10px;
  color: hsla(0, 0%, 100%, .5);
  font-size: 13px;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.onb-paragraph {
  margin-bottom: 8px;
  color: #fff;
  line-height: 21px;
  text-align: center;
}

.onb-paragraph-small {
  margin-bottom: 8px;
  color: #fff;
  font-size: 11px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.2px;
}

.onb-paragraph-align-left {
  margin-bottom: 8px;
  color: #fff;
  line-height: 21px;
  text-align: left;
}

.onb-index-container {
  margin-bottom: 32px;
  padding: 32px;
  background-color: #fff;
}

.onb-index-style-heading {
  margin-top: 72px;
  margin-bottom: 11px;
  color: #e6a6ff;
  font-size: 16px;
  line-height: 32.5px;
  text-align: left;
  text-transform: none;
}

.checkbox-field {
  display: block;
}

.onb-fixed-bottom-actions-checkbox-container {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  margin-top: 32px;
  padding-top: 16px;
  padding-bottom: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px none rgba(0, 0, 0, .1);
  background-color: rgba(108, 200, 255, .96);
  box-shadow: 0 0 50px 50px #1d8ae7;
}

.form-block-2 {
  margin-bottom: 0px;
}

.onb-body {
  overflow: visible;
  padding-top: 53px;
  padding-bottom: 53px;
  background-color: #1d8ae7;
}

.onb-top-content-container {
  margin-bottom: 32px;
  color: #fff;
}

.onb-checkbox-label {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 6px;
  color: #1d8ae7;
}

.onb-invitation-code-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.onb-paragraph-small-50 {
  margin-bottom: 8px;
  color: hsla(0, 0%, 100%, .5);
  font-size: 11px;
  line-height: 19px;
  text-align: center;
  letter-spacing: 0.2px;
}

.invite-code-form {
  border-radius: 4px;
  box-shadow: 0 0 0 4px #1d8ce7;
}

.invite-code-input {
  width: 220px;
  height: 80px;
  border: 3px none #dbdbdb;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  color: #000;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
  letter-spacing: 6px;
}

.invite-code-input:focus {
  background-color: #fff;
}

.invite-code-input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .1);
}

.invite-code-input:-ms-input-placeholder {
  color: rgba(0, 0, 0, .1);
}

.invite-code-input::placeholder {
  color: rgba(0, 0, 0, .1);
}

.onb-body-full-height {
  overflow: visible;
  padding-top: 51px;
  padding-bottom: 0px;
  background-color: #1d8ae7;
  color: #fff;
}

.onb-joined-community-avatar {
  border-radius: 1000px;
}

.onb-form-checkbox-list {
  color: transparent;
}

.onb-form-block-checkbox-list {
  width: 100%;
  margin-bottom: 24px;
  color: transparent;
}

.checkbox-field-extra-space {
  display: block;
  margin-bottom: 8px;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
 }

.checkbox-field-extra-space:active {
  background-color: #fff;
}

.checkbox-field-extra-space:focus {
  background-color: #fff;
}

.onb-checkbox {
  margin-top: 22px;
  padding-top: 0px;
  padding-bottom: 0px;
}

.list-item-7 {
  margin-bottom: 4px;
}

.onb-location-search-container {
  width: 100%;
}

.location-text-field {
  height: 56px;
  padding-top: 8px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.location-text-field:active {
  background-color: #fff;
}

.location-text-field:focus {
  background-color: #fff;
}

.location-text-field::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.location-text-field:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.location-text-field::placeholder {
  color: rgba(0, 0, 0, .3);
}

.onb-radio-form-block {
  width: 100%;
}

.onb-radio-button-field {
  margin-bottom: 8px;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
}

.onb-radio-button-field:active {
  background-color: #fff;
}

.onb-radio-button-field:focus {
  background-color: #fff;
}

.onb-radio-button-label {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 6px;
  color: #1d8ae7;
}

.onb-radio-button {
  margin-top: 22px;
}

.embed-facebook-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 40px;
  padding-top: 16px;
  padding-bottom: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.onb-body-splash {
  overflow: visible;
  background-color: #fff;
}

.div-block-6 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  min-height: 30vh;
  padding: 32px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-image: url('../assets/splash-bg.svg');
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
}

.onb-splash-title-container {
  margin-bottom: 0px;
  padding: 32px;
}

.onb-field-label {
  margin-top: 24px;
  margin-bottom: 8px;
  color: #fff;
  font-weight: 700;
}

.onb-field-sublabel {
  margin-bottom: 8px;
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  text-align: left;
  letter-spacing: 0.2px;
}

.onb-child-info-container {
  width: 100%;
}

.basic-text-field {
  height: 56px;
  padding-top: 8px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.basic-text-field:focus {
  background-color: #fff;
}

.basic-text-field::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.basic-text-field:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.basic-text-field::placeholder {
  color: rgba(0, 0, 0, .3);
}

.onb-paragraph-subheading-2 {
  margin-bottom: 8px;
  color: #fff;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
}

.onb-index-heading-2 {
  margin-top: 0px;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-style: none none solid;
  border-width: 1px;
  border-color: #fff;
  color: #fff;
  font-size: 24px;
}

.onb-heading-large-black {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #333;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}

.onb-paragraph-subheading-2-black {
  margin-bottom: 8px;
  color: #333;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
}

.checkbox-label {
  padding-left: 6px;
  color: #fff;
}

.onb-button-add-group {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 63px;
  padding: 10px 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, 0);
}

.onb-button-add-group:active {
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .1);
}

.onb-button-add-group-text {
  padding-left: 8px;
  color: #fff;
  line-height: 14px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.onb-child-group-2 {
  margin-bottom: 24px;
  padding: 24px 32px 32px;
  background-color: hsla(0, 0%, 100%, .1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1);
}

.onb-child-group-heading {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 400;
}

.form-block-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.form-2 {
  width: 100%;
}

.onb-group-header {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  margin-bottom: 24px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.onb-button-delete-child {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 48px;
  height: 100%;
  margin-right: -16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, 0);
}

.onb-button-delete-child:active {
  background-color: hsla(0, 0%, 100%, .1);
}

.name-text-field {
  height: 56px;
  padding-top: 8px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.name-text-field:focus {
  background-color: #fff;
}

.name-text-field::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.name-text-field:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.name-text-field::placeholder {
  color: rgba(0, 0, 0, .3);
}

.image-6 {
  opacity: 0.5;
}

.onb-content-container-2 {
  margin-bottom: 0px;
  padding: 32px 32px 8px;
  background-color: #1d8be7;
}

.image-7 {
  margin-top: 1px;
  opacity: 0.5;
}

.onb-error-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  min-height: 60px;
  margin-bottom: 24px;
  padding: 16px 16px 18px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  background-color: #ffbebe;
  color: #c73200;
}

.onb-title-bar-next-button-inactive {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
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
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .3);
  box-shadow: none;
  color: rgba(1, 1, 1, .2);
}

.onb-error-text {
  font-size: 13px;
}

.onb-error-label {
  margin-bottom: 6px;
  font-weight: 700;
}

.image-8 {
  margin-bottom: 24px;
}

.onb-arrow-animation-container {
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.onb-add-to-home-screen-container {
  margin-top: 0px;
  padding: 8px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .66);
  box-shadow: none;
}

.div-block-8 {
  width: 300px;
  height: 60px;
  background-color: #80a4bd;
}

.onb-number-circle {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 32px;
  height: 32px;
  padding-bottom: 2px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 100px;
  background-color: hsla(0, 0%, 100%, .7);
  color: #1d8ae7;
}

.onb-step-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 32px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.onb-step-text {
  margin-left: 10px;
}

.text-block-7 {
  line-height: 14px;
  text-align: center;
}

@media (max-width: 767px) {
  .components-container-1 {
    padding-right: 16px;
    padding-left: 16px;
  }
}

@media (max-width: 479px) {
  .list-item-1-container {
    padding: 16px;
  }
  .friend-indicator {
    left: 56px;
    top: 53px;
  }
  .title-bar-container {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .list-item-content-container {
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .tag {
    clear: both;
  }
  .time {
    clear: both;
  }
  .tag-group-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .name-and-caption {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .caption {
    text-align: left;
  }
  .list-item-4-container {
    padding: 16px;
  }
  .caption-2 {
    text-align: left;
  }
  .list-item-5 {
    padding: 16px;
  }
  .providerp-provider-info-section {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .providerp-provider-info-bullets {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .providerp-user-comments-item {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .providerp-post-comment-container {
    -webkit-box-align: start;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
  }
  .spacer-100px {
    height: 100px;
  }
  .onb-title-bar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}



</style>