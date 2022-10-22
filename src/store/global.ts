import { computed, ref } from 'vue'
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useGlobalStore = defineStore('globalStore', () => {
  const router = useRouter()
  const activeLang = ref('pl')
  const languages = ref(['pl', 'en'])
  const token = ref('')

  const activeLanguage = computed(() => activeLang.value);

  const changeLanguage = (payload: string) => activeLang.value = payload;

  const isAuthenticated = (): boolean => {
    const sessionToken = localStorage.getItem('HRPTOKEN')
    return !!sessionToken || !!token.value
  }

  const setToken = (payload: string) => {
    localStorage.setItem('HRPTOKEN', payload)
    token.value = payload;
  }

  const setTokenFromSession = () => {
    if (token.value === '') {
      const sessionToken = localStorage.getItem('HRPTOKEN')
      if (!!sessionToken) {
        token.value = sessionToken;
      }
    }
  }

  const signOut = async (): Promise<void> => {
    localStorage.removeItem('HRPTOKEN')
    token.value = ''
    await router.push({ name: 'Login' })
  }

  return {
    token,
    languages,
    activeLang,
    activeLanguage,
    signOut,
    setToken,
    changeLanguage,
    isAuthenticated,
    setTokenFromSession
  }
})
