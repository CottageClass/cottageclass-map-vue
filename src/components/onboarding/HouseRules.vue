<template>
<div class="body">
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">House rules</h1>
      <p class="onb-paragraph-subheading-2">Are there any specific house rules you'd like guests to be aware of?</p>
    </div>
    <div class="form-describe-need w-form">
      <form v-on:submit.prevent id="email-form-2">
        <textarea v-model="rules" id="field" name="field" placeholder="Shoes off? Allergies? Anything else?" maxlength="5000" class="text-area-decribe-need w-input"></textarea>
      </form>
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'HouseRules',
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

<style lang="scss" scoped>

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

.form-describe-need {
  margin-bottom: 24px;
}

</style>
