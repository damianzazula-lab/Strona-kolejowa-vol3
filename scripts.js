// ELTRON Railway Solutions - Interactive Landing Page
// JavaScript for enhanced user experience
// Updated: 2026-02-11 - Accessibility, Performance, Enhanced UX

document.addEventListener('DOMContentLoaded', function() {
    console.log('ELTRON Railway Solutions loaded - v2.0');

    // ===================================
    // Smooth scrolling dla anchor links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Focus na target dla accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            }
        });
    });

    // ===================================
    // Highlight aktywnej sekcji w nawigacji
    // ===================================
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Throttle scroll event dla performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveNav();
        });
    });

    // ===================================
    // Enhanced tooltips dla hotspotów
    // ===================================
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hotspot => {
        // Keyboard accessibility
        hotspot.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = this.getAttribute('href');
            }
        });

        // Enhanced hover feedback
        hotspot.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            // Announce dla screen readers
            const label = this.querySelector('.hotspot-label');
            if (label) {
                this.setAttribute('aria-label', label.textContent);
            }
        });
    });

    // ===================================
    // Intersection Observer dla animacji fade-in
    // ===================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Unobserve po animacji dla performance
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Obsługuj wszystkie elementy do animacji
    const animatedElements = document.querySelectorAll(
        '.product-card, .infra-card, .expert-card, .knowledge-card, .manufacturer-logo'
    );
    animatedElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // ===================================
    // Formularz kontaktowy - zaawansowana walidacja
    // ===================================
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        // Realtime validation
        const emailInput = contactForm.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateEmail(this);
            });
        }

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Pobierz wartości
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();

            // Walidacja
            let isValid = true;
            let errorMessage = '';

            if (!name || name.length < 2) {
                isValid = false;
                errorMessage += 'Proszę podać pełne imię i nazwisko (min. 2 znaki).\n';
            }

            if (!email || !isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Proszę podać poprawny adres email.\n';
            }

            if (!message || message.length < 10) {
                isValid = false;
                errorMessage += 'Wiadomość musi zawierać co najmniej 10 znaków.\n';
            }

            if (!isValid) {
                showFormError(errorMessage);
                return false;
            }

            // Animacja sukcesu
            showFormSuccess('Dziękujemy za wiadomość! Skontaktujemy się w ciągu 24h.');
            
            // Tu może być rzeczywiste wysłanie formularza
            // this.submit();
        });
    }

    // ===================================
    // Helper functions
    // ===================================
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validateEmail(input) {
        if (input.value && !isValidEmail(input.value)) {
            input.style.borderColor = '#d9534f';
            input.setAttribute('aria-invalid', 'true');
        } else {
            input.style.borderColor = '#5cb85c';
            input.setAttribute('aria-invalid', 'false');
        }
    }

    function showFormError(message) {
        // Twórz lub aktualizuj error message
        let errorDiv = document.querySelector('.form-error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.style.cssText = `
                background-color: #f8d7da;
                color: #721c24;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #f5c6cb;
            `;
            contactForm.insertBefore(errorDiv, contactForm.firstChild);
        }
        errorDiv.textContent = message;
        errorDiv.focus();
    }

    function showFormSuccess(message) {
        let successDiv = document.querySelector('.form-success-message');
        if (!successDiv) {
            successDiv = document.createElement('div');
            successDiv.className = 'form-success-message';
            successDiv.setAttribute('role', 'status');
            successDiv.style.cssText = `
                background-color: #d4edda;
                color: #155724;
                padding: 15px;
                border-radius: 5px;
                margin-bottom: 20px;
                border: 1px solid #c3e6cb;
            `;
            contactForm.insertBefore(successDiv, contactForm.firstChild);
        }
        successDiv.textContent = message;
        successDiv.focus();

        // Wyczyść formularz
        contactForm.reset();

        // Ukryj po 5 sekundach
        setTimeout(() => {
            successDiv.style.opacity = '0';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }

    // ===================================
    // Mobile menu toggle
    // ===================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            const nav = document.querySelector('.main-nav');
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            nav.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // ===================================
    // Lazy loading optimization
    // ===================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Force reload if needed
        });
    } else {
        // Fallback dla starszych przeglądarek
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // ===================================
    // Performance monitoring (opcjonalne)
    // ===================================
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page load time: ${pageLoadTime}ms`);
            }, 0);
        });
    }
});

// ===================================
// Funkcja do filtrowania produktów
// ===================================
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    let visibleCount = 0;

    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
            product.classList.add('fade-in');
            visibleCount++;
        } else {
            product.style.display = 'none';
        }
    });

    // Announce dla screen readers
    announceToScreenReader(`Wyświetlono ${visibleCount} produktów`);
}

// ===================================
// Funkcja do wyszukiwania w bazie wiedzy
// ===================================
function searchKnowledge(query) {
    const knowledgeItems = document.querySelectorAll('.knowledge-list li');
    const searchQuery = query.toLowerCase().trim();
    let visibleCount = 0;

    if (!searchQuery) {
        // Pokaż wszystko jeśli puste
        knowledgeItems.forEach(item => {
            item.style.display = 'block';
            visibleCount++;
        });
    } else {
        knowledgeItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchQuery)) {
                item.style.display = 'block';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Announce dla screen readers
    announceToScreenReader(`Znaleziono ${visibleCount} wyników dla: ${query}`);
}

// ===================================
// Helper: Screen reader announcements
// ===================================
function announceToScreenReader(message) {
    let announcer = document.querySelector('.sr-announcer');
    if (!announcer) {
        announcer = document.createElement('div');
        announcer.className = 'sr-announcer';
        announcer.setAttribute('role', 'status');
        announcer.setAttribute('aria-live', 'polite');
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
    }
    announcer.textContent = message;
}

// ===================================
// Export functions dla global scope
// ===================================
window.filterProducts = filterProducts;
window.searchKnowledge = searchKnowledge;
