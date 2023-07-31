import IFormData from '../models/FormData'
import { mutations, getters } from '../models/store'

const formData: IFormData = {
  ID: 'vue-form',
  title: 'Personal Interest Form',
  fields: [
    {
      ID: 'full-name',
      name: 'full-name',
      type: 'text',
      placeholder: 'John Smith',
      label: 'Full Name',
      required: true,
      charMin: 3,
      mutation: mutations.fullname,
      getter: getters.fullname
    },
    {
      ID: 'telephone',
      name: 'telephone',
      type: 'tel',
      placeholder: '262...',
      label: 'Telephone Number',
      required: true,
      characterRestriction: /[^0-9]/g,
      charMax: 10,
      charMin: 10,
      mutation: mutations.telephone,
      getter: getters.telephone
    },
    {
      ID: 'interest',
      name: 'interest',
      type: 'select',
      label: 'Interest',
      required: true,
      options: ['Programming', 'Team Synergy', 'Personal Growth', 'Work Life Balance'],
      mutation: mutations.interest,
      getter: getters.interest
    },
    {
      ID: 'reference',
      name: 'reference',
      type: 'checkbox',
      label: 'Reference',
      required: true,
      options: ['Online Ad', 'Recommendation', 'Referral', 'Other'],
      mutation: mutations.reference,
      getter: getters.reference
    },
    {
      ID: 'description',
      name: 'description',
      type: 'textarea',
      placeholder: 'Additional details...',
      label: 'Description',
      required: true,
      charMax: 500,
      mutation: mutations.description,
      getter: getters.description
    }
  ]
}

export default formData
