<template>
  <Question 
  title="How many children can you host at your playdate?"
  explanation="For each child you host, you receive points that you can use to attend others' playdates.">
  <div class="dropdown-container">
      <div>
        <select class="w-form" v-model="maxChildren">
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

.w-form {
    background-color: hsla(0, 0%, 100%, .7);
  padding: 16px 8px 24px 24px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 30px;
}

.dropdown-container {
  text-align: center;
  font-size: 24px;
  padding: 0 0 16px 0;
}

</style>
