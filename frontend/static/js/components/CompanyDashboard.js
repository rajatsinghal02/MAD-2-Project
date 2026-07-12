import { store } from '../store.js';

export default {
    template: `
        <div class="d-flex flex-column min-vh-100 bg-light">
            <nav class="navbar navbar-expand-lg navbar-dark bg-warning shadow-sm">
                <div class="container-fluid">
                    <a class="navbar-brand fw-bold" href="#">CareerKite Company</a>
                    <div class="d-flex align-items-center">
                        <span class="text-dark me-3"><i class="bi bi-person-circle me-1"></i> {{ store.user?.email }}</span>
                        <button class="btn btn-outline-dark btn-sm rounded-pill" @click="handleLogout">Logout</button>
                    </div>
                </div>
            </nav>
            <div class="container py-5 flex-grow-1">
                <h2 class="fw-bold mb-4">Company Dashboard</h2>
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card shadow-sm border-0 h-100">
                            <div class="card-body">
                                <h5 class="card-title text-muted">Active Drives</h5>
                                <h2 class="display-6 fw-bold">0</h2>
                                <button class="btn btn-warning btn-sm mt-2">Manage Drives</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    setup() {
        return { store };
    },
    methods: {
        handleLogout() {
            store.logout();
            this.$router.push('/login');
        }
    }
};
