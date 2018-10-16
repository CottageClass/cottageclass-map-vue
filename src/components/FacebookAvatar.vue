<template>
	<img :src="url" :class="className" />
</template>

<script>
export default {
  name: 'FacebookAvatar',
  props: ['person', 'className'],
  computed: {
  	url: function () {
  	  return "https://graph.facebook.com/" + this.person.fbid + "/picture?width=200"
    }
}
};
</script>
