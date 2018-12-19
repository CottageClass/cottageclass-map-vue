<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Choose a day for your activity</h1>
      <p class="onb-paragraph-subheading-2">New members must offer a first activty within 6 weeks of joining. Your activity repeats every 4 weeks on this day, so please pick a day when you're usually available—you can reschedule if needed. These are the days we need most:</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="date in dates" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': date == dateSelected}">
          <input 
          type="radio" 
          :id="date" 
          :value="formatDate(date)"
          :name="date" 
          class="onb-checkbox w-checkbox-input"
          v-model="dateSelected"
          >
          <label 
          :for="date" 
          class="onb-checkbox-label w-form-label"
          >
           {{ date }}
         </label>
        </div>
      </form>
    </div>
    <div 
    class="other-date"
    v-if="otherSelected">
    <p>
      Choose another date:
    </p>
    <input 
    type="date" 
    class="basic-text-field w-input"
    v-model="otherDate">
  </div>
</div>
</template>

<script>
export default {
  name: "EventDate",
  props: ['value'],
  data () {
    return {
      dateSelected: '',
      errorMesg: 'Please choose a day for your event.',
      dates: [ // this is hardcoded for now but we'll automatically populate this soon. 
      'Friday, January 11th',
      'Friday, January 18th',
      'Saturday, January 19th',
      'Saturday, January 26th',
      'Other'
      ],
      otherDate: null
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    err: function () {
      if (!this.dateSelected || (this.dateSelected == 'Other' && !this.dateIsValid(this.otherDate))) {
        return this.errorMesg
      } else {
        return false
      }
    },
    otherSelected: function () {
      return (this.dateSelected == 'Other')
    }
  },
  watch: {
    dateSelected: function () {
      this.emitDate()
    },
    otherDate: function () {
      this.emitDate()
    }
    },
  methods: {
    emitDate: function () {
      let date = null
      if (this.otherSelected) {
        date = this.formatOtherDate(this.otherDate)
      } else {
        date = this.formatDate(this.dateSelected)
      }
        this.$emit('input', {
          selected: date,
          err: this.err
        })
      },
    dateIsValid: function (date) {
    // for now we just make them enter something
      return !!date
    },
    formatDate: function (date) {
      // todo: format date properly
      return date
    },
    formatOtherDate: function (otherDate) {
      // todo: format 'other' date properly
      return otherDate
    }
  }
};
</script>

<style scoped>

p {
  color: white;
}

.describe-label {
  color: white;
  padding-top: 16px;
}

textarea {
  height: 96px;
}

.onb-content-container {
  min-height: 130vh;
}

</style>

