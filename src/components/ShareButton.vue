<template>
  <div class="invite-friends-container">
    <h5 class="heading">Want more people you know?</h5>
    <div class="spacer-16"></div><a v-on:click="share" class="button w-button share-button">Invite Friends</a>
  </div>
</template>

<script>
export default {
	name: 'ShareButton',
	methods: {
        share: function () {
            const url = "https://cottageclass1.typeform.com/to/XEyKhf"
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

.button {
  border-radius: 4px;
  color: white;
  font-size: 13px;
  font-weight: 400;
  text-align: left;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}


.invite-friends-container {
  font-family: soleil;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin: 24px 16px;
  padding: 40px 24px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: #fff;
  text-align: left;
}


</style>