<!DOCTYPE html>
<html class="light" lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <title>TEERTHA — Experience India's Sacred Heritage</title>
    <meta name="description"
        content="Discover India's sacred temples through immersive digital preservation, architectural recording, and authentic storytelling. Teertha by Atreal Studios preserves spiritual heritage for generations.">
    <meta name="theme-color" content="#a63b00">
    <link rel="stylesheet" href="assets/css/tailwind.css">
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&amp;family=Geist:wght@100..900&amp;family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
        rel="stylesheet" />
    <script>document.documentElement.classList.add('motion-ready');</script>
    <style>
        :root {
            --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
            --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Hide scrollbar for Chrome, Safari, and Opera */
        ::-webkit-scrollbar {
            display: none;
        }

        /* Hide scrollbar for IE, Edge, and Firefox */
        html {
            -ms-overflow-style: none;
            /* IE and Edge */
            scrollbar-width: none;
            /* Firefox */
        }

        @font-face {
            font-family: 'Geist';
            src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
        }

        @font-face {
            font-family: 'Geist';
            src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-600-normal.woff2') format('woff2');
            font-weight: 600;
            font-style: normal;
        }

        @font-face {
            font-family: 'Geist';
            src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-700-normal.woff2') format('woff2');
            font-weight: 700;
            font-style: normal;
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.04);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.58);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border: 1px solid rgba(255, 255, 255, 0.72);
            box-shadow: 0 12px 36px rgba(83, 25, 0, 0.1);
            border-radius: 1.5rem;
            transition: transform 0.45s var(--ease-out-expo), background-color 0.45s ease,
                border-color 0.45s ease, box-shadow 0.45s var(--ease-out-expo);
        }

        .glass-card:hover {
            transform: translateY(-6px);
            background: rgba(255, 255, 255, 0.72);
            border-color: rgba(212, 175, 55, 0.42);
            box-shadow: 0 20px 44px rgba(83, 25, 0, 0.14);
        }

        #technology-section .technology-card {
            width: 100%;
            max-width: 64rem;
            min-height: 24.25rem;
        }

        #technology-section .technology-feature-card {
            min-height: 6rem;
        }

        #purpose-section .purpose-eyebrow {
            font-size: 0.6875rem;
            line-height: 1;
        }

        #purpose-section .purpose-heading {
            font-size: clamp(2rem, 8.5vw, 2.5rem);
            line-height: 1.08;
            letter-spacing: -0.035em;
            font-weight: 700;
        }

        #purpose-section .purpose-lead {
            font-size: 1rem;
            line-height: 1.6;
        }

        #purpose-section .purpose-copy {
            font-size: 0.9375rem;
            line-height: 1.65;
        }

        #purpose-section .purpose-card-title {
            font-size: 0.75rem;
            line-height: 1.2;
        }

        #purpose-section .purpose-card-copy {
            font-size: 0.875rem;
            line-height: 1.6;
        }

        @media (min-width: 1024px) {
            #purpose-section .purpose-eyebrow {
                font-size: 0.75rem;
            }

            #purpose-section .purpose-heading {
                font-size: clamp(3rem, 4vw, 3.5rem);
                line-height: 1.05;
            }

            #purpose-section .purpose-lead {
                font-size: 1.125rem;
            }

            #purpose-section .purpose-copy {
                font-size: 1rem;
            }

            #purpose-section .purpose-card-title {
                font-size: 0.8125rem;
            }

            #purpose-section .purpose-card-copy {
                font-size: 0.9375rem;
            }
        }

        .btn-primary {
            background: linear-gradient(135deg, #a63b00 0%, #ff5e00 100%);
            color: #ffffff;
            transition: transform 0.3s var(--ease-out-expo), box-shadow 0.3s ease;
        }

        .btn-primary:hover {
            box-shadow: 0 0 20px rgba(255, 94, 0, 0.4);
        }

        .btn-secondary {
            background: transparent;
            border: 1px solid rgba(31, 41, 55, 0.1);
            color: #555f6f;
            transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
        }

        .btn-secondary:hover {
            background: rgba(255, 94, 0, 0.05);
            border-color: #ff5e00;
            color: #a63b00;
        }



        #hero-content {
            transition-duration: 1s;
        }

        .motion-ready #hero-content>* {
            opacity: 0;
            transform: translate3d(0, 18px, 0);
            transition: opacity 0.7s var(--ease-smooth), transform 0.9s var(--ease-out-expo);
        }

        .motion-ready #hero-content.visible>* {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        #hero-content.visible> :nth-child(1) {
            transition-delay: 0.08s;
        }

        #hero-content.visible> :nth-child(2) {
            transition-delay: 0.16s;
        }

        #hero-content.visible> :nth-child(3) {
            transition-delay: 0.24s;
        }

        #hero-content.visible> :nth-child(4) {
            transition-delay: 0.32s;
        }

        #hero-content.visible> :nth-child(5) {
            transition-delay: 0.4s;
        }

        .floating {
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0% {
                transform: translateY(0px);
            }

            50% {
                transform: translateY(-20px);
            }

            100% {
                transform: translateY(0px);
            }
        }

        .spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid #ffffff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        .pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {

            0%,
            100% {
                opacity: 1;
            }

            50% {
                opacity: 0.5;
            }
        }

        .loading-shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
            0% {
                background-position: 200% 0;
            }

            100% {
                background-position: -200% 0;
            }
        }

        .btn-loading {
            opacity: 0.7;
            pointer-events: none;
        }

        @keyframes float-subtle {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-8px);
            }
        }

        .animate-float-subtle {
            animation: float-subtle 6s ease-in-out infinite;
        }

        .animate-float-subtle-delayed {
            animation: float-subtle 6s ease-in-out infinite;
            animation-delay: -3s;
        }

        @keyframes bg-pan-slow {
            0% {
                background-position: 0px 0px;
            }

            100% {
                background-position: 40px 40px;
            }
        }

        .animate-bg-pan-slow {
            animation: bg-pan-slow 15s linear infinite;
        }

        .animate-slow-glow {
            animation: glow 4s ease-in-out infinite;
        }

        .animate-loader-line {
            animation: loaderLine 2.5s ease-in-out infinite;
            transform-origin: center;
        }

        @keyframes loaderLine {

            0%,
            100% {
                transform: scaleX(0);
                opacity: 0.1;
            }

            50% {
                transform: scaleX(1);
                opacity: 0.8;
            }
        }

        #navbar {
            transition: background-color 0.45s var(--ease-smooth), border-color 0.45s var(--ease-smooth),
                box-shadow 0.45s var(--ease-smooth), backdrop-filter 0.45s var(--ease-smooth);
        }

        #mobile-menu {
            transition-timing-function: var(--ease-out-expo);
            transition-duration: 0.45s;
        }

        #mobile-menu [href],
        #mobile-menu button {
            transition: opacity 0.35s ease, transform 0.45s var(--ease-out-expo), color 0.25s ease;
        }

        #mobile-menu:not(.is-open) [href],
        #mobile-menu:not(.is-open) button {
            opacity: 0;
            transform: translate3d(14px, 0, 0);
        }

        #mobile-menu.is-open [href],
        #mobile-menu.is-open button {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        #mobile-menu.is-open .flex.flex-col a:nth-child(2) {
            transition-delay: 0.04s;
        }

        #mobile-menu.is-open .flex.flex-col a:nth-child(3) {
            transition-delay: 0.08s;
        }

        #mobile-menu.is-open .flex.flex-col a:nth-child(4) {
            transition-delay: 0.12s;
        }

        #scroll-indicator {
            animation: scroll-cue 2.2s var(--ease-smooth) infinite;
        }

        @keyframes scroll-cue {

            0%,
            100% {
                transform: translate3d(-50%, 0, 0);
                opacity: 0.45;
            }

            50% {
                transform: translate3d(-50%, 8px, 0);
                opacity: 0.85;
            }
        }

        .hero-section {
            --hero-parallax-y: 0px;
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
        }

        .hero-section::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: url('assets/images/temple-entrance-hero.png');
            background-size: cover;
            background-position: center center;
            background-repeat: no-repeat;
            opacity: 0.9;
            z-index: 0;
            translate: 0 var(--hero-parallax-y);
        }

        .hero-ambient-motion {
            position: absolute;
            inset: 0;
            z-index: 11;
            overflow: hidden;
            pointer-events: none;
        }

        .hero-particle {
            position: absolute;
            width: var(--particle-size);
            height: var(--particle-size);
            border: 1px solid rgba(212, 175, 55, 0.2);
            border-radius: 999px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.02) 65%, transparent 72%);
            box-shadow: 0 0 30px rgba(212, 175, 55, 0.08);
            opacity: 0.32;
            animation: hero-particle-float var(--particle-duration) ease-in-out infinite;
            animation-delay: var(--particle-delay);
        }

        .hero-particle:nth-child(1) {
            --particle-size: 5rem;
            --particle-duration: 11s;
            --particle-delay: -1s;
            top: 13%;
            left: 6%;
        }

        .hero-particle:nth-child(2) {
            --particle-size: 7rem;
            --particle-duration: 14s;
            --particle-delay: -5s;
            top: 58%;
            right: 5%;
        }

        .hero-particle:nth-child(3) {
            --particle-size: 3.5rem;
            --particle-duration: 10s;
            --particle-delay: -3s;
            bottom: 18%;
            left: 17%;
        }

        .hero-particle:nth-child(4) {
            --particle-size: 6rem;
            --particle-duration: 13s;
            --particle-delay: -7s;
            top: 20%;
            right: 14%;
        }

        .hero-particle:nth-child(5) {
            --particle-size: 3rem;
            --particle-duration: 9s;
            --particle-delay: -4s;
            bottom: 36%;
            left: 46%;
        }

        @keyframes hero-particle-float {

            0%,
            100% {
                opacity: 0.2;
                transform: translate3d(0, 0, 0) scale(0.9);
            }

            35% {
                opacity: 0.45;
                transform: translate3d(24px, -38px, 0) scale(1.08);
            }

            70% {
                opacity: 0.28;
                transform: translate3d(-18px, -68px, 0) scale(0.96);
            }
        }

        .hero-glow-orb {
            --glow-x: 0px;
            --glow-y: 0px;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 11;
            width: min(32rem, 60vw);
            aspect-ratio: 1;
            border-radius: 999px;
            background: radial-gradient(circle, rgba(212, 175, 55, 0.16), rgba(166, 59, 0, 0.06) 42%, transparent 72%);
            mix-blend-mode: screen;
            opacity: 0.55;
            pointer-events: none;
            transform: translate3d(calc(-50% + var(--glow-x)), calc(-50% + var(--glow-y)), 0);
            transition: transform 0.8s var(--ease-out-expo), opacity 0.35s ease;
            will-change: transform;
        }

        @keyframes hero-drift {
            0% {
                transform: scale(1.02) translate3d(0, 0, 0);
            }

            50% {
                transform: scale(1.075) translate3d(-0.6%, -0.5%, 0);
            }

            100% {
                transform: scale(1.045) translate3d(0.5%, -0.2%, 0);
            }
        }

        @media (prefers-reduced-motion: no-preference) {
            .hero-section::before {
                animation: hero-drift 24s ease-in-out infinite alternate;
                will-change: transform;
            }
        }

        #journey-section .journey-card {
            position: relative;
            overflow: hidden;
            transition: opacity 0.75s var(--ease-smooth), transform 0.9s var(--ease-out-expo),
                border-color 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease;
        }

        #journey-section .journey-card::before {
            content: "";
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            height: 3px;
            background: linear-gradient(90deg, #a63b00, #ff5e00, #d4af37);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.65s var(--ease-out-expo);
        }

        #journey-section .journey-card.visible::before {
            transform: scaleX(0.24);
        }

        #journey-section .journey-card:hover {
            z-index: 1;
            transform: translate3d(0, -9px, 0) scale(1.025);
            border-color: rgba(166, 59, 0, 0.24);
            background-color: rgba(255, 255, 255, 0.82);
            box-shadow: 0 20px 45px rgba(83, 25, 0, 0.09);
        }

        .dark #journey-section .journey-card:hover {
            background-color: rgba(30, 26, 24, 0.82);
            border-color: rgba(255, 94, 0, 0.24);
        }

        #journey-section .journey-card:hover::before {
            transform: scaleX(1);
        }

        #journey-section .journey-card>div:first-of-type {
            transition: transform 0.5s var(--ease-out-expo), box-shadow 0.5s ease;
        }

        #journey-section .journey-card:hover>div:first-of-type {
            transform: scale(1.1);
            box-shadow: 0 10px 24px rgba(166, 59, 0, 0.24);
        }

        @media (max-width: 1023px) {

            .hero-particle:nth-child(2),
            .hero-particle:nth-child(4),
            .hero-particle:nth-child(5) {
                display: none;
            }

            .hero-glow-orb {
                width: 17rem;
                opacity: 0.38;
            }

            #technology-section.technology-static .slide {
                height: auto;
                min-height: 100svh;
                padding: 3rem 1rem;
            }

            #technology-section .glass-card {
                padding: 1.5rem;
                border-radius: 1.25rem;
            }

            #technology-section .technology-card {
                min-height: min(36.75rem, calc(100svh - 8rem));
            }

            #technology-section .technology-card:hover {
                transform: none;
            }

            #technology-section .slide-1-heading {
                font-size: clamp(1.5rem, 7.18vw, 1.875rem);
                line-height: 1.2;
                letter-spacing: -0.025em;
            }

            #technology-section .technology-card-heading {
                font-size: 1.5rem;
                line-height: 1.25;
                letter-spacing: -0.025em;
            }

            #technology-section .technology-card .slide-2-desc,
            #technology-section .technology-card .slide-3-desc,
            #technology-section .technology-card .slide-4-desc,
            #technology-section .slide-5-content>p {
                font-size: 1.125rem;
                line-height: 1.44;
            }

            #technology-section .technology-feature-card h3 {
                font-size: 0.875rem;
                line-height: 1.25;
            }
        }

        .technology-static {
            height: auto !important;
            width: 100% !important;
            overflow: visible !important;
        }

        .technology-static .technology-container {
            display: block;
            width: 100% !important;
        }

        .technology-static .slide {
            width: 100% !important;
            min-height: 100svh;
        }

        /* Mobile Carousel Styles */
        @media (max-width: 1023px) {
            .technology-carousel {
                height: 100svh !important;
                width: 100% !important;
                overflow: hidden !important;
                display: flex !important;
                flex-direction: column !important;
                background-color: #FAF8F5 !important;
            }

            .technology-carousel .technology-container {
                display: flex !important;
                flex-direction: row !important;
                width: 100% !important;
                height: 100% !important;
                overflow-x: auto !important;
                scroll-snap-type: x mandatory !important;
                scroll-behavior: smooth !important;
                -webkit-overflow-scrolling: touch !important;
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }

            .technology-carousel .technology-container::-webkit-scrollbar {
                display: none !important;
            }

            .technology-carousel .slide {
                width: 100% !important;
                height: 100% !important;
                flex-shrink: 0 !important;
                scroll-snap-align: center !important;
                scroll-snap-stop: always !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: flex-start !important;
                align-items: center !important;
                overflow-y: hidden !important;
                scrollbar-width: none !important;
                -ms-overflow-style: none !important;
                padding-top: 3.5rem !important;
                padding-bottom: 5.5rem !important;
                box-sizing: border-box !important;
            }

            .technology-carousel .slide::-webkit-scrollbar {
                display: none !important;
            }

            .technology-carousel .technology-container > .slide:first-of-type {
                justify-content: center !important;
            }

            .technology-carousel .slide-1-content {
                margin-top: 0 !important;
                padding-left: 1.5rem !important;
                padding-right: 1.5rem !important;
            }

            .technology-carousel #mobile-carousel-prev,
            .technology-carousel #mobile-carousel-next {
                display: flex !important;
            }

            .technology-carousel #mobile-carousel-dots {
                display: flex !important;
            }

            .mobile-dot-active {
                background-color: #a63b00 !important;
                width: 1.5rem !important;
            }
        }

        @media (max-width: 350px) {
            .technology-carousel .technology-container > .slide:first-of-type {
                padding-left: 2rem !important;
                padding-right: 2rem !important;
            }

            .technology-carousel .slide-1-content {
                padding-left: 1rem !important;
                padding-right: 1rem !important;
            }
        }

        @media (prefers-reduced-motion: reduce) {

            html {
                scroll-behavior: auto;
            }

            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                scroll-behavior: auto !important;
                transition-duration: 0.01ms !important;
                transition-delay: 0ms !important;
            }

            .motion-ready .fade-in-up,
            .motion-ready .slide-in-left,
            .motion-ready .slide-in-right,
            .motion-ready #hero-content>* {
                opacity: 1;
                transform: none;
            }

            .hero-ambient-motion,
            .hero-glow-orb {
                display: none;
            }

            #journey-section .journey-card.journey-active {
                transform: none;
            }

            #technology-section {
                height: auto;
                width: 100%;
                overflow: visible;
            }

            #technology-section .technology-container {
                display: block;
                width: 100%;
            }

            #technology-section .slide {
                width: 100%;
                min-height: 100svh;
            }
        }
    </style>

    <link rel="stylesheet" href="assets/css/loader.css">
</head>

<body
    class="loading-active bg-background text-on-background font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
    <?php require __DIR__ . '/includes/main-loader.php'; ?>
    <?php
    $activePage = 'home';
    if (!function_exists('pageNavClass')) {
        function pageNavClass(string $page, string $activePage): string {
            return $page === $activePage ? 'site-nav__link is-active' : 'site-nav__link';
        }
    }
    ?>
    <link rel="stylesheet" href="assets/css/theme-pages.css">
    <header class="site-header" id="site-header">
        <div class="site-header__inner">
            <a class="site-brand" href="index.php" aria-label="TEERTHA home">
                <img src="assets/images/logo.png" alt="" aria-hidden="true">
                <span>TEERTHA</span>
            </a>

            <nav class="site-nav" aria-label="Primary navigation">
                <a class="<?= pageNavClass('home', $activePage) ?>" href="index.php" <?= $activePage === 'home' ? 'aria-current="page"' : '' ?>>Home</a>
                <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience.php" <?= $activePage === 'experience' ? 'aria-current="page"' : '' ?>>Experience</a>
                <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline.php" <?= $activePage === 'timeline' ? 'aria-current="page"' : '' ?>>Timeline</a>
                <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner.php" <?= $activePage === 'partner' ? 'aria-current="page"' : '' ?>>Partners</a>
                <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact.php" <?= $activePage === 'contact' ? 'aria-current="page"' : '' ?>>Contact</a>
            </nav>

            <a class="button button--primary site-header__cta" href="partner.php">Partner With Us</a>

            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-navigation" aria-label="Open navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>

        <nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden>
            <a class="<?= pageNavClass('home', $activePage) ?>" href="index.php">Home</a>
            <a class="<?= pageNavClass('experience', $activePage) ?>" href="experience.php">Experience</a>
            <a class="<?= pageNavClass('timeline', $activePage) ?>" href="timeline.php">Timeline</a>
            <a class="<?= pageNavClass('partner', $activePage) ?>" href="partner.php">Partners</a>
            <a class="<?= pageNavClass('contact', $activePage) ?>" href="contact.php">Contact</a>
            <a class="button button--primary" href="partner.php">Partner With Us</a>
        </nav>
    </header>
    <script src="assets/js/theme-pages.js" defer></script>
    <!-- Hero Section -->
    <section id="hero-section"
        class="hero-section relative w-screen h-screen flex items-center justify-center overflow-hidden">
        <!-- Cinematic Dark Overlay -->
        <div class="absolute inset-0 z-10 pointer-events-none"
            style="background: linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.75) 100%);">
        </div>

        <div class="hero-ambient-motion" aria-hidden="true">
            <span class="hero-particle"></span>
            <span class="hero-particle"></span>
            <span class="hero-particle"></span>
            <span class="hero-particle"></span>
            <span class="hero-particle"></span>
            <div id="hero-glow-orb" class="hero-glow-orb"></div>
        </div>

        <div
            class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-20 w-full text-center flex flex-col items-center justify-center">
            <div id="hero-content" class="max-w-3xl space-y-6 flex flex-col items-center justify-center">
                <!-- Golden Accent Label -->
                <div
                    class="flex items-center justify-center gap-3 text-temple-gold text-xs tracking-[0.3em] uppercase font-bold mx-auto">
                    <span class="w-6 h-[1.5px] bg-temple-gold"></span>
                    <span>Digital Spiritual Heritage</span>
                    <span class="w-6 h-[1.5px] bg-temple-gold"></span>
                </div>

                <!-- Main Brand Title -->
                <h1
                    class="font-cinzel text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight tracking-[0.05em] uppercase text-center">
                    TEERTHA
                </h1>

                <!-- Gold Tagline -->

                <b class="font-cinzel text-base md:text-xl text-temple-gold font-medium tracking-wide text-center">
                    Every Temple Has a Story. Experience It.
                </b>

                <!-- Description -->
                <p class="font-body text-sm md:text-base text-white/80 leading-relaxed max-w-2xl text-center mx-auto">
                    Discover India's sacred heritage through immersive storytelling, Virtual Reality, and authentic
                    temple experiences crafted with reverence by Atreal Studios.
                </p>

                <!-- Action Buttons -->
                <div class="flex flex-wrap justify-center gap-4 pt-4">
                    <a href="experience.php"
                        class="bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-full font-label-md text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-lg font-bold">
                        Explore Experiences
                    </a>
                    <a href="partner.php"
                        class="border border-white/30 hover:border-white/60 text-white px-8 py-3.5 rounded-full font-label-md text-xs tracking-widest uppercase hover:bg-white/10 transition-all font-bold">
                        Partner With Us
                    </a>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div id="scroll-indicator"
            class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40 animate-bounce cursor-pointer z-20 transition-opacity duration-300">
            <span class="text-xs tracking-[0.35em] -mr-[0.35em] uppercase font-semibold">Scroll</span>
            <span class="material-symbols-outlined text-base">keyboard_arrow_down</span>
        </div>
    </section>
    <!-- Why It Matters Section -->
    <section class="py-16 md:py-24 lg:py-32 relative z-10 bg-cover bg-center bg-no-repeat overflow-hidden">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Left Content Column -->
                <div class="space-y-8">
                    <div class="flex items-center gap-3 text-primary text-xs tracking-[0.3em] uppercase font-bold">
                        <span class="w-8 h-[1.5px] bg-primary"></span>
                        <span>Why It Matters</span>
                    </div>
                    <h2
                        class="font-display text-3xl md:text-5xl lg:text-6xl text-on-surface leading-tight font-semibold tracking-tight">
                        Every year, millions visit temples. Most leave with blessings.
                    </h2>
                    <p class="font-body-lg text-lg md:text-xl text-secondary leading-relaxed">
                        Very few leave knowing the incredible stories behind those sacred places.
                        <strong>Teertha</strong> ensures those stories are never forgotten.
                    </p>
                </div>
                <!-- Right Image Column -->
                <div class="relative group w-full max-w-2xl mx-auto lg:mx-0">
                    <div
                        class="absolute -inset-2 bg-gradient-to-r from-primary/10 to-[#ff5e00]/10 rounded-[2.5rem] blur-xl opacity-75 group-hover:opacity-100 transition duration-700">
                    </div>
                    <div class="relative overflow-hidden rounded-[2rem] border border-outline-variant/10 shadow-2xl">
                        <img src="assets/images/temple-sunset.jpg" alt="Sacred Temple"
                            class="w-full h-auto object-cover aspect-[4/3] scale-100 group-hover:scale-105 transition-transform duration-700 ease-out">
                    </div>
                </div>
            </div>
        </div>
        <!-- Bottom fog: blends this section into the Technology section below -->
        <div aria-hidden="true" class="absolute bottom-0 left-0 w-full pointer-events-none z-20" style="height: clamp(6rem, 12vw, 9rem);
                   background: linear-gradient(to bottom,
                       rgba(255, 255, 255, 0) 0%,
                       rgba(255, 255, 255, 0.6) 50%,
                       #ffffff 100%);"></div>
    </section>

    <!-- Horizontal GSAP Technology Section -->
    <section id="technology-section"
        class="relative bg-transparent animate-bg-pan-slow overflow-hidden text-on-surface h-screen w-screen flex">

        <!-- Background Image -->
        <div class="absolute inset-y-0 right-0 w-full bg-right bg-cover bg-no-repeat pointer-events-none z-0"
            style="background-image: url('assets/images/temple-sketch-background.png'); -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%); mask-image: linear-gradient(to bottom, transparent, black 20%);">
        </div>

        <!-- Top Fog: blends section above (white) into this section -->
        <div aria-hidden="true" class="absolute top-0 left-0 w-full pointer-events-none z-20" style="height: clamp(8rem, 14vw, 11rem);
                   background: linear-gradient(to bottom,
                       #ffffff 0%,
                       rgba(255, 255, 255, 0.94) 18%,
                       rgba(255, 255, 255, 0.6) 48%,
                       rgba(255, 255, 255, 0) 100%);"></div>

        <!-- Bottom Fog: blends this section into section below (#FAF8F5 warm cream) -->
        <div aria-hidden="true" class="absolute bottom-0 left-0 w-full pointer-events-none z-20" style="height: clamp(10rem, 22vh, 18rem);
                   background: linear-gradient(to bottom,
                       rgba(250, 248, 245, 0) 0%,
                       rgba(250, 248, 245, 0.45) 45%,
                       rgba(250, 248, 245, 0.82) 72%,
                       #FAF8F5 100%);"></div>

        <!-- GSAP Scroll Container -->
        <div class="technology-container flex h-full w-[500vw] relative z-10">

            <!-- Slide 01: Introduction -->
            <!-- <div class="glass-card max-w-5xl w-full p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center slide-2-content">
                <div
                    class="relative z-10 w-full max-w-3xl p-8 md:p-12 text-center space-y-6 md:space-y-8 slide-1-content">
                    <div
                        class="text-[#F5713D] text-xs tracking-[0.3em] uppercase font-bold slide-1-label">
                        Technology
                    </div>
                    <h2
                        class="font-display text-4xl md:text-6xl font-bold leading-tight slide-1-heading text-on-surface">
                        Where Heritage <br /> Meets Innovation
                    </h2>
                    <div class="w-0 h-[2px] bg-temple-gold mx-auto slide-1-line"></div>
                    <p class="font-body-lg text-secondary leading-relaxed max-w-2xl mx-auto slide-1-desc">
                        Every Teertha experience combines cutting-edge spatial computing, immersive storytelling, and
                        cinematic heritage preservation to bring India's sacred temples to life.
                    </p>
                </div>
            </div> -->
            <div
                class="slide flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative px-12 md:px-24">
                <div class="absolute inset-0 opacity-20 bg-[size:32px_32px]">
                </div>
                <div
                    class="relative z-10 w-full max-w-3xl p-10 md:p-12 text-center space-y-5 md:space-y-8 mt-10 slide-1-content">
                    <div class="text-[#F5713D] text-xs tracking-[0.3em] uppercase font-bold slide-1-label">
                        Technology
                    </div>
                    <h2
                        class="font-display text-2xl md:text-5xl font-bold leading-tight slide-1-heading text-on-surface">
                        Where Heritage <span class="text-temple-gold">Meets Innovation</span>
                    </h2>
                    <div class="w-0 h-[2px] bg-temple-gold mx-auto slide-1-line"></div>
                    <p class="font-body-lg text-secondary leading-relaxed max-w-2xl mx-auto slide-1-desc">
                        Every Teertha experience combines cutting-edge spatial computing, immersive storytelling, and
                        cinematic heritage preservation to bring India's sacred temples to life.
                    </p>
                </div>
            </div>

            <!-- Slide 02: Cinematic Documentation -->
            <div
                class="slide flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative px-12 md:px-24">
                <div
                    class="glass-card technology-card max-w-5xl w-full p-5 md:p-8 flex flex-col gap-5 md:gap-8 slide-2-content">
                    <!-- Heading — full width at the top -->
                    <div class="text-center space-y-4 slide-2-heading-block">
                        <h2
                            class="technology-card-heading font-display text-2xl md:text-5xl font-bold leading-tight slide-2-heading text-on-surface">
                            Capturing Every <span class="text-temple-gold">Sacred Detail</span>
                        </h2>
                        <div class="w-16 h-[2px] bg-temple-gold mx-auto"></div>
                        <p class="font-body-lg text-secondary leading-relaxed max-w-2xl mx-auto slide-2-desc">
                            Every temple is digitally preserved with high-resolution architectural recording and precision drone
                            imaging.
                        </p>
                    </div>
                    <!-- Feature cards — row below the heading -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 slide-2-cards items-stretch">
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">videocam</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">Heritage
                                    Documentation</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Precision
                                    architectural
                                    documentation.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">flight_takeoff</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">Drone
                                    Filmmaking
                                </h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Grand
                                    temples, viewed from
                                    above.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">mic</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Spatial Audio
                                    Recording</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Every
                                    chant. Every echo. In
                                    3D.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Slide 03: Immersive Experience -->
            <div
                class="slide flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative px-12 md:px-24">
                <div
                    class="glass-card technology-card max-w-5xl w-full p-5 md:p-8 flex flex-col gap-5 md:gap-8 slide-3-content">
                    <!-- Heading — full width at the top -->
                    <div class="text-center space-y-4">
                        <h2
                            class="technology-card-heading font-display text-2xl md:text-5xl font-bold leading-tight slide-3-heading text-on-surface">
                            Presence Through <span class="text-temple-gold">Immersion</span>
                        </h2>
                        <div class="w-16 h-[2px] bg-temple-gold mx-auto"></div>
                        <p class="font-body-lg text-secondary leading-relaxed max-w-2xl mx-auto slide-3-desc">
                            We place you inside every temple through immersive VR, spatial computing, and lifelike 3D
                            audio.
                        </p>
                    </div>
                    <!-- Feature cards — row below the heading -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 slide-3-cards items-stretch">
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">vrpano</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Virtual Reality
                                </h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">
                                    Transporting you directly
                                    into the
                                    sanctum sanctorum.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">surround_sound</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Spatial Audio</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">The
                                    resonating echoes of
                                    ancient
                                    chants and bells, mapped in 3D space.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">touch_app</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Interactive Exploration</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Explore
                                    sacred spaces naturally and at your own pace.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Slide 04: Digital Heritage -->
            <div
                class="slide flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative px-12 md:px-24">
                <div
                    class="glass-card technology-card max-w-5xl w-full p-5 md:p-8 flex flex-col gap-5 md:gap-8 slide-4-content">
                    <!-- Heading — full width at the top -->
                    <div class="text-center space-y-4">
                        <h2
                            class="technology-card-heading font-display text-2xl md:text-5xl font-bold leading-tight slide-4-heading text-on-surface">
                            Preserving the <span class="text-temple-gold">Intangible</span>
                        </h2>
                        <div class="w-16 h-[2px] bg-temple-gold mx-auto slide-4-timeline"></div>
                        <p class="font-body-lg text-secondary leading-relaxed max-w-2xl mx-auto slide-4-desc">
                            Rituals, folklore, and temple stories are digitized to preserve India's living heritage for
                            generations.
                        </p>
                    </div>
                    <!-- Feature cards — row below the heading -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 slide-4-cards items-stretch">
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">menu_book</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Interactive
                                    Storytelling</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Delve into
                                    the mythology
                                    and history
                                    behind each temple.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">museum</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Heritage
                                    Preservation</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">Building a
                                    digital library
                                    of India's
                                    most precious architecture.</p>
                            </div>
                        </div>
                        <div
                            class="technology-feature-card flex flex-col items-center text-center gap-2 p-3.5 md:p-5 rounded-2xl bg-surface-container/30 border border-outline-variant/10 transition-transform duration-500 hover:-translate-y-2 group h-24 md:h-full justify-between">
                            <div
                                class="flex-shrink-0 w-10 h-10 rounded-xl bg-temple-gold/10 flex items-center justify-center border border-temple-gold/20 group-hover:bg-temple-gold/20 transition-colors">
                                <span
                                    class="material-symbols-outlined text-xl text-temple-gold group-hover:scale-110 transition-transform">history_edu</span>
                            </div>
                            <div>
                                <h3 class="text-sm md:text-base font-semibold mb-0.5 font-display text-on-surface">
                                    Ritual Documentation</h3>
                                <p class="text-secondary text-xs md:text-sm leading-relaxed hidden md:block">
                                    Safeguarding
                                    ceremonies, chants, and oral traditions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Slide 05: Technology Summary -->
            <div
                class="slide flex-shrink-0 w-screen h-full flex flex-col items-center justify-center relative px-12 md:px-24">
                <div
                    class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px]">
                </div>
                <div
                    class="glass-card technology-card relative z-10 w-full max-w-5xl p-5 md:p-8 text-center flex flex-col justify-center gap-5 md:gap-8 slide-5-content">
                    <h2
                        class="technology-card-heading font-display text-2xl md:text-5xl font-bold leading-tight slide-5-heading text-on-surface">
                        Experience the Future of <br /> <span class="text-temple-gold">Spiritual Heritage</span>
                    </h2>

                    <p class="font-body-lg text-secondary leading-relaxed md:hidden">
                        One connected experience brings every temple's sights, sounds, stories, and sacred details to
                        life.
                    </p>

                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 slide-5-grid">
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span
                                class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">architecture</span>
                            <span class="font-label-md text-xs uppercase tracking-widest text-on-surface">Heritage
                                Recording</span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span
                                class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">flight_takeoff</span>
                            <span class="font-label-md text-xs uppercase tracking-widest text-on-surface">Drones</span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">museum</span>
                            <span class="font-label-md text-xs uppercase tracking-widest text-on-surface">Digital
                                Archives</span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span
                                class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">surround_sound</span>
                            <span class="font-label-md text-xs uppercase tracking-widest text-on-surface">Spatial
                                Audio</span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span
                                class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">auto_stories</span>
                            <span
                                class="font-label-md text-xs uppercase tracking-widest text-on-surface">Storytelling</span>
                        </div>
                        <div
                            class="flex flex-col items-center justify-center gap-2 transition-transform hover:scale-105 hover:-translate-y-1">
                            <span
                                class="material-symbols-outlined text-2xl md:text-3xl text-temple-gold">verified_user</span>
                            <span
                                class="font-label-md text-xs uppercase tracking-widest text-on-surface">Preservation</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Mobile Carousel Navigation Buttons -->
        <button id="mobile-carousel-prev"
            class="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 dark:bg-surface-dim/80 backdrop-blur-md flex items-center justify-center border border-outline-variant/10 shadow-lg text-primary lg:hidden cursor-pointer hover:bg-white transition-all opacity-0 pointer-events-none"
            aria-label="Previous Slide">
            <span class="material-symbols-outlined text-xl">chevron_left</span>
        </button>
        <button id="mobile-carousel-next"
            class="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/80 dark:bg-surface-dim/80 backdrop-blur-md flex items-center justify-center border border-outline-variant/10 shadow-lg text-primary lg:hidden cursor-pointer hover:bg-white transition-all"
            aria-label="Next Slide">
            <span class="material-symbols-outlined text-xl">chevron_right</span>
        </button>

        <!-- Mobile Carousel Pagination Dots -->
        <div id="mobile-carousel-dots" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 lg:hidden">
            <button
                class="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 mobile-dot mobile-dot-active"
                data-index="0" aria-label="Go to slide 1"></button>
            <button class="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 mobile-dot" data-index="1"
                aria-label="Go to slide 2"></button>
            <button class="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 mobile-dot" data-index="2"
                aria-label="Go to slide 3"></button>
            <button class="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 mobile-dot" data-index="3"
                aria-label="Go to slide 4"></button>
            <button class="w-2.5 h-2.5 rounded-full bg-primary/20 transition-all duration-300 mobile-dot" data-index="4"
                aria-label="Go to slide 5"></button>
        </div>
    </section>
    <!-- Why We Exist Section -->
    <section id="purpose-section" class="relative overflow-hidden border-b border-outline-variant/10"
        style="background: linear-gradient(160deg, #fff8f0 0%, #FAF8F5 40%, #f5ede0 100%);">

        <!-- Atmospheric radial glow top-right -->
        <div aria-hidden="true" class="absolute top-0 right-0 pointer-events-none" style="width: 55vw; height: 55vw; max-width: 700px; max-height: 700px;
                   background: radial-gradient(ellipse at top right, rgba(212,175,55,0.13) 0%, rgba(166,59,0,0.06) 38%, transparent 72%);
                   transform: translate(20%, -20%);"></div>

        <!-- Subtle mandala / wireframe texture bottom-left -->
        <div aria-hidden="true" class="absolute bottom-0 left-0 w-[420px] h-[420px] pointer-events-none opacity-[0.07]"
            style="background-image: url('assets/images/temple-sketch-background.png'); background-size: cover; background-position: center;
                   -webkit-mask-image: radial-gradient(circle, black 30%, transparent 72%);
                   mask-image: radial-gradient(circle, black 30%, transparent 72%);
                   transform: translate(-25%, 25%);"></div>

        <!-- Top fog blend from technology section -->
        <div aria-hidden="true" class="absolute top-0 left-0 w-full pointer-events-none z-10" style="height: 6rem;
                   background: linear-gradient(to bottom, #FAF8F5 0%, rgba(250,248,245,0) 100%);"></div>

        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 py-24 lg:py-32">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                <!-- ── Left: Cinematic Image Column ── -->
                <div class="relative order-2 lg:order-1 flex items-center justify-center">
                    <!-- Outer glow ring -->
                    <div class="absolute inset-0 rounded-[2.5rem] pointer-events-none" style="background: radial-gradient(ellipse at 30% 70%, rgba(212,175,55,0.18) 0%, transparent 65%);
                               filter: blur(28px);"></div>

                    <!-- Tilted background card -->
                    <div class="absolute inset-4 rounded-[2rem] z-0" style="background: linear-gradient(135deg, rgba(212,175,55,0.12), rgba(166,59,0,0.08));
                               transform: rotate(-3deg) scale(0.97); border: 1px solid rgba(212,175,55,0.2);"></div>

                    <!-- Main image -->
                    <div class="relative z-10 w-full rounded-[2rem] overflow-hidden shadow-2xl"
                        style="border: 1.5px solid rgba(212,175,55,0.35);">
                        <img class="w-full h-auto object-cover aspect-square" alt="Sacred heritage preservation view"
                            src="assets/images/temple-prayer-interior.jpg" style="display: block;">
                        <!-- Cinematic inner vignette -->
                        <div class="absolute inset-0 pointer-events-none" style="background: linear-gradient(to bottom, transparent 55%, rgba(30,15,5,0.45) 100%),
                                               linear-gradient(to right, rgba(30,15,5,0.18) 0%, transparent 40%);">
                        </div>
                    </div>

                    <!-- Floating badge – cinematic quality -->
                    <div class="absolute -bottom-4 -right-4 z-20 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl"
                        style="background: rgba(255,255,255,0.82); backdrop-filter: blur(16px);
                               border: 1px solid rgba(212,175,55,0.35); box-shadow: 0 12px 36px rgba(83,25,0,0.14);">
                        <span class="material-symbols-outlined text-[26px]"
                            style="color: #D4AF37; font-variation-settings: 'FILL' 1;">auto_awesome</span>
                        <div>
                            <div class="text-[10px] text-secondary uppercase tracking-[0.22em] font-bold">Cinematic
                                Quality</div>
                            <div class="text-sm font-semibold text-on-surface mt-0.5">4K · Architectural · Spatial Audio</div>
                        </div>
                    </div>


                </div>

                <!-- ── Right: Content Column ── -->
                <div class="space-y-8 order-1 lg:order-2 text-center lg:text-left">
                    <!-- Label -->
                    <div class="flex items-center justify-center lg:justify-start gap-3">
                        <span class="w-8 h-[1.5px]" style="background: #a63b00;"></span>
                        <span class="purpose-eyebrow text-[10px] tracking-[0.32em] uppercase font-bold"
                            style="color: #a63b00;">Purpose</span>
                    </div>

                    <!-- Headline -->
                    <div class="space-y-4">
                        <h2 class="purpose-heading font-headline-lg text-headline-lg text-on-surface mb-4">
                            Why We<br>
                            <span style="background: linear-gradient(135deg, #a63b00 0%, #D4AF37 100%);-webkit-background-clip:
                                text;-webkit-text-fill-color:transparent;background-clip:text">Exist</span>
                        </h2>
                        <!-- Gold divider -->
                        <div class="flex items-center justify-center lg:justify-start gap-3">
                            <div class="h-[2px] w-12" style="background: linear-gradient(to right, #D4AF37, #a63b00);">
                            </div>
                            <div class="w-1.5 h-1.5 rounded-full" style="background: #D4AF37;"></div>
                        </div>
                    </div>

                    <!-- Body text -->
                    <div class="space-y-4">
                        <p class="purpose-lead text-lg leading-relaxed text-on-surface font-medium">
                            We believe every temple is more than a place of worship. It is a
                            <span class="font-semibold" style="color: #a63b00;">living story</span> shaped by
                            faith, history, rituals, architecture, and the devotion of countless generations.
                        </p>
                        <p class="purpose-copy text-base leading-relaxed text-secondary">
                            At Teertha, we are committed to preserving these stories with authenticity, ensuring
                            that their spiritual and cultural significance continues to inspire people across the world.
                        </p>
                    </div>

                    <!-- Mission & Vision cards -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6"
                        style="border-top: 1px solid rgba(212,175,55,0.25);">

                        <!-- Mission -->
                        <div class="group relative p-5 rounded-2xl overflow-hidden cursor-default transition-all duration-400"
                            style="background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
                                   border: 1px solid rgba(212,175,55,0.22);
                                   box-shadow: 0 4px 18px rgba(83,25,0,0.07);
                                   transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 16px 36px rgba(83,25,0,0.13)'; this.style.borderColor='rgba(166,59,0,0.35)';"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 18px rgba(83,25,0,0.07)'; this.style.borderColor='rgba(212,175,55,0.22)';">
                            <!-- Icon badge -->
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0" style="background: linear-gradient(135deg, rgba(166,59,0,0.12), rgba(212,175,55,0.12));
                                       border: 1px solid rgba(212,175,55,0.3);">
                                <span class="material-symbols-outlined text-xl"
                                    style="color: #a63b00; font-variation-settings: 'FILL' 1;">explore</span>
                            </div>
                            <h4 class="purpose-card-title text-xs font-bold uppercase tracking-[0.22em] mb-2 text-on-surface">Mission</h4>
                            <p class="purpose-card-copy text-sm text-secondary leading-relaxed">
                                To preserve, protect, and present India's spiritual heritage through immersive
                                technology, ensuring sacred stories inspire every generation.
                            </p>
                        </div>

                        <!-- Vision -->
                        <div class="group relative p-5 rounded-2xl overflow-hidden cursor-default"
                            style="background: rgba(255,255,255,0.7); backdrop-filter: blur(12px);
                                   border: 1px solid rgba(212,175,55,0.22);
                                   box-shadow: 0 4px 18px rgba(83,25,0,0.07);
                                   transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease, border-color 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 16px 36px rgba(83,25,0,0.13)'; this.style.borderColor='rgba(166,59,0,0.35)';"
                            onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 18px rgba(83,25,0,0.07)'; this.style.borderColor='rgba(212,175,55,0.22)';">
                            <!-- Icon badge -->
                            <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4 mx-auto lg:mx-0" style="background: linear-gradient(135deg, rgba(166,59,0,0.12), rgba(212,175,55,0.12));
                                       border: 1px solid rgba(212,175,55,0.3);">
                                <span class="material-symbols-outlined text-xl"
                                    style="color: #a63b00; font-variation-settings: 'FILL' 1;">visibility</span>
                            </div>
                            <h4 class="purpose-card-title text-xs font-bold uppercase tracking-[0.22em] mb-2 text-on-surface">Vision</h4>
                            <p class="purpose-card-copy text-sm text-secondary leading-relaxed">
                                To become the world's most trusted platform for experiencing spiritual heritage
                                making every sacred destination accessible through innovation.
                            </p>
                        </div>
                    </div>

                    <!-- CTA -->
                    <div class="flex items-center justify-center lg:justify-start gap-4 pt-2">
                        <button
                            class="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest text-white transition-all duration-300"
                            style="background: linear-gradient(135deg, #a63b00 0%, #ff5e00 100%);
                                   box-shadow: 0 6px 20px rgba(166,59,0,0.3);"
                            onmouseover="this.style.boxShadow='0 8px 28px rgba(255,94,0,0.45)'; this.style.transform='scale(1.04)';"
                            onmouseout="this.style.boxShadow='0 6px 20px rgba(166,59,0,0.3)'; this.style.transform='';">
                            <span class="material-symbols-outlined text-base"
                                style="font-variation-settings:'FILL' 1;">play_circle</span>
                            Our Story
                        </button>
                        <a href="#" class="text-sm font-semibold flex items-center gap-1.5 transition-all duration-200"
                            style="color: #a63b00;" onmouseover="this.style.gap='0.75rem';"
                            onmouseout="this.style.gap='0.375rem';">
                            Learn More
                            <span class="material-symbols-outlined text-base">arrow_forward</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- Statistics Section
    <section class="py-20 bg-surface-container relative overflow-hidden">
        <div
            class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#a63b00_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none">
        </div>
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div class="space-y-2">
                    <div class="font-cinzel text-5xl font-bold text-primary leading-none">500+</div>
                    <div class="w-8 h-[2px] bg-temple-gold mx-auto"></div>
                    <div class="font-label-md text-xs text-secondary uppercase tracking-widest">Heritage Sites</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.1s;">
                    <div class="font-cinzel text-5xl font-bold text-primary leading-none">100+</div>
                    <div class="w-8 h-[2px] bg-temple-gold mx-auto"></div>
                    <div class="font-label-md text-xs text-secondary uppercase tracking-widest">Digital Experiences</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.2s;">
                    <div class="font-cinzel text-5xl font-bold text-primary leading-none">50K+</div>
                    <div class="w-8 h-[2px] bg-temple-gold mx-auto"></div>
                    <div class="font-label-md text-xs text-secondary uppercase tracking-widest">Global Visitors</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.3s;">
                    <div class="font-cinzel text-5xl font-bold text-primary leading-none">20+</div>
                    <div class="w-8 h-[2px] bg-temple-gold mx-auto"></div>
                    <div class="font-label-md text-xs text-secondary uppercase tracking-widest">Curated Collections
                    </div>
                </div>
            </div>
        </div>
    </section> -->
    <!-- Statistics Section -->
    <!-- <section class="py-20 bg-surface-container-high">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"> -->
    <!-- <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-outline-variant/30">
                <div class="space-y-2">
                    <div class="font-display-lg text-[48px] font-bold text-primary mb-2">500+</div>
                    <div class="font-label-md text-label-md text-on-surface-variant">Heritage Locations</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.1s;">
                    <div class="font-display-lg text-[48px] font-bold text-primary mb-2">100+</div>
                    <div class="font-label-md text-label-md text-on-surface-variant">Digital Experiences</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.2s;">
                    <div class="font-display-lg text-[48px] font-bold text-primary mb-2">50K+</div>
                    <div class="font-label-md text-label-md text-on-surface-variant">Global Visitors</div>
                </div>
                <div class="space-y-2" style="transition-delay: 0.3s;">
                    <div class="font-display-lg text-[48px] font-bold text-primary mb-2">20+</div>
                    <div class="font-label-md text-label-md text-on-surface-variant">Cultural PCurated Collections
            </div>
        </div>
    </section> -->
    <!-- Gallery / Use Cases -->
    <!-- <section class="py-24 bg-surface-bright">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="font-headline-lg text-headline-lg text-on-surface mb-2">Curated Collections</h2>
                    <p class="font-body-lg text-body-lg text-secondary">Glimpses into our expansive virtual library.</p>
                </div>
                <button
                    class="btn-secondary px-6 py-2 rounded-full font-label-md text-label-md hidden md:flex items-center">
                    View All <span class="material-symbols-outlined ml-2 text-[18px]">arrow_forward</span>
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="group relative rounded-[1.5rem] overflow-hidden aspect-[4/5] cursor-pointer">
                    <img alt="Gallery Image 1"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDplKEGmEU9YUgBGTcFCz556fi2IAxQgglcvK068HFVLJpzO_FEq-muEXGakrtba0ASnwVbPv-dOaC6kCln8sOXrQcLq-l43nqUYwsELY61hgVwVKCBMD___zSmoaMUEdjZ5z0M8fdp4ID0_XlEZkb43pE_CgciqGveCiI-J8C25AsICwxsfgRhnVZlph1o8m_zQGUx8ZlYOQPa4kuN4MmlPZORtZXp4GNvk8AEtom-ScUPndY028F0JaazW6ejLHb5bCLoSGfR4lJz">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3 class="font-headline-sm text-[24px] font-semibold text-white mb-2">Dravidian Architecture
                        </h3>
                        <p class="font-body-md text-white/80">Explore the towering Gopurams in exquisite detail.</p>
                    </div>
                </div>
                <div class="group relative rounded-[1.5rem] overflow-hidden aspect-[4/5] cursor-pointer"
                    style="transition-delay: 0.1s;">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        data-alt="A breathtaking aerial view of a massive ancient desert fort in Rajasthan, India, bathed in the warm, golden light of sunrise. The sandstone architecture glows brilliantly against the soft, hazy morning sky. The intricate defensive walls and internal palaces are highly detailed, showcasing the grandeur of Rajputana heritage in a pristine, cinematic composition."
                        style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuBFooylgx4LFEv06Q955QqSl6MHzjOXfM9iSZgp2DgguE-P1KHnwg3MIKX1DizfeCFirRFsQpHsbBU9cTuYVuyP_5_vw_gWVcZlbau-0awUTD7puuuRatrkISB0QvkrGzNRG2GAMqTfb2lVaBn0XCgan2zLd3icPTZ8j8-Vf67nBQk5eqM_wUeXX7ZjfzO6znpNLujW51RzONJhmQvKQuJThCBdup7LLplMYI9jP_-RLoKSA00trFzxAxhpGg3qFB7Efe5FyjSVb_HB&quot;);">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3 class="font-headline-sm text-[24px] font-semibold text-white mb-2">Rajputana Forts</h3>
                        <p class="font-body-md text-white/80">Walk the impregnable walls of desert citadels.</p>
                    </div>
                </div>
                <div class="group relative rounded-[1.5rem] overflow-hidden aspect-[4/5] cursor-pointer"
                    style="transition-delay: 0.2s;">
                    <div class="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        data-alt="A close-up, highly detailed macro photograph of intricate stone carvings on an ancient Indian temple pillar. The sandstone textures are sharply focused, revealing centuries of weathering and delicate craftsmanship depicting mythological figures. Soft, directional sunlight grazes the surface, highlighting the depth and artistry in a clean, museum-quality presentation."
                        style="background-image: url(&quot;https://lh3.googleusercontent.com/aida-public/AB6AXuDSMBYDadGPO1Jk6-Is_PCZ8qlSmbRmkygruaHQSY6etmnUHWXX1zcFMAxVngfYU5JTqX2PGYoXdwd9LyPKN2fnaqZVF__F1yBWKzr4F1uz9qgMZrUkdBYpZgg95MgVKU09RSQhn7mJ4KX9Z6f6h8-PC5mQsv-9sH2Lqtq6zj8BRwnqLZytXrbuVeZc8ZIFk2nI0HUIJFIt-GMoY_ioekwqoEWPWPh7xhRyTOPxrCY0UnZFGvaJOeIRFEXx3jVgJZE07nqq4AeSfAgq&quot;);">
                    </div>
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80">
                    </div>
                    <div class="absolute bottom-0 left-0 p-8 w-full">
                        <h3 class="font-headline-sm text-[24px] font-semibold text-white mb-2">Sacred Carvings</h3>
                        <p class="font-body-md text-white/80">Micro-inspections of narrative stone reliefs.</p>
                    </div>
                </div>
            </div>
            <button
                class="btn-secondary w-full mt-8 py-4 rounded-full font-label-md text-label-md md:hidden flex justify-center items-center">
                View All Collections
            </button>
        </div>
    </section> -->

    <!-- How It Works Section -->
    <section id="journey-section"
        class="py-24 bg-surface-bright relative z-10 border-t border-b border-outline-variant/10">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
            <div class="max-w-2xl mx-auto mb-16">
                <div class="text-primary text-xs tracking-[0.3em] uppercase font-bold mb-2">Process</div>
                <h2 class="font-headline-lg text-headline-lg text-on-surface">How It Works</h2>
                <p class="font-body-md text-sm text-secondary mt-3 max-w-lg mx-auto">A seamless journey from discovery
                    to devotion, powered by technology and guided by tradition.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <!-- Step 1 -->
                <div
                    class="journey-card h-full flex flex-col items-center p-6 pt-8 space-y-4 bg-white/40 dark:bg-surface-dim/20 rounded-[2rem] border border-outline-variant/10">
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl"
                            style="font-variation-settings: 'FILL' 1;">search</span>
                    </div>
                    <div class="space-y-1">
                        <div class="text-xs text-primary uppercase tracking-widest font-bold">Step 01</div>
                        <h3 class="font-headline-sm text-[18px] font-semibold text-on-surface">Discover</h3>
                    </div>
                    <p class="font-body-md text-sm text-secondary">Explore temples and learn their hidden stories before
                        you step inside.</p>
                </div>
                <!-- Step 2 -->
                <div
                    class="journey-card h-full flex flex-col items-center p-6 pt-8 space-y-4 bg-white/40 dark:bg-surface-dim/20 rounded-[2rem] border border-outline-variant/10">
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl"
                            style="font-variation-settings: 'FILL' 1;">explore</span>
                    </div>
                    <div class="space-y-1">
                        <div class="text-xs text-primary uppercase tracking-widest font-bold">Step 02</div>
                        <h3 class="font-headline-sm text-[18px] font-semibold text-on-surface">Experience</h3>
                    </div>
                    <p class="font-body-md text-sm text-secondary">Immerse yourself in an immersive heritage spiritual
                        journey from anywhere.</p>
                </div>
                <!-- Step 3 -->
                <div
                    class="journey-card h-full flex flex-col items-center p-6 pt-8 space-y-4 bg-white/40 dark:bg-surface-dim/20 rounded-[2rem] border border-outline-variant/10">
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl"
                            style="font-variation-settings: 'FILL' 1;">auto_stories</span>
                    </div>
                    <div class="space-y-1">
                        <div class="text-xs text-primary uppercase tracking-widest font-bold">Step 03</div>
                        <h3 class="font-headline-sm text-[18px] font-semibold text-on-surface">Connect</h3>
                    </div>
                    <p class="font-body-md text-sm text-secondary">Understand the stories, rituals, and traditions
                        behind every sacred place.</p>
                </div>
                <!-- Step 4 -->
                <div
                    class="journey-card h-full flex flex-col items-center p-6 pt-8 space-y-4 bg-white/40 dark:bg-surface-dim/20 rounded-[2rem] border border-outline-variant/10">
                    <div
                        class="w-14 h-14 rounded-2xl bg-primary text-white flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                        <span class="material-symbols-outlined text-2xl"
                            style="font-variation-settings: 'FILL' 1;">museum</span>
                    </div>
                    <div class="space-y-1">
                        <div class="text-xs text-primary uppercase tracking-widest font-bold">Step 04</div>
                        <h3 class="font-headline-sm text-[18px] font-semibold text-on-surface">Preserve</h3>
                    </div>
                    <p class="font-body-md text-sm text-secondary">Help keep India's spiritual heritage alive for future
                        generations.</p>
                </div>
            </div>
        </div>
    </section>
    <!-- Why Teertha & Our Values -->
    <section class="py-24 bg-surface-container-lowest border-b border-outline-variant/10">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                <!-- Why Teertha -->
                <div class="lg:col-span-5 space-y-6">
                    <div class="text-primary text-xs tracking-[0.3em] uppercase font-bold">Why Teertha?
                    </div>
                    <h2 class="font-headline-lg text-headline-lg text-on-surface leading-tight">More Than Virtual
                        Reality</h2>
                    <p class="font-body-lg text-body-lg text-secondary">
                        Virtual Reality is only the medium. Our purpose is preserving faith, heritage, and culture.
                    </p>
                    <p class="font-body-md text-secondary">
                        Every experience is carefully crafted using:
                    </p>

                    <ul class="space-y-3 pt-2">
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Historical Research</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Temple Traditions</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Local Legends</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Immersive Heritage Storytelling</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Spatial Audio</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Authentic Ritual Documentation</span>
                        </li>
                        <li class="flex items-center gap-3 text-sm text-on-surface font-semibold">
                            <span class="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-temple-gold"></span>
                            <span>Immersive Storytelling</span>
                        </li>
                    </ul>
                </div>

                <!-- Our Values -->
                <div class="lg:col-span-7 space-y-8 bg-surface-bright p-8 md:p-12 rounded-[2rem] border border-outline-variant/20"
                    style="transition-delay: 0.1s;">
                    <div class="text-center md:text-left">
                        <div class="text-primary text-xs tracking-[0.3em] uppercase font-bold mb-2">Our
                            Beliefs</div>
                        <h3 class="font-headline-sm text-2xl font-semibold text-on-surface">Our Values</h3>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <!-- Value 1 -->
                        <div class="space-y-2">
                            <h4 class="font-label-md text-on-surface text-base font-semibold">Authenticity</h4>
                            <p class="font-body-md text-sm text-secondary leading-relaxed">Every story is verified with
                                temple authorities and historical references.</p>
                        </div>
                        <!-- Value 2 -->
                        <div class="space-y-2">
                            <h4 class="font-label-md text-on-surface text-base font-semibold">Respect</h4>
                            <p class="font-body-md text-sm text-secondary leading-relaxed">Every tradition is documented
                                with devotion and cultural sensitivity.</p>
                        </div>
                        <!-- Value 3 -->
                        <div class="space-y-2">
                            <h4 class="font-label-md text-on-surface text-base font-semibold">Preservation</h4>
                            <p class="font-body-md text-sm text-secondary leading-relaxed">We believe heritage should be
                                preserved, not forgotten.</p>
                        </div>
                        <!-- Value 4 -->
                        <div class="space-y-2">
                            <h4 class="font-label-md text-on-surface text-base font-semibold">Innovation</h4>
                            <p class="font-body-md text-sm text-secondary leading-relaxed">Using modern technology to
                                celebrate timeless traditions.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- For Temple Trusts / CTA Section -->
    <section class="py-24 relative overflow-hidden bg-black text-white">
        <!-- Background elements -->
        <div class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity z-0"
            style="background-image: url('assets/images/temple-sunset.jpg');"></div>
        <div class="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/60 to-primary/30 z-0"></div>
        <div
            class="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:32px_32px] z-0">
        </div>
        <!-- Gold accent orbs -->
        <div class="absolute top-1/2 left-1/4 w-72 h-72 rounded-full pointer-events-none z-0"
            style="background: radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%); transform: translate(-50%, -50%);">
        </div>
        <div class="absolute top-1/3 right-1/4 w-48 h-48 rounded-full pointer-events-none z-0"
            style="background: radial-gradient(circle, rgba(166,59,0,0.15), transparent 70%); transform: translate(50%, -50%);">
        </div>

        <div
            class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-8">
            <div class="space-y-3">
                <div
                    class="inline-flex items-center gap-3 text-temple-gold text-xs tracking-[0.3em] uppercase font-bold">
                    <span class="w-6 h-[1.5px] bg-temple-gold"></span>
                    For Temple Trusts
                    <span class="w-6 h-[1.5px] bg-temple-gold"></span>
                </div>
                <h2 class="font-cinzel text-3xl md:text-5xl text-white font-bold leading-tight tracking-wide">Preserve
                    Your Legacy</h2>
            </div>

            <p class="font-body text-sm md:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
                Every temple has a story worth preserving. Partner with Teertha to document your temple's history,
                traditions, architecture, rituals, and festivals through immersive storytelling. Together, let's
                preserve our spiritual heritage for generations to come.
            </p>

            <!-- Trust badges -->
            <div class="flex flex-wrap justify-center gap-6 py-4">
                <div class="flex items-center gap-2 text-white/60 text-xs">
                    <span class="material-symbols-outlined text-temple-gold text-base"
                        style="font-variation-settings: 'FILL' 1;">verified</span>
                    Authenticity Verified
                </div>
                <div class="flex items-center gap-2 text-white/60 text-xs">
                    <span class="material-symbols-outlined text-temple-gold text-base"
                        style="font-variation-settings: 'FILL' 1;">history_edu</span>
                    Historically Accurate
                </div>
                <div class="flex items-center gap-2 text-white/60 text-xs">
                    <span class="material-symbols-outlined text-temple-gold text-base"
                        style="font-variation-settings: 'FILL' 1;">lock</span>
                    Culturally Sensitive
                </div>
            </div>

            <div class="pt-2 flex flex-wrap justify-center gap-4">
                <a href="partner.php"
                    class="bg-primary hover:bg-primary/95 text-white px-8 py-4 rounded-full font-label-md text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-xl font-bold">
                    Partner With Us
                </a>
                <a href="contact.php"
                    class="border border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-full font-label-md text-xs tracking-widest uppercase hover:bg-white/10 transition-all font-bold">
                    Learn More
                </a>
            </div>
        </div>
    </section>
    <!-- Footer -->
    <footer
        class="bg-surface-container-lowest dark:bg-surface-dim w-full pt-16 pb-8 border-t border-outline-variant/30">
        <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                <!-- Brand -->
                <div class="md:col-span-5">
                    <div class="flex items-center gap-3 mb-4">
                        <img src="assets/images/logo.png" alt="" aria-hidden="true" class="h-9 w-9 flex-shrink-0 object-contain">
                        <div class="font-cinzel text-xl font-bold text-primary tracking-[0.1em] uppercase">TEERTHA</div>
                    </div>
                    <p class="font-body-md text-sm text-secondary max-w-xs leading-relaxed">
                        Bridging centuries of architectural brilliance with modern spatial computing to preserve India's
                        sacred heritage.
                    </p>
                    <!-- Social links -->
                    <div class="flex gap-3 mt-6">
                        <a href="#"
                            class="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/30 transition-all">
                            <span class="material-symbols-outlined text-base">language</span>
                        </a>
                        <a href="mailto:info@teertha.com"
                            class="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/30 transition-all">
                            <span class="material-symbols-outlined text-base">mail</span>
                        </a>
                        <a href="#"
                            class="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-secondary hover:text-primary hover:border-primary/30 transition-all">
                            <span class="material-symbols-outlined text-base">share</span>
                        </a>
                    </div>
                </div>
                <!-- Links -->
                <div class="md:col-span-3">
                    <h4 class="font-label-md text-xs uppercase tracking-widest text-on-surface font-bold mb-5">Company
                    </h4>
                    <div class="flex flex-col space-y-3">
                        <a class="font-body-md text-sm text-secondary hover:text-primary transition-all" href="index.php#purpose-section">About
                            Teertha</a>
                        <a class="font-body-md text-sm text-secondary hover:text-primary transition-all"
                            href="experience.php">Heritage Preservation</a>
                        <a class="font-body-md text-sm text-secondary hover:text-primary transition-all"
                            href="partner.php">Partner With Us</a>
                        <a class="font-body-md text-sm text-secondary hover:text-primary transition-all"
                            href="contact.php">Contact Us</a>
                    </div>
                </div>
                <div class="md:col-span-4">
                    <h4 class="font-label-md text-xs uppercase tracking-widest text-on-surface font-bold mb-5">Stay
                        Connected</h4>
                    <p class="font-body-md text-sm text-secondary mb-4">Get updates on new temple experiences and
                        heritage stories.</p>
                    <div class="flex gap-2">
                        <input type="email" id="newsletter-email" name="email" aria-label="Email Address"
                            placeholder="your@email.com"
                            class="flex-1 min-w-0 px-4 py-2.5 rounded-full text-sm border border-outline-variant/30 bg-surface-container focus:outline-none focus:border-primary/40 text-on-surface placeholder:text-secondary/50">
                        <button
                            class="bg-primary text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all flex-shrink-0"
                            aria-label="Subscribe">
                            <span class="material-symbols-outlined text-base">send</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                class="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
                <div class="font-body-md text-xs text-secondary">
                    © 2026 Teertha by Atreal Studios. All rights reserved.
                </div>
                <div class="flex gap-6">
                    <a class="font-body-md text-xs text-secondary hover:text-primary transition-all" href="#">Privacy
                        Policy</a>
                    <a class="font-body-md text-xs text-secondary hover:text-primary transition-all" href="#">Terms of
                        Service</a>
                </div>
            </div>
        </div>
    </footer>


    <script>
        // Loading button functionality
        document.querySelectorAll('[data-loading-btn]').forEach(btn => {
            btn.addEventListener('click', function (e) {
                if (this.classList.contains('btn-loading')) return;

                const spinner = this.querySelector('.spinner');
                const btnText = this.querySelector('.btn-text');
                const btnIcon = this.querySelector('.btn-icon');

                if (spinner) {
                    this.classList.add('btn-loading');
                    spinner.classList.remove('hidden');
                    if (btnText) btnText.style.display = 'none';
                    if (btnIcon) btnIcon.style.display = 'none';

                    // Simulate loading completion after 2 seconds
                    setTimeout(() => {
                        this.classList.remove('btn-loading');
                        spinner.classList.add('hidden');
                        if (btnText) btnText.style.display = 'inline';
                        if (btnIcon) btnIcon.style.display = 'inline';
                    }, 2000);
                }
            });
        });
    </script>

    <script>
        // Scroll Indicator behavior
        (function () {
            const scrollIndicator = document.getElementById('scroll-indicator');
            let scrollTicking = false;

            const updateScroll = () => {
                scrollTicking = false;
                if (scrollIndicator) {
                    if (window.scrollY > 50) {
                        scrollIndicator.style.opacity = '0';
                        scrollIndicator.style.animation = 'none';
                        scrollIndicator.style.pointerEvents = 'none';
                    } else {
                        scrollIndicator.style.opacity = '';
                        scrollIndicator.style.animation = '';
                        scrollIndicator.style.pointerEvents = '';
                    }
                }
            };

            const requestUpdate = () => {
                if (scrollTicking) return;
                scrollTicking = true;
                requestAnimationFrame(updateScroll);
            };

            window.addEventListener('scroll', requestUpdate, { passive: true });
            updateScroll();
        })();
    </script>

    <script>
        // Reference-inspired ambient hero motion and sequential journey emphasis.
        (function () {
            const heroSection = document.getElementById('hero-section');
            const glowOrb = document.getElementById('hero-glow-orb');
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
            let motionFrame = null;

            const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

            const updateScrollMotion = () => {
                motionFrame = null;

                if (heroSection) {
                    const heroRect = heroSection.getBoundingClientRect();
                    const heroProgress = clamp(-heroRect.top / Math.max(heroRect.height, 1), 0, 1);
                    heroSection.style.setProperty('--hero-parallax-y', `${heroProgress * -48}px`);
                }
            };

            const requestScrollMotion = () => {
                if (motionFrame !== null) return;
                motionFrame = requestAnimationFrame(updateScrollMotion);
            };

            if (!reduceMotion) {
                window.addEventListener('scroll', requestScrollMotion, { passive: true });
                window.addEventListener('resize', requestScrollMotion, { passive: true });
                updateScrollMotion();
            }

            if (!reduceMotion && finePointer && heroSection && glowOrb) {
                let pointerFrame = null;
                let targetX = 0;
                let targetY = 0;

                const paintGlow = () => {
                    pointerFrame = null;
                    glowOrb.style.setProperty('--glow-x', `${targetX}px`);
                    glowOrb.style.setProperty('--glow-y', `${targetY}px`);
                };

                heroSection.addEventListener('pointermove', (event) => {
                    const rect = heroSection.getBoundingClientRect();
                    targetX = (event.clientX - rect.left - rect.width / 2) * 0.045;
                    targetY = (event.clientY - rect.top - rect.height / 2) * 0.045;

                    if (pointerFrame === null) {
                        pointerFrame = requestAnimationFrame(paintGlow);
                    }
                }, { passive: true });

                heroSection.addEventListener('pointerleave', () => {
                    targetX = 0;
                    targetY = 0;
                    if (pointerFrame === null) {
                        pointerFrame = requestAnimationFrame(paintGlow);
                    }
                });
            }
        })();
    </script>

    <!-- GSAP & ScrollTrigger -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const techSection = document.getElementById('technology-section');
            if (!techSection) return;

            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const mobileLayout = window.matchMedia('(max-width: 1023px)').matches;
            const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

            if (reduceMotion || !hasGsap) {
                techSection.classList.add('technology-static');
                return;
            }

            if (mobileLayout) {
                techSection.classList.add('technology-carousel');

                // Initialize Mobile Carousel Dot Navigation
                const container = techSection.querySelector('.technology-container');
                const dots = techSection.querySelectorAll('.mobile-dot');
                const prevBtn = techSection.querySelector('#mobile-carousel-prev');
                const nextBtn = techSection.querySelector('#mobile-carousel-next');

                if (container && dots.length) {
                    const updateButtons = (index) => {
                        if (prevBtn) {
                            if (index === 0) {
                                prevBtn.classList.add('opacity-0', 'pointer-events-none');
                            } else {
                                prevBtn.classList.remove('opacity-0', 'pointer-events-none');
                            }
                        }
                        if (nextBtn) {
                            if (index === dots.length - 1) {
                                nextBtn.classList.add('opacity-0', 'pointer-events-none');
                            } else {
                                nextBtn.classList.remove('opacity-0', 'pointer-events-none');
                            }
                        }
                    };

                    container.addEventListener('scroll', () => {
                        const width = container.clientWidth;
                        const index = Math.round(container.scrollLeft / width);
                        dots.forEach((dot, idx) => {
                            dot.classList.toggle('mobile-dot-active', idx === index);
                        });

                        // Reset vertical scroll of all slides to top on swipe transition
                        const slides = techSection.querySelectorAll('.slide');
                        slides.forEach(slide => {
                            if (slide.scrollTop !== 0) {
                                slide.scrollTop = 0;
                            }
                        });

                        updateButtons(index);
                    }, { passive: true });

                    dots.forEach((dot, idx) => {
                        dot.addEventListener('click', () => {
                            const width = container.clientWidth;
                            container.scrollTo({
                                left: idx * width,
                                behavior: 'smooth'
                            });
                        });
                    });

                    if (prevBtn) {
                        prevBtn.addEventListener('click', () => {
                            const width = container.clientWidth;
                            const index = Math.round(container.scrollLeft / width);
                            if (index > 0) {
                                container.scrollTo({
                                    left: (index - 1) * width,
                                    behavior: 'smooth'
                                });
                            }
                        });
                    }

                    if (nextBtn) {
                        nextBtn.addEventListener('click', () => {
                            const width = container.clientWidth;
                            const index = Math.round(container.scrollLeft / width);
                            if (index < dots.length - 1) {
                                container.scrollTo({
                                    left: (index + 1) * width,
                                    behavior: 'smooth'
                                });
                            }
                        });
                    }

                    // Initial state set
                    updateButtons(0);
                }
                return;
            }

            gsap.registerPlugin(ScrollTrigger);

            const techContainer = techSection.querySelector('.technology-container');
            const slides = gsap.utils.toArray('.slide', techContainer);
            if (!techContainer || slides.length < 2) return;

            const travelDistance = () => Math.max(0, techContainer.scrollWidth - window.innerWidth);
            const scrollTween = gsap.to(techContainer, {
                x: () => -travelDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: techSection,
                    pin: true,
                    scrub: 0.8,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    end: () => `+=${travelDistance()}`,
                    snap: {
                        snapTo: 1 / (slides.length - 1),
                        duration: { min: 0.18, max: 0.45 },
                        delay: 0.08,
                        ease: 'power2.inOut'
                    }
                }
            });

            const firstSlideTrigger = () => ({
                trigger: techSection,
                start: 'top 72%',
                toggleActions: 'play none none reverse'
            });

            const slideTrigger = (slide) => ({
                trigger: slide,
                containerAnimation: scrollTween,
                start: 'left 72%',
                toggleActions: 'play none none reverse'
            });

            gsap.fromTo('.slide-1-heading',
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: firstSlideTrigger() }
            );
            gsap.set('.slide-1-line', { width: 200, transformOrigin: 'center' });
            gsap.fromTo('.slide-1-line',
                { scaleX: 0 },
                { scaleX: 1, duration: 1, ease: 'power3.out', delay: 0.15, scrollTrigger: firstSlideTrigger() }
            );
            gsap.fromTo('.slide-1-desc',
                { autoAlpha: 0, y: 18 },
                { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.25, scrollTrigger: firstSlideTrigger() }
            );

            gsap.fromTo('.slide-2-heading, .slide-2-desc',
                { autoAlpha: 0, x: -42 },
                { autoAlpha: 1, x: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, scrollTrigger: slideTrigger(slides[1]) }
            );
            gsap.fromTo('.slide-2-cards > div',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: slideTrigger(slides[1]) }
            );

            gsap.fromTo('.slide-3-heading, .slide-3-desc',
                { autoAlpha: 0, y: 42 },
                { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, scrollTrigger: slideTrigger(slides[2]) }
            );
            gsap.fromTo('.slide-3-cards > div',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.7, stagger: 0.12, ease: 'power2.out', scrollTrigger: slideTrigger(slides[2]) }
            );

            gsap.fromTo('.slide-4-heading, .slide-4-desc',
                { autoAlpha: 0, x: -42 },
                { autoAlpha: 1, x: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12, scrollTrigger: slideTrigger(slides[3]) }
            );
            gsap.fromTo('.slide-4-timeline',
                { scaleY: 0, transformOrigin: 'top' },
                { scaleY: 1, duration: 1, ease: 'power2.out', scrollTrigger: slideTrigger(slides[3]) }
            );
            gsap.fromTo('.slide-4-cards > div',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.7, stagger: 0.14, ease: 'power2.out', scrollTrigger: slideTrigger(slides[3]) }
            );

            gsap.fromTo('.slide-5-heading',
                { autoAlpha: 0, y: 36 },
                { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', scrollTrigger: slideTrigger(slides[4]) }
            );
            gsap.fromTo('.slide-5-grid > div',
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.6, stagger: { amount: 0.42, from: 'center' }, ease: 'power2.out', scrollTrigger: slideTrigger(slides[4]) }
            );

            window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => ScrollTrigger.refresh());
            }
        });
    </script>

</body>

</html>
