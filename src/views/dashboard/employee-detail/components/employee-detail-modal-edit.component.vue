<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import { TProject } from '@/store/projects/projects.types'
import { ExtendSelectList } from "@/components/form/extend-select/extend-select.types";

const emits = defineEmits(['closeModal', 'updateDate', 'createRole', 'removeRole', 'createActivities', 'removeActivities'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  project: {
    type: Object as PropType<Partial<TProject>>,
    required: true
  },
  errors: {
    type: Object as PropType<Partial<TProject>>,
    required: true
  }
})

const removeRoleInProject = (payload: string) => {
  emits('removeRole', payload)
}

const removeActivitiesInProject = (payload: string) => {
  emits('removeActivities', payload)
}
</script>
<template>

  <c-modal v-if="showModal"
           title="title.UPDATE_PROJECT"
           @close-modal="$emit('closeModal')">

    <div class="flex flex-col justify-between p-3">

      <c-extend-select v-model="project.roleText"
                       :list="project.roles"
                       :show-trash="true"
                       @delete-item="removeRoleInProject"
                       @keyup.enter.prevent.stop="$emit('createRole', project.roleText)"
                       placeholder="placeholder.CREATE_ROLE"
                       white-bg
                       delete-item
                       data-name="create-role" />

      <c-extend-select v-model="project.activitiesText"
                       :list="project.list"
                       :show-trash="true"
                       @delete-item="removeActivitiesInProject"
                       @keyup.enter.prevent.stop="$emit('createActivities', project.activitiesText)"
                       placeholder="placeholder.CREATE_ACTIVITIES"
                       white-bg
                       delete-item
                       data-name="create-role" />

        <div class="flex items-center">

          <c-input v-model="project.employeeDateEndInProject"
                   :error-msg="errors?.employeeDateEndInProject"
                   white-bg
                   placeholder="placeholder.DATE_START" />

          <c-input v-model="project.employeeDateStartInProject"
                   :error-msg="errors.employeeDateStartInProject"
                   white-bg
                   placeholder="placeholder.DATE_END" />

        </div>
    </div>

    <div class="flex justify-between pb-3">
      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                @click.prevent="$emit('createEmployee')">{{ $t('button.UPDATE') }}</c-button>
    </div>
  </c-modal>
</template>

