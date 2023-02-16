<script setup lang="ts">
import { PropType } from 'vue';
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import cSelect from '@/components/form/select/select.component.vue'
import { TProject } from '@/store/projects/projects.types'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types'
import { TEmployees } from "@/store/employees/employees.types";

const emit = defineEmits(['closeModal', 'createEmployee', 'checkTechnologies', 'checkLanguages', 'checkProjects', 'checkProfession', 'checkLevel'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  employee: {
    type: Object as PropType<Partial<TEmployees>>,
    required: true
  },
  errors: {
    type: Object as PropType<Partial<TEmployees>>,
  },
  technologies: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  },
  languages: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  },
  levels: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  },
  professions: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  },
  projects: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  }
})

const clickedTechnologies = (uuid: string) => {
  emit('checkTechnologies', uuid)
}

const clickedLanguages = (uuid: string) => {
  emit('checkLanguages', uuid)
}

const clickedProjects = (uuid: string) => {
  emit('checkProjects', uuid)
}

const clickedProfession = (uuid: string) => {
  emit('checkProfession', uuid)
}

const clickedLevel = (uuid: string) => {
  emit('checkLevel', uuid)
}

</script>

<template>
  <c-modal v-if="showModal"
           title="title.CREATE_NEW_EMPLOYEE"
           @close-modal="$emit('closeModal')">

    <form>
      <div class="flex items-center">
        <c-input v-model="employee.firstName"
                 :error-msg="errors?.firstName"
                 white-bg
                 placeholder="placeholder.FIRST_NAME" />

        <c-input v-model="employee.lastName"
                 :error-msg="errors?.lastName"
                 white-bg
                 placeholder="placeholder.LAST_NAME" />
      </div>

      <div class="flex items-center">

        <c-input v-model="employee.birthday"
                 :error-msg="errors?.birthday"
                 white-bg
                 placeholder="placeholder.BIRTH_DAY" />

        <c-input v-model="employee.experience"
                 :error-msg="errors?.experience"
                 white-bg
                 placeholder="placeholder.EXPERIENCE" />
      </div>

      <div class="flex items-center">
      <c-select v-model="employee.profession"
                @click-item="clickedProfession"
                :list="professions"
                :error-msg="errors?.profession"
                placeholder="placeholder.CHOOSE_PROFESSION"
                white-bg
                data-name="choose-profession" />

      <c-select v-model="employee.level"
                @click-item="clickedLevel"
                :list="levels"
                :error-msg="errors?.level"
                placeholder="placeholder.CHOOSE_LEVEL"
                white-bg
                data-name="choose-level" />
      </div>

      <div class="flex items-center">
        <c-extend-select v-model="employee.technologieText"
                         @click-item="clickedTechnologies"
                         :list="technologies"
                         :selected-list="employee.itTechnologies"
                         placeholder="placeholder.CHOOSE_TECHNOLOGIES"
                         white-bg
                         data-name="choose-employee" />

        <c-extend-select v-model="employee.languageText"
                         @click-item="clickedLanguages"
                         :list="languages"
                         :selected-list="employee.languages"
                         placeholder="placeholder.CHOOSE_LANGUAGES"
                         white-bg
                         data-name="choose-language" />
      </div>

      <div class="flex justify-between p-3">
        <c-button button-type="ghost"
                  button-state="secondary"
                  class="mr-2"
                  type="button"
                  @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

        <c-button type="submit"
                  class="ml-2"
                  @click.prevent="$emit('createEmployee')">{{ $t('button.CREATE') }}</c-button>
      </div>
    </form>

  </c-modal>
</template>

<style scoped>

</style>
