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
            const url = "https://app.cottageclass.com"
            if (navigator.share) {
                navigator.share({
                    title: 'Want to share childcare with me?',
                    text: 'I\'m sharing childcare with a small circle of parents and friends. If you\'d like to join just fill this out!',
                    url: url,
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else window.open('https://www.facebook.com/sharer/sharer.php?u=' + url)
        }
	}
};
</script>

<style scoped>
.share-button {
  background-color: #1f88e9;
}
</style>