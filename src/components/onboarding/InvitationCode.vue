<template>
<span class="body onb-body-full-height">
 <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Invitation Code</h1>
      <p class="onb-paragraph-subheading-2">If you have an invitation code from a teacher or community member, enter it here to join their network.</p>
    </div>
    <div class="onb-invitation-code-container">
      <div class="invite-code-form-block w-form">
        <form id="email-form" class="invite-code-form">
          <input
            type="text"
            class="invite-code-input w-input"
            maxlength="36"
            placeholder="######"
            id="email"
            :value="code"
            @input='e => code=e.target.value'
          >
        </form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Don’t have a code? That’s ok, just continue. You'll be able to invite friends, and we'll let you know when we can launch for your network.</p>
  </div>
</span>
</template>

<script>
import networks from '@/assets/network-info.json'
const networkCodes = networks.map(network => network.stub.toLowerCase())

export default {
  name: "InvitationCode",
  props: ['value'],
  data () {
    return {
      code: "",
      errorMesg: 'We\'re sorry, but this code doesn\'t match our records. Please try again or continue without a code.',
      validCodes: networkCodes,
    }
  },
  computed: {
    err: function () {
      if (this.codeValidates) {
        return null
      } else if (this.code == "") {
        return "skippable"
      } else {
        return this.errorMesg
      }
    },
    codeValidates: function () {
      // todo: add real logic here
      if (this.validCodes.includes(this.code.toLowerCase())) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {
    /*
    NB: when used with v-model, watch does not trigger on Android (or any keyboard)
          until the keyboard is shut or clicked away.
          This causes a common bug where values are not updated as expected on mobile.
          Solution is to prefer `:value` plus `@input` to v-model
          See:
          - https://stackoverflow.com/questions/49929703/vue-js-watched-input-not-fired-on-every-keypress
          - https://github.com/vuejs/vue/issues/8231
          - https://github.com/vuejs/vue/issues/5248
          - https://stackoverflow.com/questions/50617865/vue-v-model-input-change-mobile-chrome-not-work
          - 2nd '!' in https://vuejs.org/v2/guide/forms.html#Basic-Usage
    */
    code: function (val) {
      this.$emit('input', {
        code: this.codeValidates ? this.code.toLowerCase() : null,
        err: this.err,
        isValid: this.codeValidates
      })
    }
  }
};
</script>

<style>
.onb-content-container {
  height: 100vh;
}
</style>
