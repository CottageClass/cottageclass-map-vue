<template>
<div class="body">
	<MainNav />
	<div class="container w-container">
	<h1 class="heading-1">Edit profile</h1>
  <OnboardingStyleWrapper styleIs="editing" class="cards">	
	  <Phone />
	  <Location />
	  <Availability />
	  <Children />
  </OnboardingStyleWrapper>
  </div>		
	<Footer />
</div>

</template>

<script>
import Location from '@/components/onboarding/Location.vue'
import Phone from '@/components/onboarding/Phone.vue'
import Children from '@/components/onboarding/Children.vue'
import Availability from '@/components/onboarding/Availability.vue'
import MainNav from '@/components/MainNav.vue'
import Footer from '@/components/Footer.vue'
import OnboardingStyleWrapper from '@/components/onboarding/OnboardingStyleWrapper.vue'


export default {
	name: 'ProfileEdit',
	components: { Location, Phone, Children, Availability, MainNav, Footer, OnboardingStyleWrapper }
};
</script>

<style scoped>
.body {
  font-family: soleil;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  background-color: #f5f5f5;
}

.heading-1 {
  margin-bottom: 32px;
}

.container {
  padding: 32px 32px 100px;
}

@media (max-width: 991px) {
  .body {
    padding-bottom: 77px;
  }

  .container {
    padding-bottom: 32px;
  }
}

@media (max-width: 767px) {
  .body {
    padding-bottom: 50px;
  }

  .heading-1 {
    margin-right: 24px;
    margin-left: 24px;
  }

  .container {
    padding-top: 16px;
    padding-right: 0px;
    padding-left: 0px;
  }
}

@media (max-width: 479px) {
  .heading-1 {
    font-size: 34px;
    line-height: 44px;
  }
}

</style>