<template>
  <div class="onb-content-container _100vh">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">How many children can you host at your playdate?</h1>
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
    <br>
        <p class="onb-paragraph-small-50">For each child you host, you receive points that you can use to attend others' playdates.</p>
  </div>
</template>

<script>
export default {
  name: 'MaxChildren',
  data () {
  	return {
  		maxChildren: 2
  	}
  },
  mounted: function () {
    this.$emit('input', this.maxChildren)
  },
  watch: {
    maxChildren: function () {
      this.$emit('input', this.maxChildren)
    }
  }
}
</script>

<style lang="scss" scoped>

select {
  all: unset;
}

.dropdown-container {
  text-align: center;
  font-size: 24px;
  background-color: hsla(0, 0%, 100%, .7);
  height: 56px;
  padding: 16px 12px 0px 18px;
  border-radius: 4px;
}

</style>
