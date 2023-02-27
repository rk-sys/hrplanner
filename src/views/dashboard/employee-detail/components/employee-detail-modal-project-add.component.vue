<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import { TProject } from '@/store/projects/projects.types'
import { ExtendSelectList } from "@/components/form/extend-select/extend-select.types";
import { TAddProject } from "@/store/employee-detail/employee-detail.types";

const emits = defineEmits(['closeModal', 'checkProject', 'addProjects'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  projects: {
    type: Object as PropType<TAddProject>,
    required: true
  },
})

const clickedProjects = (uuid: string) => {
  emits('checkProject', uuid)
}

</script>
<template>

  <c-modal v-if="showModal"
           title="title.UPDATE_PROJECT"
           @close-modal="$emit('closeModal')">

    <c-extend-select v-model="projects.search"
                     @click-item="clickedProjects"
                     :list="projects.availableProjects"
                     :selected-list="projects.list"
                     placeholder="placeholder.CHOOSE_PROJECTS"
                     white-bg
                     data-name="choose-employee" />

    <div class="flex justify-between pb-3">
      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                @click.prevent="$emit('addProjects')">{{ $t('button.UPDATE') }}</c-button>
    </div>
  </c-modal>
</template>

