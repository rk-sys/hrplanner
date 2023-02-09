import { watch } from 'vue';
import { validateEmail, validateSame, validateField } from '@/hooks/use-rules';
import { useRegistrationStore } from '@/store/registration/use-registration.store';
import { checkErrors } from '@/hooks/helpers'
export const useRegistrationInfo = () => {

  const {
    registrationForm,
    registrationErrors,
    registrationNewAccount
  } = useRegistrationStore()


  watch(() => registrationForm.login, newValue => {
    registrationErrors.login = validateField('login', newValue, 3)
  })

  watch(() => registrationForm.firstName, newValue => {
    registrationErrors.firstName = validateField('first name', newValue, 3)
  })

  watch(() => registrationForm.lastName, newValue => {
    registrationErrors.lastName = validateField('last name', newValue, 3)
  })

  watch(() => registrationForm.companyName, newValue => {
    registrationErrors.companyName = validateField('company name', newValue, 1)
  })

  watch(() => registrationForm.email, newValue => {
    validateEmail(newValue) ? registrationErrors.email = 'wrong email' : registrationErrors.email = ''
  })

  watch(() => registrationForm.password, newValue => {
    registrationErrors.repeatPassword = validateSame('password', newValue, registrationForm.repeatPassword)
    registrationErrors.password = validateSame('password', newValue, registrationForm.repeatPassword)
    registrationErrors.password = validateField('password', newValue, 6)
  })

  watch(() => registrationForm.repeatPassword, newValue => {
    registrationErrors.password = validateSame('password', newValue, registrationForm.password)
    registrationErrors.repeatPassword = validateSame('password', newValue, registrationForm.password)
    registrationErrors.repeatPassword = validateField('password', newValue, 6)
  })

  watch(() => registrationForm.registrationCode, newValue => {
    registrationErrors.registrationCode = validateField('code from email', newValue, 12)
  })

  const checkRegistrationForm = () => {
    registrationErrors.login = validateField('login', registrationForm.login, 3)
    registrationErrors.firstName = validateField('first name', registrationForm.firstName, 3)
    registrationErrors.lastName = validateField('last name', registrationForm.lastName, 3)
    registrationErrors.companyName = validateField('company name', registrationForm.companyName, 1)
    validateEmail(registrationForm.email) ? registrationErrors.email = 'wrong email' : registrationErrors.email = ''

    registrationErrors.password = validateSame('password', registrationForm.password, registrationForm.repeatPassword)
    registrationErrors.password = validateField('password', registrationForm.password, 6)

    registrationErrors.repeatPassword = validateField('password', registrationForm.repeatPassword, 6)
    registrationErrors.repeatPassword = validateSame('password', registrationForm.password, registrationForm.repeatPassword)

    registrationErrors.registrationCode = validateField('code from email', registrationForm.registrationCode, 12)

    if(checkErrors(registrationErrors)) {
      registrationNewAccount(registrationForm);
    }
  }

  return {
    registrationForm,
    registrationErrors,
    checkRegistrationForm
  }
}
