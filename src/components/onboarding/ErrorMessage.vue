<template>
<div class="onb-error-container">
	<div class="onb-error-text">{{ text }}</div>
</div>
</template>

<script>
export default {
  props: ['text'],
  name: 'ErrorMessage'
}
</script>