<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">How many children can you host at your activity?</h1>
    </div>
    <div class="dropdown-container">
      <div class="w-form">
        <select v-model="maxChildren">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
    </div>
        <p class="onb-paragraph-small-50">For each child you host, you receive points that you can use to attend others' activities.</p>
  </div>
</template>

<script>
export default {
  name: "MaxChildren",
  data () {
  	return {
  		maxChildren: 2
  	}
  },
  watch: {
    maxChildren: function () {
      this.$emit('input', this.maxChildren)
    }
  }
};
</script>

<style scoped>

select {
  all: unset;
}

.dropdown-container {
  text-align: center;
  font-size: 24px;
}

</style>
