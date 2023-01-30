import { reactive, watch, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { validateEmail, validateField } from '@/hooks/use-rules';
import { useSettingsUsers } from '@/store/settings/setting-user/settings-users.store'
import { TSettingsUsers } from '@/store/settings/setting-user/settings-user.types';

export const useSettingsUser = () => {
  const store = useSettingsUsers();
  store.getUsers();

  const { users }: TSettingsUsers = storeToRefs(store);

  const showSettingsUserModal = ref(false)

  const showSettingsDeleteModal = ref(false)

  const user: TSettingsUsers = reactive({
    email: '',
    firstName: '',
    lastName: '',
    uuid: '',
    active: false
  })

  const errors: TSettingsUsers = reactive({
    email: '',
    firstName: '',
    lastName: '',
    uuid: '',
    active: false,
  })

  const userToDelete: TSettingsUsers = reactive({
    active: false,
    email: '',
    firstName: '',
    lastName: '',
    uuid: ''
  })

  const mode = ref('create');

  const titles = ref(['title.NO', 'title.FIRST_NAME', 'title.LAST_NAME', 'title.EMAIL', 'title.ACTIVE', 'title.ACTIONS'])

  watch(() => user.email, newValue => {
    validateEmail(newValue) ? errors.email = 'wrong email' : errors.email = ''
  })

  watch(() => user.firstName, newValue => {
    errors.firstName = validateField('first name', newValue, 3)
  })

  watch(() => user.lastName, newValue => {
    errors.lastName = validateField('last name', newValue, 3)
  })

  const createUser = async () => {
    validateEmail(user.email) ? errors.email = 'wrong email' : errors.email = ''
    errors.firstName = validateField('first name', user.firstName, 3)
    errors.lastName = validateField('last name', user.lastName, 3)

    if(!errors.email && !errors.firstName && !errors.lastName) {
      await store.createUser(user);
      resetForm()
    }
  }

  const resetForm = (): void => {
    showSettingsUserModal.value = false
    mode.value = 'create'
    user.firstName = ''
    user.lastName = ''
    user.email = ''
    errors.firstName = ''
    errors.lastName = ''
    errors.email = ''
  }

  const assignDeleteUser = (payload: TSettingsUsers): void => {
    showSettingsDeleteModal.value = true
    userToDelete.active = payload.active
    userToDelete.email = payload.email
    userToDelete.firstName = payload.firstName
    userToDelete.lastName = payload.lastName
    userToDelete.uuid = payload.uuid
  }

  const assignUpdateUser = (payload: TSettingsUsers): void => {
    showSettingsUserModal.value = true
    mode.value = 'update'
    user.firstName = payload.firstName
    user.lastName = payload.lastName
    user.email = payload.email
    user.uuid = payload.uuid
  }

  const cancelDeletingUser = (): void => {
    showSettingsDeleteModal.value = false;
    userToDelete.active = '';
    userToDelete.email = '';
    userToDelete.firstName = '';
    userToDelete.lastName = '';
    userToDelete.uuid = '';
  }

  const deleteUser = (): void => {
    store.deleteUserInCompany(userToDelete.uuid)
    showSettingsDeleteModal.value = false;
  }

  const updateUser = (): void => {
    store.updateUser(user)
    resetForm()
  }

  return {
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
  }
}
