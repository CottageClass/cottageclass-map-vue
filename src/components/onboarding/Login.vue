<template>
<div id="body onb-body-splash">
  <div class="div-block-6"><img src="@/assets/cc-splash-logo.svg" width="150" alt=""></div>
  <div class="onb-splash-title-container">
    <h1 class="onb-heading-large-black">Why parent alone?</h1>
    <p class="onb-paragraph-subheading-2-black">Sign in to build the free, flexible, childcare network of your dreams, by connecting with friends and parents in your community.</p>
  </div>
  <div class="embed-facebook-button">
    <div class="w-embed">
      <div @click="$emit('next-step')" class="fb-login-button button">Continue with Facebook</div>
    </div>
  </div>
</div>
</template>

<script>

export default {
	name: 'Login'
};

</script>