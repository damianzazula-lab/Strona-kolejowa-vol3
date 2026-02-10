// ELTRON Railway Solutions - Interactive Landing Page
// JavaScript for enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    console.log('ELTRON Railway Solutions loaded');

    // Smooth scrolling dla anchor links
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
                }
            }
        });
    });

    // Highlight aktywnej sekcji w nawigacji podczas scrollowania
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Tooltip dla hotspotów
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('mouseenter', function() {
            const tooltip = this.getAttribute('data-tooltip');
            if (tooltip) {
                this.style.cursor = 'pointer';
            }
        });
    });

    // Animacja wejścia elementów
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Obserwuj karty produktowe
    document.querySelectorAll('.product-card, .infra-card, .expert-card, .knowledge-card').forEach(card => {
        observer.observe(card);
    });

    // Formularz kontaktowy - walidacja
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Pobierz wartości
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Prosta walidacja
            if (!name || !email || !message) {
                alert('Proszę wypełnić wszystkie wymagane pola.');
                return false;
            }

            // Walidacja email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Proszę podać poprawny adres email.');
                return false;
            }

            alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
            // Tu może być rzeczywiste wysłanie formularza
            // this.submit();
        });
    }

    // Mobile menu toggle (jeśli będzie potrzebne)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('active');
        });
    }
});

// Funkcja do filtrowania produktów (dla przyszłych rozszerzeń)
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        if (category === 'all' || product.classList.contains(category)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Funkcja do wyszukiwania w bazie wiedzy
function searchKnowledge(query) {
    const knowledgeItems = document.querySelectorAll('.knowledge-list li');
    query = query.toLowerCase();

    knowledgeItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
