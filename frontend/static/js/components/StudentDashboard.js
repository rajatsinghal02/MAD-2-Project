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
                
                <div class="d-flex align-items-center justify-content-between w-100 ms-3">
                    <div class="d-flex align-items-center gap-3">
                        <button @click="sidebarOpen = !sidebarOpen" class="toggle-btn me-3">
                            <i class="bi bi-list"></i>
                        </button>
                        

                    </div>
                    
                    <div class="ms-auto pe-4">
                        <div class="dropdown">
                            <button class="btn btn-light rounded-circle position-relative p-2 border-0 shadow-sm" type="button" @click="toggleNotifications">
                                <i class="bi bi-bell fs-5 text-dark"></i>
                                <span v-if="unreadNotificationsCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.65rem;">
                                    {{ unreadNotificationsCount }}
                                </span>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end shadow border-0" :class="{ 'show': showNotifications }" style="width: 320px; max-height: 400px; overflow-y: auto; position: absolute; right: 0; left: auto;">
                                <li>
                                    <div class="dropdown-header fw-bold text-dark border-bottom pb-2 d-flex justify-content-between align-items-center">
                                        <span>Notifications</span>
                                        <div v-if="notifications.length > 0">
                                            <a href="#" class="text-primary small text-decoration-none me-2" @click.prevent="markNotificationsRead">Mark all read</a>
                                            <a href="#" class="text-danger small text-decoration-none" @click.prevent="clearNotifications">Clear all</a>
                                        </div>
                                    </div>
                                </li>
                                <li v-if="notifications.length === 0"><span class="dropdown-item text-muted small py-3 text-center">No new notifications</span></li>
                                <li v-for="notif in notifications" :key="notif.id">
                                    <a class="dropdown-item py-2 border-bottom" :class="{'bg-light': !notif.is_read}" href="#" @click.prevent="handleNotificationClick(notif)">
                                        <div class="d-flex align-items-start">
                                            <div class="me-2 mt-1">
                                                <div class="rounded-circle d-flex align-items-center justify-content-center" :class="notif.is_read ? 'bg-secondary bg-opacity-10' : 'bg-primary bg-opacity-10'" style="width: 32px; height: 32px;">
                                                    <i class="bi bi-info-circle" :class="notif.is_read ? 'text-secondary' : 'text-primary'"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <p class="mb-0 small text-wrap lh-sm" :class="{'fw-bold': !notif.is_read}">{{ notif.message }}</p>
                                                <small class="text-muted" style="font-size: 0.7rem;">{{ new Date(notif.created_at).toLocaleString() }}</small>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
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
                    
                    <!-- View: Dashboard / Overview -->
                    <div v-if="currentTab === 'dashboard'" class="animate-fade-in-up">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h3 class="fw-black text-dark mb-1">Welcome back, {{ profile.name ? profile.name.split(' ')[0] : 'Student' }}! 👋</h3>
                                <p class="text-muted fw-medium">Here's what's happening with your job search.</p>
                            </div>
                        </div>

                        <!-- Stats Row -->
                        <div class="row g-4 mb-4">
                            <div class="col-md-4">
                                <div class="card border-0 shadow-sm rounded-4 bg-primary text-white h-100 position-relative overflow-hidden">
                                    <div class="card-body p-4 d-flex justify-content-between align-items-center z-1">
                                        <div>
                                            <h6 class="fw-bold mb-1 opacity-75">Applications Sent</h6>
                                            <h2 class="fw-black mb-0">{{ applications.length }}</h2>
                                        </div>
                                        <i class="bi bi-send fs-1 opacity-50"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card border-0 shadow-sm rounded-4 bg-info text-white h-100 position-relative overflow-hidden">
                                    <div class="card-body p-4 d-flex justify-content-between align-items-center z-1">
                                        <div>
                                            <h6 class="fw-bold mb-1 opacity-75">Available Jobs</h6>
                                            <h2 class="fw-black mb-0">{{ jobs.length }}</h2>
                                        </div>
                                        <i class="bi bi-briefcase fs-1 opacity-50"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="card border-0 shadow-sm rounded-4 bg-success text-white h-100 position-relative overflow-hidden">
                                    <div class="card-body p-4 d-flex justify-content-between align-items-center z-1">
                                        <div>
                                            <h6 class="fw-bold mb-1 opacity-75">Placements</h6>
                                            <h2 class="fw-black mb-0">{{ placements.length }}</h2>
                                        </div>
                                        <i class="bi bi-award fs-1 opacity-50"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row g-4">
                            <!-- Left Column: Recent Applications & Resume -->
                            <div class="col-lg-5">
                                <!-- Recent Applications -->
                                <div class="card border-0 shadow-sm rounded-4 mb-4">
                                    <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                                        <h5 class="fw-bold mb-0"><i class="bi bi-clock-history me-2 text-primary"></i>Latest Applications</h5>
                                        <button class="btn btn-sm btn-light rounded-pill fw-bold" @click="currentTab = 'applications'">View All</button>
                                    </div>
                                    <div class="card-body p-0">
                                        <div class="list-group list-group-flush" v-if="applications.length > 0">
                                            <div class="list-group-item px-4 py-3" v-for="app in applications.slice(0, 3)" :key="app.id">
                                                <div class="d-flex justify-content-between align-items-center mb-1">
                                                    <h6 class="fw-bold text-dark mb-0 text-truncate" style="max-width: 60%;">{{ app.drive_title }}</h6>
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
                                                </div>
                                                <small class="text-muted"><i class="bi bi-building me-1"></i>{{ app.company }} • {{ new Date(app.application_date).toLocaleDateString() }}</small>
                                            </div>
                                        </div>
                                        <div v-else class="text-center py-4">
                                            <i class="bi bi-inbox fs-3 text-muted mb-2 d-block"></i>
                                            <p class="text-muted mb-0 small">No applications yet.</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Smart Resume Upload -->
                                <div class="card border-0 shadow-sm rounded-4">
                                    <div class="card-body p-4 d-flex flex-column">
                                        <h6 class="fw-bold mb-3"><i class="bi bi-file-earmark-pdf text-primary me-2"></i>Smart Resume Upload</h6>
                                        
                                        <!-- Dropzone -->
                                        <div class="resume-dropzone flex-grow-1 d-flex flex-column align-items-center justify-content-center py-4 px-3 position-relative overflow-hidden text-center rounded-3 border bg-light" 
                                             @dragover.prevent="dragActive = true" 
                                             @dragleave.prevent="dragActive = false" 
                                             @drop.prevent="handleDrop"
                                             @click="triggerFileInput"
                                             :class="{ 'border-primary': dragActive, 'bg-primary bg-opacity-10': dragActive }" style="border-style: dashed !important; cursor: pointer;">
                                             
                                            <input type="file" ref="fileInput" class="d-none" @change="handleFileSelect" accept=".pdf,.doc,.docx">
                                            
                                            <template v-if="!uploading && !resumeParsed">
                                                <i class="bi bi-cloud-arrow-up fs-2 text-primary mb-2"></i>
                                                <p class="fw-bold text-dark small mb-0">Click or drag file to upload</p>
                                            </template>
                                            
                                            <!-- Scanning Animation -->
                                            <template v-if="uploading">
                                                <div class="spinner-border text-primary spinner-border-sm mb-2" role="status"></div>
                                                <p class="fw-bold text-primary small mb-0">Scrubbing Resume...</p>
                                            </template>
                                            
                                            <!-- Success State -->
                                            <template v-if="resumeParsed && !uploading">
                                                <i class="bi bi-check-circle-fill fs-2 text-success mb-2"></i>
                                                <p class="fw-bold text-success small mb-0">Parsed Successfully!</p>
                                                <small class="text-muted d-block mt-1">{{ fileName }}</small>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Right Column: Recommended Jobs -->
                            <div class="col-lg-7">
                                <div class="card border-0 shadow-sm rounded-4 h-100">
                                    <div class="card-header bg-white border-bottom p-4 d-flex justify-content-between align-items-center">
                                        <h5 class="fw-bold mb-0"><i class="bi bi-star-fill text-warning me-2"></i>Recommended Jobs</h5>
                                        <button class="btn btn-sm btn-primary rounded-pill fw-bold px-3 btn-glow shadow-primary-sm" @click="currentTab = 'jobs'">Find More</button>
                                    </div>
                                    <div class="card-body p-4">
                                        <div class="d-flex flex-column gap-3" v-if="jobs.length > 0">
                                            <div class="border rounded-4 p-3 hover-shadow transition-all" v-for="job in jobs.slice(0, 5)" :key="job.id">
                                                <div class="d-flex justify-content-between align-items-center">
                                                    <div class="d-flex align-items-center">
                                                        <div class="bg-primary bg-opacity-10 p-3 rounded-3 me-3 text-primary d-flex align-items-center justify-content-center">
                                                            <i class="bi bi-briefcase-fill fs-4"></i>
                                                        </div>
                                                        <div>
                                                            <h6 class="fw-bold mb-1 text-dark">{{ job.title }}</h6>
                                                            <p class="small text-muted mb-0"><i class="bi bi-building me-1"></i>{{ job.company }} • <i class="bi bi-geo-alt ms-1 me-1"></i>{{ job.location || 'Remote' }}</p>
                                                        </div>
                                                    </div>
                                                    <button v-if="!hasApplied(job.id)" class="btn btn-outline-primary btn-sm rounded-pill fw-bold px-3 py-2" @click="applyForJob(job.id)">Apply</button>
                                                    <span v-else class="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold"><i class="bi bi-check-circle me-1"></i>Applied</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-center py-5">
                                            <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
                                            <p class="text-muted mb-0">No jobs available right now.</p>
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
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill text-muted px-3"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control bg-white border-start-0 rounded-end-pill shadow-none" placeholder="Search jobs..." v-model="searchQuery">
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
                                            <button v-if="!hasApplied(job.id)" class="btn btn-outline-primary w-100 rounded-pill fw-bold mt-2" @click="applyForJob(job.id)">Quick Apply</button>
                                            <button v-else class="btn btn-success w-100 rounded-pill fw-bold mt-2" disabled><i class="bi bi-check-circle me-1"></i>Applied</button>
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
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Your Applications</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill text-muted px-3"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control bg-white border-start-0 rounded-end-pill shadow-none" placeholder="Search applications..." v-model="searchQuery">
                            </div>
                        </div>
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
                                            <tr v-for="app in filteredApplications" :key="app.id">
                                                <td class="ps-4 fw-bold">{{ app.drive_title }}</td>
                                                <td>{{ app.company }}</td>
                                                <td>{{ new Date(app.application_date).toLocaleDateString() }}</td>
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
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">Your Placements</h3>
                            <div class="input-group" style="max-width: 300px;">
                                <span class="input-group-text bg-white border-end-0 rounded-start-pill text-muted px-3"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control bg-white border-start-0 rounded-end-pill shadow-none" placeholder="Search placements..." v-model="searchQuery">
                            </div>
                        </div>
                        <div class="row g-4">
                            <div class="col-md-6 col-lg-4" v-for="placement in filteredPlacements" :key="placement.id">
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
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h3 class="fw-black text-dark mb-0">My Profile</h3>
                            <button v-if="!isEditingProfile" class="btn btn-primary rounded-pill fw-bold" @click="isEditingProfile = true">
                                <i class="bi bi-pencil-square me-1"></i> Edit Profile
                            </button>
                        </div>
                        <div class="card border-0 shadow-sm rounded-4 max-w-800">
                            <div class="card-body p-5">
                                <!-- Read-Only View -->
                                <div v-if="!isEditingProfile">
                                    <div class="row g-4">
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">Full Name</p>
                                            <h6 class="fw-bold">{{ profile.name || 'Not provided' }}</h6>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">Email Address</p>
                                            <h6 class="fw-bold">{{ profile.email }}</h6>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">Phone Number</p>
                                            <h6 class="fw-bold">{{ profile.phone || 'Not provided' }}</h6>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">Branch / Major</p>
                                            <h6 class="fw-bold">{{ profile.branch || 'Not provided' }}</h6>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">CGPA</p>
                                            <h6 class="fw-bold">{{ profile.cgpa || 'Not provided' }}</h6>
                                        </div>
                                        <div class="col-md-6">
                                            <p class="text-muted small mb-1 fw-bold">Year of Passing</p>
                                            <h6 class="fw-bold">{{ profile.year_of_passing || 'Not provided' }}</h6>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted small mb-1 fw-bold">Education</p>
                                            <p class="fw-medium">{{ profile.education || 'Not provided' }}</p>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted small mb-1 fw-bold">Experience</p>
                                            <p class="fw-medium">{{ profile.experience || 'Not provided' }}</p>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted small mb-1 fw-bold">Achievements</p>
                                            <p class="fw-medium">{{ profile.achievements || 'Not provided' }}</p>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted small mb-1 fw-bold">Skills</p>
                                            <div>
                                                <span v-if="profile.skills" v-for="skill in profile.skills.split(',')" class="badge bg-light text-dark border me-2 mb-2 px-3 py-2">{{ skill.trim() }}</span>
                                                <span v-else class="text-muted">Not provided</span>
                                            </div>
                                        </div>
                                        
                                        <div class="col-12 mt-4" v-if="profile.resume_url">
                                            <div class="p-3 bg-light rounded-3 border border-light d-flex align-items-center justify-content-between">
                                                <div>
                                                    <h6 class="mb-1 fw-bold text-dark"><i class="bi bi-file-earmark-pdf-fill text-danger me-2"></i>Uploaded Resume</h6>
                                                    <p class="mb-0 text-muted small">This is the resume used for your quick applications.</p>
                                                </div>
                                                <a :href="profile.resume_url" target="_blank" class="btn btn-sm btn-outline-primary fw-bold px-3">View Resume</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Edit Form -->
                                <form v-else @submit.prevent="saveProfile">
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
                                            <label class="form-label fw-bold text-muted small">Phone Number</label>
                                            <input type="text" class="form-control" v-model="profile.phone" placeholder="e.g. +1 234 567 8900">
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
                                            <label class="form-label fw-bold text-muted small">Education</label>
                                            <textarea class="form-control" rows="2" v-model="profile.education" placeholder="e.g. B.Tech in CS, High School"></textarea>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label fw-bold text-muted small">Experience</label>
                                            <textarea class="form-control" rows="2" v-model="profile.experience" placeholder="e.g. Intern at TechCorp"></textarea>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label fw-bold text-muted small">Achievements</label>
                                            <textarea class="form-control" rows="2" v-model="profile.achievements" placeholder="e.g. Hackathon Winner, Open Source Contributor"></textarea>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label fw-bold text-muted small">Skills (comma separated)</label>
                                            <textarea class="form-control" rows="2" v-model="profile.skills" placeholder="e.g. Python, Vue.js, Machine Learning"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div v-if="profileMsg" class="alert alert-success py-2 small fw-bold mb-3">
                                        {{ profileMsg }}
                                    </div>
                                    
                                    <div class="d-flex justify-content-end gap-2">
                                        <button type="button" class="btn btn-light rounded-pill px-4 fw-bold" @click="isEditingProfile = false">Cancel</button>
                                        <button type="submit" class="btn btn-primary rounded-pill px-5 fw-bold shadow-primary-sm btn-glow">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            <!-- Application Confirmation Modal -->
            <div class="modal fade" id="applyJobModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg rounded-4">
                        <div class="modal-header border-bottom-0 pb-0">
                            <h5 class="modal-title fw-black"><i class="bi bi-briefcase-fill text-primary me-2"></i>Confirm Application</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4 text-center">
                            <div v-if="profile.resume_url">
                                <i class="bi bi-file-earmark-pdf-fill text-danger" style="font-size: 3rem;"></i>
                                <p class="mt-3 text-muted">You are about to apply using your currently uploaded resume:</p>
                                <a :href="profile.resume_url" target="_blank" class="fw-bold d-block mb-4 text-decoration-none">View Current Resume</a>
                                <div class="d-grid gap-2">
                                    <button class="btn btn-primary rounded-pill fw-bold" @click="submitApplication">Confirm & Apply</button>
                                    <button type="button" class="btn btn-light rounded-pill" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                            <div v-else>
                                <i class="bi bi-exclamation-circle-fill text-warning" style="font-size: 3rem;"></i>
                                <p class="mt-3 fw-bold">No Resume Found</p>
                                <p class="text-muted small">You need to upload a resume in your Profile section before you can apply to jobs.</p>
                                <div class="d-grid mt-4">
                                    <button class="btn btn-primary rounded-pill fw-bold" data-bs-dismiss="modal" @click="currentTab = 'profile'; fetchProfile()">Go to Profile</button>
                                </div>
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
            dragActive: false,
            uploading: false,
            resumeParsed: false,
            isEditingProfile: false,
            fileName: '',
            pendingDriveId: null,
            jobs: [],
            applications: [],
            placements: [],
            profile: {
                name: '',
                email: '',
                branch: '',
                cgpa: '',
                year_of_passing: '',
                skills: '',
                phone: '',
                education: '',
                experience: '',
                achievements: '',
                resume_url: null
            },
            profileMsg: '',
            searchQuery: '',
            notifications: [],
            showNotifications: false
        };
    },
    computed: {
        unreadNotificationsCount() {
            return this.notifications.filter(n => !n.is_read).length;
        },
        filteredJobs() {
            if (!this.searchQuery) return this.jobs;
            const q = this.searchQuery.toLowerCase();
            return this.jobs.filter(job => 
                (job.title && job.title.toLowerCase().includes(q)) || 
                (job.company && job.company.toLowerCase().includes(q)) ||
                (job.skills_required && job.skills_required.toLowerCase().includes(q))
            );
        },
        filteredApplications() {
            if (!this.searchQuery) return this.applications;
            const q = this.searchQuery.toLowerCase();
            return this.applications.filter(app => 
                (app.custom_id && app.custom_id.toLowerCase().includes(q)) ||
                (app.drive_title && app.drive_title.toLowerCase().includes(q)) ||
                (app.company && app.company.toLowerCase().includes(q)) ||
                (app.status && app.status.toLowerCase().includes(q))
            );
        },
        filteredPlacements() {
            if (!this.searchQuery) return this.placements;
            const q = this.searchQuery.toLowerCase();
            return this.placements.filter(p => 
                (p.position && p.position.toLowerCase().includes(q)) ||
                (p.company && p.company.toLowerCase().includes(q)) ||
                (p.salary && String(p.salary).toLowerCase().includes(q))
            );
        }
    },
    watch: {
        currentTab() {
            this.searchQuery = '';
        }
    },
    methods: {
        async fetchNotifications() {
            try {
                const res = await fetch('/api/notifications/', { headers: store.authHeader });
                if (res.ok) this.notifications = await res.json();
            } catch (err) { console.error(err); }
        },
        async toggleNotifications() {
            this.showNotifications = !this.showNotifications;
        },
        async markNotificationsRead() {
            if (this.unreadNotificationsCount === 0) return;
            try {
                await fetch('/api/notifications/read_all', { method: 'PUT', headers: store.authHeader });
                this.notifications.forEach(n => n.is_read = true);
            } catch (err) { console.error(err); }
        },
        async clearNotifications() {
            try {
                await fetch('/api/notifications/clear_all', { method: 'DELETE', headers: store.authHeader });
                this.notifications = [];
                this.showNotifications = false;
            } catch (err) { console.error(err); }
        },
        async handleNotificationClick(notif) {
            this.showNotifications = false;
            if (!notif.is_read) {
                try {
                    await fetch('/api/notifications/' + notif.id + '/read', { method: 'PUT', headers: store.authHeader });
                    notif.is_read = true;
                } catch (err) { console.error(err); }
            }
            if (notif.action_url) {
                if (notif.action_url === '#jobs') this.currentTab = 'jobs';
            }
        },
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
                    body: JSON.stringify({
                        name: this.profile.name,
                        branch: this.profile.branch,
                        cgpa: this.profile.cgpa,
                        year_of_passing: this.profile.year_of_passing,
                        skills: this.profile.skills,
                        phone: this.profile.phone,
                        education: this.profile.education,
                        experience: this.profile.experience,
                        achievements: this.profile.achievements
                    })
                });
                const data = await res.json();
                if (res.ok) {
                    this.profileMsg = "Profile updated successfully!";
                    setTimeout(() => { 
                        this.profileMsg = ''; 
                        this.isEditingProfile = false;
                    }, 2000);
                    this.fetchProfile();
                } else {
                    alert(data.msg || "Failed to update profile");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred");
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
        hasApplied(jobId) {
            return this.applications.some(app => app.drive_id === jobId);
        },
        applyForJob(driveId) {
            this.pendingDriveId = driveId;
            const modal = new bootstrap.Modal(document.getElementById('applyJobModal'));
            modal.show();
        },
        async submitApplication() {
            if (!this.pendingDriveId) return;
            try {
                const res = await fetch(`/api/student/jobs/${this.pendingDriveId}/apply`, {
                    method: 'POST',
                    headers: {
                        'Authorization': store.authHeader['Authorization'],
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ resume_url: this.profile.resume_url })
                });
                const data = await res.json();
                
                const modalInstance = bootstrap.Modal.getInstance(document.getElementById('applyJobModal'));
                if (modalInstance) modalInstance.hide();
                
                if (res.ok) {
                    alert(data.msg);
                    this.fetchApplications();
                    this.fetchJobs();
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
            if (file) this.uploadAndParseResume(file);
        },
        handleDrop(event) {
            this.dragActive = false;
            const file = event.dataTransfer.files[0];
            if (file) this.uploadAndParseResume(file);
        },
        async uploadAndParseResume(file) {
            this.fileName = file.name;
            this.uploading = true;
            this.resumeParsed = false;
            
            const formData = new FormData();
            formData.append('file', file);
            
            try {
                const res = await fetch('/api/student/upload_resume', {
                    method: 'POST',
                    headers: {
                        'Authorization': store.authHeader['Authorization']
                    },
                    body: formData
                });
                
                const data = await res.json();
                this.uploading = false;
                
                if (res.ok) {
                    this.resumeParsed = true;
                    this.fetchProfile();
                    alert("Resume uploaded successfully!");
                } else {
                    alert(data.msg || "Failed to parse resume");
                }
            } catch (err) {
                this.uploading = false;
                console.error(err);
                alert("An error occurred during upload");
            }
        },
        resetUpload() {
            this.resumeParsed = false;
            this.fileName = '';
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
        this.fetchJobs();
        this.fetchApplications();
        this.fetchPlacements();
        this.fetchNotifications();
        setInterval(() => this.fetchNotifications(), 30000);
    }
};
