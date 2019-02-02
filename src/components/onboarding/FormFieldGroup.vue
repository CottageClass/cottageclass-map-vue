<template>
  <span>
  <div class="onb-group-header">
    <h2 class="onb-child-group-heading">{{ heading }}</h2>
    <a
    @click="$emit('remove')"
    class="onb-button-delete-child w-inline-block">
    <img src="@/assets/remove.svg" width="24" height="24" alt="" class="image-6"></a>
  </div>
  <FormFieldAndLabel v-for="(name, index) in names"
  v-model="objectOfFormValues[name]"
  :label="labels[index]"
  :placeholder="placeholders[index]"
  :key="name"
  :type="types[index]"
  />
</span>
</template>

<script>
import FormFieldAndLabel from '@/components/onboarding/FormFieldAndLabel.vue'
export default {
  name: 'FormFieldGroup',
  components: { FormFieldAndLabel },
  props: [
    'value', // an array of form entry values from v-model
    'labels', // an array of corresponding field labels
    'names', // an array of key names
    'placeholders', // an array of corresponding form placeholder text
    'heading', // the heading of the group of fields
    'types' // and array of input types for each field
  ],
  data () {
    return {
      objectOfFormValues: this.value
    }
  },
  watch: {
    fieldValues: function () {
      this.$emit('input', this.fieldValues)
    }
  }
}
</script>
