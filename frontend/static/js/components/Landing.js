import Navbar from './Navbar.js';
import HeroSection from './HeroSection.js';
import GlobalReachMap from './GlobalReachMap.js';
import StatisticsBanner from './StatisticsBanner.js';
import FeaturesSection from './FeaturesSection.js';
import TopCompanies from './TopCompanies.js';
import CtaSection from './CtaSection.js';
import Footer from './Footer.js';

export default {
    components: {
        Navbar,
        HeroSection,
        GlobalReachMap,
        StatisticsBanner,
        FeaturesSection,
        TopCompanies,
        CtaSection,
        Footer
    },
    template: `
        <div class="d-flex flex-column min-vh-100 bg-white">
            <Navbar />
            <HeroSection />
            <GlobalReachMap />
            <StatisticsBanner />
            <FeaturesSection />
            <TopCompanies />
            <CtaSection />
            <Footer />
        </div>
    `
};
