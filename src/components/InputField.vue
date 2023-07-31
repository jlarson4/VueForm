<template>
  <div v-if="type == 'checkbox'" class="checkboxes">
    <p>{{ label }}<span v-if="required === true" class="required">(Select at least one)</span>
      <span v-if="errorMessage" class="error-message">{{errorMessage}}</span>
    </p>
    <template v-for="(option) in options">
        <label :key="option.ID" class="checkbox">
          <input :type="type" :value="option" :name="name + '[]'" v-model="curVal" />
          <span>{{option}}</span>
        </label>
    </template>
  </div>
  <div v-else>
    <label>{{ label }}<span v-if="required === true" class="required">*</span>
      <div v-if="type == 'select'">
        <select v-model="curVal" @blur="onBlur" v-bind:class="{ error: hasError }">
          <option value="">Area of Interest</option>
          <template v-for="(option) in options">
              <option :key="option.ID" :value="option">{{option}}</option>
          </template>
        </select>
      </div>
      <div v-else-if="type == 'textarea'">
        <textarea :placeholder="placeholder" v-model="curVal" @blur="onBlur" v-bind:class="{ error: hasError }"/>
      </div>
      <div v-else>
        <input :type="type" :placeholder="placeholder" v-model="curVal" @blur="onBlur" v-bind:class="{ error: hasError }" />
      </div>
    </label>
    <div class="field-notes"><p class="error-message">{{errorMessage}}</p><span v-if="inputMax && type == 'textarea'" class="character-count">{{curCharCount()}}/{{inputMax}}</span></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mutations } from '../models/store'

@Component
export default class InputField extends Vue {
  @Prop() private type!: string
  @Prop() private name!: string
  @Prop() private mutation!: string
  @Prop() private getter!: string
  @Prop() private label!: string
  @Prop() private required!: string
  @Prop() private options?: string
  @Prop() private placeholder?: string
  @Prop() private characterRestriction!: RegExp
  @Prop() private inputMin?: number
  @Prop() private inputMax?: number
  private errorMessage = '\u00A0'
  private hasError = false
  private validated = false
  private value = ''

  /**
  * Getter and setter for handling the modelling of the input value
  */

  /**
  * Outputs the current value of the field for the curVal model
  * @return number
  */
  get curVal () {
    const val = this.$store.getters[this.getter]
    // If the field was previously validated,
    // but cleared out by the system, mark it as invalid now before getting the value
    if (this.required && this.validated && !val.length) {
      this.validated = false
    }
    return this.$store.getters[this.getter]
  }

  /**
  * Sets the new state of the field for the curVal model
  * @return number
  */
  set curVal (value) {
    this.$store.commit(this.mutation, { value: this.validateField(value) })

    // When an input exceeds the character limit, the state does not change,
    // but the content of the input does change
    // Force update here to set the input back to the state and erase the user's excess input
    this.$forceUpdate()
  }

  /**
  * Outputs the current character count for fields that have a maximum character count
  * @return number
  */
  curCharCount () {
    return this.$store.getters[this.getter].length
  }

  /**
  * Validates and sanitizes the current field's value
  * @param value current field value, unsanitized
  * @param isBlur boolean determines where on blur or not
  * @return string – current value
  */
  validateField (value: string|string[]) {
    // Only check validation if field is required
    if (this.required) {
      // If type is checkbox
      if (value instanceof Array) {
        value = this.validateArray(value)
      } else {
        value = this.validateText(value)
      }

      // If the current validity is changing
      // Update the valid fields counter
      // Update the valid state
      if (this.hasError && this.validated) {
        this.$store.commit(mutations.invalidateField)
        this.validated = false
      } else if (!this.hasError && !this.validated) {
        this.$store.commit(mutations.validateField)
        this.validated = true
      }
    }

    return value
  }

  /**
  * Validates and sanitizes a text fields input
  * @param value current field value, unsanitized
  * @param isBlur boolean determines where on blur or not
  * @return string – current value
  */
  validateText (value: string) {
    let message = ''
    // If there is a character restriction, strip invalid characters
    if (this.characterRestriction) {
      value = value.replace(this.characterRestriction, '')
    }

    // If the value is empty, mark as required
    if (!value) {
      message = 'This field is required'
    } else {
      // If the value is shorter than the min length, inform the user of the min length
      if (this.inputMin && value.length < this.inputMin) {
        message = 'Minimum input required: ' + this.inputMin + ' characters'
      }

      // If the value is longer than the max length, truncate the value and inform the user
      if (this.inputMax && value.length > this.inputMax) {
        value = value.slice(0, this.inputMax)
      }

      // If it is a phone number, decorate it
      if (this.type === 'tel') {
        value = this.formatPhone(value)
      }
    }

    this.hasError = !!message

    this.errorMessage = this.hasError ? message : '\u00A0'

    return value
  }

  /**
  * Validates and sanitizes a checkbox group
  * @param value current field value, unsanitized
  * @param isBlur boolean determines where on blur or not
  * @return string – current value
  */
  validateArray (value: string[]) {
    if (!value.length) {
      value = []
      this.hasError = true
    } else {
      this.hasError = false
    }
    return value
  }

  /**
  * Decorates the phone number with correctly positioned `-` characters
  * @param phone numbers only text string
  * @return string
  */
  formatPhone (phone: string) {
    const match = phone.match(/.{1,4}$|.{1,3}/g)
    return match ? match.join('-') : ''
  }

  onBlur () {
    this.validateField(this.$store.getters[this.getter])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  label, p{
    display: block;
    width: 100%;
    padding: 0;
    text-align: left;
    input, select, textarea{
      @include standard-input;
    }
    textarea{
      height: 100px;
    }
  }
  span.required{
    color: $color-error;
    padding-left: 5px;
  }
  .checkboxes{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
    p{
      margin: 0;
    }
    label{
      padding: 0;
      flex-basis: 50%;
      @media (max-width: 767px){
        flex-basis: 100%;
      }
      span{
        padding-left: 5px;
      }
    }
    input{
      width: auto;
      margin-top: 5px;
    }
    .required{
      font-size: .8em;
    }
  }
  .error-message{
    color: $color-error;
    font-size: .8em;
    margin: 0;
    padding: 5px 0 10px 15px;
  }
  .field-notes{
    display: flex;
    .character-count{
      display: block;
      width: 100%;
      font-size: .8em;
      text-align: right;
    }
  }
</style>
