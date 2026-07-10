<?php
declare(strict_types=1);

$pageTitle = 'Experience';
$pageDescription = "Enter India's sacred spaces through immersive heritage storytelling, spatial sound, and respectful digital preservation.";
$activePage = 'experience';

require __DIR__ . '/includes/page-header.php';
?>

<main id="main-content">
    <section class="page-hero page-hero--entrance">
        <div class="page-hero__texture" aria-hidden="true"></div>
        <div class="page-hero__content">
            <div class="eyebrow">Immersive Sacred Heritage</div>
            <h1>Enter the Story Behind Every Temple.</h1>
            <p>Walk through architecture, ritual, legend, and living memory in experiences created with cultural care and cinematic depth.</p>
            <div class="hero-actions">
                <a class="button button--primary" href="#experience-formats">Explore Experiences</a>
                <a class="button button--light" href="timeline.php">See the Journey</a>
            </div>
        </div>
    </section>

    <section class="section section--white">
        <div class="container split-layout">
            <div class="split-media">
                <img src="assets/images/temple-prayer-interior.jpg" alt="A devotee seated in a historic temple as sunlight enters the sanctum">
            </div>
            <div class="split-copy">
                <div class="section-kicker">Presence With Purpose</div>
                <h2>More Than a Virtual Visit.</h2>
                <p>TEERTHA brings together verified stories, temple traditions, and immersive media so every digital visit carries meaning—not just spectacle.</p>
                <ul class="check-list">
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">temple_hindu</span>
                        <span><strong>Sacred context</strong><span>Understand the legends, architecture, and customs that shape each place.</span></span>
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">spatial_audio_off</span>
                        <span><strong>Authentic atmosphere</strong><span>Hear bells, chants, footsteps, and silence through spatial sound.</span></span>
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">verified_user</span>
                        <span><strong>Respectful documentation</strong><span>Every experience is shaped with sensitivity to the temple and its custodians.</span></span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="section section--soft" id="experience-formats">
        <div class="container">
            <div class="section-heading section-heading--center">
                <div class="section-kicker">Ways to Enter</div>
                <h2>Heritage, Made Experiential.</h2>
                <p>Each format serves the story of the temple and gives visitors a deeper way to see, hear, and understand it.</p>
            </div>

            <div class="card-grid">
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">architecture</span></div>
                    <h3>Heritage Documentation</h3>
                    <p>Look around sacred courtyards, carved corridors, and ritual spaces with cinematic clarity.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">public</span></div>
                    <h3>Digital Presence</h3>
                    <p>Experience scale, distance, and spatial detail through high-resolution mapping and digital environments.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">surround_sound</span></div>
                    <h3>Spatial Sound</h3>
                    <p>Listen to the living soundscape of the shrine as it moves naturally around you.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">auto_stories</span></div>
                    <h3>Living Stories</h3>
                    <p>Follow local legends, oral histories, and ritual meaning through carefully structured narratives.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="section section--dark">
        <div class="container">
            <article class="feature-panel feature-panel--sunset">
                <div class="feature-panel__content">
                    <div class="section-kicker">A Sacred Digital Journey</div>
                    <h2>From Distant View to Deeper Connection.</h2>
                    <p>Begin with the temple's visible beauty, then move through the history, craft, ritual, and human memory that give it enduring meaning.</p>
                    <div class="metric-row" aria-label="Experience qualities">
                        <div class="metric"><strong>Research-led</strong><span>Verified cultural context</span></div>
                        <div class="metric"><strong>Immersive</strong><span>Visual and spatial presence</span></div>
                        <div class="metric"><strong>Accessible</strong><span>Designed for global reach</span></div>
                    </div>
                    <div class="hero-actions">
                        <a class="button button--primary" href="contact.php">Request Access</a>
                        <a class="button button--light" href="partner.php">Create an Experience</a>
                    </div>
                </div>
            </article>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/page-footer.php'; ?>
