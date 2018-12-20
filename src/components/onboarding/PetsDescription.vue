<template>
<div class="body">
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">Describe your pet situation.</h1>
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
};

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
  height: 100vh;
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

.radio-form-block {
  width: 100%;
  margin-bottom: 32px;
}

.radio-button-field {
  margin-bottom: 8px;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
}

.radio-button-field:active {
  background-color: #fff;
}

.radio-button-field:focus {
  background-color: #fff;
}

.radio-button {
  margin-top: 22px;
}

.radio-button-label {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 6px;
  color: #1d8ae7;
  font-weight: 400;
}

.field-i-agree {
  display: block;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .05);
}

.label-checkbox {
  width: 100%;
  padding: 18px 16px 18px 6px;
  color: #fff;
}

.form-i-agree {
  margin-bottom: 32px;
}

.link {
  color: hsla(0, 0%, 100%, .6);
}

.checkbox-i-agree {
  margin-top: 22px;
}

.promo-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 32px;
  padding: 24px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  border-radius: 4px;
  background-color: #fff;
  background-image: linear-gradient(343deg, #0cba52, rgba(12, 186, 82, .7));
}

.counter {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.counter-item {
  width: 33.33333333%;
}

.count {
  color: #fff;
  font-size: 60px;
  line-height: 68px;
  font-weight: 300;
  text-align: center;
}

.label-time-interval {
  color: #fff;
  font-size: 10px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.counter-title {
  margin-bottom: 8px;
  color: #fff;
  font-size: 25px;
  line-height: 32.5px;
  font-weight: 400;
  text-align: center;
}

.counter-subtitle {
  margin-bottom: 4px;
  color: hsla(0, 0%, 100%, .7);
  line-height: 18.2px;
  text-align: center;
}

.image-free-tag {
  height: 40px;
  margin-bottom: 8px;
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

@media (max-width: 479px) {
  .title-bar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}


</style>