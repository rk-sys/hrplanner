<script setup lang="ts">
import { ref } from 'vue';
import cEmployeeDetailProjectDelete from './components/employee-detail-modal-project-delete.component.vue'
import cEmployeeDetailHeader from '@/views/dashboard/employee-detail/components/employee-detail-header.component.vue'
import cEmployeeDetailProjects from '@/views/dashboard/employee-detail/components/employee-detail-projects.component.vue'
import cEmployeeDetailCertificate from '@/views/dashboard/employee-detail/components/employee-detail-certificate.component.vue'
import cEmployeeDetailModalDelete from '@/views/dashboard/employee-detail/components/employee-detail-modal-delete.component.vue'
import cEmployeeModalProjectUpdate from '@/views/dashboard/employee-detail/components/employee-detail-modal-project-update.component.vue'
import cEmployeeDetailModalProjectAdd from '@/views/dashboard/employee-detail/components/employee-detail-modal-project-add.component.vue'
import cEmployeeDetailModalCertificateAdd from '@/views/dashboard/employee-detail/components/employee-detail-modal-certificate-add.component.vue'
import cEmployeeDetailModalDeleteCertificate from '@/views/dashboard/employee-detail/components/employee-detail-modal-delete-certificate.component.vue'
import cEmployeeDetailModalEducationAdd from '@/views/dashboard/employee-detail/components/employee-detail-modal-education-add.component.vue'
import cEmployeeDetailEducation from '@/views/dashboard/employee-detail/components/employee-detail-education.component.vue'
import cEmployeeDetailModalDeleteEducation from '@/views/dashboard/employee-detail/components/employee-detail-modal-delete-education.component.vue'
import cEmlpoyeeDetailModalEdit from '@/views/dashboard/employee-detail/components/employee-detail-modal-edit.component.vue'
import { useEmployeeDetailStore } from '@/store/employee-detail/employee-detail.store'
import { useItTechnologies } from '@/store/settings/configurations/it-technologies.store'
import { useLanguages } from '@/store/settings/configurations/languages.store'
import { useLevels } from '@/store/settings/configurations/levels.store'
import { useProfessions } from '@/store/settings/configurations/professions.store'
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { TCertificate, TEducation, TProjectEmployee } from "@/store/employee-detail/employee-detail.types";

const router = useRouter()
const store = useEmployeeDetailStore()
const storeTechnologies = useItTechnologies()
const storeProfessions = useProfessions()
const storeLevels = useLevels()
const storeLanguages = useLanguages()

const { getItTechnologies } = useItTechnologies()

const { getProfessions } = useProfessions()

const { getLevels } = useLevels()

const { getLanguagesWithLevels } = useLanguages()

const { itTechnologies } = storeToRefs(storeTechnologies)
const { professions } = storeToRefs(storeProfessions)
const { levels } = storeToRefs(storeLevels)
const { languagesWithLevels } = storeToRefs(storeLanguages)

const {
  addCertificate,
  addEducation,
  addProjects,
  assignCertificateToDelete,
  assignEducationToDelete,
  assignProjectToDelete,
  assignUpdateProject,
  checkProjects,
  deleteCertificate,
  deleteEducation,
  deleteEmployee,
  deleteProject,
  deleteProjectActivities,
  deleteProjectRoles,
  errorsCertificate,
  getEmployeeDetail,
  getProjects,
  updateProjectActivities,
  updateProjectDate,
  updateProjectRoles,
  assignEmployeeDetail,
  resetEmployeeDetail,
  updateEmployeeDetail,
  checkTechnologies,
  checkLevel,
  checkProfession,
  checkLanguages
} = useEmployeeDetailStore()

getEmployeeDetail(router.currentRoute.value.params.uuid as string)

const { employeeDetail } = storeToRefs(store)
const { projectToDelete } = storeToRefs(store)
const { projectToUpdate } = storeToRefs(store)
const { errorsUpdateProject } = storeToRefs(store)
const { projectsToAdd } = storeToRefs(store)
const { certificate } = storeToRefs(store)
const { certificateToDelete } = storeToRefs(store)
const { educationForm } = storeToRefs(store)
const { errorsEducationForm } = storeToRefs(store)
const { educationToDelete } = storeToRefs(store)
const { employeeForm } = storeToRefs(store)
const { errorsEmployeeForm } = storeToRefs(store)

const deleteProjectModal = ref(false)
const showDeleteEmployeeModal = ref(false)
const showUpdateProject = ref(false)
const showAddProjectModal = ref(false)
const showAddCertificateModal = ref(false)
const showDeleteCertificateModal = ref(false)
const showAddEducationModal = ref(false)
const showDeleteEducationModal = ref(false)
const showUpdateEducationModal = ref(false)
const showEditEmployeeModal = ref(false)

const assignDeleteProject = (payload: TProjectEmployee) => {
  assignProjectToDelete(payload)
  deleteProjectModal.value = true
 }

 const removeProject = () => {
   deleteProject()
   deleteProjectModal.value = false
 }

 const openUpdateProjectModal = (payload: TProjectEmployee) => {
   assignUpdateProject(payload)
   showUpdateProject.value = true
 }

 const openProjectAddModal = async () => {
   await getProjects()
   showAddProjectModal.value = true
 }

 const handlerAddCertificate = async () => {
   showAddCertificateModal.value = await addCertificate()
 }

 const openDeleteCertificateModal = (certificate: TCertificate) => {
   assignCertificateToDelete(certificate)
   showDeleteCertificateModal.value = true
 }

 const openDeleteEducationModal = (education: TEducation) => {
   assignEducationToDelete(education)
   showDeleteEducationModal.value = true
 }

 const handlerDeleteCertificate = async () => {
  showDeleteCertificateModal.value = await deleteCertificate()
 }

 const handlerAddEducation = async () => {
  showAddEducationModal.value = await addEducation()
 }

 const handlerDeleteEducation = async () => {
   showDeleteEducationModal.value = await deleteEducation()
 }

 const handlerCloseModalEdit = () => {
   showEditEmployeeModal.value = false
   resetEmployeeDetail()
 }

 const handlerOpenEditModal = async () => {

   await getItTechnologies();
   await getProfessions();
   await getLevels();
   await getLanguagesWithLevels();

   showEditEmployeeModal.value = true
   assignEmployeeDetail()
 }

 const handlerUpdateEmployeeDetail = async () => {
   showEditEmployeeModal.value = await updateEmployeeDetail()
 }

const handleCheckTechnologies = (payload: string) => {
  checkTechnologies(payload, itTechnologies.value)
}

const handleCheckLanguages = (payload: string) => {
  checkLanguages(payload, languagesWithLevels.value)
}

const handleCheckProfession = (payload: string) => {
  checkProfession(payload)
}

const handleCheckLevel = (payload: string) => {
  checkLevel(payload)
}

</script>

<template>
  <div class="flex mx-auto pb-14">

    <c-emlpoyee-detail-modal-edit :show-modal="showEditEmployeeModal"
                                  :employee="employeeForm"
                                  :technologies="itTechnologies"
                                  :languages="languagesWithLevels"
                                  :levels="levels"
                                  :professions="professions"
                                  :errors="errorsEmployeeForm"
                                  @close-modal="handlerCloseModalEdit"
                                  @check-technologies="handleCheckTechnologies"
                                  @check-languages="handleCheckLanguages"
                                  @check-profession="handleCheckProfession"
                                  @check-level="handleCheckLevel"
                                  @update-employee="handlerUpdateEmployeeDetail" />

    <c-employee-detail-modal-delete :show-modal="showDeleteEmployeeModal"
                                    :employee="employeeDetail"
                                    @close-modal="showDeleteEmployeeModal = false"
                                    @delete-employee="deleteEmployee" />

    <c-employee-detail-modal-project-add :show-modal="showAddProjectModal"
                                         :projects="projectsToAdd"
                                         @check-project="checkProjects"
                                         @add-projects="addProjects"
                                         @close-modal="showAddProjectModal = false" />

    <c-employee-detail-project-delete :show-modal="deleteProjectModal"
                                      :project="projectToDelete"
                                      @close-modal="deleteProjectModal = false"
                                      @delete-project="removeProject"/>

    <c-employee-modal-project-update :show-modal="showUpdateProject"
                                      :project="projectToUpdate"
                                      :errors="errorsUpdateProject"
                                      @close-modal="showUpdateProject = false"
                                      @update-date="updateProjectDate"
                                      @create-role="updateProjectRoles"
                                      @remove-role="deleteProjectRoles"
                                      @remove-activities="deleteProjectActivities"
                                      @create-activities="updateProjectActivities" />

    <c-employee-detail-modal-certificate-add :show-modal="showAddCertificateModal"
                                             :certificate="certificate"
                                             :errors="errorsCertificate"
                                             @add-certificate="handlerAddCertificate"
                                             @close-modal="showAddCertificateModal = false" />

    <c-employee-detail-modal-delete-certificate :show-modal="showDeleteCertificateModal"
                                                :certificate="certificateToDelete"
                                                @close-modal="showDeleteCertificateModal = false"
                                                @delete-certificate="handlerDeleteCertificate"/>

    <c-employee-detail-modal-education-add :show-modal="showAddEducationModal"
                                           :education="educationForm"
                                           :errors="errorsEducationForm"
                                           @add-education="handlerAddEducation"
                                           @close-modal="showAddEducationModal = false" />

    <c-employee-detail-modal-delete-education :show-modal="showDeleteEducationModal"
                                              :education="educationToDelete"
                                              @close-modal="showDeleteEducationModal = false"
                                              @delete-education="handlerDeleteEducation" />

    <div class="pr-8 lg:pr-12 pt-40 border-r-solid border-r border-r-neutral-200">
      <ul class="text-right">
        <li class="font-semibold my-2 whitespace-nowrap hover:underline cursor-pointer">{{ $t('link.GENERATE_CV') }}</li>

        <li class="font-semibold my-2 whitespace-nowrap hover:underline cursor-pointer"
            @click="openProjectAddModal">{{ $t('link.ADD_PROJECT') }}</li>

        <li class="font-semibold my-2 whitespace-nowrap hover:underline cursor-pointer"
            @click="showAddCertificateModal = true">{{ $t('link.ADD_CERTIFICATE') }}</li>

        <li class="font-semibold my-2 whitespace-nowrap hover:underline cursor-pointer"
            @click="showAddEducationModal = true">{{ $t('link.ADD_EDUCATION') }}</li>

        <li class="border-b my-8 border-b-gray-300 dark:border-neutral-700"></li>

        <li @click="showDeleteEmployeeModal = true"
            class="rounded-sm font-semibold my-2 whitespace-nowrap p-1 cursor-pointer hover:bg-rose-500 hover:text-white">{{ $t('link.DELETE_EMPLOYEE') }}</li>
      </ul>
    </div>

    <div v-if="employeeDetail.uuid"
         class="mx-8 mx-8 lg:mx-auto w-9/12">

      <c-employee-detail-header :employee="employeeDetail"
                                @update-detail="handlerOpenEditModal" />

      <c-employee-detail-projects v-if="employeeDetail.projects.length"
                                  :employee="employeeDetail"
                                  @delete-project="assignDeleteProject"
                                  @assign-update-project="openUpdateProjectModal" />

      <c-employee-detail-certificate v-if="employeeDetail.certificates.length"
                                     :certificates="employeeDetail.certificates"
                                     @delete-certificate="openDeleteCertificateModal" />

      <c-employee-detail-education v-if="employeeDetail.educations.length"
                                   :educations="employeeDetail.educations"
                                   @delete-education="openDeleteEducationModal" />
    </div>

  </div>
</template>

