import { store } from '../store.js';

export default {
    template: `
        <div class="modern-dashboard">
            <!-- Full Width Navbar -->
            <nav class="global-navbar shadow-sm">
                <div class="brand-section">
                    <router-link class="navbar-brand d-flex align-items-center text-decoration-none" to="/">
                        <div class="brand-icon me-2 d-flex align-items-center justify-content-center" style="width:32px; height:32px; background:var(--brand-orange-light); border-radius:8px;">
                            <i class="bi bi-rocket-takeoff-fill text-primary fs-6"></i>
                        </div>
                        <span class="fw-black fs-5 text-dark tracking-tight">Career<span class="text-primary">Kite</span></span>
                    </router-link>
                </div>
                
                <div class="d-flex align-items-center gap-3 w-100 ms-3">
                    <button @click="sidebarOpen = !sidebarOpen" class="toggle-btn me-3">
                        <i class="bi bi-list"></i>
                    </button>
                    
                    <div class="input-group" style="max-width: 400px;" v-if="currentTab !== 'dashboard' && currentTab !== 'profile'">
                        <span class="input-group-text bg-light border-end-0 rounded-start-pill text-muted px-3">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control bg-light border-start-0 rounded-end-pill shadow-none" placeholder="Search..." v-model="searchQuery">
                    </div>
                </div>
            </nav>

            <!-- Dashboard Body -->
            <div class="dashboard-body">
                <!-- Collapsible Sidebar -->
                <aside class="collapsible-sidebar" :class="{'collapsed': !sidebarOpen}">
                    <div class="d-flex flex-column gap-2 mt-4">
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'dashboard' }" @click.prevent="currentTab = 'dashboard'">
                            <i class="bi bi-grid-1x2-fill"></i> <span class="nav-text">Dashboard</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'jobs' }" @click.prevent="currentTab = 'jobs'; fetchJobs()">
                            <i class="bi bi-briefcase-fill"></i> <span class="nav-text">Find Jobs</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'applications' }" @click.prevent="currentTab = 'applications'; fetchApplications()">
                            <i class="bi bi-file-earmark-check-fill"></i> <span class="nav-text">Applications</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'placements' }" @click.prevent="currentTab = 'placements'; fetchPlacements()">
                            <i class="bi bi-award-fill"></i> <span class="nav-text">Placements</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'profile' }" @click.prevent="currentTab = 'profile'; fetchProfile()">
                            <i class="bi bi-person-fill"></i> <span class="nav-text">Profile</span>
                        </a>
                    </div>
                    
                    <div class="sidebar-footer">
                        <div class="profile-sm cursor-pointer" @click="currentTab = 'profile'; fetchProfile()">
                            <img src="https://ui-avatars.com/api/?name=Student&background=f97316&color=fff" alt="User" class="rounded-circle me-2" style="width:36px; height:36px;">
                            <div class="profile-name">
                                <h6 class="mb-0 fw-bold fs-6 lh-tight">{{ store.user?.email.split('@')[0] || 'Student' }}</h6>
                                <small class="text-muted" style="font-size: 0.75rem;">Student Account</small>
                            </div>
                        </div>
                        <button class="btn-logout-sidebar" @click.prevent="handleLogout" title="Logout">
                            <i class="bi bi-box-arrow-right fs-5"></i>
                        </button>
                    </div>
                </aside>

                <!-- Main Content Area -->
                <main class="main-content">
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
                                            
                                            <hr class="text-muted my-4">
                                            
                                            <div class="d-flex align-items-center justify-content-between bg-light p-3 rounded-3">
                                                <div>
                                                    <h6 class="fw-bold text-dark mb-0">Ready to find matches?</h6>
                                                    <p class="small text-muted mb-0">Update your profile or view all jobs.</p>
                                                </div>
                                                <button class="btn btn-primary rounded-pill fw-bold shadow-primary-sm btn-glow px-4" @click="currentTab = 'jobs'; fetchJobs()">
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
                                <h3 class="fw-black text-dark mb-1">Available Jobs</h3>
                                <p class="text-muted fw-medium">Find your next opportunity.</p>
                            </div>
                        </div>
                        
                        <div class="row g-4">
                            <div class="col-md-6 col-xl-4" v-for="job in filteredJobs" :key="job.id">
                                <div class="card match-card h-100 rounded-4 bg-white">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-light p-2 rounded-3 me-3">
                                                    <i class="bi bi-briefcase-fill" style="font-size: 1.5rem; color: var(--brand-orange);"></i>
                                                </div>
                                                <div>
                                                    <h6 class="fw-bold mb-0 text-dark">{{ job.title }}</h6>
                                                    <p class="small text-muted mb-0">{{ job.company }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="d-flex flex-wrap gap-2 mb-3">
                                            <span class="badge bg-light text-dark fw-medium border"><i class="bi bi-geo-alt me-1 text-muted"></i>{{ job.location || 'N/A' }}</span>
                                            <span class="badge bg-light text-dark fw-medium border"><i class="bi bi-cash me-1 text-success"></i>{{ job.salary || 'N/A' }}</span>
                                        </div>
                                        <div class="mb-3 small text-muted">
                                            <strong>Skills:</strong> {{ job.skills_required || 'Not specified' }}
                                        </div>
                                        <div class="mt-auto pt-3 border-top">
                                            <button class="btn btn-outline-primary w-100 rounded-pill fw-bold mt-2" @click="applyForJob(job.id)">Quick Apply</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="filteredJobs.length === 0" class="col-12 text-center py-5">
                                <p class="text-muted">No jobs found matching your search.</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Applications -->
                    <div v-if="currentTab === 'applications'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Your Applications</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Role</th>
                                                <th class="border-0 py-3">Company</th>
                                                <th class="border-0 py-3">Applied On</th>
                                                <th class="border-0 py-3">Status</th>
                                                <th class="border-0 py-3">Feedback / Interview</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="app in applications" :key="app.id">
                                                <td class="ps-4 fw-bold">{{ app.drive_title }}</td>
                                                <td>{{ app.company }}</td>
                                                <td>{{ new Date(app.application_date).toLocaleDateString() }}</td>
                                                <td>
                                                    <span class="badge" 
                                                          :class="{
                                                              'bg-secondary': app.status === 'Applied',
                                                              'bg-info': app.status === 'Shortlisted',
                                                              'bg-success': app.status === 'Selected',
                                                              'bg-danger': app.status === 'Rejected'
                                                          }">
                                                        {{ app.status }}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div v-if="app.interview_date" class="small text-primary"><i class="bi bi-calendar-event me-1"></i>{{ new Date(app.interview_date).toLocaleString() }}</div>
                                                    <div v-if="app.feedback" class="small text-muted fst-italic">{{ app.feedback }}</div>
                                                    <div v-if="!app.interview_date && !app.feedback" class="small text-muted">-</div>
                                                </td>
                                            </tr>
                                            <tr v-if="applications.length === 0">
                                                <td colspan="5" class="text-center py-4 text-muted">You haven't applied to any jobs yet.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- View: Placements -->
                    <div v-if="currentTab === 'placements'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Your Placements</h3>
                        <div class="row g-4">
                            <div class="col-md-6 col-lg-4" v-for="placement in placements" :key="placement.id">
                                <div class="card border-0 shadow-sm rounded-4 h-100 bg-success bg-opacity-10 border border-success">
                                    <div class="card-body p-4 text-center">
                                        <i class="bi bi-award-fill text-success" style="font-size: 3rem;"></i>
                                        <h4 class="fw-bold mt-3 mb-1">{{ placement.position }}</h4>
                                        <h6 class="text-dark mb-3">{{ placement.company }}</h6>
                                        <p class="small mb-1"><strong>Salary:</strong> {{ placement.salary || 'N/A' }}</p>
                                        <p class="small mb-4"><strong>Joining Date:</strong> {{ placement.joining_date ? new Date(placement.joining_date).toLocaleDateString() : 'TBD' }}</p>
                                        <button class="btn btn-success rounded-pill px-4 fw-bold" @click="downloadOffer(placement)">
                                            <i class="bi bi-download me-2"></i>Offer Letter
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div v-if="placements.length === 0" class="col-12 text-center py-5">
                                <i class="bi bi-emoji-smile fs-1 text-muted mb-3 d-block"></i>
                                <p class="text-muted fs-5">No placements yet. Keep applying!</p>
                            </div>
                        </div>
                    </div>

                    <!-- View: Profile -->
                    <div v-if="currentTab === 'profile'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">My Profile</h3>
                        <div class="card border-0 shadow-sm rounded-4 max-w-800">
                            <div class="card-body p-5">
                                <form @submit.prevent="saveProfile">
                                    <div class="row g-4 mb-4">
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Full Name</label>
                                            <input type="text" class="form-control" v-model="profile.name" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Email Address</label>
                                            <input type="email" class="form-control bg-light" :value="profile.email" readonly disabled>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Branch / Major</label>
                                            <input type="text" class="form-control" v-model="profile.branch" placeholder="e.g. Computer Science">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">CGPA</label>
                                            <input type="number" step="0.1" class="form-control" v-model="profile.cgpa" placeholder="e.g. 8.5">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Year of Passing</label>
                                            <input type="number" class="form-control" v-model="profile.year_of_passing" placeholder="e.g. 2024">
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label fw-bold text-muted small">Skills (comma separated)</label>
                                            <textarea class="form-control" rows="2" v-model="profile.skills" placeholder="e.g. Python, Vue.js, Machine Learning"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div v-if="profileMsg" class="alert alert-success py-2 small fw-bold mb-3">
                                        {{ profileMsg }}
                                    </div>
                                    
                                    <div class="d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary rounded-pill px-5 fw-bold shadow-primary-sm btn-glow">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    </div>
    `,
    data() {
        return {
            store,
            sidebarOpen: true,
            currentTab: 'dashboard',
            dragActive: false,
            uploading: false,
            resumeParsed: false,
            fileName: '',
            extractedSkills: [],
            jobs: [],
            applications: [],
            placements: [],
            profile: {
                name: '',
                email: '',
                branch: '',
                cgpa: '',
                year_of_passing: '',
                skills: ''
            },
            profileMsg: '',
            searchQuery: ''
        };
    },
    computed: {
        filteredJobs() {
            if (!this.searchQuery) return this.jobs;
            const q = this.searchQuery.toLowerCase();
            return this.jobs.filter(job => 
                (job.title && job.title.toLowerCase().includes(q)) || 
                (job.company && job.company.toLowerCase().includes(q)) ||
                (job.skills_required && job.skills_required.toLowerCase().includes(q))
            );
        }
    },
    methods: {
        handleLogout() {
            store.logout();
            this.$router.push('/login');
        },
        async fetchProfile() {
            try {
                const res = await fetch('/api/student/profile', {
                    headers: store.authHeader
                });
                if (res.ok) {
                    this.profile = await res.json();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async saveProfile() {
            try {
                const res = await fetch('/api/student/profile', {
                    method: 'PUT',
                    headers: {
                        ...store.authHeader,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.profile)
                });
                if (res.ok) {
                    this.profileMsg = "Profile updated successfully!";
                    setTimeout(() => this.profileMsg = '', 3000);
                }
            } catch (err) {
                console.error(err);
            }
        },
        async fetchJobs() {
            try {
                const res = await fetch('/api/student/jobs', {
                    headers: store.authHeader
                });
                if (res.ok) {
                    this.jobs = await res.json();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async applyForJob(driveId) {
            try {
                const res = await fetch(`/api/student/jobs/${driveId}/apply`, {
                    method: 'POST',
                    headers: store.authHeader
                });
                const data = await res.json();
                if (res.ok) {
                    alert(data.msg);
                } else {
                    alert(data.msg || "Failed to apply");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred");
            }
        },
        async fetchApplications() {
            try {
                const res = await fetch('/api/student/applications', {
                    headers: store.authHeader
                });
                if (res.ok) {
                    this.applications = await res.json();
                }
            } catch (err) {
                console.error(err);
            }
        },
        async fetchPlacements() {
            try {
                const res = await fetch('/api/student/placements', {
                    headers: store.authHeader
                });
                if (res.ok) {
                    this.placements = await res.json();
                }
            } catch (err) {
                console.error(err);
            }
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
                
                // Save skills to profile
                this.profile.skills = this.extractedSkills.join(', ');
                this.saveProfile();
            }, 2500); 
        },
        resetUpload() {
            this.resumeParsed = false;
            this.fileName = '';
            this.extractedSkills = [];
        },
        downloadOffer(placement) {
            // Simulated PDF Download
            const content = `OFFER LETTER\n\nDear Student,\n\nWe are pleased to offer you the position of ${placement.position} at ${placement.company}.\nSalary: ${placement.salary}\nJoining Date: ${placement.joining_date}\n\nCongratulations!`;
            const blob = new Blob([content], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Offer_Letter_${placement.company}.txt`; // txt used as a mock for PDF
            a.click();
            window.URL.revokeObjectURL(url);
        }
    },
    mounted() {
        this.fetchProfile();
    }
};
