<template>
	<div>
		html:
		<input type="textarea" v-model="html">
		css:
		<input type="textarea" v-model="css">
		output:
		<input type="textarea" v-model="output">
	</div>
</template>

<script>

import purify from "purify-css"

export default {
    name: 'HtmlCssUtils',
    data () {
      return {
      	html: '',
      	css: ''
      }
    },
    computed: {
    	output: function () {
    		purify(this.html, this.css)
    	}
    }
};
</script>