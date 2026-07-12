import { store } from '../store.js';

export default {
    template: `
        <div class="dashboard-container">
            <!-- Sidebar -->
            <aside class="sidebar py-4">
                <div class="px-4 mb-5">
                    <router-link class="navbar-brand d-flex align-items-center" to="/">
                        <div class="brand-icon me-2 d-flex align-items-center justify-content-center" style="width:32px; height:32px; background:var(--brand-orange-light); border-radius:8px;">
                            <i class="bi bi-rocket-takeoff-fill text-primary fs-6"></i>
                        </div>
                        <span class="fw-black fs-5 text-dark tracking-tight">Career<span class="text-primary">Kite</span></span>
                    </router-link>
                </div>
                
                <div class="d-flex flex-column gap-2">
                    <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'dashboard' }" @click.prevent="currentTab = 'dashboard'">
                        <i class="bi bi-grid-1x2-fill"></i> Dashboard
                    </a>
                    <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'jobs' }" @click.prevent="currentTab = 'jobs'">
                        <i class="bi bi-briefcase-fill"></i> Find Jobs
                    </a>
                    <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'applications' }" @click.prevent="currentTab = 'applications'">
                        <i class="bi bi-file-earmark-check-fill"></i> Applications
                    </a>
                    <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'profile' }" @click.prevent="currentTab = 'profile'">
                        <i class="bi bi-person-fill"></i> Profile
                    </a>
                </div>

                <div class="mt-auto px-4">
                    <div class="card border-0 bg-light rounded-4 p-3 shadow-sm">
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-star-fill text-warning me-2"></i>
                            <span class="fw-bold fs-6">Pro Plan</span>
                        </div>
                        <p class="small text-muted mb-3">Upgrade to get 5x more profile visibility.</p>
                        <button class="btn btn-outline-primary btn-sm rounded-pill w-100 fw-bold">Upgrade Now</button>
                    </div>
                </div>
            </aside>

            <!-- Main Content Area -->
            <main class="main-content">
                <!-- Top Header -->
                <header class="top-header shadow-sm">
                    <div class="d-flex align-items-center flex-grow-1 me-4">
                        <div class="input-group" style="max-width: 400px;">
                            <span class="input-group-text bg-light border-end-0 rounded-start-pill text-muted px-3">
                                <i class="bi bi-search"></i>
                            </span>
                            <input type="text" class="form-control bg-light border-start-0 rounded-end-pill shadow-none" placeholder="Search for jobs, companies, skills...">
                        </div>
                    </div>
                    
                    <div class="d-flex align-items-center gap-3">
                        <button class="btn btn-light rounded-circle p-2 position-relative d-flex align-items-center justify-content-center" style="width:40px; height:40px;">
                            <i class="bi bi-bell fs-5 text-muted"></i>
                            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </button>
                        
                        <div class="dropdown">
                            <button class="btn btn-light rounded-pill px-3 py-2 d-flex align-items-center border-0 shadow-sm" type="button" data-bs-toggle="dropdown">
                                <img src="https://ui-avatars.com/api/?name=Student&background=f97316&color=fff" alt="User" class="rounded-circle me-2" style="width:28px; height:28px;">
                                <span class="fw-bold small me-2">{{ store.user?.email.split('@')[0] || 'Student' }}</span>
                                <i class="bi bi-chevron-down small text-muted"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2">
                                <li><a class="dropdown-item py-2 fw-medium" href="#"><i class="bi bi-person me-2"></i>My Profile</a></li>
                                <li><a class="dropdown-item py-2 fw-medium" href="#"><i class="bi bi-gear me-2"></i>Settings</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item py-2 fw-bold text-danger" href="#" @click.prevent="handleLogout"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </header>

                <!-- Scrollable View -->
                <div class="content-scroll">
                    
                    <!-- View: Dashboard / Resume Parsing -->
                    <div v-if="currentTab === 'dashboard'" class="animate-fade-in-up">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h3 class="fw-black text-dark mb-1">Welcome back! 👋</h3>
                                <p class="text-muted fw-medium">Upload your latest resume to discover perfectly matched opportunities.</p>
                            </div>
                        </div>

                        <div class="row g-4">
                            <!-- Left Column: Upload -->
                            <div class="col-lg-5">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <h5 class="fw-bold mb-3"><i class="bi bi-file-earmark-pdf text-primary me-2"></i>Smart Resume Upload</h5>
                                        
                                        <!-- Dropzone -->
                                        <div class="resume-dropzone flex-grow-1 d-flex flex-column align-items-center justify-content-center p-5 position-relative overflow-hidden text-center" 
                                             @dragover.prevent="dragActive = true" 
                                             @dragleave.prevent="dragActive = false" 
                                             @drop.prevent="handleDrop"
                                             @click="triggerFileInput"
                                             :class="{ 'active': dragActive }">
                                             
                                            <input type="file" ref="fileInput" class="d-none" @change="handleFileSelect" accept=".pdf,.doc,.docx">
                                            
                                            <template v-if="!uploading && !resumeParsed">
                                                <div class="p-3 bg-white rounded-circle shadow-sm mb-3 text-primary">
                                                    <i class="bi bi-cloud-arrow-up fs-2"></i>
                                                </div>
                                                <h6 class="fw-bold text-dark mb-1">Click or drag file to upload</h6>
                                                <p class="small text-muted mb-0">PDF, DOC, DOCX (Max 5MB)</p>
                                            </template>
                                            
                                            <!-- Scanning Animation -->
                                            <template v-if="uploading">
                                                <div class="scanner-line"></div>
                                                <div class="spinner-border text-primary mb-3" role="status"></div>
                                                <h6 class="fw-bold text-primary mb-1">Scrubbing Resume...</h6>
                                                <p class="small text-muted mb-0">Our AI is extracting your skills and experience.</p>
                                            </template>
                                            
                                            <!-- Success State -->
                                            <template v-if="resumeParsed && !uploading">
                                                <div class="p-3 bg-success bg-opacity-10 rounded-circle mb-3 text-success">
                                                    <i class="bi bi-check-circle-fill fs-2"></i>
                                                </div>
                                                <h6 class="fw-bold text-success mb-1">Resume Parsed Successfully!</h6>
                                                <p class="small text-muted mb-0">{{ fileName }}</p>
                                                <button class="btn btn-outline-secondary btn-sm rounded-pill mt-3 fw-bold" @click.stop="resetUpload">Upload Different Resume</button>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Right Column: Extracted Skills & Action -->
                            <div class="col-lg-7">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4">Extracted Profile Data</h5>
                                        
                                        <div v-if="!resumeParsed" class="d-flex flex-column align-items-center justify-content-center h-75 text-center px-4">
                                            <img src="https://cdn-icons-png.flaticon.com/512/7269/7269995.png" alt="Empty" style="width: 120px; opacity: 0.5;" class="mb-3">
                                            <h6 class="text-muted fw-bold">Upload a resume to extract skills</h6>
                                        </div>
                                        
                                        <div v-else class="animate-fade-in-up">
                                            <h6 class="text-muted fw-bold mb-2 small text-uppercase">Top Skills Discovered</h6>
                                            <div class="d-flex flex-wrap gap-2 mb-4">
                                                <span v-for="(skill, index) in extractedSkills" :key="index" 
                                                      class="badge bg-primary bg-opacity-10 text-primary py-2 px-3 rounded-pill fw-bold skill-tag"
                                                      :style="{'animation-delay': (index * 0.1) + 's'}">
                                                    {{ skill }}
                                                </span>
                                            </div>
                                            
                                            <h6 class="text-muted fw-bold mb-2 small text-uppercase">Experience Level</h6>
                                            <p class="fw-bold fs-5 text-dark">Mid-Level (3-4 Years)</p>
                                            
                                            <hr class="text-muted my-4">
                                            
                                            <div class="d-flex align-items-center justify-content-between bg-light p-3 rounded-3">
                                                <div>
                                                    <h6 class="fw-bold text-dark mb-0">Ready to find matches?</h6>
                                                    <p class="small text-muted mb-0">We found {{ matchedJobs.length }} jobs fitting this profile.</p>
                                                </div>
                                                <button class="btn btn-primary rounded-pill fw-bold shadow-primary-sm btn-glow px-4" @click="currentTab = 'jobs'">
                                                    View Matches <i class="bi bi-arrow-right ms-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Jobs -->
                    <div v-if="currentTab === 'jobs'" class="animate-fade-in-up">
                        <div class="d-flex justify-content-between align-items-end mb-4">
                            <div>
                                <h3 class="fw-black text-dark mb-1">Recommended Jobs</h3>
                                <p class="text-muted fw-medium">Based on your parsed resume and extracted skills.</p>
                            </div>
                            <div class="d-flex gap-2">
                                <select class="form-select border-0 shadow-sm rounded-pill fw-medium bg-white text-muted">
                                    <option>Match % (Highest)</option>
                                    <option>Date Posted</option>
                                </select>
                            </div>
                        </div>
                        
                        <div v-if="!resumeParsed" class="alert alert-warning border-0 rounded-4 p-4 d-flex align-items-center">
                            <i class="bi bi-exclamation-triangle-fill fs-4 text-warning me-3"></i>
                            <div>
                                <h6 class="fw-bold mb-1">No Resume Uploaded</h6>
                                <p class="mb-0 small">Please upload your resume in the Dashboard to get personalized AI-matched job recommendations.</p>
                            </div>
                            <button class="btn btn-warning rounded-pill fw-bold ms-auto px-4" @click="currentTab = 'dashboard'">Go Upload</button>
                        </div>
                        
                        <div v-else class="row g-4">
                            <div class="col-md-6 col-xl-4" v-for="(job, index) in matchedJobs" :key="index">
                                <div class="card match-card h-100 rounded-4 bg-white">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-light p-2 rounded-3 me-3">
                                                    <i class="bi" :class="job.icon" style="font-size: 1.5rem; color: var(--brand-orange);"></i>
                                                </div>
                                                <div>
                                                    <h6 class="fw-bold mb-0 text-dark">{{ job.title }}</h6>
                                                    <p class="small text-muted mb-0">{{ job.company }}</p>
                                                </div>
                                            </div>
                                            <button class="btn btn-sm btn-light rounded-circle text-muted hover-primary">
                                                <i class="bi bi-bookmark"></i>
                                            </button>
                                        </div>
                                        
                                        <div class="d-flex flex-wrap gap-2 mb-3">
                                            <span class="badge bg-light text-dark fw-medium border"><i class="bi bi-geo-alt me-1 text-muted"></i>{{ job.location }}</span>
                                            <span class="badge bg-light text-dark fw-medium border"><i class="bi bi-cash me-1 text-success"></i>{{ job.salary }}</span>
                                        </div>
                                        
                                        <div class="mt-auto pt-3 border-top">
                                            <div class="d-flex justify-content-between align-items-center mb-1">
                                                <span class="small fw-bold text-muted">Match Score</span>
                                                <span class="small fw-black text-primary">{{ job.match }}%</span>
                                            </div>
                                            <div class="progress" style="height: 6px;">
                                                <div class="progress-bar bg-primary progress-bar-animated rounded-pill" :style="{ width: job.match + '%' }"></div>
                                            </div>
                                            
                                            <button class="btn btn-outline-primary w-100 rounded-pill fw-bold mt-4">Quick Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Applications Placeholder -->
                    <div v-if="currentTab === 'applications'" class="animate-fade-in-up text-center py-5">
                        <img src="https://cdn-icons-png.flaticon.com/512/2821/2821213.png" alt="Applications" style="width: 150px; opacity: 0.8;" class="mb-4">
                        <h4 class="fw-black">Your Applications</h4>
                        <p class="text-muted">Track the status of your sent applications here.</p>
                    </div>

                    <!-- View: Profile Placeholder -->
                    <div v-if="currentTab === 'profile'" class="animate-fade-in-up text-center py-5">
                        <img src="https://ui-avatars.com/api/?name=Student&background=f97316&color=fff&size=150" alt="Profile" class="rounded-circle shadow-sm mb-4">
                        <h4 class="fw-black">{{ store.user?.email }}</h4>
                        <p class="text-muted">Manage your personal details and settings.</p>
                    </div>

                </div>
            </main>
        </div>
    `,
    data() {
        return {
            store,
            currentTab: 'dashboard',
            dragActive: false,
            uploading: false,
            resumeParsed: false,
            fileName: '',
            extractedSkills: [],
            matchedJobs: []
        };
    },
    methods: {
        handleLogout() {
            store.logout();
            this.$router.push('/login');
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) this.simulateParsing(file);
        },
        handleDrop(event) {
            this.dragActive = false;
            const file = event.dataTransfer.files[0];
            if (file) this.simulateParsing(file);
        },
        simulateParsing(file) {
            this.fileName = file.name;
            this.uploading = true;
            this.resumeParsed = false;
            
            // Simulate API upload and ML processing delay
            setTimeout(() => {
                this.uploading = false;
                this.resumeParsed = true;
                
                // Mock extracted data
                this.extractedSkills = ['Vue.js', 'Python', 'Flask', 'JavaScript', 'SQL', 'Data Analysis', 'Docker'];
                
                // Mock matched jobs based on skills
                this.matchedJobs = [
                    { title: 'Frontend Developer', company: 'TechCorp Inc.', location: 'Remote', salary: '$80k - $100k', match: 96, icon: 'bi-window-sidebar' },
                    { title: 'Fullstack Engineer', company: 'Innovate LLC', location: 'New York, NY', salary: '$110k - $130k', match: 92, icon: 'bi-braces' },
                    { title: 'Python Backend Dev', company: 'DataSystems', location: 'San Francisco, CA', salary: '$120k - $140k', match: 85, icon: 'bi-server' },
                    { title: 'Junior Data Analyst', company: 'Metrics Co', location: 'Remote', salary: '$70k - $90k', match: 78, icon: 'bi-bar-chart-fill' },
                    { title: 'Software Engineer II', company: 'GlobalTech', location: 'Austin, TX', salary: '$100k - $115k', match: 74, icon: 'bi-pc-display' }
                ];
            }, 2500); // 2.5s delay for realistic "scrubbing" effect
        },
        resetUpload() {
            this.resumeParsed = false;
            this.fileName = '';
            this.extractedSkills = [];
            this.matchedJobs = [];
        }
    }
};
