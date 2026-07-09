<?php
declare(strict_types=1);

$pageTitle = 'Partners';
$pageDescription = 'Partner with TEERTHA to document, preserve, and responsibly share a temple or sacred heritage site through immersive technology.';
$activePage = 'partner';

require __DIR__ . '/includes/page-header.php';
?>

<main id="main-content">
    <section class="page-hero page-hero--sunset">
        <div class="page-hero__texture" aria-hidden="true"></div>
        <div class="page-hero__content">
            <div class="eyebrow">For Temple Trusts &amp; Cultural Partners</div>
            <h1>Preserve the Story. Extend the Legacy.</h1>
            <p>Build a responsible digital record of your sacred place and make its heritage accessible without losing its context, dignity, or voice.</p>
            <div class="hero-actions">
                <a class="button button--primary" href="#partner-inquiry">Start a Conversation</a>
                <a class="button button--light" href="#partnership-model">How Partnership Works</a>
            </div>
        </div>
    </section>

    <section class="section section--white">
        <div class="container">
            <div class="section-heading section-heading--center">
                <div class="section-kicker">Why Partner With TEERTHA</div>
                <h2>Technology in Service of Heritage.</h2>
                <p>Our role is to support custodianship—not replace it. Every project is guided by the people who understand and protect the sacred place.</p>
            </div>

            <div class="card-grid">
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">archive</span></div>
                    <h3>Digital Preservation</h3>
                    <p>Create a structured record of architecture, stories, rituals, sound, and community memory.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">public</span></div>
                    <h3>Responsible Reach</h3>
                    <p>Help devotees, learners, and diaspora communities connect across distance with context.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">school</span></div>
                    <h3>Educational Value</h3>
                    <p>Give future generations an engaging way to learn the history and significance of the place.</p>
                </article>
                <article class="info-card">
                    <div class="info-card__icon"><span class="material-symbols-outlined" aria-hidden="true">verified_user</span></div>
                    <h3>Cultural Stewardship</h3>
                    <p>Define what is documented, how it is presented, and where cultural boundaries must remain.</p>
                </article>
            </div>
        </div>
    </section>

    <section class="section section--soft" id="partnership-model">
        <div class="container split-layout split-layout--reverse">
            <div class="split-media">
                <img src="assets/images/temple-prayer-interior.jpg" alt="A quiet moment of devotion inside an intricately carved temple">
            </div>
            <div class="split-copy">
                <div class="section-kicker">Partnership Model</div>
                <h2>Built on Trust, Clarity, and Consent.</h2>
                <p>We define the project together, with clear review points from research through final release.</p>
                <ul class="check-list">
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">forum</span>
                        <span><strong>Shared intent</strong><span>Agree on goals, audiences, access, and cultural considerations.</span></span>
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">fact_check</span>
                        <span><strong>Verified narrative</strong><span>Review stories and interpretation with authorised stakeholders.</span></span>
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">visibility</span>
                        <span><strong>Transparent review</strong><span>See and approve the experience at defined production milestones.</span></span>
                    </li>
                    <li>
                        <span class="material-symbols-outlined" aria-hidden="true">handshake</span>
                        <span><strong>Long-term relationship</strong><span>Plan preservation, access, and future updates beyond launch.</span></span>
                    </li>
                </ul>
            </div>
        </div>
    </section>

    <section class="section section--white" id="partner-inquiry">
        <div class="container contact-grid">
            <div>
                <div class="section-heading">
                    <div class="section-kicker">Begin a Partnership</div>
                    <h2>Tell Us About the Heritage You Protect.</h2>
                    <p>Share the place, organisation, or cultural initiative you represent. The form opens your email application with the details addressed to our partnerships team.</p>
                </div>
                <div class="contact-stack">
                    <div class="contact-card">
                        <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                        <div><strong>Partnerships</strong><a href="mailto:partner@teertha.com">partner@teertha.com</a></div>
                    </div>
                    <div class="contact-card">
                        <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
                        <div><strong>Studio</strong><span>Mumbai, Maharashtra, India</span></div>
                    </div>
                </div>
            </div>

            <div class="form-panel">
                <h2>Partnership Inquiry</h2>
                <p>Provide a short overview and we can begin with the right context.</p>
                <form class="form-grid" action="mailto:partner@teertha.com" method="post" enctype="text/plain">
                    <div class="form-field">
                        <label for="partner-name">Your name</label>
                        <input id="partner-name" name="Name" type="text" autocomplete="name" required>
                    </div>
                    <div class="form-field">
                        <label for="partner-email">Email address</label>
                        <input id="partner-email" name="Email" type="email" autocomplete="email" required>
                    </div>
                    <div class="form-field">
                        <label for="organisation">Organisation</label>
                        <input id="organisation" name="Organisation" type="text" autocomplete="organization" required>
                    </div>
                    <div class="form-field">
                        <label for="partner-role">Your role</label>
                        <input id="partner-role" name="Role" type="text" autocomplete="organization-title">
                    </div>
                    <div class="form-field form-field--full">
                        <label for="partner-interest">Partnership interest</label>
                        <select id="partner-interest" name="Interest" required>
                            <option value="">Select an area</option>
                            <option>Temple documentation</option>
                            <option>Virtual experience</option>
                            <option>Digital heritage archive</option>
                            <option>Research or cultural collaboration</option>
                            <option>Technology partnership</option>
                        </select>
                    </div>
                    <div class="form-field form-field--full">
                        <label for="partner-message">Tell us about the project</label>
                        <textarea id="partner-message" name="Project overview" required></textarea>
                    </div>
                    <div class="form-field form-field--full">
                        <button class="button button--primary" type="submit">Open Partnership Email</button>
                    </div>
                </form>
                <p class="form-note">Submitting opens your default email application; no information is stored on this website.</p>
            </div>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/page-footer.php'; ?>
