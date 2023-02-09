<script setup lang="ts">
import { PropType } from 'vue';
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import cTextArea from '@/components/form/textarea/text-area.component.vue'
import { TProject } from '@/store/projects/projects.types'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types'

const emit = defineEmits(['closeModal', 'createProject', 'checkTechnologies', 'updateProject'])

const props = defineProps({
  modeCreate: {
    type: Boolean,
    required: true
  },
  showModal: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Object as PropType<Partial<TProject>>,
    required: true
  },
  errors: {
    type: Object as PropType<Partial<TProject>>,
  },
  technologies: {
    type: Array as PropType<ExtendSelectList[]>,
    default: () => []
  }
})

const clickedTechnologies = (uuid: string) => {
  emit('checkTechnologies', uuid)
}
</script>

<template>
  <c-modal v-if="showModal"
           :title="modeCreate ? 'title.NEW_PROJECT' : 'title.UPDATE_PROJECT'"
           @close-modal="$emit('closeModal')">

    <form>

      <c-input v-model="project.name"
               :error-msg="errors?.name"
               white-bg
               placeholder="placeholder.PROJECT_NAME" />

      <c-input v-model="project.client"
               :error-msg="errors?.client"
               white-bg
               placeholder="placeholder.PROJECT_CLIENT" />

      <c-extend-select v-model="project.technologieText"
                       @click-item="clickedTechnologies"
                       :list="technologies"
                       :selected-list="project.itTechnologies"
                       placeholder="placeholder.CHOOSE_TECHNOLOGIES"
                       white-bg
                       data-name="create-project"/>

      <div class="flex items-center">
      <c-input v-model="project.dateStart"
               :error-msg="errors?.dateStart"
               white-bg
               placeholder="placeholder.DATE_START" />
-
      <c-input v-model="project.dateEnd"
               :error-msg="errors?.dateEnd"
               white-bg
               placeholder="placeholder.DATE_END" />
      </div>

      <c-input v-model="project.topic"
               white-bg
               placeholder="placeholder.TOPIC" />

      <c-text-area v-model="project.description"
                   rows="4"
                   type="textarea"
                   white-bg
                   placeholder="placeholder.DESCRIPTION" />

      <div class="flex justify-between p-3">

        <c-button button-type="ghost"
                  button-state="secondary"
                  class="mr-2"
                  type="button"
                  @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

        <c-button v-if="modeCreate"
                  type="submit"
                  class="ml-2"
                  @click.prevent="$emit('createProject', project)">{{ $t('button.CREATE') }}</c-button>

        <c-button v-else
                  type="submit"
                  class="ml-2"
                  @click.prevent="$emit('updateProject')">{{ $t('button.UPDATE') }}</c-button>
      </div>
    </form>
  </c-modal>
</template>

<style scoped>

</style>
