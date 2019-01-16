<template>
<div class="body">


<!-- nav on wide screens --> 

    <div class="nav-section w-nav hidden-on-phones">
    <div class="nav-container w-container"><a href="#" class="brand w-clearfix w-nav-brand"><img src="@/assets/kc-logo-landscape.svg" alt="" class="image-2"></a>
      <div class="tag-container-desktop hide-tagline-on-small-screens">
        <div class="nav-tag">Free childcare, fun events.</div>
      </div>
      <div class="nav-flex-space"></div>
      <div class="nav-menu-item">
        <a 
        href="#signup" 
        class="menu-link" 
        :class="{ menulinkactive: eventsTabSelected }" 
        @click="tab='events'"
        >EVENTS</a></div>
      <div class="nav-menu-item">
        <a 
        href="#signup" 
        class="menu-link" 
        :class="{ menulinkactive: findTabSelected }"
        @click="tab='find'"
        >REQUEST</a></div>
      <div class="nav-menu-item">
        <a href="#signup" 
        class="menu-link" 
        :class="{ menulinkactive: provideTabSelected }"
        @click="tab='provide'"
>OFFER</a></div>
    </div>
  </div>


<!-- nav on phones --> 

    <div class="tabs-menu w-tab-menu hidden-on-desktop">
      <span 
      @click="tab='events'"
      class="tab-button w-inline-block w-tab-link"
      :class="{ active: eventsTabSelected }">
        <div>Events</div>
      </span>
      <span
      @click="tab='find'"
      :class="{ active: findTabSelected}"
      class="tab-button w-inline-block w-tab-link">
        <div>Request</div>
      </span>
      <span 
      @click="tab='provide'"
      class="tab-button w-inline-block w-tab-link"
      :class="{ active: provideTabSelected }">
        <div>Offer</div>
      </span>
    </div>
    <div class="content">
      <MainView v-if="findTabSelected" />
      <Bookings v-if="provideTabSelected" />
      <Events v-if="eventsTabSelected" />
    </div>
</div>
</template>

<script>
import MainView from '@/components/MainView.vue'
import Bookings from '@/components/Bookings.vue'
import Events from '@/components/Events.vue'

export default {
  name: 'TabNav',
  components: { MainView, Bookings, Events },
  data () {
    return {
      tab: this.$route.params.tab || 'events'
    }
  },
  computed: {
    findTabSelected: function () {
      return this.tab == 'find'
    },
    provideTabSelected: function () {
      return this.tab == 'provide'
    },
    eventsTabSelected: function () {
      return this.tab == 'events'
    }
  }
};
</script>

<style scoped>
.menu-link {
  color: rgba(51, 51, 51, .58);
}

.menulinkactive {
  color: #1f88e9;
}

.tab-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 50%;
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .05);
  color: rgba(51, 51, 51, .58);
  font-size: 12px;
  text-align: center;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.tab-button:active {
  background-color: #1f88e9;
  color: #fff;
}

.tab-button.active {
  padding-right: 16px;
  padding-left: 16px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  background-color: #fff;
  color: #1f88e9;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.3px;
  text-transform: uppercase;
}

.content {
  position: relative;
}

.tabs-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 50px;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
}

/* Frontpage styles for nav */

.image-8 {
  margin-bottom: 0;
}

.body {
  all: unset;
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  background-color: #fff;
}

a {
  color: #1f88e9;
  text-decoration: none;
}

.body {
  overflow: visible;
  background-color: #fff;
  font-family: soleil, sans-serif;
}

.nav-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
}

.button-nav {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #ff6550;
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
  font-size: 0.89rem;
  letter-spacing: 0.12rem;
  text-transform: uppercase;
}

.button-nav:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .06)), to(rgba(0, 0, 0, .06)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .06), rgba(0, 0, 0, .06));
}

.nav-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 0px 32px;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.tag-container-desktop {
  padding-top: 0px;
}

.nav-tag {
  padding-top: 2px;
  color: #a6a6a6;
  font-size: 0.8rem;
}

.image-2 {
  margin-right: 17px;
  float: left;
  opacity: 0.8;
}

.nav-section {
  position: static;
  top: 0px;
  width: 100%;
  background-color: #fff;
}

.nav-flex-space {
  height: 8px;
  min-height: 16px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}

.brand {
  width: 168px;
  margin-right: 12px;
  padding-left: 0px;
}

.div-block-32 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

.content-section {
  display: block;
  margin-top: 0px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
}

.content-container-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.image-261 {
  max-width: 90%;
}

.div-block-33 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 99px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.image-262 {
  width: 100px;
  height: 100px;
  margin-bottom: 16px;
}

.image-263 {
  min-width: 80px;
  margin-right: 8px;
  margin-left: 8px;
}

.button {
  padding: 12px 32px;
  border-radius: 4px;
  background-color: #1f88e9;
  text-align: center;
  color: white;
}

.button:hover {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.button:active {
  background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, .1)), to(rgba(0, 0, 0, .1)));
  background-image: linear-gradient(180deg, rgba(0, 0, 0, .1), rgba(0, 0, 0, .1));
}

.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.body-2 {
  background-color: #f6f6f6;
}

.div-block-36 {
  width: 100%;
  padding: 32px;
  background-color: #fff;
}

.link-block-4 {
  color: #000;
  text-decoration: none;
}

.link-block-4:hover {
  text-decoration: underline;
}

.content-container-3 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 112px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.content-container-4 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 64px 32px 112px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.image-264 {
  width: 40px;
  background-color: #fff;
}

.image-265 {
  width: 40px;
}

.nav-menu {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  padding-top: 0px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  background-color: transparent;
}

.button-nav {
  padding: 4px 12px;
  font-size: 0.8rem;
  letter-spacing: 0.12rem;
}

.button-nav.menu {
  padding: 4px 12px;
  border: 1px solid #000;
  background-color: #fff;
  color: #000;
  font-size: 0.8rem;
  letter-spacing: 0.12rem;
}

.nav-container {
  margin-top: 24px;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.nav-section {
  position: relative;
  padding-bottom: 0px;
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .1);
  opacity: 1;
}

.nav-menu-item {
  padding: 0px 0px 0px 12px;
}

.div-block-32 {
  width: 40%;
  padding: 24px 32px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: flex-start;
  border-top: 1px solid #f4f4f4;
  background-color: #fff;
  box-shadow: 0 14px 20px 0 rgba(0, 0, 0, .11);
}

.content-container-2 {
  padding-top: 100px;
  padding-bottom: 128px;
}

.image-263 {
  min-width: 50px;
}

.content-container-3 {
  padding-top: 100px;
  padding-bottom: 128px;
}

.content-container-4 {
  padding-bottom: 128px;
}

@media (max-width: 767px) {
  .body {
    padding-bottom: 100px;
  }

  .nav-menu {
    margin-top: 0px;
  }

  .nav-container {
    margin-top: 12px;
    margin-bottom: 12px;
    padding-right: 32px;
    padding-left: 32px;
  }

  .nav-tag {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    padding-bottom: 2px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    color: #a6a6a6;
    font-size: 0.71rem;
  }

  .nav-section {
    padding-bottom: 0px;
  }

  .div-block-32 {
    width: 260px;
    margin-right: 32px;
  }

  .content-container-2 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }

  .image-263 {
    min-width: 40px;
  }

  .content-container-3 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }

  .content-container-4 {
    padding-right: 32px;
    padding-bottom: 100px;
    padding-left: 32px;
  }

  .div-block-37 {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

@media (max-width: 620px) {
  .hide-tagline-on-small-screens {
    display: none;
  }
}

@media (min-width: 480px) {
  .hidden-on-desktop {
    display: none;
  }
}

@media (max-width: 479px) {
  .hidden-on-phones {
    display: none;
  }

  .body {
    padding-bottom: 110px;
  }

  .nav-menu {
    position: absolute;
    margin-top: 0px;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .nav-container {
    padding-right: 20px;
    padding-left: 20px;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  .nav-tag {
    padding-left: 20px;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }

  .brand {
    width: 140px;
  }

  .div-block-32 {
    width: 100%;
    margin-right: 0px;
  }

  .content-container-2 {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .image-261 {
    max-width: 100%;
  }

  .button {
    width: 100%;
    margin-top: 20px;
  }

  .div-block-36 {
    padding: 24px;
  }

  .content-container-3 {
    padding: 64px 16px;
  }

  .content-container-4 {
    padding: 64px 16px;
  }

  .image-264 {
    width: 32px;
  }

  .image-265 {
    width: 32px;
  }

  .div-block-37 {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: start;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
}

</style>