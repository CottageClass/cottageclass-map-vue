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
    		if (this.number == "" || this.number == null) {
    			return ""
    		} else {
    			return this.intlNumber
    		}
    	}
    }
  };
</script>