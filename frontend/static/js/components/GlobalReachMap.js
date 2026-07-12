export default {
    template: `
        <!-- Global Reach Interactive Map Section -->
        <section class="py-5 bg-white border-bottom border-light">
            <div class="container py-5">
                <div class="row align-items-center mb-5">
                    <div class="col-lg-6 text-center text-lg-start">
                        <span class="text-primary fw-bold tracking-wide text-uppercase mb-2 d-block">Global Reach</span>
                        <h2 class="display-5 fw-black text-dark mb-3">Explore Opportunities Everywhere</h2>
                        <p class="text-secondary lead mb-0">
                            Click on <strong>India</strong> on the world map to zoom into specific states and explore local placement statistics.
                        </p>
                    </div>
                    <div class="col-lg-6 text-center text-lg-end mt-4 mt-lg-0">
                        <button v-if="mapLevel !== 'world'" @click="drawWorldMap" class="btn btn-outline-primary rounded-pill px-4 fw-bold shadow-sm">
                            <i class="bi bi-globe-americas me-2"></i>Back to World View
                        </button>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-12">
                        <!-- Map Container -->
                        <div class="map-wrapper bg-light rounded-4 p-4 shadow-sm position-relative overflow-hidden" style="height: 500px;">
                            <div v-if="loadingMap" class="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center z-3 bg-light">
                                <div class="spinner-border text-primary mb-3" role="status"></div>
                                <span class="text-muted fw-bold">Loading Interactive Map...</span>
                            </div>
                            <div id="regions_div" style="width: 100%; height: 100%;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            mapLevel: 'world',
            loadingMap: true,
            chart: null
        }
    },
    mounted() {
        if (window.google) {
            google.charts.load('current', {
                'packages':['geochart']
            });
            google.charts.setOnLoadCallback(this.initMap);
        }
    },
    methods: {
        initMap() {
            this.chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
            
            google.visualization.events.addListener(this.chart, 'select', () => {
                const selection = this.chart.getSelection();
                if (selection.length > 0 && this.mapLevel === 'world') {
                    if (selection[0].row === 1) {
                        this.drawIndiaMap();
                    }
                }
            });
            
            this.drawWorldMap();
            
            window.addEventListener('resize', () => {
                if (this.mapLevel === 'world') {
                    this.drawWorldMap();
                } else {
                    this.drawIndiaMap();
                }
            });
        },
        drawWorldMap() {
            this.loadingMap = false;
            this.mapLevel = 'world';
            const data = google.visualization.arrayToDataTable([
                ['Country', 'Active Opportunities', 'Partner Institutes'],
                ['United States', 2400, 45],
                ['India', 12500, 420],
                ['United Kingdom', 800, 12]
            ]);

            const options = {
                colorAxis: {colors: ['#fdba74', '#ea580c', '#c2410c']},
                backgroundColor: 'transparent',
                datalessRegionColor: '#e2e8f0',
                defaultColor: '#e2e8f0',
                tooltip: {textStyle: {fontName: 'Inter', fontSize: 14}},
                legend: 'none'
            };

            this.chart.draw(data, options);
        },
        drawIndiaMap() {
            this.mapLevel = 'india';
            const data = google.visualization.arrayToDataTable([
                ['State', 'Active Jobs'],
                ['IN-KA', 4500],
                ['IN-MH', 3200],
                ['IN-TS', 2100],
                ['IN-DL', 1800],
                ['IN-TN', 1500]
            ]);

            const options = {
                region: 'IN',
                displayMode: 'regions',
                resolution: 'provinces',
                colorAxis: {colors: ['#fdba74', '#ea580c']},
                backgroundColor: 'transparent',
                datalessRegionColor: '#e2e8f0',
                tooltip: {textStyle: {fontName: 'Inter', fontSize: 14}},
                legend: 'none'
            };

            this.chart.draw(data, options);
        }
    }
};
