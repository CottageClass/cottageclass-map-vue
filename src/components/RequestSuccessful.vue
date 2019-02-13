<template>
<OnboardingStyleWrapper styleIs="onboarding">
<div class="body">
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">Messages sent</h1>
      <p class="onb-paragraph-subheading-2">We've sent your messages. You'll receive responses via text message soon! Then simply respond to any questions, finalize the details, and you'll be all set!</p>
    </div>
    <router-link
    class="splash-button w-inline-block"
    :to="{ name: 'Home' }">
    <div class="button-text">CONTINUE</div>
    </router-link>
  </div>
</div>
</OnboardingStyleWrapper>
</template>

<script>
import OnboardingStyleWrapper from '@/components/FTE/OnboardingStyleWrapper.vue'

export default {
  name: 'RequestSuccessful',
  components: { OnboardingStyleWrapper }
}

</script>
