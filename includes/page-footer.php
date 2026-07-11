    <footer class="site-footer">
        <div class="site-footer__inner">
            <div class="site-footer__brand">
                <a class="footer-brand" href="index.php">
                    <img src="assets/images/logo.png" alt="" aria-hidden="true">
                    <span>TEERTHA</span>
                </a>
                <p>Bridging centuries of sacred heritage with immersive technology, authentic research, and responsible storytelling.</p>
            </div>

            <div class="site-footer__links">
                <div>
                    <h2>Explore</h2>
                    <a href="experience.php">Experience</a>
                    <a href="timeline.php">Timeline</a>
                    <a href="partner.php">Partners</a>
                    <a href="contact.php">Contact</a>
                </div>
                <div> 
                    <h2>Connect</h2>
                    <a href="mailto:info@atreal.in">info@atreal.in</a>
                    <a href="mailto:partner@atreal.in">partner@atreal.in</a>
                    <span>+91 70306 03067</span>
                    <span>Virar, Maharashtra, India</span>
                </div>
            </div>
        </div>

        <div class="site-footer__bottom">
            <p>&copy; <?= date('Y') ?> TEERTHA by Atreal Studios. All rights reserved.</p>
            <a href="index.php">Return Home</a>
        </div>
    </footer>

    <script src="assets/js/theme-pages.js"></script>

    <?php if (isset($_GET['status'])): ?>
    <div id="toast-notification" class="toast-notification">
        <?php if ($_GET['status'] === 'success'): ?>
            Message sent successfully! We'll get back to you soon.
        <?php else: ?>
            Error! There was a problem sending your message.
        <?php endif; ?>
    </div>
    <style>
        .toast-notification {
            position: fixed;
            top: 24px;
            right: 24px;
            background-color: #111827; /* Dark gray almost black */
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 9999px; /* Pill shape */
            font-size: 14px;
            font-family: 'Geist', sans-serif;
            font-weight: 500;
            z-index: 99999;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            transform: translateX(150%);
            opacity: 0;
            animation: slideInToast 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards, fadeOutToast 0.5s ease-in 4s forwards;
        }
        @keyframes slideInToast {
            0% { transform: translateX(150%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOutToast {
            0% { transform: translateX(0); opacity: 1; }
            100% { transform: translateX(150%); opacity: 0; }
        }
    </style>
    <script>
        // Clean up the DOM after animation completes
        setTimeout(() => {
            const toast = document.getElementById('toast-notification');
            if (toast) {
                toast.remove();
            }
        }, 5000);
    </script>
    <?php endif; ?>
</body>
</html>
