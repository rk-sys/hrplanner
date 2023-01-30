import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { ConfigurationsLevels } from './configurations.type'
import axios from 'axios';

export const useLevels = defineStore('levelsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const levels: Ref<ConfigurationsLevels[]> = ref([])

  const setLevels = (payload: ConfigurationsLevels[]): void => {
    levels.value = payload.sort((a, b) => {
      const nameA = a.levelName;
      const nameB = b.levelName;
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    })
  }
  const getLevels = async (): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsLevels[]} = await axios.get('/api/levels')
      setLevels(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const removeLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsLevels[]} = await axios.delete('/api/levels', { data: { levelUuid: value } })
      setLevels(data)
      notify({ text: t('notify.configuration.DELETE_LEVEL'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const createLevel = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsLevels[]} = await axios.post('/api/levels', { levelName: value  })
      setLevels(data)
      notify({ text: t('notify.configuration.CREATE_LEVEL'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  return {
    levels,
    getLevels,
    createLevel,
    removeLevel
  }
})
