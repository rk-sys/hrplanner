import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useLanguages = defineStore('languagesStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const languages: Ref<ExtendSelectList[]> = ref([])
  const languagesWithLevels: Ref<ExtendSelectList[]> = ref([])

  const setLanguage = (payload: ExtendSelectList[]) => {
    languages.value = sortAlphabetically(payload)
  }


  const getLanguagesWithLevels = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/languages')
      languagesWithLevels.value = data
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const getLanguages= async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/languages/mainLanguages')
      setLanguage(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const removeLanguage = async (value: string): Promise<void> => {
    try {
      await axios.delete('/api/languages', { data: { uuid: value } })
      await getLanguages()
      notify({ text: t('notify.configuration.DELETE_LANGUAGE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createLanguage = async (value: string): Promise<void> => {
    try {
      await axios.post('/api/languages', { label: value  })
      await getLanguages()
      notify({ text: t('notify.configuration.CREATE_LANGUAGE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  return {
    languages,
    getLanguages,
    getLanguagesWithLevels,
    languagesWithLevels,
    createLanguage,
    removeLanguage
  }
})
