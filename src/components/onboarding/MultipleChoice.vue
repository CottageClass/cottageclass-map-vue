<template>
    <div class="w-form">
      <form class="onb-form-checkbox-list">
        <div 
        v-for="(key, index) in keys" 
        class="checkbox-field-extra-space" 
        :class="{'active-checkbox': objValues[index]}"
        >
          <input
          :v-if="vModelIs=='object'"
          v-model="value[key]" 
          type="checkbox" 
          :id="index" 
          :name="index"
          class="onb-checkbox w-checkbox-input" 
          :class="{ 'active-checkbox': objValues[index] }">
          <input
          v-if="vModelIs=='array'"
          @click="toggleSelected(key)"
          type="checkbox" 
          :id="index" 
          :name="index"
          class="onb-checkbox w-checkbox-input"
          :class="{ 'active-checkbox': objValues[index] }">          
          <label :for="index" class="onb-checkbox-label w-form-label">
            {{ keysOrLabels[index] }}
          </label>
        </div>
      </form>
    </div>
</template>

<script>
export default {

// labelsAndOrder is an array of arrays [key, label] and is optional, for when label names are different than key names. It determines the order. 
// value is an array of ids or an object of keys and values. if an array of ids, v-model returns ids.  

  name: 'MultipleChoice',
  props: ['value', 'labelsAndOrder', 'type'],
  computed: {
    keys: function () {
        return this.labelsAndOrder.map(pair => pair[0])
    },
    objValues: function () {
      return this.keys.map(key => this.value[key])
    },
    keysOrLabels: function () {
      if (this.labelsAndOrder) {
        return this.labelsAndOrder.map(pair => pair[1])
      } else {
        return this.keys
      }
    },
    vModelIs: function () {
      if (Array.isArray(this.value)) {
        return 'array'
      } else {
          return typeof this.value
        }
      }
  },
  methods: {
    toggleSelected: function (key) {
      if (this.value.includes(key)) {
        this.value = this.value.filter(item => item != key)
      } else {
        this.value = this.value.push(key)
      }
    }
  },
  watch: {
    value: function () {
        this.$emit('input', this.value)
      },
  }
}
</script>

<style lang="scss" scoped>

.onb-checkbox {
    margin-top: 22px;
}

</style>
