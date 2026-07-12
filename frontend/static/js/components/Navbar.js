export default {
    template: `
        <!-- Modern Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top py-3 transition-all" id="mainNav">
            <div class="container">
                <router-link class="navbar-brand d-flex align-items-center" to="/">
                    <div class="brand-icon me-2 d-flex align-items-center justify-content-center">
                        <i class="bi bi-rocket-takeoff-fill text-white fs-5"></i>
                    </div>
                    <span class="fw-black fs-4 text-dark tracking-tight">Career<span class="text-primary">Kite</span></span>
                </router-link>
                <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav align-items-center fw-medium">
                        <li class="nav-item mx-2">
                            <a class="nav-link text-dark hover-primary" href="#jobs">Jobs</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link text-dark hover-primary" href="#companies">Companies</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link text-dark hover-primary" href="#institutes">For Institutes</a>
                        </li>
                        <li class="nav-item ms-lg-4 me-2 mt-3 mt-lg-0">
                            <router-link class="btn btn-outline-primary px-4 py-2 rounded-pill fw-bold" to="/login">Login</router-link>
                        </li>
                        <li class="nav-item mt-2 mt-lg-0">
                            <router-link class="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow-primary-sm btn-glow" to="/signup">Register Now</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `
};
