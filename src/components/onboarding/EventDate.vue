<template>
  <Question 
  title="Choose a day for your monthly activity"
  subtitle="Activities repeat every 4 weeks on the same weekday, unless you change or cancel, so please pick a day when you're usually available. These are the days we need most:">
      <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="date in dates"
        class="checkbox-field-extra-space"
        :class="{'active-checkbox': date === dateSelected}">
          <input
          type="radio"
          :id="date"
          :value="date"
          :name="date"
          class="onb-checkbox w-checkbox-input"
          v-model="dateSelected"
          >
          <label
          :for="date"
          class="onb-checkbox-label w-form-label"
          >
           {{ displayDate(date) }}
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
</Question>
</template>

<script>
var moment = require('moment')
import Question from '@/components/onboarding/Question.vue'

export default {
  name: 'EventDate',
  props: ['value'],
  components: { Question },
  data () {
    return {
      dateSelected: '',
      errorMesg: 'Please choose a day for your activity.',
      dates: [ // this is hardcoded for now but we'll automatically populate this soon.
        '2019-02-15',
        '2019-02-16',
        '2019-02-22',
        '2019-02-23',
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
      if (!this.dateSelected || (this.dateSelected === 'Other' && !this.dateIsValid(this.otherDate))) {
        return this.errorMesg
      } else {
        return false
      }
    },
    otherSelected: function () {
      return (this.dateSelected === 'Other')
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
        date = this.otherDate
      } else {
        date = this.dateSelected
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
    displayDate: function (date) {
      if (date === 'Other') {
        return 'Other'
      } else {
        return moment(date).format('dddd, MMMM Do')
      }
    }
  }
}
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
