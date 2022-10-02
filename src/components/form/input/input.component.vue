<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps({
  errorMsg: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  }
})

const input = ref<HTMLElement | null>(null)
const isFocus = ref(false);

const isError = computed(() => {
  return props.errorMsg !== ''
})

const focusInput = () => {
  if (input && input.value) {
    input.value.focus();
  }
  isFocus.value = true
}

const isPlaceholderTop = computed(() => {
  return props.modelValue !== '' || isFocus.value
})

</script>

<template>
  <div class="p-3 relative">

    <div class="relative">
      <input ref="input"
             v-bind="$attrs"
             :class="[isError ? 'border-rose-500' : 'border-primary']"
             :value="modelValue"
             @input="$emit('update:modelValue', $event.target.value)"
             @focus="isFocus = true"
             @focusout="isFocus = false"
             autocomplete="new-password"
             class="h-[50px] py-2 focus:border-primary-500 border bg-transparent px-2 outline-none w-full text-lg d-flex items-center disabled:opacity-75"/>

      <span v-if="placeholder"
            @click="focusInput"
            :class="[isPlaceholderTop ? 'top-0' : 'top-1/2' ]"
            class="text-lg leading-4 duration-100 p-2 py-1 absolute left-4 -translate-y-1/2 bg-white text-neutral-500">
        {{ placeholder }}</span>
    </div>

    <span v-if="isError"
          class="text-sm px-1 w-full text-left inline-block text-rose-500">
      {{ $t(`${errorMsg}`) }}
    </span>
  </div>
</template>

<style scoped>

</style>
