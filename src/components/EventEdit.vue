<template>
  <div>Editing event {{ id }} </div>
</template>

<script>
export default {
  name: 'EventEdit',
  data () {
    return {
      id: this.$route.params.id
    }
  }
}
</script>
