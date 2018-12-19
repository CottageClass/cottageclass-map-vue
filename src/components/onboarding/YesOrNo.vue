<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">{{ question }}</h1>
      <p class="onb-paragraph-subheading-2">{{ description }}</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': yesOrNo == 'yes'}">
          <input 
          type="radio" 
          id="yes" 
          value="yes"
          name="yes" 
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label 
          for="yes" 
          class="onb-checkbox-label w-form-label"
          >
           Yes
         </label>
        </div>
        <div
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': yesOrNo == 'no'}">
          <input 
          type="radio" 
          id="no" 
          value="no"
          name="no" 
          class="onb-checkbox w-checkbox-input"
          v-model="yesOrNo"
          >
          <label 
          for="no" 
          class="onb-checkbox-label w-form-label"
          >
           No
         </label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "YesOrNo",
  props: ['value', 'question', 'description'],
  data () {
    return {
      yesOrNo: null,
      errorMesg: 'Please answer yes or no.',
    }
  },
  mounted: function () {
    this.$emit('input', {
      err: this.errorMesg
    })
  },
  computed: {
    err: function () {
      if (this.trueOrFalse == null) {
        return this.errorMesg
      } else {
        return false
      }
    },
    trueOrFalse: function () {
      switch (this.yesOrNo) {
        case 'yes':
          return true
        case 'no':
          return false
        default:
          return null
      }
    }
  },
  watch: {
    yesOrNo: function () {
        this.$emit('input', {
          isTrue: this.trueOrFalse,
          err: this.err
        })
      }
    }
};
</script>
