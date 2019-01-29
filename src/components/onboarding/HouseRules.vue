<template>
<Question
title="House rules"
subtitle="Are there any specific house rules you'd like guests to be aware of?">
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <textarea v-model="rules" id="field" name="field" placeholder="Shoes off? Allergies? Anything else?" maxlength="5000" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
  </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'

export default {
  name: 'HouseRules',
  components: { Question },
  props: ['value'],
  data () {
    return {
      rules: this.value.text
    }
  },
  computed: {
    err: function () {
      if (!this.rules) {
        return 'skippable'
      } else {
        return false
      }
    }
  },
  watch: {
    rules: function () {
      this.$emit('input', { err: this.err, text: this.rules })
    }
  }
}

</script>

<style scoped>

html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  min-height: 100vh;
}

.title {
  margin-top: 0px;
  margin-bottom: 10px;
  font-size: 24px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.3px;
}

.text-area-decribe-need {
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  font-size: 16px;
}

.form-describe-need {
  margin-bottom: 24px;
}

</style>
