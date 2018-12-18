<template>
  <div class="onb-content-container">
    <div class="onb-top-content-container">
      <h1 class="onb-heading-large">Community Rules</h1>
      <p class="onb-paragraph-subheading-2">These are the rules everyone in our community agrees to follow. Please read them carefully, along with our <a href="https://cottageclass.com/terms-of-service">Terms of Service</a>.</p>
    </div>
    <div class="onb-paragraph-align-left">
        <ol>
          <li>Rule 1</li>
          <li>Rule 2</li>
          <li>Rule 3</li>
          <li>Rule 4</li>
        </ol>
      <p>
        For any questions or comments, or to report violations of these rules, please contact us at: <a href="mailto:contact@cottageclass.com">contact@cottageclass.com</a>
      </p>    <br/>
      <br/>
      <br/></div>
    <div class="onb-fixed-bottom-actions-checkbox-container">
      <div class="form-block-2 w-form">
        <form id="email-form" name="email-form" data-name="Email Form">
          <div class="checkbox-field w-checkbox"><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" class="w-checkbox-input" v-model="checked">
            <label for="checkbox" class="checkbox-label w-form-label">I agree to these rules</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Rules',
    props: ['value'],
    data () {
      return {
        checked: this.value.agreed,
        errorMsg: 'To continue, please agree to follow all community rules by checking the box below.'
      }
    },
    methods: {
      toggle: function () {
        this.checked = !this.checked
      }
    },
    mounted: function () {
      if (!this.checked) {
        this.$emit('input', {
          agreed: this.checked,
          err: this.errorMsg
        })}
    },
    computed: {
      err: function () {
        if (this.checked) {
          return false
        } else {
          return this.errorMsg
        }
      },
    },
    watch: {
      checked: function () {
        this.$emit('input', {
          agreed: this.checked,
          err: this.err
        })
      }
    }
  };

</script>

<style scoped>

  p a {
    text-decoration: underline
  }

  .onb-content-container {
    height: unset;
    min-height: 100vh;
  }

  h1, h2 {
    margin-top: 0px;
    margin-bottom: 10px;
    color: #fff;
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.3px;
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 10px;
    color: hsla(0, 0%, 100%, .5);
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

</style>
