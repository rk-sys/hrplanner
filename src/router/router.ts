import { createRouter, createWebHistory, Router } from 'vue-router';
import vLogin from '@/views/login/Login.view.vue';

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
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
