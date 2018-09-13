<template>
  <div class="invite-friends-container">
    <h5 class="heading">Want more providers you know?</h5>
    <div class="spacer-16"></div><a v-on:click="share" class="button w-button share-button">Invite Friends</a>
  </div>
</template>

<script>
export default {
	name: 'ShareButton',
	methods: {
        share: function () {
            if (navigator.share) {
                navigator.share({
                    title: 'Web Fundamentals',
                    text: 'Check out Web Fundamentals — it rocks!',
                    url: 'https://developers.google.com/web',
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            }
        }
	}
};
</script>

<style>
.share-button {
  background-color: #1f88e9;
}
</style>