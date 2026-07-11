document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('site-header');
    if (header) {
        // Inner pages have the 'theme-page' class on the body
        const isInnerPage = document.body.classList.contains('theme-page');
        const is404Page = document.body.classList.contains('page-404');

        const handleScroll = () => {
            // For inner pages, threshold is 20. 
            // For homepage, threshold is 1300 on desktop, but dynamically based on screen height on mobile.
            // For 404 page, it's always -1 so it's always scrolled.
            const scrollThreshold = is404Page ? -1 : (isInnerPage ? 20 : (window.innerWidth < 768 ? window.innerHeight * 0.8 : 1350));

            if (window.scrollY > scrollThreshold) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.getElementById('mobile-navigation');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

            // Toggle aria-expanded for accessibility
            menuToggle.setAttribute('aria-expanded', !isExpanded);

            // Toggle active class for hamburger animation
            menuToggle.classList.toggle('is-active');

            // Toggle hidden attribute on nav
            if (isExpanded) {
                mobileNav.setAttribute('hidden', '');
                document.body.style.overflow = ''; // Restore scrolling
            } else {
                mobileNav.removeAttribute('hidden');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });

        // Close mobile nav when a link is clicked
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('is-active');
                mobileNav.setAttribute('hidden', '');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Automatically close mobile menu if screen is resized to desktop view
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && !mobileNav.hasAttribute('hidden')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('is-active');
                mobileNav.setAttribute('hidden', '');
                document.body.style.overflow = '';
            }
        });
    }

    // --- Global Scroll Animations ---
    const animatedElements = document.querySelectorAll('.fade-up-element, .info-card, .purpose-card, .page-hero h1, .page-hero p, article h2, article p, article img, .form-group, .contact-info');
    
    // Add base class for animation
    animatedElements.forEach(el => {
        el.classList.add('fade-up-element');
    });

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });
});
