<template>
<Question
title="Tell us about your pets."
subtitle="List all your pets in case people have allergies. Are they loud? Yappy? Scary? Any issues, ever?"
>
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <p class="describe-label">{{ charsLeft }} characters left...</p>
        <textarea v-model="blurb.text" id="field" name="field" placeholder="e.g. 'Our dog Cerberus is kinda scary but he's great with kids!'" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
</Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'
export default {
  name: 'PetsDescription',
  props: ['value'],
  components: { Question },
  data () {
    return {
      blurb: this.value || '',
      charLimit: 288,
      noTextErrorMsg: 'Please list your pets, including any key details.'
    }
  },
  mounted: function () {
    this.$emit('input', { err: this.noTextErrorMsg })
  },
  watch: {
    blurb: {
      handler: function () {
        if (this.blurb.text && this.blurb.text.length >= this.charLimit) {
          this.blurb.err = 'Sorry! Your description needs to be shorter than ' + this.charLimit + ' characters. Can you make it shorter?'
        } else if (this.blurb.text) {
          this.blurb.err = false
        } else {
          this.blurb.err = this.noTextErrorMsg
        }
        this.$emit('input', { err: this.blurb.err, text: this.blurb.text })
      },
      deep: true
    }
  },
  computed: {
    charsLeft: function () {
      if (this.blurb.text) {
        return this.charLimit - this.blurb.text.length
      } else {
        return this.charLimit
      }
    }
  }
}

</script>

<style scoped>

html {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.describe-label {
  padding-top: 16px;
}

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  min-height: 100vh;
}

.title-container {
  margin-bottom: 32px;
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

.describe-label {
  margin-bottom: 8px;
  line-height: 21px;
  text-align: left;
}

.form-describe-need {
  margin-bottom: 24px;
}

</style>
