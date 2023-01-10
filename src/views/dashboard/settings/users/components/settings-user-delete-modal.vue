<script setup lang="ts">
import { PropType } from 'vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import { TSettingsUsers } from '@/store/setting-user/settings-user.types';

const emits = defineEmits(['closeModal', 'deleteUser'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false
  },
  user: {
    type: Object as PropType<TSettingsUsers>,
    required: true
  }
})
</script>
<template>

  <c-modal v-if="showModal"
           title="title.REMOVE_USER"
           @close-modal="$emit('closeModal')">

    <p class="text-xl py-5 text-center">{{ $t('common.ARE_YOU_SURE_{firstName}_{lastName}_SHOULD_BE_DELETE?',
        { firstName: user.firstName, lastName: user.lastName}) }}</p>

    <div class="flex justify-between p-3">

      <c-button button-type="ghost"
                button-state="secondary"
                class="mr-2"
                type="button"
                @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

      <c-button type="submit"
                class="ml-2"
                button-state="danger"
                @click="$emit('deleteUser')">{{ $t('button.DELETE') }}</c-button>
    </div>
  </c-modal>
</template>
<style scoped>

</style>
