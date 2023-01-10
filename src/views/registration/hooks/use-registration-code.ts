import { watch } from 'vue';
import { validateEmail } from '@/hooks/use-rules';
import { useRegistrationStore } from '@/store/registration/use-registration.store';

export const useRegistrationCode = () => {

  const { email, errorMsg, sendCodeToEmail } = useRegistrationStore()

  watch(() => email.value, newValue => {
    validateEmail(newValue) ? errorMsg.value = 'wrong email' : errorMsg.value = ''
  })

  const sendCode = () => {
    validateEmail(email.value) ? errorMsg.value = 'wrong email' : errorMsg.value = ''
    if(!errorMsg.value) {
      sendCodeToEmail(email.value)
    }
  }

  return {
    email,
    errorMsg,
    sendCode,
  }
}
