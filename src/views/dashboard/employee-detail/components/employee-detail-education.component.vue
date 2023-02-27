<script setup lang="ts">
import { PropType } from 'vue'
import { TCertificate } from '@/store/employee-detail/employee-detail.types';
const emit = defineEmits(['deleteCertificate', 'assignUpdateCertificate'])

const props = defineProps({
  certificates: {
    type: Array as PropType<TCertificate>,
    required: true
  }
})

</script>

<template>

  <div class="mt-16">
    <p class="flex border-b-2 border-slate-400 border-solid justify-between">
      <span class="py-1.5 px-10 bg-slate-400 font-semibold text-white">{{ $t('common.CERTIFICATES') }}</span>
    </p>

    <div v-for="(certificate, index) in certificates"
         :key="`${certificate.name}-${index}`"
         class="pb-6 last:border-none mt-6 w-full border-b border-b-gray-200 border-b-solid">

      <span class="flex text-lg mb-2">
        <span class="mr-2">{{ $t('common.CERTIFICATE') }}:</span>
        <span class="ml-2 font-semibold">{{ certificate.name }}</span>

        <span class="mr-0 ml-auto">
          <span class="p-1 no-underline text-sm text-rose-500 rounded-sm hover:cursor-pointer hover:bg-rose-500 hover:text-white"
                @click="$emit('deleteCertificate', certificate)">{{ $t('link.DELETE') }}</span>
          </span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.ID_CERTIFICATE') }}:
        <span class="ml-2 font-semibold">{{ certificate.idCredential }}</span>
      </span>

      <span class="block text-lg mb-2">{{ $t('common.DATE') }}:
        <span class="ml-2 font-semibold">
          {{ certificate.dateStart.split('-').reverse().join('/') }}
        </span>
      </span>

    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
