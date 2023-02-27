<script setup lang="ts">
import { ref, Ref } from 'vue'
import { Link } from './navigation.types'
import { useGlobalStore } from '@/store/global'
import { useNavigation } from './hook/use-navigation'
import { ChevronDownIcon, FireIcon, LanguageIcon } from '@heroicons/vue/24/solid'
import { useRouter } from 'vue-router';

const router = useRouter()
const { links, profileLinks }: { links: Ref<Link[]>, profileLinks: Ref<Link[]> } = useNavigation();

const store = useGlobalStore();
const { getUser } = useGlobalStore()

const user = getUser()

const isFocusProfile = ref(false);
const isFocusLanguage = ref(false);

</script>

<template>
  <nav class="navigation px-4 h-16 border-b border-gray-300 border-solid mb-4 flex items-center dark:border-neutral-700">
    <router-link class="cursor-pointer logo"
                 :to="{name: 'Home'}">

      <fire-icon class="w-7 h-7 text-secondary-500 dark:text-white"/>
    </router-link>

    <div class="w-full flex items-center mx-8">
      <router-link v-for="(link, index) in links"
                   :key="index"
                   class="navigation__item p-1.5 px-2 flex items-center mx-1"
                   :class="{'router-link-active router-link-exact-active' : router.currentRoute.value.fullPath.includes(link.name.toLowerCase())}"
                   :to="{name: link.name}">{{ $t(`link.${link.label}`) }}

      </router-link>
    </div>

    <div @mouseenter="isFocusProfile = true"
         @mouseleave="isFocusProfile = false"
         class="navigation__item relative p-1.5 flex items-center whitespace-nowrap">

      <p>{{ user }}</p>

      <chevron-down-icon class="ml-2 w-5 h-5 text-secondary-500 dark:text-white" />

      <div v-if="isFocusProfile"
           class="z-10 absolute p-2 bg-white top-[2.32rem] right-0 shadow-md rounded-sm flex flex-col border-gray-100 border border-solid dark:bg-dark-500 dark:border-neutral-700">

        <router-link class="navigation__item px-4 my-0.5 py-2 w-auto"
                     v-for="(link, index) in profileLinks"
                     :key="index"
                     :to="{ name: link.name}">{{ $t(`link.${link.label}`) }}

        </router-link>

        <p class="navigation__item px-4 py-2 no-underline border-t-[1px] border-solid border-gray-300 dark:border-t-neutral-700"
           @click="store.signOut">

          {{ $t('link.LOGOUT') }}
        </p>
      </div>
    </div>

    <div @mouseenter="isFocusLanguage = true"
         @mouseleave="isFocusLanguage = false"
         class="relative ml-8 navigation__item">

      <language-icon class="p-1 w-8 h-8 text-2xl"/>

      <div v-if="isFocusLanguage"
           class="absolute p-1 bg-white top-8 right-0 shadow-md rounded-sm flex flex-col border-gray-100 border border-solid dark:bg-dark-500 dark:border-neutral-700">

        <p v-for="(lang, index) in store.languages"
           :key="index"
           @click="store.changeLanguage(lang)"
           class="navigation__item w-full px-4 py-2 my-0.5"
           :class="{'router-link-active' : lang === store.activeLang}">{{ $t(`link.${lang}`)  }}</p>
      </div>
    </div>
  </nav>
</template>

<style lang="scss"
       scoped>

.navigation {
  &__item {
    @apply rounded-sm cursor-pointer hover:bg-gray-200 hover:text-secondary-500 dark:text-white dark:hover:text-white dark:hover:bg-neutral-700
  }
}

.router-link-active {
  @apply bg-primary-500 text-white;

  &:hover {
    @apply bg-primary-500 text-white;
  }
}

.logo {
  background: transparent;

  &:hover {
    background: transparent;
  }
}
</style>
