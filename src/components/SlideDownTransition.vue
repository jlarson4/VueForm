<template>
  <!-- wrap the built-in Transition component -->
  <div class="slide-down-wrapper">
    <Transition
      name="slide-down"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave">
      <slot class="sliding-element"></slot> <!-- pass down slot content -->
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { elementAddClass, elementRemoveClass } from '../constants/util'

@Component
export default class SlideDownTransition extends Vue {
  onAfterEnter (el: HTMLElement) {
    elementAddClass(el, 'slide-down-complete')
  }

  onBeforeLeave (el: HTMLElement) {
    elementRemoveClass(el, 'slide-down-complete')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .slide-down-wrapper{
    & > *{
      position: fixed;
      top: -100%;
      left: 0;
    }
    @include slide-down;
  }
</style>
