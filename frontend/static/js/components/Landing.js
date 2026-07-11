export default {
    template: `
        <div class="d-flex flex-column min-vh-100">
            <!-- Modern Navbar -->
            <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
                <div class="container">
                    <router-link class="navbar-brand d-flex align-items-center" to="/">
                        <div class="bg-primary text-white rounded p-2 me-2 d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; font-weight: 800;">
                            CK
                        </div>
                        <span class="fw-bold fs-4 text-dark">CareerKite</span>
                    </router-link>
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav align-items-center">
                            <li class="nav-item me-3">
                                <a class="nav-link fw-medium text-secondary hover-primary" href="#features">Features</a>
                            </li>
                            <li class="nav-item me-3">
                                <a class="nav-link fw-medium text-secondary hover-primary" href="#how-it-works">How It Works</a>
                            </li>
                            <li class="nav-item me-2 mt-3 mt-lg-0">
                                <router-link class="btn btn-outline-primary px-4 fw-medium rounded-pill" to="/login">Login</router-link>
                            </li>
                            <li class="nav-item mt-2 mt-lg-0">
                                <router-link class="btn btn-primary px-4 fw-medium rounded-pill shadow-sm" to="/signup">Get Started</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <!-- Hero Section with Gradient Background -->
            <section class="hero-section bg-light position-relative overflow-hidden py-5 flex-grow-1 d-flex align-items-center">
                <div class="position-absolute top-0 start-0 w-100 h-100 hero-bg-shape"></div>
                <div class="container position-relative z-1 py-5">
                    <div class="row align-items-center">
                        <div class="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
                            <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3 fw-bold tracking-wide">V2 IS LIVE</span>
                            <h1 class="display-4 fw-black text-dark mb-4 lh-tight">
                                Streamline Your <span class="text-primary">Campus Recruitment</span> Experience
                            </h1>
                            <p class="lead text-secondary mb-5 fw-normal pe-lg-4">
                                The ultimate end-to-end platform connecting institutes, talented students, and top tier companies for seamless placement drives and seamless hiring.
                            </p>
                            <div class="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
                                <router-link to="/signup" class="btn btn-primary btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm hero-btn">
                                    Sign Up Now <i class="bi bi-arrow-right ms-2"></i>
                                </router-link>
                                <router-link to="/login" class="btn btn-white btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm border text-dark hero-btn">
                                    Login to Portal
                                </router-link>
                            </div>
                        </div>
                        <div class="col-lg-6 d-none d-lg-block">
                            <div class="hero-image-wrapper p-4 bg-white rounded-4 shadow-lg ms-lg-5 transform-tilt">
                                <!-- Mockup Dashboard UI -->
                                <div class="mockup-header border-bottom pb-3 mb-3 d-flex align-items-center justify-content-between">
                                    <div class="d-flex gap-2">
                                        <div class="mock-dot bg-danger"></div>
                                        <div class="mock-dot bg-warning"></div>
                                        <div class="mock-dot bg-success"></div>
                                    </div>
                                    <div class="bg-light rounded-pill px-4 py-1 text-muted small fw-medium">placementportal.app</div>
                                    <div></div>
                                </div>
                                <div class="row g-3">
                                    <div class="col-4">
                                        <div class="bg-light rounded p-3 h-100">
                                            <div class="bg-secondary-subtle rounded w-50 p-2 mb-3"></div>
                                            <div class="bg-secondary-subtle rounded w-75 p-2 mb-2"></div>
                                            <div class="bg-secondary-subtle rounded w-100 p-2 mb-2"></div>
                                            <div class="bg-secondary-subtle rounded w-50 p-2"></div>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <div class="bg-primary-subtle rounded p-4 mb-3 d-flex align-items-center justify-content-between">
                                            <div>
                                                <h5 class="text-primary fw-bold mb-1">New Drive Approved</h5>
                                                <small class="text-muted">Google India - Software Engineer</small>
                                            </div>
                                            <button class="btn btn-sm btn-primary rounded-pill px-3">Apply</button>
                                        </div>
                                        <div class="d-flex gap-3">
                                            <div class="bg-light rounded p-4 flex-grow-1 text-center">
                                                <h3 class="fw-black text-dark mb-0">120+</h3>
                                                <small class="text-muted">Companies</small>
                                            </div>
                                            <div class="bg-light rounded p-4 flex-grow-1 text-center">
                                                <h3 class="fw-black text-dark mb-0">85%</h3>
                                                <small class="text-muted">Placed</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <!-- Features Section -->
            <section id="features" class="py-5 bg-white">
                <div class="container py-5">
                    <div class="text-center mb-5 pb-3">
                        <h2 class="fw-bold text-dark mb-3">A Portal Built For Everyone</h2>
                        <p class="text-secondary lead max-w-700 mx-auto">Tailored dashboards and tools designed specifically for the three pillars of campus placements.</p>
                    </div>
                    <div class="row g-4">
                        <!-- Admin Feature -->
                        <div class="col-md-4">
                            <div class="card h-100 border-0 shadow-hover bg-light rounded-4 transition-all">
                                <div class="card-body p-5 text-center">
                                    <div class="feature-icon-wrapper bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style="width: 70px; height: 70px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                                            <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                                            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        </svg>
                                    </div>
                                    <h5 class="fw-bold mb-3">Institute Admin</h5>
                                    <p class="text-muted mb-0">Complete control over the ecosystem. Approve companies, verify drives, manage students, and generate detailed placement statistics.</p>
                                </div>
                            </div>
                        </div>
                        <!-- Company Feature -->
                        <div class="col-md-4">
                            <div class="card h-100 border-0 shadow-hover bg-light rounded-4 transition-all">
                                <div class="card-body p-5 text-center">
                                    <div class="feature-icon-wrapper bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style="width: 70px; height: 70px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
                                            <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z"/>
                                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V1Zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3V1Z"/>
                                        </svg>
                                    </div>
                                    <h5 class="fw-bold mb-3">Companies & Recruiters</h5>
                                    <p class="text-muted mb-0">Post detailed placement drives, seamlessly view student applications, shortlist candidates, and update final offers efficiently.</p>
                                </div>
                            </div>
                        </div>
                        <!-- Student Feature -->
                        <div class="col-md-4">
                            <div class="card h-100 border-0 shadow-hover bg-light rounded-4 transition-all">
                                <div class="card-body p-5 text-center">
                                    <div class="feature-icon-wrapper bg-warning text-dark rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow-sm" style="width: 70px; height: 70px;">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-mortarboard" viewBox="0 0 16 16">
                                            <path d="M8.156 1.812a8 8 0 0 0-5.328 2.375l-.47.534A7.95 7.95 0 0 0 1 8.281V13a1 1 0 0 0 1 1h3v-4H3.454a5.955 5.955 0 0 1-.954-3.132v-.108a6.002 6.002 0 0 1 1.76-4.086l.47-.534a6 6 0 0 1 3.99-1.782h.423a6.002 6.002 0 0 1 3.99 1.782l.47.534A5.999 5.999 0 0 1 14.5 8.173v.108a5.95 5.95 0 0 1-.954 3.132H12v4h3a1 1 0 0 0 1-1V8.281a7.95 7.95 0 0 0-1.358-3.564l-.47-.534a8 8 0 0 0-5.328-2.375h-.688z"/>
                                            <path d="M5 14h6v-4H5v4z"/>
                                        </svg>
                                    </div>
                                    <h5 class="fw-bold mb-3">Students</h5>
                                    <p class="text-muted mb-0">Build rich profiles, track your application progress in real-time, apply to eligible drives, and secure your dream job.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="bg-dark text-white py-4 mt-auto">
                <div class="container text-center">
                    <p class="mb-1 fw-bold fs-5">CareerKite</p>
                    <p class="text-secondary small mb-3">Modern Application Development II • Milestone 2</p>
                    <div class="d-flex justify-content-center gap-3">
                        <router-link to="/login" class="text-white-50 text-decoration-none hover-white">Login</router-link>
                        <span class="text-secondary">•</span>
                        <router-link to="/signup" class="text-white-50 text-decoration-none hover-white">Sign Up</router-link>
                        <span class="text-secondary">•</span>
                        <a href="#" class="text-white-50 text-decoration-none hover-white">Help Center</a>
                    </div>
                </div>
            </footer>
        </div>
    `
};
