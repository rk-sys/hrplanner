import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useLevels = defineStore('levelsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const levels: Ref<ExtendSelectList[]> = ref([])

  const setLevels = (payload: ExtendSelectList[]): void => {
    levels.value = sortAlphabetically(payload)
  }
  const getLevels = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/levels')
      setLevels(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const removeLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.delete('/api/levels', { data: { uuid: value } })
      setLevels(data)
      notify({ text: t('notify.configuration.DELETE_LEVEL'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.post('/api/levels', { label: value  })
      setLevels(data)
      notify({ text: t('notify.configuration.CREATE_LEVEL'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  return {
    levels,
    getLevels,
    createLevel,
    removeLevel
  }
})
