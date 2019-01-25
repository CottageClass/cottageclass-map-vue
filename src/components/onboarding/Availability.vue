<template>
 <Question
 title="When are you available for childcare in a pinch?"
 subtitle="Other parents may text you to request care during the times you choose. There's never any obligation to respond, so just pick times when you're usually available to provide care."
 explanation="You'll be able to accept or decline any requests. Most families list days and times that they are generally at home with their own children or doing a fun or educational activity which they'd like to include other children in.">
    <div class="onb-form-block-checkbox-list w-form">
      <form id="email-form" name="email-form" data-name="Email Form" class="onb-form-checkbox-list">
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.availableMornings}"><input v-model="availability.availableMornings" type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="onb-checkbox w-checkbox-input" :class="{ 'active-checkbox': availability.availableMornings }"><label for="checkbox" class="onb-checkbox-label w-form-label">9am - 3pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.availableAfternoons}"><input v-model="availability.availableAfternoons" type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" class="onb-checkbox w-checkbox-input"><label for="checkbox-5" class="onb-checkbox-label w-form-label">3pm - 7pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.availableEvenings}"><input v-model="availability.availableEvenings" type="checkbox" id="checkbox-4" name="checkbox-4" data-name="Checkbox 4" class="onb-checkbox w-checkbox-input"><label for="checkbox-4" class="onb-checkbox-label w-form-label">After 7pm</label></div>
        <div class="checkbox-field-extra-space" :class="{'active-checkbox': availability.availableWeekends}"><input v-model="availability.availableWeekends" type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" class="onb-checkbox w-checkbox-input"><label for="checkbox-3" class="onb-checkbox-label w-form-label">Weekends</label></div>
      </form>
    </div>
  </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'

export default {

  name: 'Availability',
  props: ['value'],
  components: { Question },
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
}
</script>

<style lang="scss" scoped>

.onb-content-container {
  height: unset;
  min-height: 100%;
}

.onb-checkbox {
    margin-top: 22px;
}

</style>
