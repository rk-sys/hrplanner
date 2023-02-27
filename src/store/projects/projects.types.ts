import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types';

export type TProjects = {
  projectUuid: string,
  client: string
  dateEnd: string
  dateStart: string
  description: string | null
  employees: TEmployees[]
  name: string
  topic: string
  itTechnologies: ExtendSelectList[]
}

export type TEmployees = {
  firstName: string
  lastName: string
  uuid: string
}

export type TProject = {
  projectUuid?: string
  client: string
  dateEnd: string
  dateStart: string
  description: string
  employees: string[]
  itTechnologies: ExtendSelectList[]
  roles: ExtendSelectList[]
  activities: ExtendSelectList[]
  name: string
  topic: string
  technologieText?: string
  roleText?: string
  activitiesText?: string
  employeeDateEndInProject?: string
  employeeDateStartInProject?: string
}

export type ProjectToUpdate = {
  roleText: string,
  activitiesText: string,
  projectUuid: string,
  roles: ExtendSelectList[]
  activities: ExtendSelectList[]
  employeeDateStartInProject: string
  employeeDateEndInProject: string
}

export type TProjectError = {
  client: string
  dateEnd: string
  dateStart:string
  name: string
}

export type TProjectDelete = {
  client: string,
  name: string,
  projectUuid: string
}
