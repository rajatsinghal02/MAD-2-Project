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
                    
                    <div class="input-group" style="max-width: 400px;" v-if="currentTab !== 'dashboard'">
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
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'dashboard' }" @click.prevent="currentTab = 'dashboard'; fetchStats()">
                            <i class="bi bi-grid-1x2-fill"></i> <span class="nav-text">Dashboard</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'companies' }" @click.prevent="currentTab = 'companies'; fetchCompanies()">
                            <i class="bi bi-building-fill"></i> <span class="nav-text">Companies</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'students' }" @click.prevent="currentTab = 'students'; fetchStudents()">
                            <i class="bi bi-mortarboard-fill"></i> <span class="nav-text">Students</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'jobs' }" @click.prevent="currentTab = 'jobs'; fetchJobs()">
                            <i class="bi bi-briefcase-fill"></i> <span class="nav-text">Job Postings</span>
                        </a>
                        <a href="#" class="sidebar-nav-link" :class="{ 'active': currentTab === 'applications' }" @click.prevent="currentTab = 'applications'; fetchApplications()">
                            <i class="bi bi-file-earmark-text-fill"></i> <span class="nav-text">Applications</span>
                        </a>
                    </div>
                    
                    <div class="sidebar-footer">
                        <div class="profile-sm">
                            <img src="https://ui-avatars.com/api/?name=Admin&background=dc3545&color=fff" alt="User" class="rounded-circle me-2" style="width:36px; height:36px;">
                            <div class="profile-name">
                                <h6 class="mb-0 fw-bold fs-6 lh-tight text-danger">Super Admin</h6>
                                <small class="text-muted" style="font-size: 0.75rem;">Platform Admin</small>
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
                        <h3 class="fw-black text-dark mb-4">Platform Overview</h3>
                        <div class="row g-4 mb-5">
                            <div class="col-md-3">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-primary bg-opacity-10 text-primary rounded-3 me-4">
                                            <i class="bi bi-mortarboard-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ stats.students }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Total Students</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-warning bg-opacity-10 text-warning rounded-3 me-4">
                                            <i class="bi bi-building-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ stats.companies }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Companies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-success bg-opacity-10 text-success rounded-3 me-4">
                                            <i class="bi bi-briefcase-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ stats.jobs }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Active Jobs</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="card shadow-sm border-0 h-100 rounded-4">
                                    <div class="card-body p-4 d-flex align-items-center">
                                        <div class="p-3 bg-danger bg-opacity-10 text-danger rounded-3 me-4">
                                            <i class="bi bi-file-earmark-check-fill fs-3"></i>
                                        </div>
                                        <div>
                                            <h2 class="fw-black mb-0">{{ stats.applications }}</h2>
                                            <p class="text-muted small fw-bold text-uppercase mb-0">Applications</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Companies -->
                    <div v-if="currentTab === 'companies'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Manage Companies</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Company Name</th>
                                                <th class="border-0 py-3">Email</th>
                                                <th class="border-0 py-3">Industry</th>
                                                <th class="border-0 py-3">Account Status</th>
                                                <th class="border-0 py-3 text-end pe-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="company in filteredCompanies" :key="company.id">
                                                <td class="ps-4 fw-bold">{{ company.name }}</td>
                                                <td>{{ company.email }}</td>
                                                <td>{{ company.industry || 'N/A' }}</td>
                                                <td>
                                                    <span class="badge" 
                                                          :class="{
                                                              'bg-success': company.approval_status === 'Approved',
                                                              'bg-warning': company.approval_status === 'Pending',
                                                              'bg-danger': company.approval_status === 'Rejected' || company.approval_status === 'Deactivated'
                                                          }">
                                                        {{ company.approval_status }}
                                                    </span>
                                                    <span v-if="!company.is_active" class="badge bg-dark ms-1"><i class="bi bi-lock-fill"></i></span>
                                                </td>
                                                <td class="text-end pe-4">
                                                    <div class="btn-group btn-group-sm">
                                                        <button v-if="company.approval_status !== 'Approved'" class="btn btn-outline-success" @click="updateCompanyStatus(company.id, 'Approved')"><i class="bi bi-check-circle"></i> Approve</button>
                                                        <button v-if="company.approval_status === 'Approved'" class="btn btn-outline-warning" @click="updateCompanyStatus(company.id, 'Deactivated')"><i class="bi bi-pause-circle"></i> Deactivate</button>
                                                        <button class="btn btn-outline-danger" @click="deleteCompany(company.id)"><i class="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Students -->
                    <div v-if="currentTab === 'students'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Manage Students</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Student Name</th>
                                                <th class="border-0 py-3">Email</th>
                                                <th class="border-0 py-3">Branch</th>
                                                <th class="border-0 py-3">Access</th>
                                                <th class="border-0 py-3 text-end pe-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="student in filteredStudents" :key="student.id">
                                                <td class="ps-4 fw-bold">{{ student.name }}</td>
                                                <td>{{ student.email }}</td>
                                                <td>{{ student.branch || 'N/A' }}</td>
                                                <td>
                                                    <span class="badge" :class="student.is_active ? 'bg-success' : 'bg-danger'">
                                                        {{ student.is_active ? 'Active' : 'Blacklisted' }}
                                                    </span>
                                                </td>
                                                <td class="text-end pe-4">
                                                    <div class="btn-group btn-group-sm">
                                                        <button v-if="student.is_active" class="btn btn-outline-warning" @click="updateStudentStatus(student.id, false)"><i class="bi bi-ban"></i> Blacklist</button>
                                                        <button v-else class="btn btn-outline-success" @click="updateStudentStatus(student.id, true)"><i class="bi bi-unlock"></i> Unblock</button>
                                                        <button class="btn btn-outline-danger" @click="deleteStudent(student.id)"><i class="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Job Postings -->
                    <div v-if="currentTab === 'jobs'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Manage Job Postings</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Job Title</th>
                                                <th class="border-0 py-3">Company</th>
                                                <th class="border-0 py-3">Deadline</th>
                                                <th class="border-0 py-3">Status</th>
                                                <th class="border-0 py-3 text-end pe-4">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="job in filteredJobs" :key="job.id">
                                                <td class="ps-4 fw-bold">{{ job.title }}</td>
                                                <td>{{ job.company }}</td>
                                                <td>{{ job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : 'None' }}</td>
                                                <td>
                                                    <span class="badge" 
                                                          :class="{
                                                              'bg-success': job.status === 'Approved',
                                                              'bg-warning': job.status === 'Pending',
                                                              'bg-danger': job.status === 'Rejected' || job.status === 'Closed'
                                                          }">
                                                        {{ job.status }}
                                                    </span>
                                                </td>
                                                <td class="text-end pe-4">
                                                    <div class="btn-group btn-group-sm">
                                                        <button v-if="job.status !== 'Approved'" class="btn btn-outline-success" @click="updateJobStatus(job.id, 'Approved')"><i class="bi bi-check"></i> Approve</button>
                                                        <button v-if="job.status === 'Approved'" class="btn btn-outline-warning" @click="updateJobStatus(job.id, 'Rejected')"><i class="bi bi-x"></i> Reject</button>
                                                        <button class="btn btn-outline-danger" @click="deleteJob(job.id)"><i class="bi bi-trash"></i></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- View: Applications -->
                    <div v-if="currentTab === 'applications'" class="animate-fade-in-up">
                        <h3 class="fw-black text-dark mb-4">Global Applications</h3>
                        <div class="card border-0 shadow-sm rounded-4">
                            <div class="card-body p-0">
                                <div class="table-responsive">
                                    <table class="table table-hover align-middle mb-0">
                                        <thead class="bg-light">
                                            <tr>
                                                <th class="ps-4 border-0 py-3">Student Name</th>
                                                <th class="border-0 py-3">Applied For (Job)</th>
                                                <th class="border-0 py-3">Company</th>
                                                <th class="border-0 py-3">Date</th>
                                                <th class="border-0 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="app in filteredApplications" :key="app.id">
                                                <td class="ps-4 fw-bold">{{ app.student_name }}</td>
                                                <td>{{ app.job_title }}</td>
                                                <td>{{ app.company_name }}</td>
                                                <td>{{ app.application_date ? new Date(app.application_date).toLocaleDateString() : 'N/A' }}</td>
                                                <td>
                                                    <span class="badge bg-secondary">{{ app.status }}</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
            stats: {
                students: 0,
                companies: 0,
                jobs: 0,
                applications: 0
            },
            companies: [],
            students: [],
            jobs: [],
            applications: []
        };
    },
    computed: {
        filteredCompanies() {
            if (!this.searchQuery) return this.companies;
            const q = this.searchQuery.toLowerCase();
            return this.companies.filter(c => 
                (c.name && c.name.toLowerCase().includes(q)) || 
                (c.industry && c.industry.toLowerCase().includes(q))
            );
        },
        filteredStudents() {
            if (!this.searchQuery) return this.students;
            const q = this.searchQuery.toLowerCase();
            return this.students.filter(s => 
                (s.name && s.name.toLowerCase().includes(q)) || 
                (s.email && s.email.toLowerCase().includes(q))
            );
        },
        filteredJobs() {
            if (!this.searchQuery) return this.jobs;
            const q = this.searchQuery.toLowerCase();
            return this.jobs.filter(j => 
                (j.title && j.title.toLowerCase().includes(q)) || 
                (j.company && j.company.toLowerCase().includes(q))
            );
        },
        filteredApplications() {
            if (!this.searchQuery) return this.applications;
            const q = this.searchQuery.toLowerCase();
            return this.applications.filter(a => 
                (a.student_name && a.student_name.toLowerCase().includes(q)) || 
                (a.job_title && a.job_title.toLowerCase().includes(q)) ||
                (a.company_name && a.company_name.toLowerCase().includes(q))
            );
        }
    },
    methods: {
        handleLogout() {
            store.logout();
            this.$router.push('/login');
        },
        async fetchStats() {
            try {
                const res = await fetch('/api/admin/stats', { headers: store.authHeader });
                if (res.ok) this.stats = await res.json();
            } catch (err) { console.error(err); }
        },
        async fetchCompanies() {
            try {
                const res = await fetch('/api/admin/companies', { headers: store.authHeader });
                if (res.ok) this.companies = await res.json();
            } catch (err) { console.error(err); }
        },
        async fetchStudents() {
            try {
                const res = await fetch('/api/admin/students', { headers: store.authHeader });
                if (res.ok) this.students = await res.json();
            } catch (err) { console.error(err); }
        },
        async fetchJobs() {
            try {
                const res = await fetch('/api/admin/jobs', { headers: store.authHeader });
                if (res.ok) this.jobs = await res.json();
            } catch (err) { console.error(err); }
        },
        async fetchApplications() {
            try {
                const res = await fetch('/api/admin/applications', { headers: store.authHeader });
                if (res.ok) this.applications = await res.json();
            } catch (err) { console.error(err); }
        },
        
        // Actions
        async updateCompanyStatus(id, status) {
            if (!confirm(`Are you sure you want to mark this company as ${status}?`)) return;
            try {
                const res = await fetch(`/api/admin/companies/${id}/status`, {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                });
                if (res.ok) this.fetchCompanies();
            } catch (err) { console.error(err); }
        },
        async deleteCompany(id) {
            if (!confirm(`WARNING: This will permanently delete the company and all its job postings and applications. Continue?`)) return;
            try {
                const res = await fetch(`/api/admin/companies/${id}`, {
                    method: 'DELETE',
                    headers: store.authHeader
                });
                if (res.ok) this.fetchCompanies();
            } catch (err) { console.error(err); }
        },
        
        async updateStudentStatus(id, is_active) {
            if (!confirm(`Are you sure you want to ${is_active ? 'unblock' : 'blacklist'} this student?`)) return;
            try {
                const res = await fetch(`/api/admin/students/${id}/status`, {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ is_active })
                });
                if (res.ok) this.fetchStudents();
            } catch (err) { console.error(err); }
        },
        async deleteStudent(id) {
            if (!confirm(`WARNING: This will permanently delete the student and their applications. Continue?`)) return;
            try {
                const res = await fetch(`/api/admin/students/${id}`, {
                    method: 'DELETE',
                    headers: store.authHeader
                });
                if (res.ok) this.fetchStudents();
            } catch (err) { console.error(err); }
        },
        
        async updateJobStatus(id, status) {
            try {
                const res = await fetch(`/api/admin/jobs/${id}/status`, {
                    method: 'PUT',
                    headers: { ...store.authHeader, 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status })
                });
                if (res.ok) this.fetchJobs();
            } catch (err) { console.error(err); }
        },
        async deleteJob(id) {
            if (!confirm(`WARNING: This will permanently delete the job posting. Continue?`)) return;
            try {
                const res = await fetch(`/api/admin/jobs/${id}`, {
                    method: 'DELETE',
                    headers: store.authHeader
                });
                if (res.ok) this.fetchJobs();
            } catch (err) { console.error(err); }
        }
    },
    mounted() {
        this.fetchStats();
    }
};
