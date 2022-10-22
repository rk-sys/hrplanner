import { createRouter, createWebHistory, Router } from 'vue-router';
import { useGlobalStore } from '@/store/global'
import vLogin from '@/views/login/Login.view.vue';
import vRegistration from '@/views/registration/Registration.view.vue';
import vRegistrationCode from '@/views/registration/RegistrationCode.view.vue';
import vRegistrationInfo from '@/views/registration/RegistrationInfo.view.vue';
import vHome from '@/views/dashboard/home/Home.view.vue';

import vDashboard from '@/views/dashboard/Dashboard.view.vue';

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
    component: vLogin
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
        path: 'settings',
        name: 'Settings',
        component: vHome
      }
    ]
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, form, next) => {
  const store = useGlobalStore()

  if (store.isAuthenticated()) {
    if (['Login', 'Registration', 'Registration code', 'Registration info'].includes(to.name as string)) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  } else {
    if (['Login', 'Registration', 'Registration code', 'Registration info'].includes(to.name as string)) {
      next();
    } else {
      next({ name: 'Login' })
    }
  }
})
export default router
