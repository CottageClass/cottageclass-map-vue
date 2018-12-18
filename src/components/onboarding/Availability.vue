<template>
 <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">When can you provide emergency care?</h1>
      <p class="onb-paragraph-subheading-2">We'll text you if other parents need care during these times. There's never any obligation to respond, so just pick times when you're <em>usually</em> available.</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form id="email-form" name="email-form" data-name="Email Form" class="onb-form-checkbox-list">
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.mornings}"><input v-model="availability.mornings" type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="onb-checkbox w-checkbox-input" :class="{ 'active-checkbox': availability.mornings }"><label for="checkbox" class="onb-checkbox-label w-form-label">9am - 3pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.afternoons}"><input v-model="availability.afternoons" type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="onb-checkbox w-checkbox-input"><label for="checkbox-5" class="onb-checkbox-label w-form-label">3pm - 7pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.evenings}"><input v-model="availability.evenings" type="checkbox" id="checkbox-4" name="checkbox-4" data-name="Checkbox 4" class="onb-checkbox w-checkbox-input"><label for="checkbox-4" class="onb-checkbox-label w-form-label">After 7pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.weekends}"><input v-model="availability.weekends" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" class="onb-checkbox w-checkbox-input"><label for="checkbox-3" class="onb-checkbox-label w-form-label">Weekends</label></div>
      </form>
    </div>
    <p class="onb-paragraph-small-50">You&#x27;ll be able to accept or decline any requests. Most families list days and times that they are generally at home with their own children or doing a fun or educational activity which they&#x27;d like to include other children in.</p>
  </div>
</template>

<script>

export default {

  name: "Availability",
  props: ['value'],
  data () {
    return {
      availability: this.value
    }
  },
  watch: {
    availability: {
      handler: function () {
        this.availability.err = false
        this.$emit('input', this.availability)
      },
      deep: true
    }
  }
};
</script>

<style scoped>

.onb-content-container {
  height: unset;
  min-height: 100%;
}

</style>

