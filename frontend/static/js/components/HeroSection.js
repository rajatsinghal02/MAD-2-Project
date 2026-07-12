export default {
    template: `
        <!-- Hero Section -->
        <section class="hero-section position-relative overflow-hidden pt-5 mt-5 pb-5">
            <!-- Abstract 3D Shapes Background -->
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            
            <div class="container position-relative z-2 pt-5 pb-5 mt-4">
                <div class="row align-items-center">
                    <div class="col-lg-7 text-center text-lg-start pe-lg-5">
                        <div class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-4 fw-bold animate-fade-in-up" style="animation-delay: 0.1s;">
                            <i class="bi bi-star-fill text-warning me-1"></i> #1 Campus Placement Platform
                        </div>
                        <h1 class="display-3 fw-black text-dark mb-4 lh-tight animate-fade-in-up" style="animation-delay: 0.2s;">
                            Find Your <span class="text-primary position-relative inline-block highlight-text">Dream Job</span> <br> Right From Campus.
                        </h1>
                        <p class="lead text-secondary mb-5 fw-normal pe-lg-5 animate-fade-in-up" style="animation-delay: 0.3s;">
                            Over 10,000+ top companies are hiring students just like you. Build your profile, apply to curated drives, and launch your career.
                        </p>
                        
                        <!-- Search Bar Component -->
                        <div class="search-box bg-white rounded-pill shadow-lg p-2 d-flex align-items-center animate-fade-in-up" style="animation-delay: 0.4s; max-width: 600px; margin: 0 auto 2rem auto; margin-left: 0;">
                            <div class="d-flex flex-grow-1 align-items-center ps-3">
                                <i class="bi bi-search text-muted fs-5"></i>
                                <input type="text" class="form-control border-0 shadow-none ps-3 bg-transparent" placeholder="Job title, skills, or company...">
                            </div>
                            <div class="border-start px-3 d-none d-md-block">
                                <select class="form-select border-0 shadow-none bg-transparent text-muted fw-medium cursor-pointer">
                                    <option>All Locations</option>
                                    <option>Remote</option>
                                    <option>On-site</option>
                                </select>
                            </div>
                            <button class="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">Search</button>
                        </div>
                        
                        <div class="trending-tags d-flex align-items-center flex-wrap gap-2 animate-fade-in-up justify-content-center justify-content-lg-start" style="animation-delay: 0.5s;">
                            <span class="text-muted small fw-medium">Trending:</span>
                            <span class="badge rounded-pill bg-light text-dark border px-3 py-2 cursor-pointer hover-bg-primary">Software Engineer</span>
                            <span class="badge rounded-pill bg-light text-dark border px-3 py-2 cursor-pointer hover-bg-primary">Data Scientist</span>
                            <span class="badge rounded-pill bg-light text-dark border px-3 py-2 cursor-pointer hover-bg-primary">Product Manager</span>
                        </div>
                    </div>
                    
                    <!-- 3D Interactive Floating Cards -->
                    <div class="col-lg-5 d-none d-lg-block animate-fade-in-up" style="animation-delay: 0.4s;">
                        <div class="position-relative hero-cards-container">
                            <div class="floating-card card-main bg-white p-4 rounded-4 shadow-lg border border-light">
                                <div class="d-flex align-items-center mb-4">
                                    <div class="company-logo bg-primary-subtle text-primary rounded-3 d-flex align-items-center justify-content-center fs-3 fw-bold me-3">G</div>
                                    <div>
                                        <h5 class="fw-bold mb-0">Software Development Engineer</h5>
                                        <p class="text-muted small mb-0">Global Tech Solutions</p>
                                    </div>
                                </div>
                                <div class="d-flex gap-2 mb-4">
                                    <span class="badge bg-light text-dark px-2 py-1"><i class="bi bi-geo-alt me-1"></i>Bangalore</span>
                                    <span class="badge bg-light text-dark px-2 py-1"><i class="bi bi-briefcase me-1"></i>Full-Time</span>
                                    <span class="badge bg-light text-dark px-2 py-1"><i class="bi bi-cash me-1"></i>12 LPA</span>
                                </div>
                                <button class="btn btn-primary w-100 fw-bold rounded-pill">Apply Now</button>
                            </div>
                            <div class="floating-card card-notif-1 bg-white p-3 rounded-4 shadow border border-light d-flex align-items-center gap-3">
                                <div class="icon-circle bg-success-subtle text-success"><i class="bi bi-check-circle-fill"></i></div>
                                <div>
                                    <p class="mb-0 fw-bold fs-6 lh-1">Application Selected</p>
                                    <small class="text-muted">Your interview is scheduled!</small>
                                </div>
                            </div>
                            <div class="floating-card card-notif-2 bg-dark p-3 rounded-4 shadow-lg d-flex align-items-center gap-3 text-white">
                                <div class="icon-circle bg-white text-dark fw-bold">10k+</div>
                                <div>
                                    <p class="mb-0 fw-medium fs-6 lh-1">Active Jobs</p>
                                    <small class="text-white-50">Updated daily</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
};
