import axios from 'axios';
import { useRouter } from 'vue-router';
import { reactive, ref, watch } from 'vue';
import { validateEmail, validateSame, validateField } from '@/hooks/use-rules';
import { notify } from '@kyvg/vue3-notification';
import { useI18n } from 'vue-i18n';
import { checkErrors } from '@/hooks/helpers';

export const useResetPassword = () => {

  const router = useRouter();
  const { t } = useI18n({ inheritLocale: true, useScope: 'local'})

  const isLinkOnMail = ref(false)

  const newPassword = reactive({
    password: '',
    repeatPassword: ''
  })
  const errorMsgPassword = reactive({
    password: '',
    repeatPassword: ''
  })

  const form = reactive({
    email: '',
    repeatEmail: ''
  })

  const errorMsg = reactive({
    email: '',
    repeatEmail: ''
  })

  watch(() => form.email, newValue => {
    errorMsg.repeatEmail = validateSame('email', newValue, form.repeatEmail)
    errorMsg.email = validateSame('email', newValue, form.repeatEmail)
    errorMsg.email = validateField('email', newValue, 6)
    validateEmail(newValue) ? errorMsg.email = 'wrong email' : errorMsg.email = ''
  })

  watch(() => form.repeatEmail, newValue => {
    errorMsg.email = validateSame('email', newValue, form.email)
    errorMsg.repeatEmail = validateSame('email', newValue, form.email)
    errorMsg.repeatEmail = validateField('email', newValue, 6)
    validateEmail(newValue) ? errorMsg.repeatEmail = 'wrong email' : errorMsg.repeatEmail = ''
  })

  watch(() => newPassword.password, newValue => {
    errorMsgPassword.repeatPassword = validateSame('password', newValue, newPassword.repeatPassword)
    errorMsgPassword.password = validateSame('password', newValue, newPassword.repeatPassword)
    errorMsgPassword.password = validateField('password', newValue, 6)
  })

  watch(() => newPassword.repeatPassword, newValue => {
    errorMsgPassword.password = validateSame('password', newValue, newPassword.password)
    errorMsgPassword.repeatPassword = validateSame('password', newValue, newPassword.password)
    errorMsgPassword.repeatPassword = validateField('password', newValue, 6)
  })

  const checkResetPasswordForm = async () => {
    validateEmail(form.email) ? errorMsg.email = 'wrong email' : errorMsg.email = ''
    validateEmail(form.repeatEmail) ? errorMsg.repeatEmail = 'wrong email' : errorMsg.repeatEmail = ''

    if(checkErrors(errorMsg)) {
      try {
        await axios.get('/api/auth/reset-password-token',{
          params: {
            email: form.email
          }
        })
        notify({ text: t('notify.RESET_PASSWORD_LINK'), type: 'success'})
        isLinkOnMail.value = true
      } catch (e) {
        notify({ text: t(`${ e.response.data.message }`), type: 'error'})
      }
    }
  }

  const checkNewPasswordForm = async () => {
    errorMsgPassword.password = validateSame('password', newPassword.password, newPassword.repeatPassword)
    errorMsgPassword.password = validateField('password', newPassword.password, 6)
    errorMsgPassword.repeatPassword = validateField('password', newPassword.repeatPassword, 6)
    errorMsgPassword.repeatPassword = validateSame('password', newPassword.password, newPassword.repeatPassword)

    const token = router.currentRoute.value.query.token
    if(checkErrors(errorMsgPassword)) {
      try {
        const { data } = await axios.get('/api/auth/validate-token', {
          params: {
            token: token
          }
        })
        await axios.put('/api/auth/reset-password', {
          authUuid: data,
          password: newPassword.password,
          confirmPassword: newPassword.repeatPassword
        })
        notify({ text: t('notify.RESET_PASSWORD_SUCCESS'), type: 'success'})
        await router.push({ name: 'Login'})
      } catch (e) {
        notify({ text: t(`${ e.response.data.message }`), type: 'error'})
      }
    }
  }

  return {
    form,
    errorMsg,
    newPassword,
    isLinkOnMail,
    errorMsgPassword,
    checkNewPasswordForm,
    checkResetPasswordForm
  }
}
