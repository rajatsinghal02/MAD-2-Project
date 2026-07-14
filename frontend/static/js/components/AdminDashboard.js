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
                        
                        <!-- Graphs Section -->
                        <div class="row g-4 mb-5">
                            <div class="col-md-7">
                                <div class="card shadow-sm border-0 rounded-4 h-100">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4">Company Registrations</h5>
                                        <canvas id="adminCompanyChart" height="100"></canvas>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="card shadow-sm border-0 rounded-4 h-100">
                                    <div class="card-body p-4">
                                        <h5 class="fw-bold mb-4">Application Status Overview</h5>
                                        <div style="max-height: 250px; display: flex; justify-content: center;">
                                            <canvas id="adminAppChart"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Companies -->
                    <div v-if="currentTab === 'companies'" class="animate-fade-in-up">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Manage Companies</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill"><i class="bi bi-search text-muted"></i></span>
                                <input type="text" class="form-control border-start-0 rounded-end-pill shadow-none" placeholder="Search companies..." v-model="searchQuery">
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-md-6 col-lg-4" v-for="company in filteredCompanies" :key="company.id">
                                <div class="card shadow-sm border-0 rounded-4 h-100 hover-shadow transition-all">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <div class="d-flex justify-content-between align-items-start mb-3">
                                            <div class="d-flex align-items-center">
                                                <div class="bg-light text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 48px; height: 48px;">
                                                    <i class="bi bi-building fs-5"></i>
                                                </div>
                                                <div>
                                                    <h5 class="fw-bold mb-0 text-dark">{{ company.name }}</h5>
                                                    <small class="text-muted">{{ company.industry || 'No Industry' }}</small>
                                                </div>
                                            </div>
                                            <span class="badge" 
                                                  :class="{
                                                      'bg-success': company.approval_status === 'Approved',
                                                      'bg-warning': company.approval_status === 'Pending',
                                                      'bg-danger': company.approval_status === 'Rejected' || company.approval_status === 'Deactivated'
                                                  }">
                                                {{ company.approval_status }}
                                            </span>
                                        </div>
                                        
                                        <p class="text-muted small mb-4 flex-grow-1">
                                            <i class="bi bi-envelope me-2 text-primary"></i> {{ company.email }}<br>
                                            <i class="bi bi-geo-alt me-2 text-primary mt-2 d-inline-block"></i> {{ company.location || 'Location not set' }}
                                        </p>
                                        
                                        <div class="d-flex gap-2 mt-auto">
                                            <button class="btn btn-outline-primary btn-sm flex-grow-1 fw-bold rounded-pill" @click="viewCompanyDetails(company)">
                                                <i class="bi bi-eye me-1"></i> View Details
                                            </button>
                                            <!-- Action Button Menu -->
                                            <div class="dropdown">
                                                <button class="btn btn-light btn-sm rounded-pill h-100 px-3" type="button" data-bs-toggle="dropdown">
                                                    <i class="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                                                    <li v-if="company.approval_status !== 'Approved'"><a class="dropdown-item text-success fw-bold" href="#" @click.prevent="updateCompanyStatus(company.id, 'Approved')"><i class="bi bi-check-circle me-2"></i>Approve</a></li>
                                                    <li v-if="company.approval_status === 'Approved'"><a class="dropdown-item text-warning fw-bold" href="#" @click.prevent="updateCompanyStatus(company.id, 'Deactivated')"><i class="bi bi-pause-circle me-2"></i>Deactivate</a></li>
                                                    <li><hr class="dropdown-divider"></li>
                                                    <li><a class="dropdown-item text-danger fw-bold" href="#" @click.prevent="deleteCompany(company.id)"><i class="bi bi-trash me-2"></i>Delete</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div v-if="filteredCompanies.length === 0" class="col-12 text-center py-5 opacity-50">
                                <i class="bi bi-buildings fs-1 mb-3 d-block"></i>
                                <h5>No companies found</h5>
                            </div>
                        </div>

                    </div>

                    <!-- View: Company Details -->
                    <div v-if="currentTab === 'company_details' && selectedCompany" class="animate-fade-in-up">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <div class="d-flex align-items-center">
                                <button class="btn btn-light rounded-circle me-3 shadow-sm d-flex align-items-center justify-content-center" @click="currentTab = 'companies'" style="width:40px; height:40px;">
                                    <i class="bi bi-arrow-left"></i>
                                </button>
                                <h3 class="fw-black text-dark mb-0">Company Details</h3>
                            </div>
                        </div>
                        
                        <div class="card shadow-sm border-0 rounded-4 mb-4">
                            <div class="card-body p-4 p-md-5">
                                <div class="row g-4 align-items-center">
                                    <div class="col-md-8">
                                        <div class="d-flex align-items-center mb-3">
                                            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 64px; height: 64px;">
                                                <i class="bi bi-building fs-3"></i>
                                            </div>
                                            <div>
                                                <h2 class="fw-black mb-1">{{ selectedCompany.name }}</h2>
                                                <span class="badge" 
                                                      :class="{
                                                          'bg-success': selectedCompany.approval_status === 'Approved',
                                                          'bg-warning': selectedCompany.approval_status === 'Pending',
                                                          'bg-danger': selectedCompany.approval_status === 'Rejected' || selectedCompany.approval_status === 'Deactivated'
                                                      }">
                                                    {{ selectedCompany.approval_status }}
                                                </span>
                                            </div>
                                        </div>
                                        <p class="text-muted mb-2"><i class="bi bi-envelope me-2 text-primary"></i>{{ selectedCompany.email }}</p>
                                        <p class="text-muted mb-2"><i class="bi bi-geo-alt me-2 text-primary"></i>{{ selectedCompany.location || 'Location not specified' }}</p>
                                        <p class="text-muted mb-0"><i class="bi bi-briefcase me-2 text-primary"></i>{{ selectedCompany.industry || 'Industry not specified' }}</p>
                                    </div>
                                    <div class="col-md-4 text-md-end">
                                        <div v-if="selectedCompany.approval_status !== 'Approved'" class="mb-2">
                                            <button class="btn btn-success rounded-pill fw-bold w-100 py-2 shadow-sm" @click="updateCompanyStatus(selectedCompany.id, 'Approved')">
                                                <i class="bi bi-check-circle me-2"></i>Approve Company
                                            </button>
                                        </div>
                                        <div v-if="selectedCompany.approval_status === 'Approved'" class="mb-2">
                                            <button class="btn btn-warning rounded-pill fw-bold w-100 py-2 shadow-sm" @click="updateCompanyStatus(selectedCompany.id, 'Deactivated')">
                                                <i class="bi bi-pause-circle me-2"></i>Deactivate Account
                                            </button>
                                        </div>
                                        <div>
                                            <button class="btn btn-outline-danger rounded-pill fw-bold w-100 py-2" @click="deleteCompany(selectedCompany.id)">
                                                <i class="bi bi-trash me-2"></i>Delete Company
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h4 class="fw-bold mb-4">Job Postings & Applications</h4>
                        <div class="row g-4">
                            <div class="col-12" v-for="job in getSelectedCompanyJobs()" :key="job.id">
                                <div class="card shadow-sm border-0 rounded-4 overflow-hidden">
                                    <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 class="fw-bold text-primary mb-1">{{ job.title }}</h5>
                                            <small class="text-muted"><i class="bi bi-calendar-event me-1"></i> Deadline: {{ job.application_deadline ? new Date(job.application_deadline).toLocaleDateString() : 'N/A' }}</small>
                                        </div>
                                        <span class="badge" :class="job.status === 'Approved' ? 'bg-success' : (job.status === 'Pending' ? 'bg-warning' : 'bg-secondary')">{{ job.status }}</span>
                                    </div>
                                    <div class="card-body p-0">
                                        <div class="table-responsive">
                                            <table class="table table-hover align-middle mb-0">
                                                <thead class="bg-light">
                                                    <tr>
                                                        <th class="ps-4 border-0 py-3">Applicant Name</th>
                                                        <th class="border-0 py-3">Application Date</th>
                                                        <th class="border-0 py-3">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="app in getApplicationsForJob(job.title)" :key="app.id">
                                                        <td class="ps-4 fw-bold">{{ app.student_name }}</td>
                                                        <td>{{ app.application_date ? new Date(app.application_date).toLocaleDateString() : 'N/A' }}</td>
                                                        <td>
                                                            <span class="badge" 
                                                                  :class="{
                                                                      'bg-secondary': app.status === 'Applied',
                                                                      'bg-info': app.status === 'Shortlisted',
                                                                      'bg-primary': app.status === 'Interview',
                                                                      'bg-warning text-dark': app.status === 'Offer',
                                                                      'bg-success': app.status === 'Placed',
                                                                      'bg-danger': app.status === 'Rejected'
                                                                  }">
                                                                {{ app.status }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="getApplicationsForJob(job.title).length === 0">
                                                        <td colspan="3" class="text-center py-4 text-muted">
                                                            <i class="bi bi-inbox mb-2 d-block fs-3"></i> No applications for this job yet.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="getSelectedCompanyJobs().length === 0" class="col-12 text-center py-5 opacity-50">
                                <i class="bi bi-briefcase fs-1 mb-3 d-block"></i>
                                <h5>No jobs posted yet</h5>
                            </div>
                        </div>
                    </div>
                    
                    <!-- View: Students -->
                    <div v-if="currentTab === 'students'" class="animate-fade-in-up">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Manage Students</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill"><i class="bi bi-search text-muted"></i></span>
                                <input type="text" class="form-control border-start-0 rounded-end-pill shadow-none" placeholder="Search students..." v-model="searchQuery">
                            </div>
                        </div>
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
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Manage Job Postings</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill"><i class="bi bi-search text-muted"></i></span>
                                <input type="text" class="form-control border-start-0 rounded-end-pill shadow-none" placeholder="Search jobs..." v-model="searchQuery">
                            </div>
                        </div>
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
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Global Applications</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill"><i class="bi bi-search text-muted"></i></span>
                                <input type="text" class="form-control border-start-0 rounded-end-pill shadow-none" placeholder="Search applications..." v-model="searchQuery">
                            </div>
                        </div>
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
            applications: [],
            companyChart: null,
            appChart: null,
            selectedCompany: null
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
                
                await this.fetchCompanies();
                await this.fetchApplications();
                
                if (this.currentTab === 'dashboard') {
                    this.$nextTick(() => {
                        this.renderCharts();
                    });
                }
            } catch (err) { console.error(err); }
        },
        renderCharts() {
            // Chart 1: Company Registrations (Line)
            const ctx1 = document.getElementById('adminCompanyChart');
            if (ctx1) {
                if (this.companyChart) this.companyChart.destroy();
                const counts = {};
                this.companies.forEach(c => {
                    const date = c.created_at ? new Date(c.created_at) : new Date();
                    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                    counts[month] = (counts[month] || 0) + 1;
                });
                
                this.companyChart = new Chart(ctx1, {
                    type: 'line',
                    data: {
                        labels: Object.keys(counts),
                        datasets: [{
                            label: 'New Companies',
                            data: Object.values(counts),
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: { responsive: true, plugins: { legend: { display: false } } }
                });
            }
            
            // Chart 2: Application Status (Doughnut)
            const ctx2 = document.getElementById('adminAppChart');
            if (ctx2) {
                if (this.appChart) this.appChart.destroy();
                const counts = { 'Applied': 0, 'Shortlisted': 0, 'Selected': 0, 'Rejected': 0 };
                this.applications.forEach(a => {
                    counts[a.status] = (counts[a.status] || 0) + 1;
                });
                
                this.appChart = new Chart(ctx2, {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(counts),
                        datasets: [{
                            data: Object.values(counts),
                            backgroundColor: ['#6c757d', '#0dcaf0', '#198754', '#dc3545']
                        }]
                    },
                    options: { 
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: 'right' } }
                    }
                });
            }
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
        
        viewCompanyDetails(company) {
            this.selectedCompany = company;
            // Fetch jobs and applications if they aren't loaded yet
            if (this.jobs.length === 0) {
                this.fetchJobs();
            }
            if (this.applications.length === 0) {
                this.fetchApplications();
            }
            this.currentTab = 'company_details';
        },
        
        getSelectedCompanyJobs() {
            if (!this.selectedCompany) return [];
            return this.jobs.filter(j => j.company === this.selectedCompany.name);
        },
        
        getApplicationsForJob(jobTitle) {
            if (!this.selectedCompany) return [];
            return this.applications.filter(a => a.job_title === jobTitle && a.company_name === this.selectedCompany.name);
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
