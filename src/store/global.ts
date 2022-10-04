import { computed, ref } from 'vue'
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('globalStore', () => {
  const activeLang = ref('pl')
  const languages = ref(['pl', 'en'])
  const token = ref('')

  const activeLanguage = computed(() => activeLang);

  const changeLanguage = (payload: string) => activeLang.value = payload;
  const setToken = (payload: string) => {
    document.cookie = `hrpToken=${payload}; max-age=3600;`;
    token.value = payload;
  }

  const setTokenFromCookie = () => {
    if (token.value === '') {
      const cookiesToken = document.cookie.replace('hrpToken=', '')
      if (cookiesToken !== '') {
        token.value = cookiesToken;
      }
    }
  }

  return {
    token,
    languages,
    activeLang,
    activeLanguage,
    setToken,
    changeLanguage,
    setTokenFromCookie
  }
})
