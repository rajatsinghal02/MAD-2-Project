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
                    
                    <div class="input-group" style="max-width: 400px;" v-if="['jobs', 'applicants'].includes(currentTab)">
                        <span class="input-group-text bg-light border-end-0 rounded-start-pill text-muted px-3">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control bg-light border-start-0 rounded-end-pill shadow-none" placeholder="Search..." v-model="searchQuery">
                    </div>
                    <h4 v-else class="fw-bold mb-0 text-dark">Company Portal</h4>
                </div>
            </nav>

            <!-- Dashboard Body -->
            <div class="dashboard-body">
                <!-- Collapsible Sidebar -->
                <aside class="collapsible-sidebar" :class="{'collapsed': !sidebarOpen}">
                    <div class="d-flex flex-column gap-2 mt-4">
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'dashboard' }" @click.prevent="currentTab = 'dashboard'; fetchProfile(); fetchJobs()">
                            <i class="bi bi-grid-1x2-fill"></i> <span class="nav-text">Dashboard</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'post-job' }" @click.prevent="currentTab = 'post-job'">
                            <i class="bi bi-plus-square-fill"></i> <span class="nav-text">Post a Job</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'jobs' }" @click.prevent="currentTab = 'jobs'; fetchJobs()">
                            <i class="bi bi-briefcase-fill"></i> <span class="nav-text">My Postings</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'applicants' }" @click.prevent="currentTab = 'applicants'; fetchJobs()">
                            <i class="bi bi-people-fill"></i> <span class="nav-text">Review Candidates</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'profile' }" @click.prevent="currentTab = 'profile'; fetchProfile()">
                            <i class="bi bi-building-gear"></i> <span class="nav-text">Company Profile</span>
                        </a>
                    </div>
                    
                    <div class="sidebar-footer">
                        <div class="profile-sm cursor-pointer" @click="currentTab = 'profile'; fetchProfile()">
                            <img src="https://ui-avatars.com/api/?name=Company&background=10b981&color=fff" alt="User" class="rounded-circle me-2" style="width:36px; height:36px;">
                            <div class="profile-name">
                                <h6 class="mb-0 fw-bold fs-6 lh-tight text-success">{{ profile.name || store.user?.email.split('@')[0] }}</h6>
                                <small class="text-muted" style="font-size: 0.75rem;">Company Account</small>
                            </div>
                        </div>
                        <button class="btn-logout-sidebar text-danger" @click.prevent="handleLogout" title="Logout">
                            <i class="bi bi-box-arrow-right fs-5"></i>
                        </button>
                    </div>
                </aside>

                <!-- Main Content Area -->
                <main class="main-content">
                    <div class="content-scroll">
                    
                    <!-- View: Dashboard Stats -->
                    <div v-if="currentTab === 'dashboard'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Welcome back, {{ profile.name || 'Company' }}!</h3>
                        <div class="row g-4 mb-5">
                            <div class="col-md-4">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-primary bg-opacity-10 text-primary rounded-3 me-4">
                                            <i class="bi bi-briefcase-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ jobs.length }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Total Postings</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-success bg-opacity-10 text-success rounded-3 me-4">
                                            <i class="bi bi-people-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ totalApplications }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Total Applicants</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Graphs Section -->
                        <div class="row g-4 mb-5" v-if="jobs.length > 0">
                            <div class="col-md-8">
                                <div class="card shadow-sm border-0 rounded-4 h-100">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4">Applications per Job Posting</h5>
                                        <canvas id="companyJobsChart" height="120"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card shadow-sm border-0 rounded-4 h-100">
                                    <div class="card-body p-4 d-flex flex-column justify-content-center text-center align-items-center">
                                        <h5 class="fw-bold mb-4">Average Applications</h5>
                                        <div class="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mb-3" style="width: 120px; height: 120px;">
                                            <h1 class="display-4 text-primary fw-black mb-0">{{ jobs.length ? Math.round(totalApplications / jobs.length) : 0 }}</h1>
                                        </div>
                                        <p class="text-muted fw-bold">Candidates per Drive</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick actions -->
                        <div class="card border-0 shadow-sm rounded-4 p-4 text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Hire" style="width: 120px;" class="mb-3 mx-auto">
                            <h5 class="fw-bold">Ready to hire?</h5>
                            <p class="text-muted mb-4">Create a new job posting to attract top talent from our student pool.</p>
                            <button class="btn btn-primary rounded-pill px-4 fw-bold shadow-primary-sm btn-glow" @click="currentTab = 'post-job'">Post a New Job</button>
                        </div>
                    </div>
                    
                    <!-- View: Post a Job -->
                    <div v-if="currentTab === 'post-job'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Create Job Posting</h3>
                        <div class="card border-0 shadow-sm rounded-4 max-w-800">
                            <div class="card-body p-5">
                                <form @submit.prevent="submitJob">
                                    <div class="row g-4">
                                        <div class="col-12">
                                            <label class="form-label fw-bold text-muted small">Job Title *</label>
                                            <input type="text" class="form-control" v-model="newJob.title" placeholder="e.g. Frontend Developer" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Salary Details *</label>
                                            <input type="text" class="form-control" v-model="newJob.salary" placeholder="e.g. $80k - $100k or 12 LPA" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Application Deadline</label>
                                            <input type="datetime-local" class="form-control" v-model="newJob.application_deadline">
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label fw-bold text-muted small">Required Skills (Comma separated) *</label>
                                            <input type="text" class="form-control" v-model="newJob.skills_required" placeholder="e.g. React, Node.js, Python" required>
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label fw-bold text-muted small">Job Description & Benefits *</label>
                                            <textarea class="form-control" rows="5" v-model="newJob.description" placeholder="Describe the role, responsibilities, and perks..." required></textarea>
                                        </div>
                                    </div>
                                    
                                    <div v-if="postJobMsg" class="alert alert-success mt-4 mb-0 py-2 small fw-bold">
                                        {{ postJobMsg }}
                                    </div>
                                    <div v-if="postJobError" class="alert alert-danger mt-4 mb-0 py-2 small fw-bold">
                                        {{ postJobError }}
                                    </div>
                                    
                                    <div class="d-flex justify-content-end mt-4">
                                        <button type="submit" class="btn btn-primary rounded-pill px-5 fw-bold shadow-primary-sm btn-glow">Submit for Approval</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: My Postings -->
                    <div v-if="currentTab === 'jobs'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">My Job Postings</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Job Title</th>
                                                <th class="border-0 py-3">Salary</th>
                                                <th class="border-0 py-3">Applicants</th>
                                                <th class="border-0 py-3">Admin Status</th>
                                                <th class="border-0 py-3 text-end pe-4">Job Status (Action)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="job in filteredJobs" :key="job.id">
                                                <td class="ps-4 fw-bold text-primary">{{ job.title }}</td>
                                                <td>{{ job.salary }}</td>
                                                <td>
                                                    <span class="badge bg-primary rounded-pill px-3">{{ job.application_count }}</span>
                                                </td>
                                                <td>
                                                    <span class="badge" 
                                                          :class="{
                                                              'bg-success': job.status === 'Approved',
                                                              'bg-warning': job.status === 'Pending',
                                                              'bg-danger': job.status === 'Rejected',
                                                              'bg-secondary': job.status === 'Closed'
                                                          }">
                                                        {{ job.status }}
                                                    </span>
                                                </td>
                                                <td class="text-end pe-4">
                                                    <div class="btn-group btn-group-sm">
                                                        <button v-if="job.status === 'Approved'" class="btn btn-outline-danger" @click="updateJobStatus(job.id, 'Closed')">Close Drive</button>
                                                        <button v-if="job.status === 'Closed'" class="btn btn-outline-success" @click="updateJobStatus(job.id, 'Active')">Re-open Drive</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr v-if="filteredJobs.length === 0">
                                                <td colspan="5" class="text-center py-4 text-muted">No jobs posted yet.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Review Candidates -->
                    <div v-if="currentTab === 'applicants'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Applicant Tracking System</h3>
                        
                        <div class="row">
                            <!-- Job Selector -->
                            <div class="col-md-4 mb-4">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div class="card-header bg-white border-0 pt-4 pb-0">
                                        <h6 class="fw-bold text-muted text-uppercase mb-0">Select Job</h6>
                                    </div>
                                    <div class="card-body p-0 mt-3">
                                        <div class="list-group list-group-flush border-0">
                                            <button v-for="job in jobs" :key="job.id" 
                                                    @click="selectJobForReview(job.id)"
                                                    class="list-group-item list-group-item-action border-0 py-3 px-4 fw-bold"
                                                    :class="{'active bg-primary text-white': selectedJobId === job.id}">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    {{ job.title }}
                                                    <span class="badge" :class="selectedJobId === job.id ? 'bg-white text-primary' : 'bg-light text-dark'">
                                                        {{ job.application_count }}
                                                    </span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Applicants List -->
                            <div class="col-md-8">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div v-if="!selectedJobId" class="card-body d-flex flex-column align-items-center justify-content-center text-center p-5 opacity-50">
                                        <i class="bi bi-people-fill fs-1 text-muted mb-3"></i>
                                        <h5>Select a job to review candidates</h5>
                                    </div>
                                    
                                    <div v-else class="card-body p-0">
                                        <div class="p-4 border-bottom bg-light rounded-top-4 d-flex justify-content-between align-items-center">
                                            <h5 class="fw-bold mb-0">Candidates <span class="text-muted fw-normal ms-2">({{ applicants.length }})</span></h5>
                                        </div>
                                        
                                        <div class="table-responsive">
                                            <table class="table align-middle mb-0">
                                                <tbody>
                                                    <tr v-for="app in filteredApplicants" :key="app.application_id" class="border-bottom">
                                                        <td class="p-4">
                                                            <div class="d-flex justify-content-between align-items-start mb-2">
                                                                <div>
                                                                    <h6 class="fw-bold mb-1">{{ app.student_name }}</h6>
                                                                    <div class="small text-muted mb-2">
                                                                        <i class="bi bi-envelope me-1"></i> {{ app.student_email }} | 
                                                                        <i class="bi bi-book me-1"></i> {{ app.student_branch }} | 
                                                                        <i class="bi bi-award me-1"></i> CGPA: {{ app.student_cgpa }}
                                                                    </div>
                                                                    <div class="small">
                                                                        <strong>Skills:</strong> {{ app.student_skills || 'N/A' }}
                                                                    </div>
                                                                </div>
                                                                <span class="badge" 
                                                                      :class="{
                                                                          'bg-secondary': app.status === 'Applied',
                                                                          'bg-info': app.status === 'Shortlisted',
                                                                          'bg-success': app.status === 'Selected',
                                                                          'bg-danger': app.status === 'Rejected'
                                                                      }">
                                                                    {{ app.status }}
                                                                </span>
                                                            </div>
                                                            
                                                            <!-- Action Panel for each applicant -->
                                                            <div class="bg-light rounded-3 p-3 mt-3">
                                                                <div class="row g-2 align-items-end">
                                                                    <div class="col-md-5">
                                                                        <label class="small fw-bold text-muted">Action</label>
                                                                        <select class="form-select form-select-sm" v-model="app.tempStatus">
                                                                            <option value="Applied">Applied</option>
                                                                            <option value="Shortlisted">Shortlisted</option>
                                                                            <option value="Selected">Selected</option>
                                                                            <option value="Rejected">Rejected</option>
                                                                        </select>
                                                                    </div>
                                                                    <div class="col-md-7" v-if="app.tempStatus === 'Shortlisted'">
                                                                        <label class="small fw-bold text-muted">Interview Date</label>
                                                                        <input type="datetime-local" class="form-control form-control-sm" v-model="app.tempInterviewDate">
                                                                    </div>
                                                                    <div class="col-12 mt-2">
                                                                        <input type="text" class="form-control form-control-sm" placeholder="Add feedback or remarks..." v-model="app.tempFeedback">
                                                                    </div>
                                                                    <div class="col-12 text-end mt-2">
                                                                        <button class="btn btn-sm btn-primary fw-bold" @click="saveApplicantStatus(app)">Save Decision</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="applicants.length === 0">
                                                        <td class="text-center py-5 text-muted">No applicants for this job yet.</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- View: Profile -->
                    <div v-if="currentTab === 'profile'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Company Profile</h3>
                        <div class="card border-0 shadow-sm rounded-4 max-w-800">
                            <div class="card-body p-5">
                                <form @submit.prevent="saveProfile">
                                    <div class="row g-4 mb-4">
                                        <div class="col-12">
                                            <div class="alert alert-info py-2 small fw-bold d-inline-flex align-items-center">
                                                <i class="bi bi-shield-check me-2 fs-5"></i> 
                                                Account Status: {{ profile.approval_status }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Company Name</label>
                                            <input type="text" class="form-control" v-model="profile.name" required>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Account Email</label>
                                            <input type="email" class="form-control bg-light" :value="profile.email" readonly disabled>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Industry</label>
                                            <input type="text" class="form-control" v-model="profile.industry" placeholder="e.g. IT Services, Finance">
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label fw-bold text-muted small">Location</label>
                                            <input type="text" class="form-control" v-model="profile.location" placeholder="e.g. New York, Remote">
                                        </div>
                                        <div class="col-12">
                                            <label class="form-label fw-bold text-muted small">Company Overview</label>
                                            <textarea class="form-control" rows="4" v-model="profile.description" placeholder="Describe your company..."></textarea>
                                        </div>
                                    </div>
                                    
                                    <div v-if="profileMsg" class="alert alert-success py-2 small fw-bold mb-3">
                                        {{ profileMsg }}
                                    </div>
                                    
                                    <div class="d-flex justify-content-end">
                                        <button type="submit" class="btn btn-primary rounded-pill px-5 fw-bold shadow-primary-sm btn-glow">Update Profile</button>
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
            searchQuery: '',
            profile: {
                name: '',
                email: '',
                industry: '',
                location: '',
                description: '',
                approval_status: ''
            },
            profileMsg: '',
            jobs: [],
            newJob: {
                title: '',
                salary: '',
                application_deadline: '',
                skills_required: '',
                description: ''
            },
            postJobMsg: '',
            postJobError: '',
            
            
            selectedJobId: null,
            applicants: [],
            chartInstance: null
        };
    },
    computed: {
        totalApplications() {
            return this.jobs.reduce((sum, job) => sum + (job.application_count || 0), 0);
        },
        filteredJobs() {
            if (!this.searchQuery) return this.jobs;
            const q = this.searchQuery.toLowerCase();
            return this.jobs.filter(j => 
                (j.title && j.title.toLowerCase().includes(q))
            );
        },
        filteredApplicants() {
            if (!this.searchQuery) return this.applicants;
            const q = this.searchQuery.toLowerCase();
            return this.applicants.filter(a => 
                (a.student_name && a.student_name.toLowerCase().includes(q)) ||
                (a.student_skills && a.student_skills.toLowerCase().includes(q)) ||
                (a.student_branch && a.student_branch.toLowerCase().includes(q))
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
                const res = await fetch('/api/company/profile', { headers: store.authHeader });
                if (res.ok) {
                    this.profile = await res.json();
                }
            } catch (err) { console.error(err); }
        },
        async saveProfile() {
            try {
                const res = await fetch('/api/company/profile', {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.profile)
                });
                if (res.ok) {
                    this.profileMsg = "Profile updated successfully!";
                    setTimeout(() => this.profileMsg = '', 3000);
                }
            } catch (err) { console.error(err); }
        },
        async fetchJobs() {
            try {
                const res = await fetch('/api/company/jobs', { headers: store.authHeader });
                if (res.ok) {
                    this.jobs = await res.json();
                    if (this.currentTab === 'dashboard') {
                        // Render chart after DOM updates
                        this.$nextTick(() => {
                            this.renderChart();
                        });
                    }
                }
            } catch (err) { console.error(err); }
        },
        renderChart() {
            if (!this.jobs.length) return;
            const ctx = document.getElementById('companyJobsChart');
            if (!ctx) return;
            
            // Destroy existing chart if it exists
            if (this.chartInstance) {
                this.chartInstance.destroy();
            }
            
            const labels = this.jobs.map(j => j.title.length > 15 ? j.title.substring(0, 15) + '...' : j.title);
            const data = this.jobs.map(j => j.application_count);
            
            this.chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Applicants',
                        data: data,
                        backgroundColor: 'rgba(234, 88, 12, 0.8)',
                        borderColor: 'rgba(234, 88, 12, 1)',
                        borderWidth: 1,
                        borderRadius: 6,
                        barThickness: 30
                    }]
                },
                options: {
                    responsive: true,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 1 }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        },
        async submitJob() {
            this.postJobMsg = '';
            this.postJobError = '';
            try {
                const res = await fetch('/api/company/jobs', {
                    method: 'POST',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.newJob)
                });
                const data = await res.json();
                if (res.ok) {
                    this.postJobMsg = data.msg;
                    // Reset form
                    this.newJob = { title: '', salary: '', application_deadline: '', skills_required: '', description: '' };
                    this.fetchJobs();
                } else {
                    this.postJobError = data.msg;
                }
            } catch (err) { console.error(err); }
        },
        async updateJobStatus(id, status) {
            try {
                const res = await fetch(`/api/company/jobs/${id}`, {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                });
                if (res.ok) this.fetchJobs();
            } catch (err) { console.error(err); }
        },
        
        // ATS Logic
        async selectJobForReview(id) {
            this.selectedJobId = id;
            try {
                const res = await fetch(`/api/company/jobs/${id}/applications`, { headers: store.authHeader });
                if (res.ok) {
                    const data = await res.json();
                    // Inject temporary models for inline editing
                    this.applicants = data.map(app => ({
                        ...app,
                        tempStatus: app.status,
                        tempFeedback: app.feedback || '',
                        tempInterviewDate: app.interview_date ? app.interview_date.slice(0, 16) : ''
                    }));
                }
            } catch (err) { console.error(err); }
        },
        async saveApplicantStatus(app) {
            try {
                const payload = { status: app.tempStatus, feedback: app.tempFeedback };
                if (app.tempStatus === 'Shortlisted' && app.tempInterviewDate) {
                    payload.interview_date = new Date(app.tempInterviewDate).toISOString();
                }
                
                const res = await fetch(`/api/company/applications/${app.application_id}/status`, {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    app.status = app.tempStatus;
                    app.feedback = app.tempFeedback;
                    if (payload.interview_date) app.interview_date = payload.interview_date;
                    alert("Decision saved successfully");
                }
            } catch (err) { console.error(err); }
        }
    },
    mounted() {
        this.fetchProfile();
        this.fetchJobs();
    }
};
