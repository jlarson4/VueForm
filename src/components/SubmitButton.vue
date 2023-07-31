<template>
  <input type="submit" value="Submit" class="btn" v-bind:class="{ hide: hideButton }" />
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
.btn{
  position: relative;
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  opacity: 1;
  transition: .3s opacity, .3s background-color, .3s margin-bottom;
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
</style>
