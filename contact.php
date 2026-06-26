<?php
$page_title = 'Contact';
include 'includes/header.php';
?>

<!-- ============================================
     CONTACT HERO
     ============================================ -->
<section class="hero" style="min-height: 60vh;">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="container">
        <div class="hero-content" style="padding-top: 80px;">
            <span class="hero-label">Get In Touch</span>
            <h1 class="hero-title">Contact<br><span class="italic">Teertha</span></h1>
            <p class="hero-subtitle">We'd love to hear from you. Reach out for partnerships, inquiries, or just to say hello.</p>
        </div>
    </div>
</section>

<!-- ============================================
     CONTACT INFO & FORM
     ============================================ -->
<section class="section" id="contact">
    <div class="container">
        <div class="row g-5">
            <!-- Contact Info -->
            <div class="col-lg-5 fade-in-left">
                <span class="section-label">Connect</span>
                <h2 class="section-title">Let's Start a<br><span class="italic">Conversation</span></h2>
                <p class="section-subtitle">
                    Whether you're a temple trust looking to partner, a devotee with feedback, or simply curious about our work—we're here to connect.
                </p>

                <div class="mt-4">
                    <div class="d-flex align-items-start gap-4 mb-4">
                        <div class="flex-shrink-0" style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="bi bi-envelope text-white"></i>
                        </div>
                        <div>
                            <h5 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.25rem;">Email</h5>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">hello@teertha.in</p>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">partnerships@teertha.in</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-4 mb-4">
                        <div class="flex-shrink-0" style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="bi bi-telephone text-white"></i>
                        </div>
                        <div>
                            <h5 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.25rem;">Phone</h5>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">+91 98765 43210</p>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">+91 98765 43211</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-4 mb-4">
                        <div class="flex-shrink-0" style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="bi bi-geo-alt text-white"></i>
                        </div>
                        <div>
                            <h5 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.25rem;">Address</h5>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">Atreal Studios</p>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">Mumbai, Maharashtra</p>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">India - 400001</p>
                        </div>
                    </div>

                    <div class="d-flex align-items-start gap-4">
                        <div class="flex-shrink-0" style="width: 50px; height: 50px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                            <i class="bi bi-clock text-white"></i>
                        </div>
                        <div>
                            <h5 style="font-family: var(--font-heading); font-size: 1rem; margin-bottom: 0.25rem;">Working Hours</h5>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p class="mb-0" style="color: var(--text-medium); font-size: 0.95rem;">Saturday: 10:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="col-lg-7 fade-in-right delay-2">
                <div class="card-premium">
                    <h3 class="card-title mb-4" style="font-family: var(--font-heading);">Send Us a Message</h3>
                    <form>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">First Name *</label>
                                <input type="text" class="form-control" placeholder="Your first name" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Last Name *</label>
                                <input type="text" class="form-control" placeholder="Your last name" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Email Address *</label>
                                <input type="email" class="form-control" placeholder="your@email.com" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" class="form-control" placeholder="+91 98765 43210">
                            </div>
                            <div class="col-12">
                                <label class="form-label">Subject *</label>
                                <select class="form-control" required>
                                    <option value="">Select a subject</option>
                                    <option value="partnership">Temple Partnership</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="feedback">Feedback</option>
                                    <option value="media">Media & Press</option>
                                    <option value="careers">Careers</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="col-12">
                                <label class="form-label">Message *</label>
                                <textarea class="form-control" rows="5" placeholder="Tell us how we can help you..." required></textarea>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary w-100">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================
     MAP PLACEHOLDER
     ============================================ -->
<section class="section bg-cream" id="map">
    <div class="container">
        <div class="text-center mb-4 fade-in-up">
            <span class="section-label">Find Us</span>
            <h2 class="section-title">Our Location</h2>
        </div>
        <div class="fade-in-up delay-1">
            <div class="map-placeholder">
                <i class="bi bi-geo-alt"></i>
                <span>Google Maps Integration Placeholder</span>
            </div>
        </div>
    </div>
</section>

<!-- ============================================
     FAQ SECTION
     ============================================ -->
<section class="section" id="faq">
    <div class="container">
        <div class="text-center mb-5 fade-in-up">
            <span class="section-label">FAQ</span>
            <h2 class="section-title">Frequently Asked<br><span class="italic">Questions</span></h2>
        </div>

        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="accordion" id="faqAccordion">
                    <div class="accordion-item fade-in-up">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                What is Teertha?
                            </button>
                        </h2>
                        <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                Teertha is a Digital Spiritual Heritage Platform by Atreal Studios. We preserve the history, legends, rituals, and architecture of India's temples through immersive 360° video, VR experiences, spatial audio, and interactive storytelling.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-1">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                How can I experience a temple on Teertha?
                            </button>
                        </h2>
                        <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                You can experience temples through our website using any device. For the most immersive experience, use a VR headset with our VR-compatible content. We also offer 360° video tours that work on desktop, mobile, and tablet devices.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-2">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                How can my temple partner with Teertha?
                            </button>
                        </h2>
                        <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                Temple trusts can partner with us by filling out the inquiry form on our Partner page. Our team will reach out to discuss your requirements, understand your temple's unique story, and create a customized documentation plan that respects all sacred protocols.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-3">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                Is Teertha free to use?
                            </button>
                        </h2>
                        <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                Teertha offers both free and premium experiences. Basic temple tours and information are available to all users at no cost. Premium experiences, including full VR journeys and exclusive content, may require a subscription or one-time purchase.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-4">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                What technology do you use?
                            </button>
                        </h2>
                        <div id="faq5" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                We use a combination of 360° cinematography, drone filming, virtual reality, spatial audio, and interactive storytelling technologies. All content is captured in high resolution (up to 8K) with professional-grade equipment operated by trained technicians.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-5">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq6">
                                Do you respect temple protocols during filming?
                            </button>
                        </h2>
                        <div id="faq6" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                Absolutely. Cultural sensitivity and respect for sacred traditions are at the core of everything we do. We work closely with temple authorities, follow all protocols, and never film in restricted areas without explicit permission. Our team is trained to be unobtrusive and respectful at all times.
                            </div>
                        </div>
                    </div>

                    <div class="accordion-item fade-in-up delay-6">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">
                                Can I contribute stories or information about a temple?
                            </button>
                        </h2>
                        <div id="faq7" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                Yes! We welcome contributions from devotees, historians, and community members. If you have stories, photographs, or historical information about a temple, please contact us through the form above. All contributions are verified before inclusion.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ============================================
     CTA SECTION
     ============================================ -->
<section class="cta-section" id="contact-cta">
    <div class="container">
        <div class="fade-in-up">
            <h2 class="cta-title">Ready to Preserve<br>Your Heritage?</h2>
            <p class="cta-subtitle">Partner with Teertha and bring your temple's story to the world.</p>
            <a href="partner.php" class="btn btn-primary btn-lg">Partner With Us</a>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
