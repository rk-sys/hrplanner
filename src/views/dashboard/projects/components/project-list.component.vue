<script setup lang="ts">
import { calculateDifference } from '@/hooks/helpers'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { Ref, ref, PropType } from 'vue';
import { TProjects } from "@/store/projects/projects.types";

const props = defineProps({
  projectList: {
    type: Array as PropType<TProjects[]>,
    required: true
  }
})

const tableHeader: Ref<string[]> = ref(['NO', 'NAME', 'CONTRACTOR', 'DATE_START', 'DATE_END', 'TOPIC', 'ACTIONS'])

const calculateDifferenceTime = (project: TProjects | undefined) => {
  if(project && project.dateStart && project.dateEnd) {
    return calculateDifference(project.dateStart, project.dateEnd)
  }
  return '-'
}
</script>

<template>
  <table v-if="projectList.length"
         class="mt-6 w-full table-auto sm:text-xs md:text-sm lg:text-base">

    <thead>
    <tr>
      <th v-for="(cell, index) in tableHeader"
          :key="index"
          class="text-left font-semibold p-3 text-sm bg-gray-100 text-slate-500 dark:text-gray-300 dark:bg-neutral-700"
          :class="{'text-center' : ['ACTIONS'].includes(cell), 'hidden xl:block' : ['TOPIC'].includes(cell)}">{{ $t(`table.${cell}`) }}</th>
    </tr>
    </thead>

    <tbody v-auto-animate>
      <tr v-for="(project, index) in projectList"
          :key="index"
          class="text-sm font-medium border-b-gray-100 border-b text-slate-800 dark:text-neutral-200 dark:border-b-neutral-700 hover:bg-gray-200 hover:dark:bg-neutral-600">

        <td class="p-3 w-14">{{index + 1}}</td>
        <td class="p-3 truncate w-48 max-w-[10rem] truncate">{{project.name}}</td>
        <td class="p-3 truncate w-48 max-w-[10rem] truncate">{{project.client}}</td>
        <td class="p-3 truncate w-48">{{ project.dateStart.split('-').reverse().join('/') }}</td>
        <td class="p-3 truncate w-48">{{ project.dateEnd.split('-').reverse().join('/') }}</td>
        <td class="p-3 truncate hidden xl:block w-auto max-w-[23rem] truncate">{{project.topic}}</td>
        <td class="p-3 text-center w-52">
          <span class="p-1 no-underline font-semibold rounded-sm text-neutral-600 hover:cursor-pointer hover:bg-primary-500 hover:text-white dark:text-neutral-200"
                @click="$emit('assignUpdateProject', project)">{{ $t('link.UPDATE') }}</span>

          <span class="p-1 no-underline font-semibold text-rose-500 rounded-sm hover:cursor-pointer hover:bg-rose-500 hover:text-white"
                @click="$emit('assignDeleteProject', project)">{{ $t('link.DELETE') }}</span>
        </td>
      </tr>
    </tbody>
  </table>

  <div v-else
       class="p-3 text-center mt-24 font-semibold text-xl text-gray-400">
    <h2 >
      {{ $t('common.NO_DATA') }}
    </h2>
  </div>
</template>

<style lang="scss" scoped>
thead{
  th {
    &:first-child {
      border-bottom-left-radius: 0.125rem;
      border-top-left-radius: 0.125rem;
    }
    &:last-child {
      border-bottom-right-radius: 0.125rem;
      border-top-right-radius: 0.125rem;
    }
  }
}
</style>
