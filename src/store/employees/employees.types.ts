import {
  TConfigurationsItTechnologies,
  TConfigurationsLanguages,
  TConfigurationsLevels,
  TConfigurationsProfessions
} from '@/store/settings/configurations/configurations.type'
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
  experience?: string
}

export type TEmployeeResponse = {
  uuid: string
  active: boolean,
  firstName: string
  lastName: string
  level: TConfigurationsLevels
  profession: TConfigurationsProfessions
}

export type TEmployeesList = {
  uuid: string
  active: boolean,
  firstName: string
  lastName: string
  level: string
  profession: string
}
