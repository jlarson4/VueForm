import BaseModel from './BaseModel'
/**
 * Select, radio, or checkbox option interface
 */
interface Option {
    key: string,
    value: string,
}

/**
 * Text Fields array Type
 */
export type TextFieldType = 'text'|'tel'|'date'|'color'|'datetime-local'|'email'|'month'|'number'|'password'|'search'|'time'|'url'|'week'|'month'|'textarea'|'select'|'checkbox'|'radio'

/**
 * The Text Input model
 */
export default interface TextInput extends BaseModel {

  /**
   * The input's type
   */
  type: string;

  /**
   * The input's name
   */
  name: string;

  /**
   * The input's label
   */
  label: string;

  /**
   * The input's Vuex store mutation function
   */
  mutation: string;

  /**
   * The input's Vuex store getter function
   */
  getter: string;

  /**
   * The input's placeholder
   */
  placeholder?: string;

  /**
   * Is the input required?
   */
  required?: boolean;

  /**
   * The input's validation
   */
  characterRestriction?: RegExp;

  /**
   * The input's maximum character count
   */
  charMax?: number;

  /**
   * The input's minimum character count
   */
  charMin?: number;

  /**
   * The input's placeholder
   */
  options?: Option[]|string[];

}
