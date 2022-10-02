<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'
import { useGlobalStore } from './store/global'
import { useQuery } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from '@/grapql/allBooks.query.gql'
import BOOKS_DESCRIPTION_QUERY from '@/grapql/booksDescription.query.gql'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useGlobalStore();
    const { result, loading, error } = useQuery(BOOKS_DESCRIPTION_QUERY)
    onBeforeMount(() => {
      store.changeLanguage(window.navigator.language.split('-')[0])
      store.setTokenFromCookie();
    })

    const books = computed(() => result.value?.allBooks ?? [])

    return {
      books,
      loading,
      error
    }
  }
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
