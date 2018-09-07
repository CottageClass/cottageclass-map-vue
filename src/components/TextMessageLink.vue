<template>
  <a :href="'sms:+1-' + number + '?&body=' + message"><slot></slot></a>
</template>

<script>
  export default {
    name: 'TextMessageLink',
    props: ['number', 'message']
  }
</script>