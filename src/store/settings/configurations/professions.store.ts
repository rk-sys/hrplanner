import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import axios from 'axios';
import { sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useProfessions = defineStore('professionsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const professions: Ref<ExtendSelectList[]> = ref([])

  const setProfessions = (payload: ExtendSelectList[]) => {
    professions.value = sortAlphabetically(payload)
  }

  const getProfessions = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/profession')
      setProfessions(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const removeProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.delete('/api/profession', { data: { uuid: value } })
      setProfessions(data)
      notify({ text: t('notify.configuration.DELETE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const createProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.post('/api/profession', { label: value  })
      setProfessions(data)
      notify({ text: t('notify.configuration.CREATE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  return {
    professions,
    getProfessions,
    createProfession,
    removeProfession
  }
})
