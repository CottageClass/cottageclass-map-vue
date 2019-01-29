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
