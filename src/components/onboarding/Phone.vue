<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your phone number?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2">
          <input v-model="number" type="tel" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="e.g. 1-212-555-1212" id="name">
        </form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Other families will text you to request or offer care. (We may also send you text messages about special CottageClass  CareShare events or news. Message &amp; data rates apply.)</p>
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
  filters: {
    // TODO: create an autoformatting phone-input component
    // - don't use filters as of Vue2
    // - instead create a component with a on:blur directive
    // - https://vuejs.org/v2/guide/migration.html#Two-Way-Filters-replaced
    // for example, https://www.npmjs.com/package/vue-tel-input,
    // - which uses libphonenumber-js for autoformatting
  },
  computed: {
    phone: function () {
      return {
        number: this.formattedNumberUsa,
        err: this.error
      }
    },
    formattedNumberUsa: function() {
      // https://www.npmjs.com/package/libphonenumber-js#format-phone-number
      // - arg 'National' removes country code 1, arg 'International' keeps it
      return formatNumber({ country: 'US', phone: this.number}, 'National')
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

