import { ref } from 'vue'
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useGlobalStore = defineStore('globalStore', () => {
  const router = useRouter()
  const activeLang = ref('pl')
  const languages = ref(['pl', 'en'])
  const token = ref('')
  const user = ref('')

  const changeLanguage = (payload: string) => activeLang.value = payload;

  const getUser = () => {
    if(user.value === '') {
      const userName = sessionStorage.getItem('HRPUSER') ? sessionStorage.getItem('HRPUSER') : localStorage.getItem('HRPUSER')
      if(userName !== '') {
        return userName
      } else {
        router.push({ name: 'Login' })
        return null
      }
    }
    return user
  }

  const isAuthenticated = (): boolean => {
    const sessionToken = localStorage.getItem('HRPTOKEN')
    return !!sessionToken || !!token.value
  }

  const setToken = (payload: string) => {
    localStorage.setItem('HRPTOKEN', payload)
    sessionStorage.setItem('token', JSON.stringify(payload));

    token.value = payload;
  }

  const setUser = (payload: string) => {
    localStorage.setItem('HRPUSER', payload)
    sessionStorage.setItem('hrp_user', JSON.stringify(payload));

    user.value = payload;
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
    activeLang,
    changeLanguage,
    getUser,
    isAuthenticated,
    languages,
    setToken,
    setTokenFromSession,
    setUser,
    signOut,
    token,
    user,
  }
})
