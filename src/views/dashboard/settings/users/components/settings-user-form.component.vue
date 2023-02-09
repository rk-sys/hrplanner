<script setup lang="ts">
import { PropType } from 'vue'
import cModal from '@/components/modal/modal.component.vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import { TSettingsUsers, TUser } from '@/store/settings/setting-user/settings-user.types';

const emit = defineEmits(['closeModal', 'createUser', 'updateUser'])

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object as PropType<TSettingsUsers | TUser>,
    required: true,
  },
  error: {
    type: Object as PropType<TUser>,
    required: true
  },
  mode: {
    type: String,
    default: 'create',
    validator: (value: string) =>  ['create', 'update'].includes(value)
  }
})

</script>

<template>
  <c-modal v-if="showModal"
           :title="mode === `create` ? `title.NEW_USER` : `title.UPDATE_USER`"
           @close-modal="$emit('closeModal')">

    <form>
      <c-input v-model="user.firstName"
               :error-msg="error.firstName"
               white-bg
               placeholder="placeholder.FIRST_NAME" />

      <c-input v-model="user.lastName"
               :error-msg="error.lastName"
               white-bg
               placeholder="placeholder.LAST_NAME" />

      <c-input v-model="user.email"
               :error-msg="error.email"
               white-bg
               placeholder="placeholder.EMAIL" />

      <div class="flex justify-between p-3">

        <c-button button-type="ghost"
                  button-state="secondary"
                  class="mr-2"
                  type="button"
                  @click="$emit('closeModal')">{{ $t('button.CANCEL') }}</c-button>

        <c-button v-if="mode === 'create'"
                  type="submit"
                  class="ml-2"
                  @click="$emit('createUser', user)">{{ $t('button.CREATE') }}</c-button>

        <c-button v-else-if="mode === 'update'"
                  type="submit"
                  class="ml-2"
                  @click="$emit('updateUser', user)">{{ $t('button.UPDATE') }}</c-button>
      </div>
    </form>
  </c-modal>
</template>

<style scoped>

</style>
