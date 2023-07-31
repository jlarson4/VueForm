<template>
  <div id="app">
    <div class="form-window" v-bind:class="{padBot: !formValid () && !formSubmitting}">
      <h1>{{ formData.title }}</h1>
      <form :id="formData.ID" v-on:submit="formSubmitted">
          <template v-for="(field) in formData.fields">
              <InputField :key="field.ID" v-bind="field"></InputField>
          </template>
          <div class="form-footer">
            <Transition name="fade-in" appear>
              <SubmitButton key="button" v-if="formValid () && !formSubmitting"/>
              <Loader key="loader" v-else-if="formValid () && formSubmitting" />
            </Transition>
          </div>
      </form>
    </div>
    <SlideDownTransition>
      <ResultsWindow key="window" v-if="showResults ()" />
    </SlideDownTransition>
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubmitButton from './components/SubmitButton.vue'
import Loader from './components/Loader.vue'
import InputField from './components/InputField.vue'
import formData from './constants/formData'
import ResultsWindow from './components/ResultsWindow.vue'
import SlideDownTransition from './components/SlideDownTransition.vue'
import { SUBMIT_FORM_ACTION } from './models/store'

@Component({
  components: {
    InputField,
    SubmitButton,
    Loader,
    ResultsWindow,
    SlideDownTransition
  }
})
export default class App extends Vue {
  private formData = formData
  private requiredFieldsCount = formData.fields.filter(field => field.required).length
  private formSubmitting = false

  /**
  * Checks the validity of the form
  * @return boolean
  */
  formValid () {
    return this.requiredFieldsCount === this.$store.state.validFields
  }

  /**
  * Checks if the results should be shown
  * @return boolean
  */
  showResults () {
    return this.formValid() && this.$store.state.submitSuccess
  }

  /**
  * On form submit event, updates the store if the form is valid and the data can be shown
  */
  async formSubmitted (event: Event) {
    event.preventDefault()
    if (this.formValid()) {
      this.formSubmitting = true
      await this.$store.dispatch(SUBMIT_FORM_ACTION, { value: true })
      this.formSubmitting = false
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  width: 100%;
  margin-top: 35px;
  align-items: center;
  justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-base;
  .background{
    background-color: $color-background;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50vh;
  }
  .form-window{
    background-color: $color-reverse;
    padding: 20px 80px 20px;
    border-radius: 50px;
    width: 100%;
    max-width: 400px;
    -webkit-box-shadow: 1px 1px 4px 0px rgba( $color-dk-gray, .7 );
    -moz-box-shadow: 1px 1px 4px 0px rgba( $color-dk-gray, .7 );
    box-shadow: 1px 1px 4px 0px rgba( $color-dk-gray, .7 );
    z-index: 10;
    &.padBot{
      padding-bottom: 92px;
    }
  }
  .form-footer{
    position: relative;
  }
  @include fade-in;
}
</style>
