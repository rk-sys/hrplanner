<script setup lang="ts">
import cNavigation from '@/components/navigation/navigation.component.vue'
</script>

<template>
  <div class="w-full">
    <c-navigation />

    <main class="container mt-8 px-4">
      <router-view/>
    </main>
  </div>
</template>

<style scoped>

</style>
