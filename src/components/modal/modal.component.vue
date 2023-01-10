<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid'

const emit = defineEmits(['closeModal'])

const props = defineProps({
  title: {
    type: String,
    default: 'Modal'
  }
})

const emitCloseModal = (event: KeyboardEvent): void => {
  if(event.code === 'Escape') {
    emit('closeModal')
  }
}

onBeforeMount(() => {
  document.body.addEventListener('keyup', emitCloseModal, false)
})

onBeforeUnmount(() => {
  document.body.removeEventListener('keyup', emitCloseModal, false)
})
</script>

<template>
  <Teleport to="#main">
    <div v-bind="$attrs"
         @click.self="$emit('closeModal')"
         @keyup.esc="$emit('closeModal')"
         class="top-0 left-0 absolute w-full h-full bg-overlay z-10 flex justify-center items-center">

      <div class="min-w-[34rem] h-auto bg-white text-black">
        <header class="px-5 py-2 flex justify-between">
          <span class="text-2xl">{{ $t(`${title}`) }}</span>

          <x-mark-icon class="w-7 h-7 text-secondary-500 cursor-pointer"
                       @click="$emit('closeModal')" />
        </header>

        <main class="px-5 my-2">
          <slot />
        </main>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

</style>
