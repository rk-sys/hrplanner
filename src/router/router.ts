import { createRouter, createWebHistory, Router } from 'vue-router'
import { useGlobalStore } from '@/store/global'
import axios from 'axios';
import vLogin from '@/views/login/login.view.vue'
import vRegistration from '@/views/registration/registration.view.vue'
import vRegistrationCode from '@/views/registration/registration-code.view.vue'
import vRegistrationInfo from '@/views/registration/registration-info.view.vue'
import vHome from '@/views/dashboard/home/home.view.vue'
import vSettings from '@/views/dashboard/settings/settings.view.vue'
import vSettingsUsers from '@/views/dashboard/settings/users/settings-users.view.vue'
import vDashboard from '@/views/dashboard/dashboard.view.vue'
import vResetPassword from '@/views/reset-password/reset-password.view.vue'
import vNewPassword from '@/views/reset-password/new-password.view.vue'

const availablePages = ['Login', 'Registration', 'Registration code', 'Registration info', 'Reset password', 'New password']

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: vLogin
  },
  {
    path: '/registration',
    name: 'Registration',
    component: vRegistration,
    redirect: () => ({ name: 'Registration code' }),
    children: [
      {
        path: 'code',
        name: 'Registration code',
        component: vRegistrationCode
      },

      {
        path: 'info',
        name: 'Registration info',
        component: vRegistrationInfo
      }
    ]
  },
  {
    path: '/reset-password',
    name: 'Reset password',
    component: vResetPassword
  },
  {
    path: '/new-password',
    name: 'New password',
    component: vNewPassword
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: vDashboard,
    redirect: () => ({ name: 'Home' }),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: vHome
      },
      {
        path: '/settings',
        name: 'Settings',
        component: vSettings,
        redirect: () => ({ name: 'Settings new users' }),
        children: [
          {
            path: 'users',
            name: 'Settings my users',
            component: vSettingsUsers
          }
        ]
      }
    ]
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

axios.interceptors.request.use((config) => {
  const store = useGlobalStore();
  if (config && config.url && (config.url.includes('signIn') || config.url.includes('registration') || config.url.includes('reset-password'))) {
    return config;
  } else {
    const token = store.token
    if(config && config.headers) {
      config.headers[ 'Authorization' ] = `Bearer ${token}`;
      return config;
    }
  }
});


router.beforeEach(async (to, form, next) => {
  const store = useGlobalStore()

  if (store.isAuthenticated()) {
    if (availablePages.includes(to.name as string)) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    if (availablePages.includes(to.name as string)) {
      next();
    } else {
      next({ name: 'Login' })
    }
  }
})
export default router
