<template>
    <div class="w-form">
      <form class="onb-form-checkbox-list">
        <div
          v-for="(id, index) in ids"
          class="checkbox-field-extra-space"
          :class="{'active-checkbox': isChecked(index)}"
        >
          <input
            @click="toggleSelected(id)"
            type="checkbox"
            :id="index"
            :name="index"
            class="onb-checkbox w-checkbox-input"
            :checked="isChecked(index)"
            :class="{ 'active-checkbox': isChecked(index) }">
          <label :for="index" class="onb-checkbox-label w-form-label">
            {{ labels[index][1] }}
          </label>
        </div>
      </form>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
// labels is an array of arrays [id, label]
// value is an array of ids

  name: 'Checkboxes',
  props: ['value', 'labels'],
  data: () => {
    return { state: null }
  },
  computed: {
    ids: function () {
      return this.labels.map(pair => pair[0])
    },
    isChecked: function () {
      return function (index) {
        return this.state.includes(this.ids[index])
      }
    }
  },
  methods: {
    toggleSelected: function (id) {
      if (this.state.includes(id)) {
        this.state = this.state.filter(item => item !== id)
      } else {
        this.state.push(id)
      }
    }
  },
  watch: {
    state: function () {
      this.$emit('input', this.state)
    }
  },
  mounted: function () {
    this.state = this.value
  }
}
</script>

<style lang="scss" scoped>

.onb-checkbox {
    margin-top: 22px;
}

</style>
