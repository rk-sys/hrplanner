import { createRouter, createWebHistory, Router } from 'vue-router';
import vHome from '@/App.vue';

const routes = [
    {
        path: '/',
        name: '',
        component: vHome
    }
]

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
