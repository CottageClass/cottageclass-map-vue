<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What kind of food will you serve at your activity?</h1>
      <p class="onb-paragraph-subheading-2">All hosts must provide a healthy food option, but it doesn't have to be fancy or time-consuming. Choose one of these tried-and-true options.</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="food in foods" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': food == foodSelected}">
          <input 
          type="radio" 
          :id="food" 
          :value="food"
          :name="food" 
          class="onb-checkbox w-checkbox-input"
          v-model="foodSelected"
          >
          <label 
          :for="food" 
          class="onb-checkbox-label w-form-label"
          >
           {{ capitalizeFirstLetter(food) }}
         </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Food",
  props: ['value'],
  data () {
    return {
      foodSelected: "",
      errorMesg: 'Please choose a food option from the list.',
      foods: [
      'pizza',
      'tacos',
      'soup',
      'pancakes',
      'rice & beans',
      'mac \'n\' cheese',
      'pasta',
      'chili',
      'hot dogs',
      'sandwiches'
      ]
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    err: function () {
      if (this.foods == '') {
        return this.errorMesg
      } else {
        return false
      }
    }
  },
  watch: {
    foodSelected: function () {
        this.$emit('input', {
          selected: this.foodSelected,
          err: this.err
        })
      }
    },
  methods: {
    capitalizeFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped>

.describe-label {
  color: white;
  padding-top: 16px;
}

textarea {
  height: 96px;
}

.onb-content-container {
  height: unset;
}

</style>

