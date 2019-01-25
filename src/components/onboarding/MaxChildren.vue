<template>
  <Question 
  title="How many children can you host at your playdate?"
  explanation="For each child you host, you receive points that you can use to attend others' playdates.">
      <div class="w-form dropdown-container">
        <select v-model="maxChildren">
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
  </Question>
</template>

<script>
import Question from '@/components/onboarding/Question.vue'

export default {
  name: 'MaxChildren',
  components: { Question },  
  data () {
    return {
      maxChildren: 2
    }
  },
  mounted: function () {
    this.$emit('input', this.maxChildren)
  },
  watch: {
    maxChildren: function () {
      this.$emit('input', this.maxChildren)
    }
  }
};
</script>

<style scoped>

select {
  all: unset;
}

.dropdown-container {
  text-align: center;
  font-size: 24px;
  background-color: hsla(0, 0%, 100%, .7);
  height: 56px;
  padding: 16px 12px 0px 18px;
  border-radius: 4px;
}

</style>
