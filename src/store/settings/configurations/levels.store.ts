import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { TConfigurationsLevels } from './configurations.type'
import axios from 'axios';
import { transformToSelectList, sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useLevels = defineStore('levelsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const levels: Ref<ExtendSelectList[]> = ref([])

  const setLevels = (payload: TConfigurationsLevels[]): void => {
    levels.value = sortAlphabetically(transformToSelectList(payload))
  }
  const getLevels = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsLevels[]} = await axios.get('/api/levels')
      setLevels(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const removeLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsLevels[]} = await axios.delete('/api/levels', { data: { levelUuid: value } })
      setLevels(data)
      notify({ text: t('notify.configuration.DELETE_LEVEL'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsLevels[]} = await axios.post('/api/levels', { levelName: value  })
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
