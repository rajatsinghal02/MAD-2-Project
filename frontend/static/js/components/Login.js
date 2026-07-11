export default {
    template: `
        <div>
            <!-- Navbar -->
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
                <div class="container">
                    <router-link class="navbar-brand" to="/">CareerKite</router-link>
                </div>
            </nav>

            <div class="auth-wrapper bg-light">
                <div class="auth-card">
                    <h3 class="text-center fw-bold mb-4">Welcome Back</h3>
                    <form @submit.prevent="handleLogin">
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold">Email address</label>
                            <input type="email" class="form-control" v-model="email" required placeholder="name@example.com">
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-muted fw-bold">Password</label>
                            <input type="password" class="form-control" v-model="password" required placeholder="Enter password">
                        </div>
                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-primary btn-lg">Login</button>
                        </div>
                        <div class="text-center">
                            <span class="text-muted">Don't have an account?</span> 
                            <router-link to="/signup" class="text-primary fw-bold text-decoration-none">Sign Up</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleLogin() {
            // Placeholder for login API call
            console.log('Logging in with:', this.email, this.password);
            alert('Login functionality will be connected to the API in the next milestone.');
        }
    }
};
