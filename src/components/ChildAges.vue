<template>
  <span>
    <span v-if="childAgesSorted.length === 1">1 kid&mdash;age {{ childAgesSorted[0] }}</span>
    <span v-if="childAgesSorted.length === 2">2 kids&mdash;ages {{ childAgesSorted[0] }} and {{ childAgesSorted[1] }}</span><span v-if="childAgesSorted.length > 2">{{ childAgesSorted.length }} kids&mdash;ages <span v-for="(age, index) in childAgesSorted">
        <span v-if="index === childAgesSorted.length - 1"> and {{ age }}</span>
        <span v-else>{{ age}}<span v-if="index !== childAgesSorted.length - 2">, </span>
        </span>
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ChildAges',
  props: ['childAges'],
  computed: {
    childAgesSorted: function () {
      return this.childAges.concat().sort((a, b) => a - b)
    }
  }
}
</script>
