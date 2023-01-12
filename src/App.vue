<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useGlobalStore } from './store/global'

const { changeLanguage, setTokenFromSession, isAuthenticated } = useGlobalStore();

onBeforeMount(() => {
  changeLanguage(window.navigator.language.split('-')[0])
  setTokenFromSession();
})
</script>

<template>
  <div id="main"
       class="relative">

    <div class="container mx-auto h-screen flex">
      <notifications />

      <router-view/>
    </div>
  </div>
</template>
