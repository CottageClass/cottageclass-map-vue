<template>
  <a :href="'sms:' + numberOrNothing + '?&body=' + message"><slot></slot></a>
</template>

<script>
export default {
  name: 'TextMessageLink',
  props: ['number', 'message'],
  computed: {
    intlNumber: function () {
      return '+1-' + this.number
    },
    numberOrNothing: function () {
      // if no number, or number is already international
      if (!this.number || this.number === '') {
        return ''
      }
      // number is already international
      else if (this.number.includes('+1')) {
        return this.number
      } else {
        return this.intlNumber
      }
    }
  }
}
</script>
