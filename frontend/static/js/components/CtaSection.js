export default {
    template: `
        <!-- CTA Section -->
        <section class="py-5 cta-section position-relative overflow-hidden">
            <div class="bg-primary position-absolute top-0 start-0 w-100 h-100 z-0"></div>
            <div class="container py-5 position-relative z-1 text-center">
                <h2 class="display-5 fw-black text-white mb-4">Ready to accelerate your career?</h2>
                <p class="lead text-white-50 mb-5 max-w-700 mx-auto">Join thousands of students and recruiters already using CareerKite to make hiring simple, fast, and transparent.</p>
                <div class="d-flex justify-content-center gap-3">
                    <router-link to="/signup" class="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold text-primary shadow-lg hover-scale">Create Free Account</router-link>
                </div>
            </div>
        </section>
    `
};
