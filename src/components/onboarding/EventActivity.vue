<template>
  <Question 
  title="Choose your activity"
  subtitle="All members must provide one activity per month. These tried-and-true options work great, and we'll walk you through whichever one you choose.">
     <MultipleChoice 
     type="radio" 
     v-model="activitySelected" 
     :choices="activities" /> 
    </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'
import MultipleChoice from '@/components/onboarding/MultipleChoice.vue'

export default {
  name: 'EventActivity',
  components: { Question, MultipleChoice },
  props: ['value'],
  data () {
    return {
      activitySelected: '',
      errorMesg: 'Please choose an activity option from the list.',
      activities: [
        'movie night',
        'arts & crafts',
        'games & puzzles',
        'baking',
        'book club'
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
      if (this.activitySelected === '') {
        return this.errorMesg
      } else {
        return false
      }
    }
  },
  watch: {
    activitySelected: function () {
      this.$emit('input', {
        selected: this.activitySelected,
        err: this.err
      })
    }
  },
}
</script>

<style scoped>

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
