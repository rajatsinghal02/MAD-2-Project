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
                        <span class="text-muted d-none d-sm-inline me-2 fw-medium">Already have an account?</span>
                        <router-link to="/login" class="btn btn-outline-primary fw-bold px-4 rounded-pill">Log In</router-link>
                    </div>
                </div>
            </nav>

            <!-- Signup Content -->
            <div class="flex-grow-1 d-flex align-items-center justify-content-center p-3 auth-bg py-5">
                <div class="card border-0 shadow-lg auth-card animate-fade-in-up" style="max-width: 550px; width: 100%; border-radius: 1.25rem; overflow: hidden;">
                    
                    <!-- Decorative Top Border -->
                    <div class="bg-primary" style="height: 6px; width: 100%;"></div>
                    
                    <div class="card-body p-4 p-sm-5">
                        <div class="text-center mb-4">
                            <h2 class="fw-black text-dark mb-2">Create an Account</h2>
                            <p class="text-muted fw-medium">Join CareerKite and unlock endless opportunities.</p>
                        </div>

                        <!-- Role Selection -->
                        <div class="d-flex bg-light rounded-pill p-1 mb-4 border">
                            <button class="btn flex-grow-1 rounded-pill fw-bold transition-all" 
                                    :class="role === 'student' ? 'btn-primary shadow-sm' : 'btn-light text-muted'"
                                    @click="role = 'student'" type="button">
                                <i class="bi bi-mortarboard-fill me-2"></i> Student
                            </button>
                            <button class="btn flex-grow-1 rounded-pill fw-bold transition-all" 
                                    :class="role === 'company' ? 'btn-primary shadow-sm' : 'btn-light text-muted'"
                                    @click="role = 'company'" type="button">
                                <i class="bi bi-building-fill me-2"></i> Company
                            </button>
                        </div>

                        <form @submit.prevent="handleSignup">
                            
                            <!-- Dynamic Fields based on Role -->
                            <div class="row g-3 mb-3">
                                <div class="col-sm-6" v-if="role === 'student'">
                                    <div class="form-floating custom-form-floating">
                                        <input type="text" class="form-control" id="fName" placeholder="First Name" v-model="fName" required>
                                        <label for="fName" class="text-muted">First Name</label>
                                    </div>
                                </div>
                                <div class="col-sm-6" v-if="role === 'student'">
                                    <div class="form-floating custom-form-floating">
                                        <input type="text" class="form-control" id="lName" placeholder="Last Name" v-model="lName" required>
                                        <label for="lName" class="text-muted">Last Name</label>
                                    </div>
                                </div>
                                
                                <div class="col-12" v-if="role === 'company'">
                                    <div class="form-floating custom-form-floating">
                                        <input type="text" class="form-control" id="cName" placeholder="Company Name" v-model="cName" required>
                                        <label for="cName" class="text-muted"><i class="bi bi-building me-2"></i>Company Name</label>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Common Fields -->
                            <div class="form-floating mb-3 custom-form-floating">
                                <input type="email" class="form-control" id="regEmail" placeholder="name@example.com" v-model="email" required>
                                <label for="regEmail" class="text-muted"><i class="bi bi-envelope me-2"></i>Email address</label>
                            </div>
                            
                            <div class="form-floating mb-4 custom-form-floating">
                                <input type="password" class="form-control" id="regPassword" placeholder="Password" v-model="password" required>
                                <label for="regPassword" class="text-muted"><i class="bi bi-lock me-2"></i>Create Password</label>
                                <div class="form-text mt-2 small text-muted"><i class="bi bi-info-circle me-1"></i>Must be at least 8 characters long.</div>
                            </div>

                            <div class="form-check mb-4">
                                <input class="form-check-input shadow-none cursor-pointer" type="checkbox" value="" id="terms" required>
                                <label class="form-check-label text-muted small cursor-pointer" for="terms">
                                    I agree to the <a href="#" class="text-primary text-decoration-none fw-bold">Terms of Service</a> and <a href="#" class="text-primary text-decoration-none fw-bold">Privacy Policy</a>
                                </label>
                            </div>

                            <!-- Error Message -->
                            <div v-if="errorMsg" class="alert alert-danger py-2 small fw-bold mb-3">
                                <i class="bi bi-exclamation-triangle-fill me-2"></i>{{ errorMsg }}
                            </div>

                            <!-- Success Message -->
                            <div v-if="successMsg" class="alert alert-success py-2 small fw-bold mb-3">
                                <i class="bi bi-check-circle-fill me-2"></i>{{ successMsg }}
                            </div>

                            <button type="submit" class="btn btn-primary w-100 py-3 rounded-pill fw-bold fs-6 shadow-primary-sm btn-glow mb-4" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {{ loading ? 'Creating Account...' : 'Create Account' }}
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            role: 'student', // default role
            email: '',
            password: '',
            fName: '',
            lName: '',
            cName: '',
            errorMsg: '',
            successMsg: '',
            loading: false
        }
    },
    methods: {
        async handleSignup() {
            this.errorMsg = '';
            this.successMsg = '';
            this.loading = true;
            
            try {
                let name = this.role === 'student' ? `${this.fName} ${this.lName}` : this.cName;
                const endpoint = this.role === 'student' ? '/api/auth/register/student' : '/api/auth/register/company';
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password,
                        name: name
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    this.successMsg = data.msg + ". Redirecting to login...";
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 2000);
                } else {
                    this.errorMsg = data.msg || 'Registration failed';
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
