<script setup lang="ts">
import { PropType } from 'vue'
import { calculateAge } from '@/hooks/helpers'
import { TEmployeeDetail } from '@/store/employee-detail/employee-detail.types';

const emit = defineEmits(['updateDetail'])

const props = defineProps({
  employee: {
    type: Object as PropType<TEmployeeDetail>,
    required: true
  }
})

</script>

<template>
  <h1 class="text-5xl font-bold">{{employee.firstName}} {{employee.lastName}}</h1>

  <h2 class="flex items-center uppercase text-2xl mt-4 font-medium tracking-widest text-slate-600 dark:text-slate-200">
    {{employee.profession.label}}
    <span class="dot mx-2 bg-slate-600 dark:bg-slate-200"></span>
    {{employee.level.label}}</h2>

  <div class="mt-12">
    <p class="flex border-b-2 border-slate-400 border-solid justify-between">
      <span class="py-1.5 px-10 bg-slate-400 font-semibold text-white">{{ $t('common.PERSONAL_INFORMATION') }}</span>
      <span class="py-1.5 px-4 hover:underline cursor-pointer text-sm"
            @click="$emit('updateDetail')">{{ $t('common.EDIT') }}</span>
    </p>

    <div class="mt-4 w-full">

      <span class="block text-lg mb-2">{{ $t('common.AGE') }}:
        <span class="ml-2 font-semibold">{{ calculateAge(employee.birthday)}}</span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.EXPERIENCE') }}:
        <span class="ml-2 font-semibold">{{ calculateAge(employee.itExperience)}}</span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.EMAIL') }}:
        <span class="ml-2 font-semibold">{{ employee.firstName.toLowerCase() }}@antologic.com</span>
      </span>

      <span class="block text-lg mb-2">
        <span class="mr-2">{{ $t('common.LANGUAGE') }}:</span>
        <span v-for="(language, index) in employee.languages"
              :key="`${index}-language`"
              class="font-semibold">{{ language.label }}, </span>
      </span>

      <div class="flex text-md mb-4 flex-wrap items-center">
        <span class="mr-2 text-lg">{{ $t('common.TECHNOLOGIES') }}:</span>
        <span v-for="(it, index) in employee.itTechnologies"
              :key="`${index}-language`"
              class="rounded-sm flex align-center items-center m-1 bg-slate-400 px-2 text-white text-[15px]">{{ it.label }} </span>
      </div>
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
