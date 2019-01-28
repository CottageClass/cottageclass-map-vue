<template>
  <Question :title="question" :subtitle="description">
         <MultipleChoice 
     type="radio" 
     v-model="yesOrNo" 
     :choices="['yes', 'no']" /> 
  </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'
import MultipleChoice from '@/components/onboarding/MultipleChoice.vue'

export default {
  name: 'YesOrNo',
  components: { Question, MultipleChoice },  
  props: ['value', 'question', 'description'],
  data () {
    return {
      yesOrNo: this.value.isTrue ? 'yes' : 'no',
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
