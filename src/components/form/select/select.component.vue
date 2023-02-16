<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, PropType, ref } from 'vue'
import { ExtendSelectList } from '@/components/form/extend-select/extend-select.types'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  whiteBg: {
    type: Boolean,
    default: false
  },
  dataName: {
    type: String,
  },
  list: {
    type: Array as PropType<ExtendSelectList[]>,
    default: []
  },
  placeholder: {
    type: String,
    default: ''
  },
  errorMsg: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['clickItem', 'update:modelValue'])

const input = ref<HTMLElement | null>(null)
const isFocus = ref(false);

const handleInputChange = (event: Event) => (event.target as HTMLInputElement).value

const isError = computed(() => {
  return props.errorMsg !== ''
})

const selected = computed(() => {
  const item =  props.list.find((element) => element.uuid === props.modelValue)
  return item ? item.label : ''
})

const isPlaceholderTop = computed(() => {
  return props.modelValue !== '' || isFocus.value
})

const availableList = computed(() => {
  if(props.modelValue) {
    return props.list.filter((element) => element.label.toLowerCase().indexOf(props.modelValue.toLowerCase()) !== -1);
  } else {
    return props.list
  }
})

const checkClickedElement = (event: any): void => {
  if(event.target.dataName) {
    if(!event.target.dataset.name || !event.target.dataset.name.includes(`${props.dataName}`)) {
      isFocus.value = false
    }
  } else {
    isFocus.value = false
  }
}

const focusInput = () => {
  if (input && input.value) {
    input.value.focus();
  }
  isFocus.value = true
}

onBeforeMount(() => {
  document.addEventListener('click', checkClickedElement, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', checkClickedElement, false)
})

const isSelected = (payload: string) => {

  return false
}
</script>

<template>
  <div class="p-3"
       :data-name="`${dataName}-content`"
       @click.stop="isFocus = !isFocus">

    <div class="relative"
         :data-name="`${dataName}-wrapper`">

      <input ref="input"
             :data-name="`${dataName}-input`"
             v-bind="$attrs"
             :value="selected"
             @input="$emit('update:modelValue', handleInputChange($event))"
             @keyup.enter="$emit('createItem', modelValue)"
             :class="{'border-primary-500' : isFocus}"
             class="rounded-sm border-primary h-[42px] py-0 focus:border-primary-500 border bg-transparent px-2 outline-none w-full text-base d-flex items-center disabled:opacity-75"/>

        <span v-if="placeholder"
              :data-name="`${dataName}-placeholder`"
              @click.stop="focusInput"
              class="flex items-center text-sm leading-4 duration-100 p-1 absolute left-4 -translate-y-1/2 bg-white text-neutral-500 dark:bg-dark-500"
              :class="[isPlaceholderTop ? 'top-0' : 'top-1/2', { 'dark:bg-white' : whiteBg } ]">

            {{ $t(`${placeholder}`) }}
        </span>


      <span class="absolute right-2 top-1/2 h-7 w-7 position-center bg-primary-500 text-white">
        <chevron-down-icon class="position-default"
                           :class="{'position-rotate' : isFocus}"/>
      </span>
    </div>

    <span v-if="isError"
          class="text-sm px-1 w-full text-left inline-block text-rose-500">
      {{ $t(`${errorMsg}`) }}
    </span>

    <div class="relative">
      <ul v-if="isFocus"
          v-auto-animate
          :data-name="`${dataName}-list`"
          ref="list"
          class="z-10 absolute max-h-80 overflow-y-auto overflow-x-hidden left-0 top-1 bg-white border-primary-500 border text-sm w-full text-left inline-block">

          <li v-for="item in list"
              :key="item.uuid"
              :data-name="`${dataName}-list-item`"
              @click="$emit('clickItem', item.uuid)"
              class="flex justify-between items-center p-2 cursor-pointer hover:bg-neutral-200"
              :class="{'text-primary-500 font-semibold' : isSelected(item.uuid)}">

            {{ item.label }}

            <check-icon v-show="isSelected(item.uuid)"
                        class="w-5 h-5"/>
          </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
.position-center {
  transition: .2s ease-in-out;
  transform: translateY(-50%);
}

.position-default {
  transition: .2s ease-in-out;
  transform: rotate(0deg);
}

.position-rotate {
  transition: .2s ease-in-out;
  transform: rotate(180deg);
}

</style>
