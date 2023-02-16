<script setup lang="ts">
import { watch, ref } from 'vue'
import cInput from '@/components/form/input/input.component.vue'
import cButton from '@/components/form/button/button.component.vue'
import cProjectList from './components/project-list.component.vue'
import cProjectsForm from './components/projects-form.component.vue'
import cProjectDeleteModal from './components/project-delete-modal.component.vue'
import cPageTitle from '@/components/page-title/page-title.component.vue'
import { useProjectsStore } from '@/store/projects/projects.store'
import { storeToRefs } from 'pinia';
import { TProject } from '@/store/projects/projects.types'
const store = useProjectsStore()

const {
  assignDeleteProject,
  assignProject,
  checkProjectForm,
  checkTechnologies,
  deleteProject,
  errors,
  getItTechnologies,
  getProjects,
  projectForm,
  updateProject,
  resetProjectForm } = useProjectsStore()

getProjects()

const { isCreateModal }  = storeToRefs(store)
const { searchText }  = storeToRefs(store)
const { projects } = storeToRefs(store)
const { technologies } = storeToRefs(store)
const { projectToDelete } = storeToRefs(store)


watch(() => searchText.value, newValue => {
  getProjects(newValue)
})

const triggerModal = () => {
  isCreateModal.value = true
  getItTechnologies()
  showModal.value = true
}

const handleCheckTechnologies = (payload: string) => {
  checkTechnologies(payload)
}

const openDeleteModal = (payload: Partial<TProject>) => {
  assignDeleteProject(payload)
  showDeleteModal.value = true
}

const removeProject = () => {
  deleteProject()
  showDeleteModal.value = false
}

const checkProject = () => {
  showModal.value = false
  checkProjectForm()
}

const updateProjectForm = async () => {
  const projectHasBeenUpdated = await updateProject()

   if(projectHasBeenUpdated) {
     showModal.value = false
     resetProjectForm()
   }
}

const assignUpdateProject = (payload: TProject) => {
  getItTechnologies()
  isCreateModal.value = false
  assignProject(payload)
  showModal.value = true
}

const showModal = ref(false)
const showDeleteModal = ref(false)

</script>

<template>
  <div class="w-full">

    <c-page-title title="title.MY_PROJECTS"
                  class="mb-8">

      <c-button class="max-w-xs px-6"
                button-type="ghost"
                @click="triggerModal">{{ $t('button.CREATE_PROJECT') }}</c-button>
    </c-page-title>

    <c-input v-model="searchText"
             :placeholder="$t('placeholder.SEARCH_PROJECT')"
             class="py-0 pl-0 max-w-xs"/>

    <c-project-delete-modal :show-modal="showDeleteModal"
                            :project="projectToDelete"
                            @close-modal="showDeleteModal = false"
                            @delete-project="removeProject"/>

    <c-projects-form :project="projectForm"
                     :errors="errors"
                     :show-modal="showModal"
                     :technologies="technologies"
                     :mode-create="isCreateModal"
                     @update-project="updateProjectForm"
                     @check-technologies="checkTechnologies"
                     @create-project="checkProject"
                     @close-modal="showModal = false" />

    <c-project-list :project-list="projects"
                    @assign-update-project="assignUpdateProject"
                    @assign-delete-project="openDeleteModal" />
  </div>
</template>

<style scoped>

</style>
