<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import { TCertificate } from "@/store/employee-detail/employee-detail.types";

const emits = defineEmits(['closeModal', 'deleteCertificate'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  certificate: {
    type: Object as PropType<TCertificate>,
    required: true
  }
})
</script>
<template>

  <c-modal v-if="showModal"
           title="title.REMOVE_CERTIFICATE"
           @close-modal="$emit('closeModal')">

    <p class="text-xl py-5 text-center">
      {{ $t('common.ARE_YOU_SURE_SHOULD_BE_DELETE?', { firstName: certificate.name }) }}
    </p>

    <div class="flex justify-between p-3">

      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                button-state="danger"
                @click="$emit('deleteCertificate')">{{ $t('button.DELETE') }}</c-button>
    </div>
  </c-modal>
</template>

