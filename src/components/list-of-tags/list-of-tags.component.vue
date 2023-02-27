<script setup lang="ts">
import { computed, PropType } from 'vue'
import { BasicList } from '@/store/global.types'
import { TrashIcon } from '@heroicons/vue/24/solid'
import cInput from '@/components/form/input/input.component.vue'

const emit = defineEmits(['createItem', 'removeItem', 'update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true
  },
  list: {
    type: Array as PropType<BasicList[]>,
    required: true
  }
})

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

const availableList = computed(() => {
  if(props.modelValue) {
    return props.list.filter((element) => element.label.toLowerCase().indexOf(props.modelValue.toLowerCase()) !== -1);
  } else {
    return props.list
  }
})
</script>

<template>
<div class="my-3 px-2 w-[48%] lg:w-[32%] lg:min-w-[14.5rem] h-[26rem] bg-white text-lg flex flex-col items-start disabled:opacity-75 dark:bg-transparent">
  <div class="w-full h-full">
    <p class="mx-2 border-b-solid border-b-gray-200 py-3 flex items-center font-light dark:text-white">
      {{ $t(`common.${title}`) }}

      <span class="text-sm ml-1 text-primary-500 font-bold">({{ list.length}})</span>
    </p>

    <c-input class="mb-0 mt-1 w-full py-0"
             v-model="modelValue"
             @input="$emit('update:modelValue', handleInputChange($event))"
             placeholder="placeholder.ADD_TAG"/>

    <div class="flex flex-wrap max-h-60 overflow-y-auto my-4 mx-3">
      <span v-for="(item, index) in availableList"
            :key="index"
            class="rounded-sm flex align-center items-center m-1 bg-slate-400 px-2 text-white text-[15px]">
        {{ item.label }}

      <trash-icon class="ml-4 w-3.5 h-3.5 cursor-pointer text-white hover:text-rose-400"
                  @click="$emit('removeItem', item.uuid)"/>
      </span>
    </div>
  </div>
</div>
</template>
