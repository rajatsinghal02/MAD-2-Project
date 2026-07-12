import { createRouter, createWebHistory } from 'vue-router';
import components from './components/index.js';
import { store } from './store.js';

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
    },
    {
        path: '/admin-dashboard',
        name: 'AdminDashboard',
        component: components.AdminDashboard,
        meta: { requiresAuth: true, role: 'Admin' }
    },
    {
        path: '/company-dashboard',
        name: 'CompanyDashboard',
        component: components.CompanyDashboard,
        meta: { requiresAuth: true, role: 'Company' }
    },
    {
        path: '/student-dashboard',
        name: 'StudentDashboard',
        component: components.StudentDashboard,
        meta: { requiresAuth: true, role: 'Student' }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard for RBAC
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.isAuthenticated;
    const userRole = store.role;

    if (to.meta.requiresAuth && !isAuthenticated) {
        // Not authenticated, redirect to login
        next({ name: 'Login' });
    } else if (to.meta.requiresAuth && to.meta.role !== userRole) {
        // Authenticated but wrong role, redirect to appropriate dashboard
        if (userRole === 'Admin') next({ name: 'AdminDashboard' });
        else if (userRole === 'Company') next({ name: 'CompanyDashboard' });
        else if (userRole === 'Student') next({ name: 'StudentDashboard' });
        else next({ name: 'Landing' });
    } else if ((to.name === 'Login' || to.name === 'Signup') && isAuthenticated) {
        // If logged in, don't allow access to login/signup pages
        if (userRole === 'Admin') next({ name: 'AdminDashboard' });
        else if (userRole === 'Company') next({ name: 'CompanyDashboard' });
        else if (userRole === 'Student') next({ name: 'StudentDashboard' });
        else next({ name: 'Landing' });
    } else {
        next();
    }
});

export default router;
