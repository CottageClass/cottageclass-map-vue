<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Choose a time for your activity</h1>
      <p class="onb-paragraph-subheading-2">Each activity runs 3 hours in the evening, but the start time is up to you. (You'll choose the date next.)</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="time in times" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': time == timeSelected}">
          <input 
          type="radio" 
          :id="time" 
          :value="time"
          :name="time" 
          class="onb-checkbox w-checkbox-input"
          v-model="timeSelected"
          >
          <label 
          :for="time" 
          class="onb-checkbox-label w-form-label"
          >
           {{ time }}
         </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
var moment = require('moment');

export default {
  name: "EventTime",
  props: ['value'],
  data () {
    return {
      timeSelected: '',
      errorMesg: 'Please choose a time for your event.',
      times: [
      '5:00pm - 8:00pm',
      '5:30pm - 8:30pm',
      '6:00pm - 9:00pm',
      '6:30pm - 9:30pm',
      '7:00pm - 10:00pm'
      ]
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    err: function () {
      if (this.timeSelected == '') {
        return this.errorMesg
      } else {
        return false
      }
    },
    startTimeUnparsed: function () {
      return this.timeSelected.substring(0,this.timeSelected.indexOf(' '))
    },
    startTime: function () {
      return moment(this.startTimeUnparsed, 'h mm a').format('HH:mm')
    },
    endTime: function () {
      return moment(this.startTime, 'HH:mm').add(3, 'hours').format('HH:mm')
    }
  },
  watch: {
    timeSelected: function () {
        this.$emit('input', {
          start: this.startTime,
          end: this.endTime,
          err: this.err
        })
      }
    },
  methods: {
    formatTime: function (time) {
      // isolate the start time
      // placeholder
      return time
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';

.describe-label {
  color: white;
  padding-top: 16px;
}

textarea {
  height: 96px;
}

.onb-content-container {
  min-height: 100vh;
}

</style>

