<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your phone number?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form v-on:submit.prevent id="email-form-2" name="email-form-2" data-name="Email Form 2">
          <input 
          v-model="number"
          type="tel" 
          class="location-text-field w-input" 
          maxlength="30" 
          placeholder="e.g. 2125551212">
        </form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Only members who RSVP to your event will see your phone number. (We may also send you text messages about your event or upcoming events. Message &amp; data rates apply.)</p>
  </div>
</template>

<script>

// Use lighter-weight port of Google libphonenumber with friendlier API
// - https://www.npmjs.com/package/libphonenumber-js
import {
  formatNumber,
  isValidNumber,
} from 'libphonenumber-js'


export default {
  name: "Phone",
  props: ['value'],
  data () {
    return {
      number: "",
      errorMesg: 'Please enter a valid US phone number.'
    }
  },
  mounted: function () {
    if (!this.isComplete) {
      this.$emit('input', {
       number: this.value.number,
       err: this.error
      })
    }
  },
  methods: {
      pressedEnter: function () {
        this.$emit('pressedEnter')
      }
  },
  computed: {
    phone: function () {
      return {
        number: this.formattedNumberUsa,
        err: this.error
      }
    },
    formattedNumberUsa: function() {
      // still have to slice the country code off
      let num = this.number.replace(/[^\d]/g, '')
      if (num && num[0] === '1' && num.length === 11) {
        num = num.slice(1, num.length)
      }

      // https://www.npmjs.com/package/libphonenumber-js#format-phone-number
      // - arg 'National' does not expect a country code, arg 'International' does expect it
      return formatNumber({ country: 'US', phone: num}, 'National')
    },
    isComplete: function () {
      return this.number && isValidNumber(this.number, 'US')
    },
    error: function () {
      if (this.isComplete) {
        return false
      } else {
        return this.errorMesg
      }
    }
  },
  watch: {
    number: function () {
      this.$emit('input', this.phone)
    }
  }
};
</script>

