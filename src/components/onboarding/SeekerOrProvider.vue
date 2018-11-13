<template>
<div class="body">
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">Do you want to...</h1>
    </div>
    <div class="radio-form-block w-form">
      <form id="email-form" class="radio-form">
        <div class="radio-button-field w-radio">
          <input type="radio" id="find" value="seeker" v-model="seekerProviderBoth" class="radio-button w-radio-input">
          <label for="find" class="radio-button-label w-form-label">Find Childcare</label>
        </div>
        <div class="radio-button-field w-radio">
          <input type="radio" id="provide" value="provider" v-model="seekerProviderBoth" class="radio-button w-radio-input">
          <label for="provide" class="radio-button-label w-form-label">Provide Childcare</label>
        </div>
        <div class="radio-button-field w-radio">
          <input type="radio" id="both" value="both" v-model="seekerProviderBoth" class="radio-button w-radio-input">
          <label for="both" class="radio-button-label w-form-label">Both</label>
        </div>
      </form>
    </div>
        <p class="onb-paragraph-small-50">Not sure? Pick &ldquo;both.&rdquo; Sharing childcare with other families can be delightful :)  </p>
  </div>
</div>
</template>

<!--
<input type="radio" id="one" value="One" v-model="picked">
<label for="one">One</label>
<br>
<input type="radio" id="two" value="Two" v-model="picked">
<label for="two">Two</label>
<br>
<span>Picked: {{ picked }}</span>
-->

<script>
export default {
  name: 'SeekerOrProvider',
  props: ['value'],
  data () {
    return {
      seekerProviderBoth: this.value.seekerProviderBoth ? this.value.seekerProviderBoth : "", // if it gets passed something, return that, otherwise return blank string.
      errorMsg: 'Please choose if you want to find care, provide care, or both.',
    }
  },
  mounted: function () {
    if (this.seekerProviderBoth == "") {
      this.$emit('input', {
        seekerProviderBoth: "",
        err: this.errorMsg
      })}
    },
  computed: {
    err: function () {
      if (this.seekerProviderBoth != "") {
        return false
      } else {
        return this.errorMsg
      }
    },
  },
  watch: {
    seekerProviderBoth: function () {
      this.$emit('input', {
        err: this.err,
        seekerProviderBoth: this.seekerProviderBoth
      })
     }
   }
};
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

.title-bar {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 100%;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
  border-width: 1px;
  border-color: hsla(0, 0%, 100%, .1);
  background-color: rgba(108, 200, 255, .93);
  background-position: 50% 13px;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
}

.back-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 7px;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: transparent;
  background-position: 50% 50%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  color: #1f88e9;
}

.back-button:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-size: 24px;
}

.next-button {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border: 1px none #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
  color: #64426b;
  text-decoration: none;
}

.next-button:active {
  background-color: #64426b;
  color: #fff;
}

.next-button-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-decoration: none;
  text-transform: uppercase;
}

.content-container {
  margin-bottom: 0px;
  padding: 32px 32px;
  background-color: #1d8be7;
  height: 100vh;
}

.radio-form-block {
  width: 100%;
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

@media (max-width: 479px) {
  .title-bar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}
</style>