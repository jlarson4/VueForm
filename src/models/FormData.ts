import BaseModel from './BaseModel'
import Input from './Input'

/**
 * The Form Data
 */
export default interface FormData extends BaseModel {

  /**
   * The Form Page's Title
   */
  title: string;

  /**
   * An array of field objects
   */
  fields: Input[];
}
