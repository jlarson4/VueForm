<template>
  <div class="submit-wrapper">
    <input type="submit" value="Submit" class="btn" v-bind:class="{ hide: hideButton }" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SubmitButton extends Vue {
  @Prop() private hideButton!: boolean;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .submit-wrapper{
    width: 100%;
    .btn{
      position: relative;
      display: block;
      margin: 0 auto;
      width: 100%;
      max-width: 150px;
      opacity: 1;
      padding: 15px 10px;
      margin-bottom: 20px;
      background-color: $color-lt-gray;
      border: none;
      border-radius: 25px;
      color: $color-base;
      font-weight: bold;
      font-size: 1.2em;
      cursor: pointer;
      &.hide{
        opacity: 0;
        pointer-events: none;
        margin-bottom: 0;
      }
      &:hover{
        background-color: lighten($color-dk-gray, 25%);
      }
    }
  }
</style>
