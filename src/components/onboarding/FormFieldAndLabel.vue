<template>
  <span>
    <label
      :for="name"
      class="onb-field-label"
    >{{ label }}
    </label>
    <input
      :type="type || 'text'"
      class="name-text-field w-input"
      :name="name"
      :placeholder="placeholder"
      :id="name"
      v-model="fieldValue" />
  </span>
</template>

<script>
export default {
  name: 'FormFieldAndLabel',
  props: ['value', 'placeholder', 'label', 'name', 'type'],
  data () {
    return {
      fieldValue: this.value
    }
  },
  watch: {
    fieldValue: function () {
      this.$emit('input', this.fieldValue)
    }
  }
}
</script>
