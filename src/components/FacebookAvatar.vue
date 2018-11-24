<template>
	<img v-if="facebookId" :src="url" :class="className" />
	<img v-else src="@/assets/avatar-placeholder.png" :class="className" />
</template>

<script>
export default {
  name: 'FacebookAvatar',
  props: ['facebookId', 'className'],
  computed: {
  	url: function () {
  	  return "https://graph.facebook.com/" + this.facebookId + "/picture?width=200"
    }
}
};
</script>
