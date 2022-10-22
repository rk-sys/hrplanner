import { reactive, watch, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { validateField } from '@/hooks/useRules';
import { useGlobalStore } from '@/store/global';
import { TLoginForm, TResponseLogin } from '../login.types';
import { notify } from '@kyvg/vue3-notification';
import { useI18n } from 'vue-i18n';
import axios from 'axios'

export const useLogin = () => {

  const router = useRouter();
  const global = useGlobalStore();
  const{ t } = useI18n({ inheritLocale: true, useScope: 'local'})

  const form: TLoginForm = reactive({
    login: '',
    password: ''
  })

  const errorMsg: TLoginForm = reactive({
    login: '',
    password: '',
  })

  watch(() => form.login, newValue => {
    errorMsg.login = validateField('login', newValue, 3)
  })

  watch(() => form.password, newValue => {
    errorMsg.password = validateField('password', newValue, 6)
  })

  const loginUser = async (): Promise<void> => {
    errorMsg.login = validateField('login', form.login, 3)
    errorMsg.password = validateField('password', form.password, 6)
    if (errorMsg.login === '' && errorMsg.password === '') {
      try {
        const { data }: { data: TResponseLogin } = await axios.post('/api/auth/signIn', form);
        global.setToken(data.token);
        notify({ text: t('You are sign in'), type: 'success'})
        await router.push({ name: 'Dashboard' })
      } catch (e) {
        notify({ text: t(`${ e.response.data.message }`), type: 'error'})
        throw new Error()
      }
    }
  }

  const goToRegistrationPage = async (): Promise<void> => {
    await router.push({ name: 'Registration' })
  }

  return {
    form,
    errorMsg,
    loginUser,
    goToRegistrationPage
  }
}
