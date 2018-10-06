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