import axios from 'axios';
import { ref, Ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia';
import { notify } from '@kyvg/vue3-notification';
import { TEmployeeDetail } from './employee-detail.types';
import { useI18n } from 'vue-i18n';
import {
  TConfigurationsItTechnologies
} from '@/store/settings/configurations/configurations.type';
import { sortAlphabetically, transformToSelectList, checkErrors } from '@/hooks/helpers'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';
import { validateField, isRequired, checkDatePattern } from '@/hooks/use-rules';

export const useEmployeDetailStore = defineStore('employeeDetailStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const employeeDetail = reactive({})

  const getEmployeeDetail = async (payload: string): Promise<void> => {
    try {
      const { data } : { data: TEmployeeDetail[] } = await axios.get('/api/employees/employeeFullInfo', {
        params: {
          employeeUuid: payload
        }
      })
      employeeDetail = data
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  return {
    getEmployeeDetail
  }
})
