document.addEventListener('DOMContentLoaded', function () {

    // ===== STICKY NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE NAV TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });

    // Close mobile nav when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('active');
        });
    });

    // ===== SCROLL REVEAL (Intersection Observer) =====
    const revealElements = document.querySelectorAll(
        '.section-title, .section-subtitle, .cap-card, .stat-item, .project-card, .cert-item, .contact-form'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing after revealed once
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    const duration = 2000; // total animation time in ms
                    const stepTime = Math.abs(Math.floor(duration / target));
                    let current = 0;

                    const timer = setInterval(function () {
                        current += Math.ceil(target / (duration / 16));
                        if (current >= target) {
                            el.textContent = target.toLocaleString();
                            clearInterval(timer);
                        } else {
                            el.textContent = current.toLocaleString();
                        }
                    }, stepTime);

                    counterObserver.unobserve(el);
                }
            });
        },
        {
            threshold: 0.7
        }
    );

    statNumbers.forEach(function (el) {
        counterObserver.observe(el);
    });

    // ===== SMOOTH ANCHOR SCROLL (already via CSS scroll-behavior, but ensure JS fallback) =====
    // CSS handles smooth scrolling. No additional JS needed.

});