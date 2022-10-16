import { createRouter, createWebHistory, Router } from 'vue-router';
import vLogin from '@/views/login/Login.view.vue';
import vHome from '@/views/dashboard/home/Home.view.vue';
import vDashboard from '@/views/dashboard/Dashboard.view.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: vLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: vLogin
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

export default router
