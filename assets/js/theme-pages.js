document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.getElementById('site-header');
    if (header) {
        // Inner pages have the 'theme-page' class on the body
        const isInnerPage = document.body.classList.contains('theme-page');

        const handleScroll = () => {
            // For inner pages, threshold is 20. 
            // For homepage, threshold is 1300 on desktop, but dynamically based on screen height on mobile.
            const scrollThreshold = isInnerPage ? 20 : (window.innerWidth < 768 ? window.innerHeight * 0.8 : 1300);

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
    }
});
