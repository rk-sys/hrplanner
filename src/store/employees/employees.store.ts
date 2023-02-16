import axios from 'axios';
import { ref, Ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia';
import { notify } from '@kyvg/vue3-notification';
import { TEmployeeResponse, TEmployees, TEmployeesList } from './employees.types';
import { useI18n } from 'vue-i18n';
import {
  TConfigurationsItTechnologies
} from '@/store/settings/configurations/configurations.type';
import { sortAlphabetically, transformToSelectList, checkErrors } from '@/hooks/helpers'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';
import { validateField, isRequired, checkDatePattern } from '@/hooks/use-rules';

export const useEmployeeStore = defineStore('employeeStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const isCreateModal = ref(true)

  const employees: Ref<TEmployeesList[]> = ref([])

  const employeesForm: Partial<TEmployees> = reactive({
    technologieText: '',
    languageText: '',
    uuid: '',
    active: true,
    firstName: '',
    lastName: '',
    level: '',
    profession: '',
    itTechnologies: [],
    languages: [],
    projects: [],
    birthday: '',
    experience: ''
  })

  const errors: Partial<TEmployees> = reactive({
    firstName: '',
    lastName: '',
    birthday: '',
    level: '',
    profession: ''
  })

  watch(() => employeesForm.firstName, newValue => {
    isRequired(newValue) ? errors.firstName = '' : errors.firstName = 'validation.FIELD_IS_REQUIRED'
    errors.firstName = validateField('name', newValue, 3)
  })

  watch(() => employeesForm.lastName, newValue => {
    isRequired(newValue) ? errors.lastName = '' : errors.lastName = 'validation.FIELD_IS_REQUIRED'
    errors.lastName = validateField('client', newValue, 3)
  })

  watch(() => employeesForm.birthday, newValue => {
    isRequired(newValue) ? errors.birthday = '' : errors.birthday = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errors.birthday = '' : errors.birthday = 'validation.WRONG_DATE'
  })

  const searchText = ref('')

  const technologies: Ref<ExtendSelectList[]> = ref([])
  const professions: Ref<ExtendSelectList[]> = ref([])
  const levels: Ref<ExtendSelectList[]> = ref([])
  const languages: Ref<ExtendSelectList[]> = ref([])
  const projects: Ref<ExtendSelectList[]> = ref([])

  const resetEmployeeForm = () => {
    employeesForm.firstName = ''
    employeesForm.lastName = ''
    employeesForm.level = ''
    employeesForm.profession = ''
    employeesForm.birthday = ''
    employeesForm.itTechnologies = []
    employeesForm.languages = []
    employeesForm.experience = ''
  }

  const checkTechnologies = (payload: string) => {
    const index = employeesForm?.itTechnologies?.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      employeesForm.itTechnologies?.splice(index, 1)
    } else {
      const technologie = technologies.value.find((element) => element.uuid === payload)
      if(technologie) {
        employeesForm.itTechnologies?.push(technologie)
      }
    }
  }

  const checkLanguages = (payload: string) => {
    const index = employeesForm?.languages?.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      employeesForm.languages?.splice(index, 1)
    } else {
      const language = languages.value.find((element) => element.uuid === payload)
      if(language) {
        employeesForm.languages?.push(language)
      }
    }
  }

  const checkProjects = (payload: string) => {
    const index = employeesForm?.projects?.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      employeesForm.projects?.splice(index, 1)
    } else {
      const project = projects.value.find((element) => element.uuid === payload)
      if(project) {
        employeesForm.projects?.push(project)
      }
    }
  }

  const checkProfession = (payload: string) => {
    employeesForm.profession = employeesForm.profession === payload ? '' : payload;
  }

  const checkLevel = (payload: string) => {
    employeesForm.level = employeesForm.level === payload ? '' : payload;
  }

  const getEmployees = async (payload: string = '') => {
    try {
      const { data }: { data: TEmployeeResponse[]} = await axios.get('/api/employees/search',{
        params: {
          searchText: payload
        }
      })
      employees.value = data ? data.map((employee) => ({
            uuid: employee.uuid,
            active: employee.active,
            firstName: employee.firstName,
            lastName: employee.lastName,
            level: employee.level.levelName,
            profession: employee.profession.professionName,
          }
          )) : []
    } catch (e) {
      notify({ text: t('notify.NOT_FOUND_EMPLOYEES'), type: 'error' })
    }
  }

  const createEmployees = async () => {
    try {
      await axios.post('/api/employees', {
        firstName: employeesForm.firstName,
        lastName: employeesForm.lastName,
        active: employeesForm.active,
        level: employeesForm.level,
        profession: employeesForm.profession,
        birthday: employeesForm.birthday?.split('/').reverse().join('-'),
        itExperience: new Date(employeesForm.experience!),
        itTechnologies: employeesForm.itTechnologies?.map((technologie) => technologie.uuid),
        projects: employeesForm.projects?.map((project) => project.uuid),
        languages: employeesForm.languages?.map((language) => language.uuid)
      })
      await getEmployees()
      resetEmployeeForm()
      notify({ text: t('notify.EMPLOYEE_HAS_BEEN_CREATED'), type: 'success' })
      return true
    } catch (e) {
      notify({ text: t('notify.EMPLOYEE_NOT_BEEN_CREATED'), type: 'error' })
      return false
    }
  }


  const checkProjectForm = async () => {
    let isCreated: boolean = false
    isRequired(employeesForm.firstName) ? errors.firstName = '' : errors.firstName = 'validation.FIELD_IS_REQUIRED'
    errors.firstName = validateField('name', employeesForm.firstName!, 3)
    isRequired(employeesForm.lastName!) ? errors.lastName = '' : errors.lastName = 'validation.FIELD_IS_REQUIRED'
    errors.lastName = validateField('client', employeesForm.lastName!, 3)
    isRequired(employeesForm.birthday!) ? errors.birthday = '' : errors.birthday = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(employeesForm.birthday) ? errors.birthday = '' : errors.birthday = 'validation.WRONG_DATE'
    isRequired(employeesForm.level) ? errors.level = '' : errors.level = 'validation.FIELD_IS_REQUIRED'
    isRequired(employeesForm.profession) ? errors.profession = '' : errors.profession = 'validation.FIELD_IS_REQUIRED'
    isRequired(employeesForm.experience) ? errors.experience = '' : errors.experience = 'validation.FIELD_IS_REQUIRED'

    if(checkErrors(errors)) {
      isCreated = await createEmployees()
    }
    return isCreated
  }


  const getItTechnologies = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsItTechnologies[]} = await axios.get('/api/ittechnologies')
      technologies.value = sortAlphabetically(transformToSelectList(data))
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const getProfessions = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsItTechnologies[]} = await axios.get('/api/profession')
      professions.value = sortAlphabetically(transformToSelectList(data))
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const getLevels = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsItTechnologies[]} = await axios.get('/api/levels')
      levels.value = sortAlphabetically(transformToSelectList(data))
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const getLanguages = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsItTechnologies[]} = await axios.get('/api/languages')
      languages.value = sortAlphabetically(transformToSelectList(data))
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  const getProjects = async (): Promise<void> => {
    try {
      const { data } : {data: TConfigurationsItTechnologies[]} = await axios.get('/api/projects/projectShortInfo')
      projects.value = sortAlphabetically(transformToSelectList(data))
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })    }
  }

  return {
    checkLanguages,
    checkLevel,
    checkProfession,
    checkProjects,
    checkProjectForm,
    checkTechnologies,
    employees,
    employeesForm,
    errors,
    getEmployees,
    getItTechnologies,
    getLanguages,
    getLevels,
    getProfessions,
    getProjects,
    isCreateModal,
    languages,
    levels,
    professions,
    projects,
    resetEmployeeForm,
    searchText,
    technologies,
  }
})
