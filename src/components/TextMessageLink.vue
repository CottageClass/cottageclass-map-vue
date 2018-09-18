<template>
  <a :href="'sms:+1-' + number + '?&body=' + message + ' \ud83c\udf08\u26a1\ud83e\udd84'"><slot></slot></a>
</template>

<script>
  export default {
    name: 'TextMessageLink',
    props: ['number', 'message']
  }
</script>