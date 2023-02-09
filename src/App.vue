<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useGlobalStore } from './store/global'

const { changeLanguage, setTokenFromSession } = useGlobalStore();

const theme = ref(false)

onBeforeMount(() => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme)
  theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  changeLanguage(window.navigator.language.split('-')[0])
  setTokenFromSession();
})

const checkTheme = () => {
  theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
}
</script>

<template>
  <div id="main"
       class="relative theme-light"
       :class="{'theme-dark' : theme }">

    <div class="container mx-auto h-screen flex">
      <notifications />

      <router-view/>
    </div>
  </div>
</template>
