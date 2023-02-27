<script setup lang="ts">
import { PropType } from 'vue'
import { TEmployeeDetail } from '@/store/employee-detail/employee-detail.types';
import { calculateDiffAge } from '@/hooks/helpers'
const emit = defineEmits(['updateProject', 'deleteProject', 'assignUpdateProject'])

const props = defineProps({
  employee: {
    type: Object as PropType<TEmployeeDetail>,
    required: true
  }
})

</script>

<template>

  <div class="mt-16">
    <p class="flex border-b-2 border-slate-400 border-solid justify-between">
      <span class="py-1.5 px-10 bg-slate-400 font-semibold text-white">{{ $t('common.PROJECTS') }}</span>
    </p>

    <div v-for="(project, index) in employee.projects"
         :key="`${project.name}-${index}`"
         class="pb-6 last:border-none mt-6 w-full border-b border-b-gray-200 border-b-solid">

      <span class="flex text-lg mb-2">
        <span class="mr-2">{{ $t('common.PROJECT_CLIENT') }}:</span>
        <span class="ml-2 font-semibold">{{ project.name }}</span>

        <span class="mr-0 ml-auto">
          <span class="p-1 no-underline text-sm rounded-sm hover:cursor-pointer hover:underline"
                @click="$emit('assignUpdateProject', project)">{{ $t('link.UPDATE') }}</span>

          <span class="p-1 no-underline text-sm text-rose-500 rounded-sm hover:cursor-pointer hover:bg-rose-500 hover:text-white"
                @click="$emit('deleteProject', project)">{{ $t('link.DELETE') }}</span>
          </span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.PROJECT_NAME') }}:
        <span class="ml-2 font-semibold">{{ project.name }}</span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.EMPLOYEE_IN_PROJECT_TIME') }}:
        <span class="ml-2 font-semibold">
          {{ calculateDiffAge({ start: project.employeeDateStartInProject, end: project.employeeDateEndInProject}) }}
        </span>
      </span>

      <span v-if="Array.isArray(project.roles) && project.roles.length"
            class="break-words block text-lg mb-2">{{ $t('common.ROLES') }}:

        <span v-for="(role, index) in project.roles"
              :key="`${role?.label}-${index}`"
              class="ml-2 font-semibold">{{ role.label }}</span>
      </span>

      <span v-if="Array.isArray(project.activities) && project.activities.length"
            class="break-words block text-lg mb-2">{{ $t('common.ACTIVITIES') }}:

        <span v-for="(activitie, index) in project.activities"
              :key="`${activitie.label}-${index}`"
              class="block ml-2 font-semibold">- {{ activitie.label }}</span>
      </span>

<!--      <div v-if="Array.isArray(project.itTechnologies) && project.itTechnologies.length"-->
<!--           class="flex text-md mb-2 flex-wrap items-center">-->

<!--        <span class="mr-2 text-lg">{{ $t('common.TECHNOLOGIES') }}:</span>-->
<!--        <span v-for="(it, index) in project.itTechnologies"-->
<!--              :key="`${index}-language`"-->
<!--              class="rounded-sm flex align-center items-center m-1 bg-slate-400 px-2 text-white text-[15px]">{{ it.label }} </span>-->
<!--      </div>-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dot {
  height: .25rem;
  width: .25rem;
  display: inline-block;
  border-radius: 50%;
}
</style>
