<?php
$page_title = "404 - Page Not Found | TEERTHA";
$page_description = "The page you are looking for does not exist.";
require_once 'includes/page-header.php';
?>

<main class="page-main">
    <section class="hero hero--default" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; text-align: center;">
        <div class="hero-inner fade-up">
            <h1 class="hero-title" style="font-size: clamp(4rem, 10vw, 8rem); color: var(--primary); margin-bottom: 1rem;">404</h1>
            <p class="hero-subtitle" style="font-size: 1.5rem; max-width: 600px; margin: 0 auto 2rem;">
                The path you are seeking remains hidden. 
                <br>Let's guide you back to familiar grounds.
            </p>
            <div class="hero-actions" style="justify-content: center; display: flex; gap: 1rem;">
                <a href="/" class="button button--primary">Return Home</a>
                <a href="contact" class="button button--outline">Contact Us</a>
            </div>
        </div>
    </section>
</main>

<?php require_once 'includes/page-footer.php'; ?>
