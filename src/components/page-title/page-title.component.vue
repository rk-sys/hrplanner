<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    default: 'Page title'
  }
})
</script>

<template>
  <header class="flex justify-between">
    <h1 class="font-bold text-lg lg:text-2xl">{{ $t(`${title}`) }}</h1>

    <div>
      <slot />
    </div>
  </header>
</template>

<style scoped>

</style>
