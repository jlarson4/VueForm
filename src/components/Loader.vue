<template>
  <div class="loader-wrapper">
    <img class="loader-spinner" alt="Loading" aria-label="Loading, be with you shortly" src="../assets/Blueballs.gif">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Loader extends Vue {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .loader-wrapper{
    width: 100%;
    .loader-spinner{
      position: relative;
      display: block;
      margin: 0 auto;
      max-width: 50px;
      padding: 11px 0;
    }
  }
</style>
