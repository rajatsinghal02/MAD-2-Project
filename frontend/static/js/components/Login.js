import { store } from '../store.js';

export default {
    template: `
        <div class="d-flex flex-column min-vh-100 bg-light">
            <!-- Minimal Auth Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
                <div class="container">
                    <router-link class="navbar-brand d-flex align-items-center" to="/">
                        <div class="brand-icon me-2 d-flex align-items-center justify-content-center">
                            <i class="bi bi-rocket-takeoff-fill text-primary fs-5"></i>
                        </div>
                        <span class="fw-black fs-4 text-dark tracking-tight">Career<span class="text-primary">Kite</span></span>
                    </router-link>
                    <div class="d-flex align-items-center">
                        <span class="text-muted d-none d-sm-inline me-2 fw-medium">Don't have an account?</span>
                        <router-link to="/signup" class="btn btn-outline-primary fw-bold px-4 rounded-pill">Sign Up</router-link>
                    </div>
                </div>
            </nav>

            <!-- Login Content -->
            <div class="flex-grow-1 d-flex align-items-center justify-content-center p-3 auth-bg">
                <div class="card border-0 shadow-lg auth-card animate-fade-in-up" style="max-width: 450px; width: 100%; border-radius: 1.25rem; overflow: hidden;">
                    
                    <!-- Decorative Top Border -->
                    <div class="bg-primary" style="height: 6px; width: 100%;"></div>
                    
                    <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <h2 class="fw-black text-dark mb-2">Welcome Back</h2>
                            <p class="text-muted fw-medium">Sign in to continue your journey.</p>
                        </div>

                        <form @submit.prevent="handleLogin">
                            <!-- Email Input -->
                            <div class="form-floating mb-3 custom-form-floating">
                                <input type="email" class="form-control" id="floatingEmail" placeholder="name@example.com" v-model="email" required>
                                <label for="floatingEmail" class="text-muted"><i class="bi bi-envelope me-2"></i>Email address</label>
                            </div>
                            
                            <!-- Password Input -->
                            <div class="form-floating mb-3 custom-form-floating position-relative">
                                <input :type="showPassword ? 'text' : 'password'" class="form-control pe-5" id="floatingPassword" placeholder="Password" v-model="password" required>
                                <label for="floatingPassword" class="text-muted"><i class="bi bi-lock me-2"></i>Password</label>
                                <span class="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer text-muted fs-5" @click="showPassword = !showPassword" style="z-index: 10;" title="Toggle Password Visibility">
                                    <i class="bi" :class="showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'"></i>
                                </span>
                            </div>

                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div class="form-check">
                                    <input class="form-check-input shadow-none cursor-pointer" type="checkbox" value="" id="rememberMe">
                                    <label class="form-check-label text-muted cursor-pointer" for="rememberMe">
                                        Remember me
                                    </label>
                                </div>
                                <a href="#" class="text-primary fw-bold text-decoration-none small hover-primary">Forgot Password?</a>
                            </div>

                            <!-- Error Message -->
                            <div v-if="errorMsg" class="alert alert-danger py-2 small fw-bold mb-3">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ errorMsg }}
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-6 shadow-primary-sm btn-glow mb-4" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {{ loading ? 'Signing In...' : 'Sign In' }}
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
            loading: false,
            showPassword: false
        }
    },
    methods: {
        async handleLogin() {
            this.errorMsg = '';
            this.loading = true;
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    store.login(data.token, data.user);
                    // Redirect based on role
                    if (data.user.role === 'Admin') {
                        this.$router.push('/admin-dashboard');
                    } else if (data.user.role === 'Company') {
                        this.$router.push('/company-dashboard');
                    } else if (data.user.role === 'Student') {
                        this.$router.push('/student-dashboard');
                    }
                } else {
                    this.errorMsg = data.msg || 'Login failed';
                }
            } catch (err) {
                this.errorMsg = 'Failed to connect to the server. Please try again.';
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    }
};
