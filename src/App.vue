<template>
  <div id="app">
    <div class="form-window">
      <h1>{{ formData.title }}</h1>
      <form :id="formData.ID" v-on:submit="formSubmitted">
          <template v-for="(field) in formData.fields">
              <InputField :key="field.ID" v-bind="field"></InputField>
          </template>
          <SubmitButton :hideButton="!formValid ()"/>
      </form>
    </div>
    <ResultsModal :isVisible="showModal ()" />
    <div class="background"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import SubmitButton from './components/SubmitButton.vue'
import InputField from './components/InputField.vue'
import formData from './constants/formData'
import ResultsModal from './components/ResultsModal.vue'

@Component({
  components: {
    SubmitButton,
    InputField,
    ResultsModal
  }
})
export default class App extends Vue {
  private formData = formData
  private submitSuccessful = false
  private requiredFieldsCount = formData.fields.filter(field => field.required).length

  formValid () {
    return this.requiredFieldsCount === this.$store.state.validFields
  }

  showModal () {
    return this.formValid() && this.submitSuccessful
  }

  formSubmitted (event: Event) {
    event.preventDefault()
    if (this.formValid()) {
      this.submitSuccessful = true
    }
  }
}
</script>

<style lang="scss">
#app {
  display: flex;
  width: 100%;
  margin-top: 60px;
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
  }
}
</style>
