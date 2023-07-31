<template>
  <div class="results-window">
    <div class="results-content">
      <span @click='onClose' class="close">
        <img alt="Close Modal" aria-label="close the popup window and return to the form" src="../assets/closemodal.png">
      </span>
      <h2>Thank you for your responses, we will get back to you soon!</h2>
      <p><strong>Full Name:</strong><br/>{{fullName()}}</p>
      <p><strong>Telephone:</strong><br/>{{telephone()}}</p>
      <p><strong>Interest:</strong><br/>{{interest()}}</p>
      <p><strong>References:</strong><br/>{{references()}}</p>
      <p><strong>Description:</strong><br/>{{description()}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CLEAR_FORM_MUTATION } from '../models/store'

@Component
export default class ResultsWindow extends Vue {
  fullName () {
    return this.$store.state.name
  }

  telephone () {
    return this.$store.state.telephone
  }

  interest () {
    return this.$store.state.interest
  }

  references () {
    return this.$store.state.reference.join(', ')
  }

  description () {
    return this.$store.state.description
  }

  onClose () {
    this.$store.commit(CLEAR_FORM_MUTATION)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .results-window{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color-base, 25%);
    opacity: 0;
    z-index: 15;
    .results-content{
      position: relative;
      background-color: $color-reverse;
      min-width: 50%;
      padding: 3vw 5vw;
      text-align: left;;
      .close{
        position: absolute;
        top: 15px;
        right: 25px;
        filter: brightness(0);
        cursor: pointer;
        -webkit-filter: brightness(0);
        &:hover{
          filter: brightness(.5);
          -webkit-filter: brightness(.5);
        }
        img{
          display: block;
          width: 25px;
          height: auto;
        }
      }
    }
  }
</style>
