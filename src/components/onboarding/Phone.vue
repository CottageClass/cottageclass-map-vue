<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What's your phone number?</h1>
    </div>
    <div class="onb-location-search-container">
      <div class="w-form">
        <form id="email-form-2" name="email-form-2" data-name="Email Form 2"><input v-model="number" type="tel" class="location-text-field w-input" maxlength="256" name="name" data-name="Name" placeholder="e.g. 2125551212" id="name"></form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Other families will text you to request or offer care. (We may also send you text messages about special CottageClass  CareShare events or news. Message &amp; data rates apply.)</p>
  </div>
</template>

<script>

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
  computed: {
    phone: function () {
      return {
        number: this.numberWithoutOne,
        err: this.error
      }
    },
    numberWithoutOne: function () {
      if (this.number[0] == "1") {
        return this.number.slice(1)
      } 
    },
    isComplete: function () {
      if (this.number) { 
      var number = this.number.replace(/[^\d]/g, '')
      if ((number[0] != '1' && number.length === 10) || (number[0] == '1') && number.length === 11) {
        return true 
      } else {
        return false
      }
    } return false
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

