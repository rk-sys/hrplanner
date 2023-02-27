<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cExtendSelect from '@/components/form/extend-select/extend-select.component.vue'
import { TCertificateForm } from '@/store/employee-detail/employee-detail.types';

const emits = defineEmits(['closeModal', 'addCertificate'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  certificate: {
    type: Object as PropType<TCertificateForm>,
    required: true
  },
  errors: {
    type: Object as PropType<TCertificateForm>,
    required: true
  }
})

</script>
<template>

  <c-modal v-if="showModal"
           title="title.ADD_CERTIFICATE"
           @close-modal="$emit('closeModal')">

    {{ certificate }}
    <c-input v-model="certificate.name"
             :error-msg="errors.name"
             white-bg
             placeholder="placeholder.NAME" />

    <c-input v-model="certificate.dateEnd"
             :error-msg="errors.dateEnd"
             white-bg
             placeholder="placeholder.DATE" />

    <c-input v-model="certificate.idCredential"
             :error-msg="errors.idCredential"
             white-bg
             placeholder="placeholder.CERTIFICATE_ID" />

    <div class="flex justify-between pb-3">
      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                @click.prevent="$emit('addCertificate')">{{ $t('button.UPDATE') }}</c-button>
    </div>
  </c-modal>
</template>

