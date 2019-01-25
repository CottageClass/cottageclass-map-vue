<template>
  <div class="content-container">
    <div class="title-container">
      <h1 class="title">{{ title }}</h1>
    </div>
    <div class="location-search-container">
    	<slot></slot>
    </div>
    <p class="paragraph-small-50">{{ explanation }}</p>
  </div>
</template>

<script>
export default {
	name: 'Question',
	props: ['title', 'explanation']
}
</script>