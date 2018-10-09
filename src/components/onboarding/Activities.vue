<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Activities</h1>
      <p class="onb-paragraph-subheading-2">What are the activities kids especially love doing with you?</p>
    </div>
    <div class="onb-form-block-checkbox-list w-form">
      <form class="onb-form-checkbox-list">
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.playingOutside}"><input v-model="activities.playingOutside" type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="onb-checkbox w-checkbox-input"><label for="checkbox" class="onb-checkbox-label w-form-label">Playing outside</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.artsAndCrafts}"><input v-model="activities.artsAndCrafts" type="checkbox" id="checkbox-1" name="checkbox-1" data-name="Checkbox 1" class="onb-checkbox w-checkbox-input"><label for="checkbox-1" class="onb-checkbox-label w-form-label">Arts &amp; crafts</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.fieldTrips}"><input v-model="activities.fieldTrips" type="checkbox" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" class="onb-checkbox w-checkbox-input"><label for="checkbox-2" class="onb-checkbox-label w-form-label">Field trips</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.cooking}"><input v-model="activities.cooking" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" class="onb-checkbox w-checkbox-input"><label for="checkbox-3" class="onb-checkbox-label w-form-label">Cooking</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.homeworkHelp}"><input v-model="activities.homeworkHelp" type="checkbox" id="checkbox-4" name="checkbox-4" data-name="Checkbox 4" class="onb-checkbox w-checkbox-input"><label for="checkbox-4" class="onb-checkbox-label w-form-label">Homework help</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.bilingualImmersion}"><input v-model="activities.bilingualImmersion" type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="onb-checkbox w-checkbox-input"><label for="checkbox-5" class="onb-checkbox-label w-form-label">Bilingual immersion</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': activities.music}"><input v-model="activities.music" type="checkbox" id="checkbox-6" name="checkbox-6" data-name="Checkbox 6" class="onb-checkbox w-checkbox-input"><label for="checkbox-6" class="onb-checkbox-label w-form-label">Music</label></div>
      </form>
    </div>
    <p class="onb-paragraph-small-50"></p>
  </div>
</template>

<script>

export default {

  name: "Activities",
  props: ['value'],
  data () {
    return {
      activities: this.value
    }
  },
  watch: {
    activities: function () {
      this.$emit('input', this.activities)
    }
  }
};
</script>

