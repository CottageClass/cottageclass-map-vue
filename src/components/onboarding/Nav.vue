<template>
  <div class="body onb-body">
  <div class="title-bar"><a @click="$emit('prev')" class="button-back w-inline-block"></a>
  <a v-if="button != 'none'" @click="$emit('next')" :class="classObject">
    <div class="button-next-text">{{ text }}</div>
  </a>
</div>
</div>
</template>

<script>

// states are: skip, next, none, inactive

export default {
	name: 'Nav',
	props: ['button'],
	computed: {
	    text: function () {
			if (this.button === 'skip') {
				return "SKIP"
			} else {
				return "NEXT"
			}
		},
		classObject: function () {
			return {
				"title-bar-next-button-inactive": this.button === 'inactive',
				"title-bar-next-button": !(this.button === 'inactive'),
				"w-inline-block": true
			}
		}
	}
};

</script>

<style scoped>

.onb-body {
  background-color: #0d73c7;
}

.title-bar {
  font-family: soleil, sans-serif;
}
/* NEW THINGS, CLEAN UP */

.title-bar-next-button {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
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
  border: 1px none #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
  color: #64426b;
}

.title-bar-next-button:active {
  background-color: #64426b;
  color: #fff;
}

.title-bar-next-button-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.title-bar-back-button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 7px;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: transparent;
  background-image: url('../../assets/arrow-back-white.svg');
  background-position: 50% 50%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  color: #1f88e9;
}

.title-bar-back-button:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-image: url('../../assets/arrow-back-white.svg');
  background-size: 24px;
}

.title-bar-next-button-inactive {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
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
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .3);
  box-shadow: none;
  color: rgba(1, 1, 1, .2);
}


/* EXISTING WORK FROM WEBFLOW MOCK */

.body {
  font-family: soleil, sans-serif;
  color: #333;
  font-size: 14px;
  line-height: 20px;
}

a {
  text-decoration: none;
}

.navbar {
  z-index: 5000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #ffc8c8;
}

.menu-button {
  position: fixed;
  left: 14px;
  top: 16px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-right: 0px;
  margin-bottom: 0px;
  padding: 8px;
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
  border-radius: 1000px;
  background-color: #fff;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .2);
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: all 200ms ease;
  transition: all 200ms ease;
}

.menu-button.w--open {
  z-index: 1000;
  border-radius: 1000px;
  background-color: #fff;
  box-shadow: 0 -1px 2px 0 rgba(0, 0, 0, .08);
  -webkit-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.top-line {
  height: 2px;
  background-color: #000;
}

.nav-menu {
  z-index: 0;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 0px;
  padding: 72px 0px 3px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: end;
  -webkit-align-items: flex-end;
  -ms-flex-align: end;
  align-items: flex-end;
  background-color: #fff;
  background-image: url('../../assets/cc-logo-horiz-blue.svg');
  background-position: 50% 23px;
  background-size: 130px;
  background-repeat: no-repeat;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, .2);
  opacity: 0.96;
}

.menu-icon-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 24px;
  height: 24px;
  padding: 6px 4px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-flex: 0;
  -webkit-flex: 0 auto;
  -ms-flex: 0 auto;
  flex: 0 auto;
  background-color: transparent;
}

.nav-link {
  position: static;
  width: 100%;
  margin-top: 1px;
  padding: 24px 16px 24px 24px;
  border-top: 1px solid rgba(0, 0, 0, .04);
  color: #1f88e9;
}

.nav-link:active {
  background-color: #1f88e9;
  color: #fff;
}

.nav-link-2 {
  position: static;
  padding-left: 17px;
}

.nav-link-3 {
  position: static;
  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;
}

.mid-line {
  height: 2px;
  background-color: #000;
}

.bottom-line {
  height: 2px;
  background-color: #000;
}

.bottom-divider {
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, .04);
}

.map-container {
  position: relative;
}

.div-spacer {
  height: 45px;
}

.text-block {
  margin-top: 113px;
  font-size: 50px;
  text-align: center;
}

.body {
  background-color: #0d73c7;
}

.title-bar {
  position: fixed;
  left: 0px;
  top: 0px;
  right: 0px;
  z-index: 1000;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: visible;
  width: 720px;
  margin-right: auto;
  margin-left: auto;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-style: none;
  border-width: 1px;
  border-color: hsla(0, 0%, 100%, .1);
  background-color: rgba(108, 200, 255, .93);
  background-image: url('../../assets/cclogo-house-blue.svg');
  background-position: 50% 13px;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
}

.button-back {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 7px;
  margin-bottom: 8px;
  margin-left: 10px;
  padding: 18px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 4px;
  background-color: transparent;
  background-image: url('../../assets/arrow-back-white.svg');
  background-position: 50% 50%;
  background-size: 24px 24px;
  background-repeat: no-repeat;
  color: #1f88e9;
}

.button-back:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-image: url('../../assets/arrow-back-white.svg');
  background-size: 24px;
}

.button-next {
  position: static;
  display: block;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 0px;
  padding: 10px 12px;
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
  border: 1px none #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: none;
  color: #64426b;
}

.button-next:active {
  background-color: #64426b;
  color: #fff;
}

.button-next-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.content-container {
  margin-bottom: 0px;
  padding: 32px;
  background-color: #1d8be7;
}

.text-area-decribe-need {
  min-height: 120px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-left: 18px;
  border: 1px none #000;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
  font-size: 16px;
}

.text-area-decribe-need:active {
  background-color: #fff;
}

.text-area-decribe-need:focus {
  background-color: #fff;
}

.text-area-decribe-need::-webkit-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need:-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::-ms-input-placeholder {
  color: rgba(0, 0, 0, .3);
}

.text-area-decribe-need::placeholder {
  color: rgba(0, 0, 0, .3);
}

.counter-subtitle {
  margin-bottom: 4px;
  color: hsla(0, 0%, 100%, .7);
  line-height: 18.2px;
  text-align: center;
}

.count {
  color: #fff;
  font-size: 60px;
  line-height: 68px;
  font-weight: 300;
  text-align: center;
}

.promo-container {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 32px;
  padding: 24px 16px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  border-radius: 4px;
  background-color: #fff;
  background-image: linear-gradient(343deg, #0cba52, rgba(12, 186, 82, .7));
}

.counter-item {
  width: 33.33333333%;
}

.radio-button-field {
  margin-bottom: 8px;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .7);
}

.radio-button-field:active {
  background-color: #fff;
}

.radio-button-field:focus {
  background-color: #fff;
}

.radio-button-label {
  width: 100%;
  padding-top: 18px;
  padding-bottom: 18px;
  padding-left: 6px;
  color: #1d8ae7;
  font-weight: 400;
}

.label-time-interval {
  color: #fff;
  font-size: 10px;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.field-i-agree {
  display: block;
  padding-left: 35px;
  border-radius: 4px;
  background-color: hsla(0, 0%, 100%, .05);
}

.image-free-tag {
  height: 40px;
  margin-bottom: 8px;
}

@media (max-width: 991px) {
  .content-wrapper {
    width: 670px;
  }
  .title-bar {
    width: auto;
  }
  .fb-container {
    width: auto;
  }
}

@media (max-width: 767px) {
  .content-wrapper {
    width: 100%;
    margin-top: 0px;
    margin-bottom: 0px;
  }
}

@media (max-width: 479px) {
  .content-wrapper {
    position: fixed;
  }
  .title-bar {
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .fb-button {
    width: 100%;
    padding-bottom: 17px;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .fb-button:active {
    background-color: #3b5998;
  }
  .fb-button-text {
    font-weight: 400;
  }
  .content-container {
    overflow: visible;
  }
}


</style>