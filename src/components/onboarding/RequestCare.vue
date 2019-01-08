<template>
  <!-- wrapper for desktop screens -->  

    <div class="onb-body">
      <div class="body">
        <div class="content-wrapper">

  <div class="content-container">
    <div class="title-container">
      <h1 class="title">When do you need care?</h1>
    </div>
    <DateTimePicker v-model="bookingRequest.dateTimeSelected"/>
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <p class="describe-label">Need care on multiple days?</p>
        <textarea v-model="bookingRequest.description" id="field" name="field" placeholder="Describe your need and schedule here." maxlength="5000" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
    <CountdownPromo />
  </div>
</div>
</div>
</div>
</template>

<script>
import CountdownPromo from '@/components/onboarding/CountdownPromo.vue'
import DateTimePicker from '@/components/DateTimePicker.vue'

export default {
  name: 'RequestCare',
  props: ['value'],
  components: { CountdownPromo, DateTimePicker },
  data () {
    return {
      bookingRequest: this.value
    }
  },
  watch: {
    bookingRequest: {
      handler: function () {
        if (this.bookingRequest.description || this.bookingRequest.dateTimeSelected) {
          this.bookingRequest.err = false
        } else if (this.bookingRequest.description == "" && this.bookingRequest.dateTimeSelected == null) {
          this.bookingRequest.err = "skippable"
        }
      },
      deep: true
    }
  }
};

</script>

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';
html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.content-wrapper {
  padding-top: 0px;
}

.describe-label {
  padding-top: 16px;
}

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  height: 100vh;
}

.title-container {
  margin-bottom: 32px;
  color: #fff;
}

.title {
  margin-top: 0px;
  margin-bottom: 10px;
  color: #fff;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}

.content-container {
  margin-bottom: 0px;
  padding: 32px 32px 8px;
  background-color: #1d8be7;
}

.text-area-decribe-need {
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.text-area-decribe-need:active {
  background-color: #fff;
}

.text-area-decribe-need:focus {
  background-color: #fff;
}

.text-area-decribe-need::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::placeholder {
  color: rgba(0, 0, 0, .3);
}

.describe-label {
  margin-bottom: 8px;
  color: #fff;
  line-height: 21px;
  text-align: left;
}

.form-describe-need {
  margin-bottom: 24px;
}

</style>