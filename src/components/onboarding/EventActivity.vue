<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Choose your activity</h1>
      <p class="onb-paragraph-subheading-2">All members must provide one activity per month. These tried-and-true options work great, and we'll walk you through whichever one you choose.</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        v-for="activity in activities" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': activity == activitySelected}">
          <input 
          type="radio" 
          :id="activity" 
          :value="activity"
          :name="activity" 
          class="onb-checkbox w-checkbox-input"
          v-model="activitySelected"
          >
          <label 
          :for="activity" 
          class="onb-checkbox-label w-form-label"
          >
           {{ capitalizeFirstLetter(activity) }}
         </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventActivity",
  props: ['value'],
  data () {
    return {
      activitySelected: '',
      errorMesg: 'Please choose an activity option from the list.',
      activities: [
      'movie night',
      'arts & crafts',
      'games & puzzles',
      'baking',
      'book club'
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
      if (this.activitySelected == '') {
        return this.errorMesg
      } else {
        return false
      }
    }
  },
  watch: {
    activitySelected: function () {
        this.$emit('input', {
          selected: this.activitySelected,
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
  min-height: 100vh;
}

</style>

