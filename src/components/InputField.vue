<template>
  <div v-if="type == 'checkbox'" class="checkboxes">
    <p>{{ label }}<span v-if="required === true" class="required">(Select at least one)</span>
      <span v-if="errorMessage" class="error-message">{{errorMessage}}</span>
    </p>
    <template v-for="(option) in options">
        <label :key="option.ID" class="checkbox">
          <input :type="type" :value="option" :name="name + '[]'" @input="onCheckboxChange($event)"/>
          <span>{{option}}</span>
        </label>
    </template>
  </div>
  <div v-else>
    <label>{{ label }}<span v-if="required === true" class="required">*</span>
      <div v-if="type == 'select'">
        <select @input="onInputChange($event)" v-model="value" v-bind:class="{ error: hasError }">
          <option value="">Area of Interest</option>
          <template v-for="(option) in options">
              <option :key="option.ID" :value="option">{{option}}</option>
          </template>
        </select>
      </div>
      <div v-else-if="type == 'textarea'">
        <textarea :placeholder="placeholder" v-model="value" v-bind:class="{ error: hasError }" @input="onInputChange($event)"/>
        <span v-if="charMax" class="character-count">{{curCharCount()}}/{{charMax}}</span>
      </div>
      <div v-else>
        <input :type="type" :placeholder="placeholder" v-model="value" @input="onInputChange($event)" v-bind:class="{ error: hasError }" />
      </div>
    </label>
    <p class="error-message">{{errorMessage}}</p>
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
  @Prop() private charMin?: number
  @Prop() private charMax?: number
  private errorMessage = '\u00A0'
  private hasError = false
  private validated = false
  private value = ''

  /**
  * Outputs the current character count for fields that have a maximum character count
  * @return number
  */
  curCharCount () {
    return this.value.length
  }

  /**
  * Validates and sanitizes the current field's value
  * @param value current field value, unsanitized
  * @param isBlur boolean determines where on blur or not
  * @return string – current value
  */
  validateField (value: string) {
    // Only check validation if field is required
    if (this.required) {
      // If type is checkbox
      if (this.type === 'checkbox') {
        value = this.validateCheckbox(value)
      } else {
        value = this.validateTextField(value)
      }

      // If the current state is changing from valid to invalid
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
  validateTextField (value: string) {
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
      if (this.charMin && value.length < this.charMin) {
        message = 'Minimum input required: ' + this.charMin + ' characters'
      }

      // If the value is longer than the max length, truncate the value and inform the user
      if (this.charMax && value.length > this.charMax) {
        value = value.slice(0, this.charMax)
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
  validateCheckbox (value: string) {
    const groupValues = this.$store.getters[this.getter]
    if (groupValues.length === 1 && value === groupValues[0]) {
      value = ''
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

  // Event Handlers

  /**
  * Validates field, and updates store accordingly
  * @return none
  */
  onInputChange (event: Event) {
    const val = (event.target as HTMLInputElement)?.value
    this.value = this.validateField(val)
    this.$store.commit(this.mutation, { value: this.value })
  }

  /**
  * Validates field, and updates store accordingly
  * @return none
  */
  onCheckboxChange (event: Event) {
    const val = (event.target as HTMLInputElement)?.value
    this.value = this.validateField(val)
    this.$store.commit(this.mutation, { value: val })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  label, p{
    display: block;
    width: 100%;
    padding: 0px 0 0;
    text-align: left;
    input, select, textarea{
      @include standard-input;
    }
    textarea{
      height: 100px;
    }
    .character-count{
      display: block;
      width: 100%;
      font-size: .8em;
      text-align: right;
    }
  }
  span.required{
    color: $color-error;
    padding-left: 5px;
  }
  .checkboxes{
    display: flex;
    flex-wrap: wrap;
    p{
      margin: 0;
    }
    label{
      padding: 0;
      flex-basis: 50%;
      span{
        padding-left: 5px;
      }
    }
    input{
      width: auto;
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
</style>
