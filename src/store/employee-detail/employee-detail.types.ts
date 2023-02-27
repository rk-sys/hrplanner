import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export type TEmployeeDetail = {
  uuid: string
  active: boolean
  firstName: string
  birthday: string
  itExperience: string
  lastName: string
  certificates: TCertificate[]
  educations: TEductionOverview[]
  itTechnologies: ExtendSelectList[]
  languages: ExtendSelectList[]
  level: ExtendSelectList
  profession: ExtendSelectList
  projects: TProjectEmployee[]
}

export type TPdfSettings = {
  isBlind: boolean,
  isEducation: boolean,
  isDescriptionEducation: boolean,
  isCertificate: boolean,
  isDescription: boolean,
  isTopic: boolean,
}

export type TUpdateProjectEmployee = {
  activitiesText: string,
  roleText: string,
  projectUuid: string,
  activities: ExtendSelectList[],
  roles: ExtendSelectList[],
  employeeDateEndInProject: string,
  employeeDateStartInProject: string
}

export type TProjectEmployee = {
  activities: ExtendSelectList[],
  client: '',
  description: null | string
  employeeDateEndInProject: string
  employeeDateStartInProject: string
  employeeWorkTimeInMonths: string
  itTechnologies: ExtendSelectList[]
  name: string
  projectUuid: string,
  roles: ExtendSelectList[]
  topic: string
}

export type TCertificates = {
  uuid: string
  name: string
}

export type TEducation = {
  uuid: string,
  name: string,
  schoolName: string
}

export type TProjectDetail = {
  projectUuid: string
  name: string
  client: string
}

export type TAddProject = {
  search: '',
  availableProjects: ExtendSelectList[]
  list: ExtendSelectList[]
}

export type TCertificate = {
  certificateUuid?: string,
  name: string,
  dateEnd: string,
  dateStart: string,
  idCredential: string
}

export type TCertificateForm = {
  name: string,
  dateEnd: string,
  dateStart: string,
  idCredential: string,
  certificateUuid?: string
}

export type TEducationForm = {
  dateEnd: string,
  dateStart: string
  dateRangeAsString?: string
  description: string
  educationUuid?: string
  schoolName: string
}

export type TEductionOverview = {
  educationUuid: string,
  schoolName: string,
  description: string,
  dateStart: string,
  dateEnd: string,
  dateRangeAsString: string
}

export type TEmployeeForm = {
  uuid: string,
  active: boolean,
  firstName: string,
  birthday: string,
  itExperience:string,
  lastName: string,
  level: string,
  profession: string,
  languages: ExtendSelectList[]
  itTechnologies: ExtendSelectList[],
  technologieText?: string,
  languageText?: string,
  projectText?: string
}

export type TEmployeeFormError = {
  active: boolean,
  firstName: string,
  birthday: string,
  itExperience:string,
  lastName: string,
  level: string,
  profession: string,
}
