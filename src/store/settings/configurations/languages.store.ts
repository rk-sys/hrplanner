import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { ConfigurationsLanguages } from './configurations.type'
import axios from 'axios';

export const useLanguages = defineStore('languagesStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const languages: Ref<ConfigurationsLanguages[]> = ref([])

  const setLanguage = (payload: ConfigurationsLanguages[]) => {
    languages.value = payload.sort((a, b) => {
      const nameA = a.languageName;
      const nameB = b.languageName;
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    })
  }

  const getLanguages= async (): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsLanguages[]} = await axios.get('/api/languages/mainLanguages')
      setLanguage(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const removeLanguage = async (value: string): Promise<void> => {
    try {
      await axios.delete('/api/languages', { data: { languageUuid: value } })
      await getLanguages()
      notify({ text: t('notify.configuration.DELETE_LANGUAGE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const createLanguage = async (value: string): Promise<void> => {
    try {
      await axios.post('/api/languages', { languageName: value  })
      await getLanguages()
      notify({ text: t('notify.configuration.CREATE_LANGUAGE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  return {
    languages,
    getLanguages,
    createLanguage,
    removeLanguage
  }
})
