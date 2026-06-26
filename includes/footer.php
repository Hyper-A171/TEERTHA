<?php
// Footer include file
?>
    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="row g-5">
                <!-- Brand Column -->
                <div class="col-lg-4 col-md-6">
                    <div class="footer-brand">
                        <a href="index.php" class="footer-logo">
                            <span class="brand-text">TEE<span class="brand-highlight">ऋ</span>THA</span>
                        </a>
                        <p class="footer-tagline">Preserving India's spiritual heritage through immersive storytelling and technology.</p>
                        <div class="footer-social">
                            <a href="#" class="social-link" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
                            <a href="#" class="social-link" aria-label="YouTube"><i class="bi bi-youtube"></i></a>
                            <a href="#" class="social-link" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
                            <a href="#" class="social-link" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
                        </div>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="col-lg-2 col-md-6">
                    <h5 class="footer-heading">Explore</h5>
                    <ul class="footer-links">
                        <li><a href="index.php">Home</a></li>
                        <li><a href="about.php">About</a></li>
                        <li><a href="experience.php">Experience</a></li>
                        <li><a href="technology.php">Technology</a></li>
                        <li><a href="how-it-works.php">How It Works</a></li>
                        <li><a href="partner.php">Partner</a></li>
                        <li><a href="contact.php">Contact</a></li>
                    </ul>
                </div>

                <!-- Experiences -->
                <div class="col-lg-2 col-md-6">
                    <h5 class="footer-heading">Experiences</h5>
                    <ul class="footer-links">
                        <li><a href="#">360° Temple Tours</a></li>
                        <li><a href="#">VR Experiences</a></li>
                        <li><a href="#">Sacred Stories</a></li>
                        <li><a href="#">Aarti & Rituals</a></li>
                        <li><a href="#">Architecture</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div class="col-lg-4 col-md-6">
                    <h5 class="footer-heading">Connect</h5>
                    <div class="footer-contact">
                        <div class="contact-item">
                            <i class="bi bi-envelope"></i>
                            <span>hello@teertha.in</span>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-telephone"></i>
                            <span>+91 98765 43210</span>
                        </div>
                        <div class="contact-item">
                            <i class="bi bi-geo-alt"></i>
                            <span>Mumbai, Maharashtra, India</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <p class="copyright">&copy; <?php echo date('Y'); ?> TEERTHA by Atreal Studios. All rights reserved.</p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <div class="footer-legal">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top -->
    <a href="#" class="back-to-top" id="backToTop" aria-label="Back to top">
        <i class="bi bi-arrow-up"></i>
    </a>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Lenis (Smooth Scroll) -->
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>

    <?php if (isset($current_page) && $current_page == 'index'): ?>
    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
    
    <!-- Three.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    
    <!-- Cinematic Experience JS -->
    <script src="assets/js/cinematic.js"></script>
    <?php endif; ?>

    <!-- Custom JS -->
    <script src="assets/js/main.js"></script>
</body>
</html>
