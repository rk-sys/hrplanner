<script setup lang="ts">
import cPageTitle from '@/components/page-title/page-title.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import cModal from '@/components/modal/modal.component.vue'
import cSettingsUserForm from '@/views/dashboard/settings/users/components/settings-user-form.component.vue'
import cSettingsUserList from '@/views/dashboard/settings/users/components/settings-user-list.component.vue'
import cSettingsUserDeleteModal from '@/views/dashboard/settings/users/components/settings-user-delete-modal.vue'
import { useSettingsUser } from './hooks/use-settings-user'

const {
  assignDeleteUser,
  assignUpdateUser,
  cancelDeletingUser,
  createUser,
  deleteUser,
  errors,
  mode,
  resetForm,
  showSettingsDeleteModal,
  showSettingsUserModal,
  titles,
  updateUser,
  user,
  userToDelete,
  users,
} = useSettingsUser();

</script>

<template>

  <c-settings-user-form :show-modal="showSettingsUserModal"
                        :user="user"
                        :error="errors"
                        :mode="mode"
                        @close-modal="resetForm"
                        @create-user="createUser"
                        @update-user="updateUser"/>

  <c-settings-user-delete-modal :show-modal="showSettingsDeleteModal"
                                :user="userToDelete"
                                @close-modal="cancelDeletingUser"
                                @delete-user="deleteUser"/>

  <c-page-title title="title.MY_USERS">

    <c-button class="px-4"
              button-type="ghost"
              type="submit"
              @click="showSettingsUserModal = true">{{ $t('button.CREATE_NEW_USER') }}
    </c-button>
  </c-page-title>

  <c-settings-user-list :titles="titles"
                        :users="users"
                        @assign-update-user="assignUpdateUser"
                        @assign-delete-user="assignDeleteUser"/>
</template>
