<?php
$page_title = 'Home';
$body_class = 'cinematic-mode';
include 'includes/header.php';
?>

<main id="cinematic-container" class="cinematic-stage" aria-label="TEERTHA cinematic spiritual journey">
    <canvas id="webgl-canvas" aria-hidden="true"></canvas>

    <div class="cinematic-video-layer" aria-hidden="true">
        <video class="cinematic-video" muted playsinline preload="auto">
            <source src="assets/videos/door-reveal.mp4" type="video/mp4">
        </video>
    </div>

    <div class="cinema-atmosphere" aria-hidden="true">
        <div class="light-wash"></div>
        <div class="god-rays"></div>
        <div class="ambient-fog fog-front"></div>
        <div class="ambient-fog fog-back"></div>
        <div class="lens-flare"></div>
        <div class="film-grain"></div>
        <div class="cinema-vignette"></div>
    </div>

    <nav class="journey-progress" aria-label="Cinematic journey progress">
        <span class="journey-progress-track" aria-hidden="true">
            <span class="journey-progress-fill"></span>
        </span>
        <button class="journey-marker is-active" type="button" data-cinematic-scene="0" aria-label="Invocation"></button>
        <button class="journey-marker" type="button" data-cinematic-scene="1" aria-label="Threshold"></button>
        <button class="journey-marker" type="button" data-cinematic-scene="2" aria-label="Memory"></button>
        <button class="journey-marker" type="button" data-cinematic-scene="3" aria-label="Craft"></button>
        <button class="journey-marker" type="button" data-cinematic-scene="4" aria-label="Continuity"></button>
        <button class="journey-marker" type="button" data-cinematic-scene="5" aria-label="Destination"></button>
    </nav>

    <div id="scenes-container">
        <section class="cinematic-scene scene-awakening is-active" data-scene-index="0" aria-labelledby="scene-awakening-title">
            <div class="scene-inner scene-centered">
                <div class="scene-copy" data-depth="0.16">
                    <span class="scene-label">Invocation</span>
                    <h1 class="scene-title" id="scene-awakening-title">TEERTHA</h1>
                    <p class="scene-subtitle">A sacred digital journey through India's living temples, preserved as immersive stories, spatial memory, and cinematic presence.</p>
                    <div class="scene-actions">
                        <a href="experience.php" class="btn btn-primary">
                            <i class="bi bi-play-circle"></i>
                            Begin Journey
                        </a>
                        <a href="#scene-threshold" class="btn btn-outline-light" data-cinematic-scene="1">
                            <i class="bi bi-door-open"></i>
                            Open Passage
                        </a>
                    </div>
                </div>
                <div class="scroll-pulse" aria-hidden="true">
                    <span></span>
                </div>
            </div>
        </section>

        <section class="cinematic-scene scene-threshold" id="scene-threshold" data-scene-index="1" aria-labelledby="scene-threshold-title">
            <div class="scene-inner scene-split">
                <div class="scene-copy" data-depth="0.2">
                    <span class="scene-label">The Threshold</span>
                    <h2 class="scene-title" id="scene-threshold-title">The Door Opens Into Memory.</h2>
                    <p class="scene-subtitle">Every shrine carries footsteps, chants, craft, legends, and silence. TEERTHA turns that inheritance into a calm cinematic archive that can be entered from anywhere.</p>
                    <a href="about.php" class="btn btn-primary">
                        <i class="bi bi-compass"></i>
                        Discover TEERTHA
                    </a>
                </div>
                <div class="scene-visual portal-visual" data-depth="0.36" aria-hidden="true">
                    <div class="temple-door">
                        <span class="door-panel panel-left"></span>
                        <span class="door-panel panel-right"></span>
                        <span class="door-light"></span>
                    </div>
                    <div class="portal-rings">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </section>

        <section class="cinematic-scene scene-memory" data-scene-index="2" aria-labelledby="scene-memory-title">
            <div class="scene-inner scene-centered wide">
                <div class="scene-copy" data-depth="0.18">
                    <span class="scene-label">The Archive</span>
                    <h2 class="scene-title" id="scene-memory-title">Legends Become Presence.</h2>
                    <p class="scene-subtitle">Oral histories, rituals, aarti, architecture, and pilgrim routes are documented with reverence, then shaped into immersive chapters that feel alive rather than stored away.</p>
                </div>
                <div class="ritual-constellation" data-depth="0.32" aria-hidden="true">
                    <article class="ritual-fragment">
                        <i class="bi bi-clock-history"></i>
                        <h3>Timeless Stories</h3>
                        <p>Centuries of legend and devotion carried into a digital future.</p>
                    </article>
                    <article class="ritual-fragment">
                        <i class="bi bi-building"></i>
                        <h3>Sacred Craft</h3>
                        <p>Temple forms, carvings, and spatial details captured with care.</p>
                    </article>
                    <article class="ritual-fragment">
                        <i class="bi bi-soundwave"></i>
                        <h3>Living Rituals</h3>
                        <p>Chants, bells, and atmospheres recorded as part of the place.</p>
                    </article>
                    <article class="ritual-fragment">
                        <i class="bi bi-globe-asia-australia"></i>
                        <h3>Open Access</h3>
                        <p>Devotees and learners can enter sacred heritage across distance.</p>
                    </article>
                </div>
            </div>
        </section>

        <section class="cinematic-scene scene-craft" data-scene-index="3" aria-labelledby="scene-craft-title">
            <div class="scene-inner scene-split reverse">
                <div class="scene-visual architecture-visual" data-depth="0.38" aria-hidden="true">
                    <span class="axis-line axis-vertical"></span>
                    <span class="axis-line axis-horizontal"></span>
                    <span class="mandala-ring ring-one"></span>
                    <span class="mandala-ring ring-two"></span>
                    <span class="mandala-ring ring-three"></span>
                    <span class="sanctum-core"></span>
                </div>
                <div class="scene-copy" data-depth="0.2">
                    <span class="scene-label">The Craft</span>
                    <h2 class="scene-title" id="scene-craft-title">Technology Moves Like Devotion.</h2>
                    <p class="scene-subtitle">360-degree cinematography, spatial audio, photogrammetry, VR, and interactive storytelling are used only where they deepen presence and protect the dignity of the shrine.</p>
                    <a href="technology.php" class="btn btn-outline-light">
                        <i class="bi bi-headset-vr"></i>
                        Explore Technology
                    </a>
                </div>
            </div>
        </section>

        <section class="cinematic-scene scene-keepers" data-scene-index="4" aria-labelledby="scene-keepers-title">
            <div class="scene-inner scene-centered">
                <div class="keeper-seal" data-depth="0.34" aria-hidden="true">
                    <span class="seal-ring"></span>
                    <span class="seal-flame"></span>
                </div>
                <div class="scene-copy" data-depth="0.18">
                    <span class="scene-label">The Keepers</span>
                    <h2 class="scene-title" id="scene-keepers-title">Trusts Preserve The Flame.</h2>
                    <p class="scene-subtitle">We collaborate with temple trusts to document heritage responsibly, align with local traditions, and create durable digital records for future generations.</p>
                    <div class="keeper-list" aria-label="Temple trust outcomes">
                        <span><i class="bi bi-check2"></i> Digital archives</span>
                        <span><i class="bi bi-check2"></i> Virtual tours</span>
                        <span><i class="bi bi-check2"></i> Global reach</span>
                    </div>
                    <a href="partner.php" class="btn btn-primary">
                        <i class="bi bi-handshake"></i>
                        Partner With Us
                    </a>
                </div>
            </div>
        </section>

        <section class="cinematic-scene scene-destination" data-scene-index="5" aria-labelledby="scene-destination-title">
            <div class="scene-inner scene-split">
                <div class="scene-copy" data-depth="0.22">
                    <span class="scene-label">Featured Experience</span>
                    <h2 class="scene-title" id="scene-destination-title">Maa Jeevdani Temple.</h2>
                    <p class="scene-subtitle">Walk toward the sacred cave, hear dawn bells rise through spatial sound, and experience the Pandava legend through a cinematic journey built for reverence.</p>
                    <div class="experience-tags" aria-label="Experience highlights">
                        <span><i class="bi bi-stars"></i> Pandava legend</span>
                        <span><i class="bi bi-geo-alt"></i> Sacred cave</span>
                        <span><i class="bi bi-music-note-beamed"></i> Aarti soundscape</span>
                    </div>
                    <a href="experience.php" class="btn btn-primary">
                        <i class="bi bi-arrow-right-circle"></i>
                        Enter Experience
                    </a>
                </div>
                <div class="scene-visual destination-visual" data-depth="0.4" aria-hidden="true">
                    <div class="experience-frame">
                        <div class="frame-horizon"></div>
                        <span class="cave-mouth"></span>
                        <span class="pilgrim-path"></span>
                        <span class="temple-glow"></span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</main>

<?php include 'includes/footer.php'; ?>
