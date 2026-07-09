<?php
declare(strict_types=1);

$pageTitle = 'Timeline';
$pageDescription = 'Follow the TEERTHA process from cultural research and temple collaboration to immersive capture, storytelling, and long-term preservation.';
$activePage = 'timeline';

require __DIR__ . '/includes/page-header.php';
?>

<main id="main-content">
    <section class="page-hero page-hero--corridor">
        <div class="page-hero__texture" aria-hidden="true"></div>
        <div class="page-hero__content">
            <div class="eyebrow">The TEERTHA Timeline</div>
            <h1>From Sacred Record to Living Archive.</h1>
            <p>Every project moves at the pace of trust: listening first, documenting responsibly, and building an experience that can endure.</p>
            <div class="hero-actions">
                <a class="button button--primary" href="#project-timeline">Follow the Process</a>
                <a class="button button--light" href="partner.php">Begin a Partnership</a>
            </div>
        </div>
    </section>

    <section class="section section--soft" id="project-timeline">
        <div class="container">
            <div class="section-heading section-heading--center">
                <div class="section-kicker">Five Phases</div>
                <h2>A Careful Path From Place to Presence.</h2>
                <p>The exact timeline adapts to each temple, but the principles remain constant: authenticity, consent, craft, and preservation.</p>
            </div>

            <div class="process-timeline">
                <article class="timeline-item">
                    <div class="timeline-item__marker">01</div>
                    <div class="timeline-item__phase">Discovery</div>
                    <h2>Listen &amp; Research</h2>
                    <p>We study the temple's history, legends, architecture, rituals, and present-day community before defining the experience.</p>
                </article>

                <article class="timeline-item">
                    <div class="timeline-item__marker">02</div>
                    <div class="timeline-item__phase">Alignment</div>
                    <h2>Work With Custodians</h2>
                    <p>Temple authorities and cultural stakeholders help establish access, boundaries, priorities, and the right narrative perspective.</p>
                </article>

                <article class="timeline-item">
                    <div class="timeline-item__marker">03</div>
                    <div class="timeline-item__phase">Documentation</div>
                    <h2>Capture the Temple</h2>
                    <p>360° cinematography, photography, spatial audio, drone imaging, and architectural recording preserve the visible and audible place.</p>
                </article>

                <article class="timeline-item">
                    <div class="timeline-item__marker">04</div>
                    <div class="timeline-item__phase">Creation</div>
                    <h2>Shape the Experience</h2>
                    <p>Research and captured media become a clear immersive journey through editing, interaction design, narration, sound, and spatial computing.</p>
                </article>

                <article class="timeline-item">
                    <div class="timeline-item__marker">05</div>
                    <div class="timeline-item__phase">Continuity</div>
                    <h2>Preserve &amp; Share</h2>
                    <p>The completed experience becomes part of a durable digital archive that can support education, access, and cultural continuity.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="section section--dark">
        <div class="container">
            <div class="section-heading section-heading--center">
                <div class="section-kicker">The Visitor Journey</div>
                <h2>Four Steps to a Deeper Connection.</h2>
                <p>TEERTHA helps visitors move beyond seeing a temple to understanding why it matters.</p>
            </div>

            <div class="step-grid">
                <article class="step-card">
                    <span class="material-symbols-outlined" aria-hidden="true">search</span>
                    <h3>Discover</h3>
                    <p>Meet the temple and the questions that open its story.</p>
                </article>
                <article class="step-card">
                    <span class="material-symbols-outlined" aria-hidden="true">vrpano</span>
                    <h3>Experience</h3>
                    <p>Enter a cinematic 360° journey from wherever you are.</p>
                </article>
                <article class="step-card">
                    <span class="material-symbols-outlined" aria-hidden="true">auto_stories</span>
                    <h3>Connect</h3>
                    <p>Understand the rituals, legends, and people behind the place.</p>
                </article>
                <article class="step-card">
                    <span class="material-symbols-outlined" aria-hidden="true">museum</span>
                    <h3>Preserve</h3>
                    <p>Carry sacred heritage forward through informed participation.</p>
                </article>
            </div>

            <div class="hero-actions">
                <a class="button button--primary" href="experience.php">Explore the Experience</a>
                <a class="button button--light" href="contact.php">Talk With Our Team</a>
            </div>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/page-footer.php'; ?>
