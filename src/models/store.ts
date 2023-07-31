// Initial Store
// Estabilish what a clean store should look like
export const initialStore = {
  name: '',
  telephone: '',
  interest: '',
  description: '',
  reference: [] as string[],
  validFields: 0,
  submitSuccess: false
}

// Getters
export const DESCRIPTION_CHANGE_GETTER = 'updateDescription'
export const NAME_CHANGE_GETTER = 'updateFullName'
export const INTEREST_CHANGE_GETTER = 'updateInterest'
export const REFERENCE_CHANGE_GETTER = 'updateReference'
export const TELEPHONE_CHANGE_GETTER = 'updateTelephone'
export const VALIDATE_FIELD_GETTER = 'validateField'
export const INVALIDATE_FIELD_GETTER = 'invalidateField'

export const getters = {
  description: DESCRIPTION_CHANGE_GETTER,
  fullname: NAME_CHANGE_GETTER,
  interest: INTEREST_CHANGE_GETTER,
  reference: REFERENCE_CHANGE_GETTER,
  telephone: TELEPHONE_CHANGE_GETTER,
  validateField: VALIDATE_FIELD_GETTER,
  invalidateField: INVALIDATE_FIELD_GETTER
}

// Mutations
export const DESCRIPTION_CHANGE_MUTATION = 'updateDescription'
export const NAME_CHANGE_MUTATION = 'updateFullName'
export const INTEREST_CHANGE_MUTATION = 'updateInterest'
export const REFERENCE_CHANGE_MUTATION = 'updateReference'
export const TELEPHONE_CHANGE_MUTATION = 'updateTelephone'
export const VALIDATE_FIELD_MUTATION = 'validateField'
export const INVALIDATE_FIELD_MUTATION = 'invalidateField'
export const CLEAR_FORM_MUTATION = 'clearFormData'
export const SUBMIT_FORM_MUTATION = 'submitFormData'

export const mutations = {
  description: DESCRIPTION_CHANGE_MUTATION,
  fullname: NAME_CHANGE_MUTATION,
  interest: INTEREST_CHANGE_MUTATION,
  reference: REFERENCE_CHANGE_MUTATION,
  telephone: TELEPHONE_CHANGE_MUTATION,
  validateField: VALIDATE_FIELD_MUTATION,
  invalidateField: INVALIDATE_FIELD_MUTATION,
  clearForm: CLEAR_FORM_MUTATION,
  submitForm: SUBMIT_FORM_MUTATION
}

// Actions
export const SUBMIT_FORM_ACTION = 'submitFormData'

export const actions = {
  submitForm: SUBMIT_FORM_ACTION
}
