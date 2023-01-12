import { ref, Ref, watch } from 'vue';
import { validateEmail } from '@/hooks/use-rules';
import { useRegistrationStore } from '@/store/registration/use-registration.store';

export const useRegistrationCode = () => {

  const { sendCodeToEmail } = useRegistrationStore()

  const email: Ref<string> = ref('')

  const errorMsg: Ref<string> = ref('')

  watch(() => email.value, newValue => {
    validateEmail(newValue) ? errorMsg.value = 'validation.WRONG_EMAIL' : errorMsg.value = ''
  })

  const sendCode = () => {
    validateEmail(email.value) ? errorMsg.value = 'validation.WRONG_EMAIL' : errorMsg.value = ''
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
