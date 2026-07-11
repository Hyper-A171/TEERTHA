<?php
declare(strict_types=1);

$pageTitle = $pageTitle ?? 'TEERTHA';
$pageDescription = $pageDescription ?? "Experience India's sacred heritage through immersive storytelling.";
$activePage = $activePage ?? '';

function pageNavClass(string $page, string $activePage): string
{
    return $page === $activePage ? 'site-nav__link is-active' : 'site-nav__link';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES, 'UTF-8') ?> | TEERTHA</title>
    <meta name="description" content="<?= htmlspecialchars($pageDescription, ENT_QUOTES, 'UTF-8') ?>">
    <meta name="theme-color" content="#a63b00">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Geist:wght@400;500;600;700&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/tailwind.css">
    <link rel="stylesheet" href="assets/css/loader.css">
    <link rel="stylesheet" href="assets/css/theme-pages.css">
    
    <style>
        /* Seamless Page Transition Overlay */
        .page-transition-overlay {
            position: fixed;
            inset: 0;
            z-index: 999999;
            background-color: #17110e; /* Dark elegant background */
            opacity: 1;
            pointer-events: none;
            transition: opacity 0.5s ease-in-out;
        }
        body.page-loaded .page-transition-overlay {
            opacity: 0;
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Add the overlay element
            const overlay = document.createElement('div');
            overlay.className = 'page-transition-overlay';
            document.body.appendChild(overlay);

            // Trigger the fade out of the overlay
            requestAnimationFrame(() => {
                document.body.classList.add("page-loaded");
            });
        });

        // Handle back/forward cache (BFCache)
        window.addEventListener("pageshow", function(event) {
            if (event.persisted) {
                document.body.classList.add("page-loaded");
            }
        });

        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.target && link.host === window.location.host && !link.hash) {
                e.preventDefault();
                document.body.classList.remove('page-loaded');
                setTimeout(() => {
                    window.location.href = link.href;
                }, 400); 
            }
        });
    </script>
</head>
<body class="theme-page">
    <a class="skip-link" href="#main-content">Skip to content</a>

    <header class="site-header" id="site-header">
        <div class="site-header__inner">
            <a class="site-brand" href="index" aria-label="TEERTHA home">
                <img src="assets/images/logo.png" alt="" aria-hidden="true">
                <span>TEERTHA</span>
            </a>

            <nav class="site-nav" aria-label="Primary navigation">
                <a class="<?= pageNavClass('home', $activePage) ?>" href="index" <?= $activePage === 'home' ? 'aria-current="page"' : '' ?>>Home</a>
                <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience" <?= $activePage === 'experience' ? 'aria-current="page"' : '' ?>>Experience</a>
                <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline" <?= $activePage === 'timeline' ? 'aria-current="page"' : '' ?>>Timeline</a>
                <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner" <?= $activePage === 'partner' ? 'aria-current="page"' : '' ?>>Partners</a>
                <a class="<?= pageNavClass('blog', $activePage) ?>" href="blog" <?= $activePage === 'blog' ? 'aria-current="page"' : '' ?>>Blog</a>
                <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact" <?= $activePage === 'contact' ? 'aria-current="page"' : '' ?>>Contact</a>
            </nav>

            <a class="button button--primary site-header__cta" href="partner">Partner With Us</a>

            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden>
            <a class="<?= pageNavClass('home', $activePage) ?>" href="index">Home</a>
            <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience">Experience</a>
            <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline">Timeline</a>
            <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner">Partners</a>
            <a class="<?= pageNavClass('blog', $activePage) ?>" href="blog">Blog</a>
            <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact">Contact</a>
            <a class="button button--primary" href="partner">Partner With Us</a>
        </nav>
    </header>
