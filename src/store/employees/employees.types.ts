import { ExtendSelectList } from "@/components/form/extend-select/extend-select.types";

export type TEmployees = {
  uuid: string
  active: boolean,
  firstName: string
  lastName: string
  level: string
  profession: string
  languages?: ExtendSelectList[]
  itTechnologies?: ExtendSelectList[]
  projects?: ExtendSelectList[]
  birthday?: string
  technologieText?: string
  languageText?: string
  projectText?: string
  experience?: string
}

export type TEmployeeResponse = {
  uuid: string
  active: boolean,
  firstName: string
  lastName: string
  level: ExtendSelectList
  profession: ExtendSelectList
}

export type TEmployeesList = {
  uuid: string
  active: boolean,
  firstName: string
  lastName: string
  level: string
  profession: string
}
