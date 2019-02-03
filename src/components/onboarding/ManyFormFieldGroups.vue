<template>
  <span>
      <form v-on:submit.prevent id="email-form-2" name="email-form-2" data-name="Email Form 2" class="form-2">
        <div
        v-for="(object, index) in objects"
        class="onb-child-group-2">
          <FormFieldGroup
          :names="names"
          :key="objects[index].key"
          :labels="labels"
          :placeholders="placeholders"
          :heading="headingWord ? headingWord + ' ' + (index + 1) : headings ? headings[index] : ''"
          :types="types"
          v-model="objects[index]"
          @remove="removeGroup(index)"
          :showRemoveButton="addAndRemove"
          />
        </div>
      </form>
      <a
      v-if="addAndRemove"
      @click="add"
      class="onb-button-add-group w-inline-block">
        <img src="@/assets/add.svg" alt="" class="image-7">
        <div class="onb-button-add-group-text">Add Another {{ headingWord }}</div>
      </a>
    </span>
 </template>
<script>
import FormFieldGroup from '@/components/onboarding/FormFieldGroup.vue'
var _ = require('lodash/core')

export default {
  name: 'ManyFormFieldGroups',
  components: { FormFieldGroup },
  props: ['value', 'labels', 'placeholders', 'headingWord', 'headings', 'names', 'types', 'addAndRemove'],
  data () {
    return {
      objects: this.value
    }
  },
  mounted: function () {
    if (this.objects.length < 1) {
      this.objects = [this.newObject()]
    }
  },
  computed: {
    anEmptyObject: function () {
      return this.names.reduce(function (obj, name) {
        return { ...obj, [name]: '' }
      }, {})
    }
  },
  methods: {
    add: function () {
      this.objects.push(this.newObject())
    },
    removeGroup: function (index) {
      console.log('removing' + index, this.objects[index])
      this.objects.splice(index, 1)
    },
    newObject: function () {
      let obj = JSON.parse(JSON.stringify(this.anEmptyObject))
      obj.key = _.uniqueId()
      return obj
    }
  },
  watch: {
    objects: function () {
      function removeKey (obj) {
        let newObject = obj
        delete newObject.key
        return newObject
      }
      this.$emit('input', this.objects.map(removeKey))
    }
  }
}
</script>
