import { reactive, ref, Ref } from "vue";
import axios from 'axios'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { TRegistrationForm } from '../registration.types';
import { notify } from '@kyvg/vue3-notification';
import { useI18n } from 'vue-i18n';

export const useRegistrationStore = defineStore('registrationStore', () => {

  const router = useRouter();
  const{ t } = useI18n({ inheritLocale: true, useScope: 'local'})

  const registrationForm: TRegistrationForm = reactive({
    login: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    repeatPassword: '',
    registrationCode: '',
    rules: true
  })

  const registrationErrors: TRegistrationForm = reactive({
    login: '',
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: '',
    repeatPassword: '',
    registrationCode: '',
    rules: ''
  })

  const sendCodeToEmail = async (email: string) => {
    try {
      await axios.get('/api/registration/code', {
        params: {
          email: email
        }
      });
      notify({ text: t('code has been send to email'), type: 'success'})
      await router.push({ name: 'Registration info' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message }`), type: 'error'})
      console.error(e)
    }
  }

  const registrationNewAccount = async (form: TRegistrationForm) => {
    try {
      await axios.post('/api/registration/create', {...form, rules: true});
      notify({ text: t('New account has been created'), type: 'success'})
      await router.push({ name: 'Login' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message }`), type: 'error'})
      console.error(e)
    }
  }

  return {
    registrationForm,
    registrationErrors,
    sendCodeToEmail,
    registrationNewAccount
  }
})
