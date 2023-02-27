<script setup lang="ts">
import { PropType } from 'vue'
import { TEductionOverview } from '@/store/employee-detail/employee-detail.types';
const emit = defineEmits(['deleteEducation'])

const props = defineProps({
  educations: {
    type: Array as PropType<TEductionOverview[]>,
    required: true
  }
})

</script>

<template>

  <div class="mt-16">
    <p class="flex border-b-2 border-slate-400 border-solid justify-between">
      <span class="py-1.5 px-10 bg-slate-400 font-semibold text-white">{{ $t('common.EDUCATIONS') }}</span>
    </p>

    <div v-for="(education, index) in educations"
         :key="index"
         class="pb-6 last:border-none mt-6 w-full border-b border-b-gray-200 border-b-solid">

      <span class="flex text-lg mb-2">
        <span class="mr-2">{{ $t('common.SCHOOL_NAME') }}:</span>
        <span class="ml-2 font-semibold">{{ education?.schoolName }}</span>

        <span class="mr-0 ml-auto">
          <span class="p-1 no-underline text-sm text-rose-500 rounded-sm hover:cursor-pointer hover:bg-rose-500 hover:text-white"
                @click="$emit('deleteEducation', education)">{{ $t('link.DELETE') }}</span>
          </span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.DATE') }}:
        <span class="ml-2 font-semibold">
          {{ education?.dateStart?.split('-').reverse().join('/') }}
          -
          {{ education?.dateEnd?.split('-').reverse().join('/') }}
        </span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.DESCRIPTION') }}:
        <span class="ml-2 font-semibold">{{ education?.description }}</span>
      </span>
    </div>
  </div>
</template>
