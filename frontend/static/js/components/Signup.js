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
                    <h3 class="text-center fw-bold mb-4">Create an Account</h3>
                    <form @submit.prevent="handleSignup">
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold">Role</label>
                            <select class="form-select" v-model="role" required>
                                <option value="" disabled>Select your role</option>
                                <option value="Student">Student</option>
                                <option value="Company">Company</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold">Name</label>
                            <input type="text" class="form-control" v-model="name" required placeholder="Enter full name">
                        </div>
                        <div class="mb-3">
                            <label class="form-label text-muted fw-bold">Email address</label>
                            <input type="email" class="form-control" v-model="email" required placeholder="name@example.com">
                        </div>
                        <div class="mb-4">
                            <label class="form-label text-muted fw-bold">Password</label>
                            <input type="password" class="form-control" v-model="password" required placeholder="Create password">
                        </div>
                        <div class="d-grid mb-3">
                            <button type="submit" class="btn btn-primary btn-lg">Sign Up</button>
                        </div>
                        <div class="text-center">
                            <span class="text-muted">Already have an account?</span> 
                            <router-link to="/login" class="text-primary fw-bold text-decoration-none">Login</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            role: '',
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        handleSignup() {
            // Placeholder for signup API call
            console.log('Signing up with:', this.role, this.name, this.email, this.password);
            alert('Signup functionality will be connected to the API in the next milestone.');
        }
    }
};
