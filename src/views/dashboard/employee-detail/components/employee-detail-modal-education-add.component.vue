<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cTextArea from '@/components/form/textarea/text-area.component.vue'
import { ExtendSelectList } from "@/components/form/extend-select/extend-select.types";
import { TCertificate, TEducationForm } from "@/store/employee-detail/employee-detail.types";

const emits = defineEmits(['closeModal', 'addEducation'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  education: {
    type: Object as PropType<TEducationForm>,
    required: true
  },
  errors: {
    type: Object as PropType<Partial<TEducationForm>>,
    required: true
  }
})

</script>
<template>

  <c-modal v-if="showModal"
           title="title.ADD_EDUCATION"
           @close-modal="$emit('closeModal')">

    <c-input v-model="education.schoolName"
             :error-msg="errors.schoolName"
             white-bg
             placeholder="placeholder.NAME" />

    <c-input v-model="education.dateStart"
             :error-msg="errors.dateStart"
             white-bg
             placeholder="placeholder.DATE_START" />

    <c-input v-model="education.dateEnd"
             :error-msg="errors.dateEnd"
             white-bg
             placeholder="placeholder.DATE_END" />

    <c-text-area v-model="education.description"
                 rows="4"
                 type="textarea"
                 white-bg
                 placeholder="placeholder.DESCRIPTION" />


    <div class="flex justify-between pb-3">
      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                @click.prevent="$emit('addEducation')">{{ $t('button.UPDATE') }}</c-button>
    </div>
  </c-modal>
</template>

