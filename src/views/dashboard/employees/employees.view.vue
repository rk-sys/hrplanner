<script setup lang="ts">
import { watch, ref } from 'vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import cPageTitle from '@/components/page-title/page-title.component.vue'
import cEmployeesList from '@/views/dashboard/employees/components/employees-list.component.vue'
import cEmployeeForm from '@/views/dashboard/employees/components/employee-form.component.vue'
import { useEmployeeStore } from '@/store/employees/employees.store'
import { storeToRefs } from 'pinia';

const store = useEmployeeStore()

const {
  checkLanguages,
  checkLevel,
  checkProfession,
  checkProjects,
  checkTechnologies,
  employeesForm,
  errors,
  getEmployees,
  getItTechnologies,
  getLanguages,
  getLevels,
  getProfessions,
  getProjects,
  checkProjectForm,
} = useEmployeeStore()

getEmployees()

const { employees }  = storeToRefs(store)
const { searchText }  = storeToRefs(store)
const { isCreateModal }  = storeToRefs(store)
const { technologies }  = storeToRefs(store)
const { languages }  = storeToRefs(store)
const { levels }  = storeToRefs(store)
const { professions }  = storeToRefs(store)
const { projects }  = storeToRefs(store)

const showModal = ref(false)
const showDeleteModal = ref(false)

watch(() => searchText.value, newValue => {
  getEmployees(newValue)
})

const triggerModal = async () => {
  await getLanguages()
  await getLevels()
  await getProfessions()
  await getItTechnologies()
  await getProjects()
  isCreateModal.value = true
  showModal.value = true
}

const handleCheckTechnologies = (payload: string) => {
  checkTechnologies(payload)
}

const handleCheckLanguages = (payload: string) => {
  checkLanguages(payload)
}

const handleCheckProjects = (payload: string) => {
  checkProjects(payload)
}

const handleCheckProfession = (payload: string) => {
  checkProfession(payload)
}

const handleCheckLevel = (payload: string) => {
  checkLevel(payload)
}

const checkProject = async () => {
  showModal.value = await checkProjectForm()
}

</script>

<template>
  <div class="w-full">

    <c-page-title title="title.MY_EMPLOYEES"
                  class="mb-8">

      <c-button class="max-w-xs px-6"
                button-type="ghost"
                @click="triggerModal">{{ $t('button.CREATE_EMPLOYEE') }}</c-button>
    </c-page-title>

    <c-input v-model="searchText"
             :placeholder="$t('placeholder.SEARCH_EMPLOYEE')"
             class="py-0 pl-0 max-w-xs"/>

    <c-employee-form :employee="employeesForm"
                     :errors="errors"
                     :show-modal="showModal"
                     :technologies="technologies"
                     :languages="languages"
                     :levels="levels"
                     :professions="professions"
                     :projects="projects"
                     @create-employee="checkProject"
                     @check-technologies="checkTechnologies"
                     @check-languages="handleCheckLanguages"
                     @check-projects="handleCheckProjects"
                     @check-profession="handleCheckProfession"
                     @check-level="handleCheckLevel"
                     @close-modal="showModal = false" />

    <c-employees-list :employees="employees" />
  </div>
</template>
