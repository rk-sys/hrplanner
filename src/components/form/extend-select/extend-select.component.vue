<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, PropType, ref } from 'vue'
import { ExtendSelectList } from './extend-select.types';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  list: {
    type: Array as PropType<ExtendSelectList[]>,
    default: []
  },
  dataName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['createItem', 'removeItem', 'update:modelValue'])

const input = ref<HTMLElement | null>(null)
const list = ref<HTMLElement | null>(null)
const isFocus = ref(false);

const availableList = computed(() => {
  if(props.modelValue) {
    return props.list.filter((element) => element.label.toLowerCase().indexOf(props.modelValue.toLowerCase()) !== -1);
  } else {
    return props.list
  }
})


const checkClickedElement = (event: any): void => {
  if(!event.target.dataset.name || !event.target.dataset.name.includes(`${props.dataName}`)) {
    isFocus.value = false
  }
}

onBeforeMount(() => {
  document.body.addEventListener('click', checkClickedElement, false)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('click', checkClickedElement, false)
})

</script>
<template>
  <div class="relative ">
    <input ref="input"
           :data-name="dataName"
           v-bind="$attrs"
           :value="modelValue"
           @focus="isFocus = true"
           @input="$emit('update:modelValue', $event.target.value)"
           @keyup.enter="$emit('createItem', modelValue)"
           :class="{'border-primary-500' : isFocus}"
           class="rounded-sm h-[50px] py-2 border bg-transparent px-2 outline-none w-full text-lg d-flex items-center disabled:opacity-75"/>

    <ul v-if="isFocus"
        v-auto-animate
        :data-name="`${dataName}-list`"
        ref="list"
        class="z-10 absolute max-h-80 overflow-y-auto left-0 top-14 bg-white border-primary-500 border text-sm w-full text-left inline-block dark:bg-dark-500">

      <template v-if="availableList.length">
        <li v-for="(item, index) in availableList"
            :key="item.uuid"
            :data-name="`${dataName}-list-item`"
            class="flex justify-between p-2 hover:bg-slate-200 dark:hover:bg-zinc-400 cursor-pointer">

          <span> {{ item.label }} </span>

          <span class="hover:text-rose-500 hover:font-bold"
                :data-name="`${dataName}-list-item-text`"
                @click.stop.self="$emit('removeItem', item.uuid)">

              {{ $t('button.DELETE') }}
            </span>
        </li>
      </template>

      <template v-else>
        <li data-attr="extend-select-list"
            class="p-2 hover:bg-slate-400 hover:text-white dark:hover:bg-zinc-400">

          {{ $t('common.NO_DATA') }}
        </li>
      </template>
    </ul>
  </div>
</template>
