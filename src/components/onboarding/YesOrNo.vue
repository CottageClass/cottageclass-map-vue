<template>
  <Question :title="question" :subtitle="description">
      <form class="onb-form-checkbox-list">
        <div
        class="checkbox-field-extra-space"
        :class="{'active-checkbox': yesOrNo === 'yes'}">
          <input
          type="radio"
          id="yes"
          value="yes"
          name="yes"
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label
          for="yes"
          class="onb-checkbox-label w-form-label"
          >
           Yes
         </label>
        </div>
        <div
        class="checkbox-field-extra-space"
        :class="{'active-checkbox': yesOrNo === 'no'}">
          <input
          type="radio"
          id="no"
          value="no"
          name="no"
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label
          for="no"
          class="onb-checkbox-label w-form-label"
          >
           No
         </label>
        </div>
      </form>
  </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'
export default {
  name: 'YesOrNo',
  components: { Question },  
  props: ['value', 'question', 'description'],
  data () {
    return {
      yesOrNo: this.value.yesOrNo,
      errorMesg: 'Please answer yes or no.'
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    err: function () {
      if (this.trueOrFalse === null) {
        return this.errorMesg
      } else {
        return false
      }
    },
    trueOrFalse: function () {
      switch (this.yesOrNo) {
        case 'yes':
          return true
        case 'no':
          return false
        default:
          return null
      }
    }
  },
  watch: {
    yesOrNo: function () {
      this.$emit('input', {
        isTrue: this.trueOrFalse,
        err: this.err
      })
    }
  }
}
</script>
