import axios from 'axios'
import { ref, Ref, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { notify } from '@kyvg/vue3-notification'
import {
  TAddProject,
  TCertificate, TCertificateForm, TEducationForm,
  TEmployeeDetail, TEmployeeForm, TEmployeeFormError,
  TPdfSettings,
  TProjectEmployee,
} from './employee-detail.types';
import { useI18n } from 'vue-i18n';
import { checkErrors } from '@/hooks/helpers'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';
import { isRequired, checkDatePattern } from '@/hooks/use-rules';
import { useRouter } from 'vue-router';
import { ProjectToUpdate, TProjectDelete } from "@/store/projects/projects.types";

export const useEmployeeDetailStore = defineStore('employeeDetailStore', () => {
  const { t } = useI18n({ inheritLocale: true, useScope: 'local' })

  const router = useRouter();
  const pdfSettings: Ref<TPdfSettings> = ref({
    isBlind: false,
    isEducation: true,
    isDescriptionEducation: true,
    isCertificate: true,
    isDescription: true,
    isTopic: true,
  })

  const employeeForm: Ref<TEmployeeForm> = ref({
    uuid: '',
    active: true,
    firstName: '',
    birthday: '',
    itExperience:'',
    lastName: '',
    level: '',
    profession: '',
    itTechnologies: [],
    languages: [],
  })

  const errorsEmployeeForm: Ref<Partial<TEmployeeFormError>> = ref({
    active: true,
    firstName: '',
    birthday: '',
    itExperience:'',
    lastName: '',
    level: '',
    profession: '',
  })

  const employeeDetail: Ref<TEmployeeDetail> = ref({
    uuid: '',
    active: true,
    firstName: '',
    birthday: '',
    itExperience:'',
    lastName: '',
    certificates: [],
    educations: [],
    itTechnologies: [],
    languages: [],
    level: {uuid: '', label: ''},
    profession: {uuid: '', label: ''},
    projects: [],
  })

  const projectToDelete: TProjectDelete = reactive({
    client: '',
    name: '',
    projectUuid: ''
  })

  const projectToUpdate: Ref<ProjectToUpdate> = ref({
    activitiesText: '',
    roleText: '',
    projectUuid: '',
    activities: [],
    roles: [],
    employeeDateEndInProject: '',
    employeeDateStartInProject: ''
  })

  const errorsUpdateProject: Ref<ProjectToUpdate> = ref({
    activitiesText: '',
    roleText: '',
    projectUuid: '',
    activities: [],
    roles: [],
    employeeDateEndInProject: '',
    employeeDateStartInProject: ''
  })

  const projectsToAdd: TAddProject = reactive({
    list: [],
    availableProjects: [],
    search: ''
  })

  const certificate: TCertificate = reactive({
    name: '',
    dateEnd: '',
    dateStart: '',
    idCredential: ''
  })

  let educationToDelete: Partial<TEducationForm> = reactive({
    schoolName: '',
    educationUuid: '',
  })

  let certificateToDelete: TCertificateForm = reactive({
    certificateUuid: '',
    name: '',
    dateEnd: '',
    dateStart: '',
    idCredential: '',
  })

  const errorsCertificate: TCertificateForm = reactive({
    name: '',
    dateEnd: '',
    dateStart: '',
    idCredential: '',
    certificateUuid: '',
  })

  const educationForm: TEducationForm = reactive({
    dateEnd: '',
    dateStart: '',
    dateRangeAsString: '',
    description: '',
    schoolName: ''
  })

  const errorsEducationForm: Partial<TEducationForm> = reactive({
    schoolName: '',
    dateEnd: '',
    dateStart: '',
    description: '',
  })

  watch(() => educationForm.schoolName, newValue => {
    isRequired(newValue) ? errorsEducationForm.schoolName = '' : errorsEducationForm.schoolName = 'validation.FIELD_IS_REQUIRED'
  })

  watch(() => educationForm.description, newValue => {
    isRequired(newValue) ? errorsEducationForm.description = '' : errorsEducationForm.description = 'validation.FIELD_IS_REQUIRED'
  })

  watch(() => educationForm.dateEnd, newValue => {
    isRequired(newValue) ? errorsEducationForm.dateEnd = '' : errorsEducationForm.dateEnd = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errorsEducationForm.dateEnd = '' : errorsEducationForm.dateEnd = 'validation.WRONG_DATE'
  })

  watch(() => educationForm.dateStart, newValue => {
    isRequired(newValue) ? errorsEducationForm.dateStart = '' : errorsEducationForm.dateStart = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errorsEducationForm.dateStart = '' : errorsEducationForm.dateStart = 'validation.WRONG_DATE'
  })

  watch(() => certificate.name, newValue => {
    isRequired(newValue) ? errorsCertificate.name = '' : errorsCertificate.name = 'validation.FIELD_IS_REQUIRED'
  })

  watch(() => certificate.idCredential, newValue => {
    isRequired(newValue) ? errorsCertificate.idCredential = '' : errorsCertificate.idCredential = 'validation.FIELD_IS_REQUIRED'
  })

  watch(() => certificate.dateEnd, newValue => {
    isRequired(newValue) ? errorsCertificate.dateEnd = '' : errorsCertificate.dateEnd = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errorsCertificate.dateEnd = '' : errorsCertificate.dateEnd = 'validation.WRONG_DATE'
  })

  watch(() => projectToUpdate.value.employeeDateEndInProject, newValue => {
    isRequired(newValue) ? errorsUpdateProject.value.employeeDateEndInProject = '' : errorsUpdateProject.value.employeeDateEndInProject = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errorsUpdateProject.value.employeeDateEndInProject = '' : errorsUpdateProject.value.employeeDateEndInProject = 'validation.WRONG_DATE'
  })

  watch(() => projectToUpdate.value.employeeDateStartInProject, newValue => {
    isRequired(newValue) ? errorsUpdateProject.value.employeeDateStartInProject = '' : errorsUpdateProject.value.employeeDateStartInProject = 'validation.FIELD_IS_REQUIRED'
    checkDatePattern(newValue) ? errorsUpdateProject.value.employeeDateStartInProject = '' : errorsUpdateProject.value.employeeDateStartInProject = 'validation.WRONG_DATE'
  })

  const assignEmployeeDetail = () => {
    employeeForm.value.uuid = employeeDetail.value.uuid
    employeeForm.value.firstName = employeeDetail.value.firstName
    employeeForm.value.lastName = employeeDetail.value.lastName
    employeeForm.value.active = employeeDetail.value.active
    employeeForm.value.birthday = employeeDetail.value.birthday.split('-').reverse().join('/')
    employeeForm.value.itExperience = employeeDetail.value.itExperience.split('-').reverse().join('/')
    employeeForm.value.itTechnologies = employeeDetail.value.itTechnologies
    employeeForm.value.profession = employeeDetail.value.profession.uuid
    employeeForm.value.level = employeeDetail.value.level.uuid
    employeeForm.value.languages = employeeDetail.value.languages
  }
  const resetEmployeeDetail = () => {
    employeeForm.value.uuid = ''
    employeeForm.value.firstName = ''
    employeeForm.value.lastName = ''
    employeeForm.value.active = true
    employeeForm.value.birthday = ''
    employeeForm.value.itExperience = ''
    employeeForm.value.itTechnologies = []
    employeeForm.value.languages = []
    employeeForm.value.profession = ''
    employeeForm.value.level = ''
  }

  const updateEmployeeDetail = async (): Promise<boolean> => {

    console.log(new Date(employeeForm.value.itExperience))
    console.log(new Date(employeeForm.value.birthday))
    try {
      await axios.put('/api/employees', {
        uuid: employeeForm.value.uuid,
        active: employeeForm.value.active,
        firstName: employeeForm.value.firstName,
        lastName: employeeForm.value.lastName,
        level: employeeForm.value.level,
        profession: employeeForm.value.profession,
        birthday: employeeForm.value.birthday.split('/').reverse().join('-'),
        itExperience: employeeForm.value.itExperience.split('/').reverse().join('-'),
        itTechnologyUuids: employeeForm.value.itTechnologies.map((item) => item.uuid),
        languageUuids: employeeForm.value.languages.map((item) => item.uuid)
      })
      notify({ text: t('notify.EMPLOYEE_HAS_BEEN_UPDATED'), type: 'success' })
      return false
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return true
    }
  }

  const getEmployeeDetail = async (payload: string): Promise<void> => {
    try {
      const { data } : { data: TEmployeeDetail } = await axios.get('/api/employees/employeeFullInfo', {
        params: {
          employeeUuid: payload
        }
      })
      employeeDetail.value = data
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const assignProjectToDelete = (payload: TProjectDelete) => {
    projectToDelete.client = payload.client
    projectToDelete.name = payload.name
    projectToDelete.projectUuid = payload.projectUuid
  }

  const assignEducationToDelete = (payload: Partial<TEducationForm>) => {
    educationToDelete.schoolName = payload.schoolName
    educationToDelete.educationUuid = payload.educationUuid
  }

  const deleteProject = async () => {
    try {
      await axios.put('/api/projects/employee/remove', {
        employeeUuid: employeeDetail.value.uuid,
        projectUuid: projectToDelete.projectUuid
      });
      await getEmployeeDetail(employeeDetail.value.uuid)
      assignProjectToDelete({ name: '', client: '', projectUuid: '' })
      notify({ text: t('notify.PROJECT_HAS_BEEN_DELETED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const updateProjectDate = async () => {
    try {
      await axios.put('/api/projects/employee/add', {
        dateEnd: projectToUpdate.value.employeeDateEndInProject,
        dateStart: projectToUpdate.value.employeeDateStartInProject,
        projectUuid: projectToUpdate.value.projectUuid,
        employeeUuid: employeeDetail.value.uuid
      });
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.PROJECT_HAS_BEEN_DELETED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const updateProjectActivities = async (payload: string) => {
    try {
      await axios.post('/api/activities', {
        label: payload,
        projectUuid: projectToUpdate.value.projectUuid,
        employeeUuid: employeeDetail.value.uuid
      });
      projectToUpdate.value.activitiesText = ''
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.ACTIVITIES_HAS_BEEN_CREATED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const updateProjectRoles = async (payload: string) => {
    try {
      await axios.post('/api/roles', {
        label: payload,
        projectUuid: projectToUpdate.value.projectUuid,
        employeeUuid: employeeDetail.value.uuid
      });
      projectToUpdate.value.roleText = ''
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.ROLE_HAS_BEEN_CREATED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const deleteProjectActivities = async (payload: ExtendSelectList) => {
    try {
      await axios.delete('/api/activities', {
        params: {
          uuid: payload
        }
      });
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.ACTIVITIES_HAS_BEEN_DELETED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const deleteProjectRoles = async (payload: ExtendSelectList) => {
    try {
      await axios.delete('/api/roles', {
        data: {
          uuid: payload
        }
      });

      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.ROLE_HAS_BEEN_DELETED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const deleteEmployee = async () => {
    try {
      await axios.delete('/api/employees', {
        params: {
          employeeUuid: employeeDetail.value.uuid
        },
      });
      await router.push({ name: 'Employees'})
      notify({ text: t('notify.EMPLOYEE_HAS_BEEN_DELETED'), type: 'success' })
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const assignUpdateProject = (payload: TProjectEmployee) => {
    projectToUpdate.value.projectUuid = payload.projectUuid
    projectToUpdate.value.roles = payload.roles
    projectToUpdate.value.activities = payload.activities
    projectToUpdate.value.employeeDateStartInProject = payload.employeeDateStartInProject.split('-').reverse().join('/')
    projectToUpdate.value.employeeDateEndInProject = payload.employeeDateEndInProject.split('-').reverse().join('/')
  }

  const resetProjectToUpdate = () => {
    projectToUpdate.value.projectUuid = ''
    projectToUpdate.value.roles = []
    projectToUpdate.value.activities = []
    projectToUpdate.value.employeeDateStartInProject = ''
    projectToUpdate.value.employeeDateEndInProject = ''
  }

  const getProjects = async (): Promise<void> => {
    try {
      const { data } : {data: ExtendSelectList[]} = await axios.get('/api/projects/projectShortInfo')
      projectsToAdd.availableProjects = data
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const addProjects = async (): Promise<void> => {
    try {
      await axios.put('/api/project/employees/add', {
        projectUuid: projectsToAdd.list
      })
      projectsToAdd.list = []
      await getEmployeeDetail(employeeDetail.value.uuid)
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
    }
  }

  const assignCertificateToDelete = (certificate: TCertificate) => {
    certificateToDelete.name = certificate.name
    certificateToDelete.certificateUuid = certificate.certificateUuid
    certificateToDelete.idCredential = certificate.idCredential
  }

  const addCertificate = async (): Promise<boolean> => {
    try {
      await axios.post('/api/certificates', {
        ...certificate,
        dateEnd: new Date(certificate.dateEnd),
        dateStart: new Date(certificate.dateEnd),
        employeeUuid: employeeDetail.value.uuid
      })
      resetCertificateForm()
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.CERTIFICATE_HAS_BEEN_CREATED'), type: 'success' })
      return false
    } catch (e) {
      notify({ text: t(`${e.response.data.message}`), type: 'error' })
      return true
    }
  }

  const addEducation = async (): Promise<boolean> => {
    try {
      await axios.post('/api/education', {
        description: educationForm.description,
        schoolName: educationForm.schoolName,
        dateEnd: new Date(educationForm.dateEnd),
        dateStart: new Date(educationForm.dateEnd),
        employeeUuid: employeeDetail.value.uuid
      })
      resetEducationForm()
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.EDUCATION_HAS_BEEN_CREATED'), type: 'success' })
      return false
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return true
    }
  }

  const deleteCertificate = async (): Promise<boolean> => {
    try {
      await axios.delete('/api/certificates', { data: { certificateUuid: certificateToDelete.certificateUuid } });
      certificateToDelete.certificateUuid = ''
      certificateToDelete.name = ''
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.CERTIFICATE_HAS_BEEN_CREATED'), type: 'success' })
      return false
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return true
    }
  }

  const deleteEducation = async (): Promise<boolean> => {
    try {
      await axios.delete('/api/education', { data: { educationUuid: educationToDelete.educationUuid } });
      educationToDelete.educationUuid = ''
      educationToDelete.schoolName = ''
      await getEmployeeDetail(employeeDetail.value.uuid)
      notify({ text: t('notify.CERTIFICATE_HAS_BEEN_CREATED'), type: 'success' })
      return false
    } catch (e) {
      notify({ text: t(`${ e.response.data.message}`), type: 'error' })
      return true
    }
  }

  const resetCertificateForm = () => {
    certificate.dateEnd = ''
    certificate.idCredential = ''
    certificate.name = ''
  }

  const resetEducationForm = () => {
    educationForm.dateEnd = ''
    educationForm.dateStart = ''
    educationForm.schoolName = ''
    educationForm.description = ''
  }

  const checkProjects = (payload: string) => {
    const index = projectsToAdd.list.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      projectsToAdd.list.splice(index, 1)
    } else {
      const project = projectsToAdd.availableProjects.find((element) => element.uuid === payload)
      if(project) {
        projectsToAdd.list.push(project)
      }
    }
  }


  const checkTechnologies = (payload: string, technologies: ExtendSelectList[]) => {
    const index = employeeForm.value.itTechnologies.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      employeeForm.value.itTechnologies?.splice(index, 1)
    } else {
      const technologie = technologies.find((element) => element.uuid === payload)
      if(technologie) {
        employeeForm.value.itTechnologies?.push(technologie)
      }
    }
  }

  const checkLanguages = (payload: string, languages: ExtendSelectList[]) => {
    const index = employeeForm.value.languages.findIndex((element) => element.uuid === payload)

    if(index !== -1 && index !== undefined) {
      employeeForm.value.languages?.splice(index, 1)
    } else {
      const language = languages.find((element) => element.uuid === payload)
      if(language) {
        employeeForm.value.languages?.push(language)
      }
    }
  }

  const checkProfession = (payload: string) => {
    employeeForm.value.profession = employeeForm.value.profession === payload ? '' : payload;
  }

  const checkLevel = (payload: string) => {
    employeeForm.value.level = employeeForm.value.level === payload ? '' : payload;
  }

  const generatePdf = async () => {
    try {
      const downloadedFile = await axios.post('/api/pdfgenerate', {
            employeeUuid: employeeDetail.value.uuid,
            fileName: `${employeeDetail.value.firstName}_${employeeDetail.value.lastName}_antologic`,
            ...pdfSettings,
          },
          {
            responseType: 'blob'
          });

      // create a download anchor tag
      var downloadLink = document.createElement('a');
      downloadLink.target = '_blank';
      downloadLink.download = `${employeeDetail.value.firstName}_${employeeDetail.value.lastName}_antologic.pdf`;

      // convert downloaded data to a Blob
      var blob = new Blob([downloadedFile.data], { type: 'application/pdf' });

      // create an object URL from the Blob
      var URL = window.URL || window.webkitURL;
      var downloadUrl = URL.createObjectURL(blob);

      // set object URL as the anchor's href
      downloadLink.href = downloadUrl;

      // append the anchor to document body
      document.body.appendChild(downloadLink);

      // fire a click event on the anchor
      downloadLink.click();

      // cleanup: remove element and revoke object URL
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);

    } catch (e) {
      throw new Error(e);
    }
  }

return {
  addCertificate,
  addEducation,
  addProjects,
  assignCertificateToDelete,
  assignEducationToDelete,
  assignEmployeeDetail,
  assignProjectToDelete,
  assignUpdateProject,
  certificate,
  certificateToDelete,
  checkProjects,
  deleteCertificate,
  deleteEducation,
  deleteEmployee,
  deleteProject,
  deleteProjectActivities,
  deleteProjectRoles,
  educationForm,
  educationToDelete,
  employeeDetail,
  employeeForm,
  errorsCertificate,
  errorsEducationForm,
  errorsEmployeeForm,
  errorsUpdateProject,
  generatePdf,
  getEmployeeDetail,
  getProjects,
  projectToDelete,
  projectToUpdate,
  projectsToAdd,
  resetEmployeeDetail,
  resetProjectToUpdate,
  updateEmployeeDetail,
  updateProjectActivities,
  updateProjectDate,
  updateProjectRoles,
  checkTechnologies,
  checkLevel,
  checkProfession,
  checkLanguages,
  }
})
