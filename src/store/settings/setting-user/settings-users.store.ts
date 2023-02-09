import { defineStore } from 'pinia'
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { useI18n } from 'vue-i18n';
import { TSettingsUsers, TUser } from './settings-user.types';

export const useSettingsUsers = defineStore('settingsUsers', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const users: Ref<TSettingsUsers[]> = ref([]);

  const getUsers = async () => {
    try {
      const { data }: { data: TSettingsUsers[] } = await axios.get('/api/company/users')
      users.value = data.sort((a, b) => {
        const nameA = a.firstName;
        const nameB = b.firstName;
        if(nameA < nameB) {
          return -1
        } else if(nameA > nameB) {
          return 1
        } else {
          return 0
        }
      });
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createUser = async (payload: TUser) => {
    try {
      const { data }: { data: TSettingsUsers[] } = await axios.post('/api/company/users', payload)
      users.value = data
      notify({ text: t('user has been created'), type: 'success' })
      return true
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return false
    }
  }

  const updateUser = async (payload: TSettingsUsers) => {
    try {
      await axios.put('/api/company/users', {...payload, userUuid: payload.uuid})
      await getUsers()
      notify({ text: t('user has been created'), type: 'success' })
      return true
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return false
    }
  }

  const deleteUserInCompany = async (payload: string) => {
    try {
      await axios.delete('/api/company/users', { data: { userUuid: payload } })
      await getUsers()
      notify({ text: t('user has been deleted'), type: 'success'})
    } catch (e) {
      notify({ text: t(`${ e.response.data.message }`), type: 'error'})
    }
  }

  return {
    createUser,
    deleteUserInCompany,
    getUsers,
    updateUser,
    users,
  }
})
