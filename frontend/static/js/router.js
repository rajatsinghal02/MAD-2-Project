import { createRouter, createWebHistory } from 'vue-router';
import components from './components/index.js';

const routes = [
    {
        path: '/',
        name: 'Landing',
        component: components.Landing
    },
    {
        path: '/login',
        name: 'Login',
        component: components.Login
    },
    {
        path: '/signup',
        name: 'Signup',
        component: components.Signup
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
