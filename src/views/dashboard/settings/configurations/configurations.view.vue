<script setup lang="ts">
import { computed, Ref, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useItTechnologies } from '@/store/settings/configurations/it-technologies.store'
import { useProfessions } from '@/store/settings/configurations/professions.store'
import { useLevels } from '@/store/settings/configurations/levels.store'
import { useLanguages } from '@/store/settings/configurations/languages.store'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import cListOfTags from '@/components/list-of-tags/list-of-tags.component.vue'
import cPageTitle from '@/components/page-title/page-title.component.vue'
import {
  ConfigurationsItTechnologies,
  ConfigurationsProfessions,
  ConfigurationsLanguages,
  ConfigurationsLevels } from '@/store/settings/configurations/configurations.type';

const storeTechnologies = useItTechnologies()
const storeProfessions = useProfessions()
const storeLevels = useLevels()
const storeLanguages = useLanguages()

const {
  getItTechnologies,
  removeItTechnologie,
  createItTechnologie } = useItTechnologies()

const {
  getProfessions,
  createProfession,
  removeProfession } = useProfessions()

const {
  getLevels,
  createLevel,
  removeLevel } = useLevels()
const {
  getLanguages,
  createLanguage,
  removeLanguage } = useLanguages()

getItTechnologies();
getProfessions();
getLevels();
getLanguages();

const { itTechnologies } = storeToRefs(storeTechnologies)
const { professions } = storeToRefs(storeProfessions)
const { levels } = storeToRefs(storeLevels)
const { languages } = storeToRefs(storeLanguages)

const itTechnologieValue: Ref = ref('')
const professionValue: Ref = ref('')
const levelValue: Ref = ref('')
const languageValue: Ref = ref('')

const technologies = computed(() => {
  return itTechnologies.value.map((element: ConfigurationsItTechnologies) => ({label: element.technologyName, uuid: element.technologyUuid}))
})

const professionList = computed(() => {
  return professions.value.map((element: ConfigurationsProfessions) => ({label: element.professionName, uuid: element.professionUuid}))
})

const levelList = computed(() => {
  return levels.value.map((element: ConfigurationsLevels) => ({label: element.levelName, uuid: element.levelUuid}))
})

const languageList = computed(() => {
  return languages.value.map((element: ConfigurationsLanguages) => ({label: element.languageName, uuid: element.languageUuid}))
})

const createTechnologie = () => {
  createItTechnologie(itTechnologieValue.value)
  itTechnologieValue.value = ''
}

const createProf = () => {
  createProfession(professionValue.value)
  professionValue.value = ''
}

const createLvl = () => {
  createLevel(levelValue.value)
  levelValue.value = ''
}

const createLang = () => {
  createLanguage(languageValue.value)
  languageValue.value = ''
}

</script>

<template>

  <c-page-title title="title.CONFIGURATION_TAG"
                class="mb-8" />

  <div class="flex flex-wrap justify-evenly md:justify-between">

    <c-list-of-tags :list="technologies"
                    title="IT_TECHNOLOGIES"
                    v-model="itTechnologieValue"
                    @remove-item="removeItTechnologie"
                    @keyup.enter="createTechnologie" />

    <c-list-of-tags :list="professionList"
                    title="PROFESSIONS"
                    v-model="professionValue"
                    @remove-item="removeProfession"
                    @keyup.enter="createProf" />

    <c-list-of-tags :list="levelList"
                    title="LEVELS"
                    v-model="levelValue"
                    @remove-item="removeLevel"
                    @keyup.enter="createLvl" />

    <c-list-of-tags :list="languageList"
                    title="LANGUAGES"
                    v-model="languageValue"
                    @remove-item="removeLanguage"
                    @keyup.enter="createLang" />

  </div>
</template>
