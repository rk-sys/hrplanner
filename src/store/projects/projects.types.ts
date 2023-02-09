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
  name: string
  topic: string
  technologieText?: string
}

export type TProjectError = {
  client: string
  dateEnd: string
  dateStart:string
  name: string
}
