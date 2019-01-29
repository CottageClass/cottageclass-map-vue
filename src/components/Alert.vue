<template>
<div class="alert-container alert-success">
  <slot></slot>
</div>
   <!--
      <div class="alert-container alert-failure" id="alert">
        Sorry, this event is full &amp; not accepting any more RSVPs.
      </div>
    -->
</template>

<script>
export default {

}
</script>

<style scoped>

.alert-container {
  width: 100%;

  margin-bottom: 16px;
  padding: 10px 10px 10px;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -webkit-align-items: flex-start;
  -ms-flex-align: start;
  align-items: center;
  color: #17c700;
}

.alert-success {
  background-color: #c1ffda;
  color: rgb(12, 186, 82);
}

.alert-failure {
  background-color: #ffbebe;
  color: #c73200;
}

@media (max-width: 479px) {
  .alert-success a {
    display: inline;
    font-weight: bold;
    color: inherit;
  }
}
</style>
