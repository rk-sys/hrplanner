import axios from 'axios';
import { ref, Ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia';
import { notify } from '@kyvg/vue3-notification';
import { TProject, TProjects, TProjectError } from './projects.types';
import { useI18n } from 'vue-i18n';
import { sortAlphabetically, checkErrors } from '@/hooks/helpers'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';
import { validateField, isRequired, checkDatePattern } from '@/hooks/use-rules';

export const useProjectsStore = defineStore('projectsStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const isCreateModal = ref(true)
  const projectToDelete: Partial<TProject> = reactive({
    client: '',
    name: '',
    projectUuid: ''
  })

  const projects: Ref<TProjects[]> = ref([])
  const projectForm: Partial<TProject> = reactive({
    projectUuid: '',
    client: '',
    dateEnd: '',
    dateStart: '',
    name: '',
    itTechnologies: [],
    technologieText: ''
  })

  const errors: TProjectError = reactive({
    client: '',
    dateEnd: '',
    dateStart: '',
    name: '',
  })

  watch(() => projectForm.name, newValue => {
    isRequired(newValue) ? errors.name = '' : errors.name = 'validation.FIELD_IS_REQUIRED'
    errors.name = validateField('name', newValue, 3)
  })

  watch(() => projectForm.client, newValue => {
    isRequired(newValue) ? errors.client = '' : errors.client = 'validation.FIELD_IS_REQUIRED'
    errors.client = validateField('client', newValue, 3)
  })

  watch(() => projectForm.dateStart, newValue => {
    isRequired(newValue) ? errors.dateStart = '' : errors.dateStart = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errors.dateStart = '' : errors.dateStart = 'validation.WRONG_DATE'
  })

  watch(() => projectForm.dateEnd, newValue => {
    isRequired(newValue) ? errors.dateEnd = '' : errors.dateEnd = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errors.dateEnd = '' : errors.dateEnd = 'validation.WRONG_DATE'
  })

  const searchText = ref('')

  const technologies: Ref<ExtendSelectList[]> = ref([])

  const resetProjectForm = () => {
    projectForm.client = ''
    projectForm.dateEnd = ''
    projectForm.dateStart = ''
    projectForm.name = ''
    projectForm.itTechnologies = []
    projectForm.technologieText = ''
    projectForm.projectUuid = ''
  }

  const checkTechnologies = (payload: string) => {
    const index = projectForm?.itTechnologies?.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      projectForm.itTechnologies?.splice(index, 1)
    } else {
      const technologie = technologies.value.find((element) => element.uuid === payload)
      if(technologie) {
        projectForm.itTechnologies?.push(technologie)
      }
    }
  }

  const getItTechnologies = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/ittechnologies')
      technologies.value = data
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const getProjects = async (payload: string = '') => {
    try {
      const { data }: { data: TProjects[]} = await axios.get('/api/projects/search',{
        params: {
          searchText: payload
        }
      })
      projects.value = data ? data : []
    } catch (e) {
      notify({ text: t('notify.NOT_FOUND_PROJECTS'), type: 'error' })
    }
  }

  const createProject = async () => {
    try {
      await axios.post('/api/projects', {
        name: projectForm.name,
        client: projectForm.client,
        dateStart: new Date(projectForm.dateStart!),
        dateEnd: new Date(projectForm.dateEnd!),
        topic: projectForm.topic,
        itTechnologies: projectForm.itTechnologies?.map(technologies => technologies.uuid)
      })
      await getProjects()
      resetProjectForm()
      notify({ text: t('notify.PROJECT_HAS_BEEN_CREATED'), type: 'success' })
    } catch (e) {
      notify({ text: t('notify.PROJECT_NOT_BEEN_CREATED'), type: 'error' })
    }
  }

  const updateProject = async (): Promise<boolean> => {
    try {
      await axios.put('/api/projects', {
        projectUuid: projectForm.projectUuid,
        name: projectForm.name,
        client: projectForm.client,
        dateStart: new Date(projectForm.dateStart!),
        dateEnd: new Date(projectForm.dateEnd!),
        topic: projectForm.topic,
        itTechnologies: projectForm.itTechnologies?.map(technologies => technologies.uuid),
        employees: projectForm.employees
      })
      await getProjects()
      notify({ text: t('notify.PROJECT_HAS_BEEN_UPDATED'), type: 'success' })
      return true
    } catch (e) {
      notify({ text: t('notify.PROJECT_NOT_BEEN_UPDATED'), type: 'error' })
      return false
    }
  }

  const checkProjectForm = async () => {
    isRequired(projectForm.name!) ? errors.name = '' : errors.name = 'validation.FIELD_IS_REQUIRED'
    errors.name = validateField('name', projectForm.name!, 3)
    isRequired(projectForm.client!) ? errors.client = '' : errors.client = 'validation.FIELD_IS_REQUIRED'
    errors.client = validateField('client', projectForm.client!, 3)
    isRequired(projectForm.dateStart!) ? errors.dateStart = '' : errors.dateStart = 'validation.FIELD_IS_REQUIRED'
    isRequired(projectForm.dateEnd!) ? errors.dateEnd = '' : errors.dateEnd = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(projectForm.dateEnd!) ? errors.dateEnd = '' : errors.dateEnd = 'validation.WRONG_DATE'
    checkDatePattern(projectForm.dateStart!) ? errors.dateStart = '' : errors.dateStart = 'validation.WRONG_DATE'

    if(checkErrors(errors)) {
      await createProject()
    }
  }

  const assignDeleteProject = async (payload: Partial<TProject>) => {
    projectToDelete.name = payload.name
    projectToDelete.client = payload.client
    projectToDelete.projectUuid = payload.projectUuid
  }

  const assignProject = (payload: TProject) => {
    projectForm.projectUuid = payload.projectUuid
    projectForm.name = payload.name
    projectForm.client = payload.client
    projectForm.topic = payload.topic
    projectForm.description = payload.description
    projectForm.dateStart = payload.dateStart.split('-').reverse().join('/')
    projectForm.dateEnd = payload.dateEnd.split('-').reverse().join('/')
    projectForm.itTechnologies = payload.itTechnologies ? payload.itTechnologies : []
    projectForm.employees = payload.employees ? payload.employees : []
  }

  const deleteProject = async () => {
    try {
      await axios.delete('/api/projects', { data: { projectUuid: projectToDelete.projectUuid } });
      await getProjects()
    } catch (e) {
      notify({ text: t('notify.PROJECT_NOT_BEEN_DELETE'), type: 'error' })
    }
  }

  return {
    assignDeleteProject,
    assignProject,
    checkProjectForm,
    checkTechnologies,
    deleteProject,
    errors,
    getItTechnologies,
    getProjects,
    isCreateModal,
    projectForm,
    projectToDelete,
    projects,
    searchText,
    technologies,
    updateProject,
    resetProjectForm,
  }
})
