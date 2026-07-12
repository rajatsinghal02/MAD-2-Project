export default {
    template: `
        <!-- Features Section -->
        <section id="features" class="py-5 bg-white">
            <div class="container py-5 my-4">
                <div class="text-center mb-5 pb-3">
                    <span class="text-primary fw-bold tracking-wide text-uppercase mb-2 d-block">Platform Features</span>
                    <h2 class="display-5 fw-black text-dark mb-3">Empowering The Ecosystem</h2>
                    <p class="text-secondary lead max-w-700 mx-auto">Seamless tools designed for students, recruiters, and placement cells.</p>
                </div>
                <div class="row g-5">
                    <div class="col-md-4">
                        <div class="feature-card h-100 p-4 rounded-4 transition-all hover-lift">
                            <div class="feature-icon bg-primary-subtle text-primary rounded-4 d-inline-flex align-items-center justify-content-center mb-4" style="width: 60px; height: 60px; font-size: 1.5rem;">
                                <i class="bi bi-mortarboard-fill"></i>
                            </div>
                            <h4 class="fw-bold mb-3">For Students</h4>
                            <p class="text-muted">Create a standout profile, discover drives that match your skills, track application statuses, and chat with recruiters.</p>
                            <router-link to="/signup" class="text-primary fw-bold text-decoration-none icon-link icon-link-hover">
                                Explore Student Portal <i class="bi bi-arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100 p-4 rounded-4 transition-all hover-lift">
                            <div class="feature-icon bg-warning-subtle text-warning rounded-4 d-inline-flex align-items-center justify-content-center mb-4" style="width: 60px; height: 60px; font-size: 1.5rem;">
                                <i class="bi bi-building-fill"></i>
                            </div>
                            <h4 class="fw-bold mb-3">For Companies</h4>
                            <p class="text-muted">Post jobs instantly, use smart filters to shortlist top talent, schedule interviews, and make offers seamlessly.</p>
                            <router-link to="/signup" class="text-warning fw-bold text-decoration-none icon-link icon-link-hover">
                                Post a Job <i class="bi bi-arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="feature-card h-100 p-4 rounded-4 transition-all hover-lift">
                            <div class="feature-icon bg-success-subtle text-success rounded-4 d-inline-flex align-items-center justify-content-center mb-4" style="width: 60px; height: 60px; font-size: 1.5rem;">
                                <i class="bi bi-shield-lock-fill"></i>
                            </div>
                            <h4 class="fw-bold mb-3">For Institutes</h4>
                            <p class="text-muted">Approve and verify companies, manage student databases, enforce placement policies, and track success metrics.</p>
                            <a href="#" class="text-success fw-bold text-decoration-none icon-link icon-link-hover">
                                Admin Login <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
};
