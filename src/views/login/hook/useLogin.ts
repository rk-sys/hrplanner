import { reactive, watch } from 'vue';
import { useRouter } from 'vue-router'
import { validateField } from '@/hook/useRules';
import { useGlobalStore } from '@/store/global';
import { TLoginForm } from '../login.types'

export const useLogin = () => {
  const router = useRouter();
  const global = useGlobalStore();

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
    //TODO logic to login user
    errorMsg.login = validateField('login', form.login, 3)
    errorMsg.password = validateField('password', form.password, 6)
    if (errorMsg.login === '' && errorMsg.password === '') {
      try {
        console.log('login')
        // const { data }: { data: string } = await axios.post('/api/signIn', {
        //   email: form.login,
        //   password: form.password
        // });
        global.setToken('data');
        await router.push({ name: 'Dashboard' })
      } catch (e) {
        throw new Error()
      }
    }
  }

  const goToRegisterPage = (): void => {
    router.push({ name: 'Register' })
  }

  return {
    form,
    errorMsg,
    loginUser,
    goToRegisterPage
  }
}
