import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { ConfigurationsItTechnologies } from './configurations.type'
import axios from 'axios';

export const useItTechnologies= defineStore('itTechnologiesStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const itTechnologies: Ref<ConfigurationsItTechnologies[]> = ref([])

  const setItTechnologies = (payload: ConfigurationsItTechnologies[]) => {
    itTechnologies.value = payload.sort((a, b) => {
      const nameA = a.technologyName;
      const nameB = b.technologyName;
      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      } else {
        return 0
      }
    })
  }

  const getItTechnologies = async (): Promise<void> => {
    try {
      const { data } : {data: ConfigurationsItTechnologies[]} = await axios.get('/api/ittechnologies')
      setItTechnologies(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const removeItTechnologie = async (value: string): Promise<void> => {
    try {
      const { data }: { data: ConfigurationsItTechnologies[] } = await axios.delete('/api/ittechnologies', { data: { technologyUuid: value } })
      setItTechnologies(data)
      notify({ text: t('notify.configuration.DELETE_TECHNOLOGIE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  const createItTechnologie = async (value: string): Promise<void> => {
    try {
      const { data }: { data: ConfigurationsItTechnologies[] } = await axios.post('/api/ittechnologies', { technologyName: value  })
      setItTechnologies(data)
      notify({ text: t('notify.configuration.CREATE_TECHNOLOGIE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      console.error(e)
    }
  }

  return {
    createItTechnologie,
    getItTechnologies,
    itTechnologies,
    removeItTechnologie,
  }
})
