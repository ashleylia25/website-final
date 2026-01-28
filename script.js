document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
window.addEventListener('scroll', () => {
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        const href = link.getAttribute('href');
        const section = document.querySelector(href);

        if (section) {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 150 && rect.bottom >= 150) {
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 150 && rect.bottom >= 150) {
            sections.forEach(s => s.classList.remove('current'));
            section.classList.add('current');

            const id = section.getAttribute('id');
            links.forEach(l => l.classList.remove('active'));
            document.querySelector(`a[href="#${id}"]`)?.classList.add('active');
        }
    });
});
function initAnimations() {
    const observerElements = document.querySelectorAll('[data-animate]');

    const observerOptions = {
        threshold: 0.2,     
        rootMargin: '0px 0px -50px 0px' 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-animate');
                entry.target.classList.add(animationType);

                if (entry.target.classList.contains('skill-card')) {
                    const staggerIndex = Array.from(document.querySelectorAll('.skill-card')).indexOf(entry.target);
                    entry.target.classList.add(`animate-stagger-${staggerIndex % 6 + 1}`);
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observerElements.forEach(element => observer.observe(element));
}
document.addEventListener('DOMContentLoaded', initAnimations);