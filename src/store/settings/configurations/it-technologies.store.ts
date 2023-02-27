import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useItTechnologies= defineStore('itTechnologiesStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const itTechnologies: Ref<ExtendSelectList[]> = ref([])

  const setItTechnologies = (payload: ExtendSelectList[]) => {
    itTechnologies.value = sortAlphabetically(payload)
  }

  const getItTechnologies = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/ittechnologies')
      setItTechnologies(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const removeItTechnologie = async (value: string): Promise<void> => {
    try {
      const { data }: { data: ExtendSelectList[] } = await axios.delete('/api/ittechnologies', { data: { uuid: value } })
      setItTechnologies(data)
      notify({ text: t('notify.configuration.DELETE_TECHNOLOGIE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createItTechnologie = async (value: string): Promise<void> => {
    try {
      const { data }: { data: ExtendSelectList[] } = await axios.post('/api/ittechnologies', { label: value  })
      setItTechnologies(data)
      notify({ text: t('notify.configuration.CREATE_TECHNOLOGIE'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  return {
    createItTechnologie,
    getItTechnologies,
    itTechnologies,
    removeItTechnologie,
  }
})
