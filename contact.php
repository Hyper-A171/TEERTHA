<?php
declare(strict_types=1);

$pageTitle = 'Contact';
$pageDescription = 'Contact TEERTHA about immersive temple experiences, cultural partnerships, research, media, or general enquiries.';
$activePage = 'contact';

require __DIR__ . '/includes/page-header.php';
?>

<main id="main-content">
    <section class="page-hero page-hero--glow">
        <div class="page-hero__texture" aria-hidden="true"></div>
        <div class="page-hero__content">
            <div class="eyebrow">Connect With TEERTHA</div>
            <h1>Every Meaningful Journey Begins With a Conversation.</h1>
            <p>Speak with us about a temple, an immersive experience, heritage research, or a collaboration that deserves thoughtful attention.</p>
            <div class="hero-actions">
                <a class="button button--primary" href="#contact-form">Send an Inquiry</a>
                <a class="button button--light" href="mailto:info@atreral.in">Email Directly</a>
            </div>
        </div>
    </section>

    <section class="section section--soft" id="contact-form">
        <div class="container contact-grid">
            <div>
                <div class="section-heading">
                    <div class="section-kicker">Contact</div>
                    <h2>Find the Right Starting Point.</h2>
                    <p>Choose the relevant address or use the inquiry form. We welcome clear context about the place, project, or experience you have in mind.</p>
                </div>

                <div class="contact-stack">
                    <div class="contact-card">
                        <span class="material-symbols-outlined" aria-hidden="true">mail</span>
                        <div><strong>General Inquiries</strong><a href="mailto:info@atreral.in">info@atreral.in</a></div>
                    </div>
                 
                    <div class="contact-card">
                        <span class="material-symbols-outlined" aria-hidden="true">phone</span>
                        <div><strong>Phone</strong><span>+91 70306 03067</span></div>
                    </div>
                    <div class="contact-card">
                        <span class="material-symbols-outlined" aria-hidden="true">location_on</span>
                        <div><strong>Studio</strong><span>Virar, Maharashtra, India</span></div>
                    </div>
                </div>
            </div>

            <div class="form-panel">
                <h2>Send an Inquiry</h2>
                <p>Complete the form below to send us a direct message.</p>
                <form class="form-grid" action="send-email.php" method="post">
                    <div class="form-field">
                        <label for="contact-name">Your name</label>
                        <input id="contact-name" name="Name" type="text" autocomplete="name" required>
                    </div>
                    <div class="form-field">
                        <label for="contact-email">Email address</label>
                        <input id="contact-email" name="Email" type="email" autocomplete="email" required>
                    </div>
                    <div class="form-field form-field--full">
                        <label for="inquiry-type">Inquiry type</label>
                        <select id="inquiry-type" name="Inquiry_type" required>
                            <option value="">Select a topic</option>
                            <option>Experience access</option>
                            <option>Temple or cultural partnership</option>
                            <option>Research collaboration</option>
                            <option>Media inquiry</option>
                            <option>General question</option>
                        </select>
                    </div>
                    <div class="form-field form-field--full">
                        <label for="contact-subject">Subject</label>
                        <input id="contact-subject" name="Subject" type="text" autocomplete="off" required>
                    </div>
                    <div class="form-field form-field--full">
                        <label for="contact-message">Message</label>
                        <textarea id="contact-message" name="Message" required></textarea>
                    </div>
                    <div class="form-field form-field--full">
                        <button class="button button--primary" type="submit">Send Message</button>
                    </div>
                </form>
                <p class="form-note">Your message will be sent directly to our team. You can also write directly to info@atreral.in.</p>
            </div>
        </div>
    </section>

    <section class="section section--dark">
        <div class="container">
            <div class="section-heading section-heading--center">
                <div class="section-kicker">Before You Write</div>
                <h2>Useful Context Helps Us Respond Clearly.</h2>
                <p>For heritage projects, include the site or organisation, your role, the kind of documentation you need, and any important cultural or access considerations.</p>
            </div>
            <div class="hero-actions">
                <a class="button button--primary" href="partner">Partnership Details</a>
                <a class="button button--light" href="timeline">View Our Process</a>
            </div>
        </div>
    </section>
</main>

<?php require __DIR__ . '/includes/page-footer.php'; ?>
