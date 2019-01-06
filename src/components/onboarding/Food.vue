<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">What kind of food will you serve at your activity?</h1>
      <p class="onb-paragraph-subheading-2">All hosts must provide a dinner for kids. We may ask you to accommodate allergies and dietary restrictions, but it doesn't have to be time-consuming. Choose one of these tried-and-true options.</p>
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
      'pizza \ud83c\udf55',
      'tacos \ud83c\udf2e',
      'soup \ud83c\udf5c',
      'pancakes \ud83e\udd5e',
      'rice & beans \ud83c\udf5a',
      'mac \'n\' cheese \ud83e\uddc0',
      'pasta \ud83c\udf5d',
      'chili \ud83c\udf36\ufe0f',
      'hot dogs \ud83c\udf2d',
      'sandwiches \ud83e\udd6a'
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

<style lang="scss" scoped>
@import '../../assets/css/onboarding-and-forms.css';

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

