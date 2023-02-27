<script setup lang="ts">
import { PropType } from 'vue'
import { calculateAge } from '@/hooks/helpers'
import { TEmployeeDetail } from '@/store/employee-detail/employee-detail.types';

const props = defineProps({
  employee: {
    type: Object as PropType<TEmployeeDetail>,
    required: true
  }
})

</script>

<template>
  <div class="mx-4">
    <h1 class="text-4xl font-bold">{{employee.firstName}} {{employee.lastName}}</h1>
    <h2 class="flex items-center uppercase text-lg mt-4 font-medium tracking-widest text-slate-600 dark:text-slate-200">
      {{employee.profession.professionName}}
      <span class="dot mx-2 bg-slate-600 dark:bg-slate-200"></span>
      {{employee.level.levelName}}</h2>
  </div>

  <div class="mx-4 mt-12">
    <p class="flex border-b-2 border-primary-500 border-solid justify-between">
      <span class="py-1.5 px-10 bg-primary-500 font-semibold text-white">{{ $t('common.PERSONAL_INFORMATION') }}</span>
      <span class="py-1.5 px-4 hover:underline cursor-pointer">{{ $t('common.EDIT') }}</span>
    </p>

    <div class="mt-4 w-full">

      <span class="block text-lg mb-4">{{ $t('common.AGE') }}:
        <span class="ml-2 font-semibold">{{ calculateAge(employee.birthday)}}</span>
      </span>

      <span class="block text-lg mb-4">{{ $t('common.EXPERIENCE') }}:
        <span class="ml-2 font-semibold">{{ calculateAge(employee.itExperience)}}</span>
      </span>

      <span class="block text-lg mb-4">{{ $t('common.EMAIL') }}:
        <span class="ml-2 font-semibold">{{ employee.firstName.toLowerCase() }}@antologic.com</span>
      </span>

      <span class="block text-lg mb-4">
        <span class="mr-2">{{ $t('common.LANGUAGE') }}:</span>
        <span v-for="(language, index) in employee.languages"
              :key="`${index}-language`"
              class="font-semibold">{{ language.languageName }}, </span>
      </span>

      <div class="flex text-md mb-4 flex-wrap items-center">
        <span class="mr-2">{{ $t('common.TECHNOLOGIES') }}:</span>
        <span v-for="(it, index) in employee.itTechnologies"
              :key="`${index}-language`"
              class="font-semibold p-1 bg-primary-500 m-1 text-white">{{ it.technologyName }} </span>
      </div>
    </div>

    <div class="">

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
