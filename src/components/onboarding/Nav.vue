<template>
  <div class="onb-title-bar"><a @click="$emit('prev')" class="onb-title-bar-back-button w-inline-block"></a>
  <a v-if="button != 'none'" @click="$emit('next')" :class="classObject">
    <div class="onb-title-bar-next-button-text">{{ text }}</div>
  </a>

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
				"onb-title-bar-next-button-inactive": this.button === 'inactive',
				"onb-title-bar-next-button": !(this.button === 'inactive'),
				"w-inline-block": true
			}
		}
	}
};

</script>

<style scoped>

.onb-title-bar a {
	text-decoration: none
}

.onb-title-bar {
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
  width: 100%;
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
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .08);
}

.onb-title-bar-next-button {
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

.onb-title-bar-next-button:active {
  background-color: #64426b;
  color: #fff;
}

.onb-title-bar-next-button-text {
  margin-bottom: 2px;
  font-size: 14px;
  line-height: 14px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

.onb-title-bar-back-button {
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

.onb-title-bar-back-button:active {
  background-color: hsla(0, 0%, 100%, .2);
  background-image: url('../../assets/arrow-back-white.svg');
  background-size: 24px;
}

.onb-title-bar-next-button-inactive {
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

.onb-error-text {
  font-size: 13px;
}

.onb-error-label {
  margin-bottom: 6px;
  font-weight: 700;
}


</style>