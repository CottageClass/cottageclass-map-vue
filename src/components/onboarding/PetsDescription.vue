<template>
<div class="body">
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">Tell us about your pets.</h1>
      <p class="onb-paragraph-subheading-2">List all your pets in case people have allergies. Are they loud? Yappy? Scary? Any issues, ever?</p>
    </div>
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <p class="describe-label">{{ charsLeft }} characters left...</p>
        <textarea v-model="blurb.text" id="field" name="field" placeholder="e.g. 'Our dog Cerberus is kinda scary but he's great with kids!'" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'PetsDescription',
  props: ['value'],
  data () {
    return {
      blurb: this.value,
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

<style lang="scss" scoped>

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

.body {
  background-color: #1d8ae7;
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
