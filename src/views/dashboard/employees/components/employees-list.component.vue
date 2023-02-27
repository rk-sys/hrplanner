<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { Ref, ref, PropType } from 'vue';
import { TEmployeesList } from "@/store/employees/employees.types";

const props = defineProps({
  employees: {
    type: Array as PropType<TEmployeesList[]>,
    required: true
  }
})

const tableHeader: Ref<string[]> = ref(['NO', 'FIRST_NAME', 'LAST_NAME', 'PROFESSION', 'LEVEL', 'ACTIONS'])

</script>

<template>
  <table v-if="employees.length"
         class="mt-6 w-full table-auto sm:text-xs md:text-sm lg:text-base">

    <thead>
    <tr>
      <th v-for="(cell, index) in tableHeader"
          :key="index"
          class="text-left font-semibold p-3 text-sm bg-gray-100 text-slate-500 dark:text-gray-300 dark:bg-neutral-700"
          :class="{'text-center' : ['ACTIONS'].includes(cell)}">{{ $t(`table.${cell}`) }}</th>
    </tr>
    </thead>

    <tbody v-auto-animate>
      <tr v-for="(employee, index) in employees"
          :key="index"
          class="text-sm font-medium border-b-gray-100 border-b text-slate-800 dark:text-neutral-200 dark:border-b-neutral-700 hover:bg-gray-200 hover:dark:bg-neutral-600">

        <td class="p-3 w-14">{{index + 1}}</td>
        <td class="p-3 truncate w-48">{{employee.firstName}}</td>
        <td class="p-3 truncate w-48">{{employee.lastName}}</td>
        <td class="p-3 truncate w-48">{{employee.profession}}</td>
        <td class="p-3 truncate w-48">{{employee.level}}</td>
        <td class="p-3 text-center w-52">
          <span class="p-1 no-underline font-semibold rounded-sm text-neutral-600 hover:cursor-pointer hover:bg-primary-500 hover:text-white dark:text-neutral-200"
                @click="$emit('goToDetail', employee.uuid)">{{ $t('link.DETAILS') }}</span>
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
