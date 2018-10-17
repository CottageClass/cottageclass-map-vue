<template>
<span class="body onb-body-full-height">
 <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Invitation Code</h1>
      <p class="onb-paragraph-subheading-2">If you have an invitation code from a teacher or community member, enter it here to join their network.</p>
    </div>
    <div class="onb-invitation-code-container">
      <div class="invite-code-form-block w-form">
        <form id="email-form" class="invite-code-form"><input type="text" class="invite-code-input w-input" maxlength="36" placeholder="######" id="email" v-model="code"></form>
      </div>
    </div>
    <p class="onb-paragraph-small-50">Don’t have a code? That’s ok, just continue. You'll be able to invite friends, and we'll let you know when we can launch for your network.</p>
  </div>
</span>
</template>

<script>

export default {
  name: "InvitationCode",
  props: ['value'],
  data () {
    return {
      code: "",
      errorMesg: 'We\'re sorry, but this code doesn\'t match our records. Please try again or continue without a code.',
      validCodes: ["test", "Test", "Brooklyn", "1234"]
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
      } else return false
    }
  },
  watch: {
    code: function () {
      this.$emit('input', {
        code: this.code,
        err: this.err
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