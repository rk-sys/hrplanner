<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useGlobalStore } from './store/global'

const { changeLanguage, setTokenFromCookie } = useGlobalStore();

onBeforeMount(() => {
  changeLanguage(window.navigator.language.split('-')[0])
  setTokenFromCookie();
})
</script>

<template>
  <div id="main" class="container mx-auto h-screen flex">
    <router-view/>
  </div>
</template>

<style lang="scss"
       scoped>
</style>
