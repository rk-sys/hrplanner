import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { ConfigurationsProfessions } from './configurations.type'
import axios from 'axios';

export const useProfessions = defineStore('professionsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const professions: Ref<ConfigurationsProfessions[]> = ref([])

  const setProfessions = (payload: ConfigurationsProfessions[]) => {
    professions.value = payload.sort((a, b) => {
      const nameA = a.professionName;
      const nameB = b.professionName;
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    })
  }

  const getProfessions = async (): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsProfessions[]} = await axios.get('/api/profession')
      setProfessions(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const removeProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsProfessions[]} = await axios.delete('/api/profession', { data: { professionUuid: value } })
      setProfessions(data)
      notify({ text: t('notify.configuration.DELETE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const createProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsProfessions[]} = await axios.post('/api/profession', { professionName: value  })
      setProfessions(data)
      notify({ text: t('notify.configuration.CREATE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  return {
    professions,
    getProfessions,
    createProfession,
    removeProfession
  }
})
