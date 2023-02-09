import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n';
import { Ref, ref } from 'vue';
import { notify } from '@kyvg/vue3-notification';
import { TConfigurationsProfessions } from './configurations.type'
import axios from 'axios';
import { transformToSelectList, sortAlphabetically } from '@/hooks/helpers';
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export const useProfessions = defineStore('professionsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const professions: Ref<ExtendSelectList[]> = ref([])

  const setProfessions = (payload: TConfigurationsProfessions[]) => {
    professions.value = sortAlphabetically(transformToSelectList(payload))
  }

  const getProfessions = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsProfessions[]} = await axios.get('/api/profession')
      setProfessions(data)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const removeProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsProfessions[]} = await axios.delete('/api/profession', { data: { professionUuid: value } })
      setProfessions(data)
      notify({ text: t('notify.configuration.DELETE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const createProfession = async (value: string): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsProfessions[]} = await axios.post('/api/profession', { professionName: value  })
      setProfessions(data)
      notify({ text: t('notify.configuration.CREATE_PROFESSION'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  return {
    professions,
    getProfessions,
    createProfession,
    removeProfession
  }
})
