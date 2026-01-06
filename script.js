// Smooth scrolling for navigation links
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

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        let isValid = true;
        let errorMessage = '';

        // Name validation
        if (!name) {
            isValid = false;
            errorMessage += 'Name is required.\n';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            isValid = false;
            errorMessage += 'Email is required.\n';
        } else if (!emailRegex.test(email)) {
            isValid = false;
            errorMessage += 'Please enter a valid email address.\n';
        }

        // Message validation
        if (!message) {
            isValid = false;
            errorMessage += 'Message is required.\n';
        }

        if (isValid) {
            // For demonstration, show success message
            // In a real application, this would submit to the server
            alert('Thank you for your message! (Note: This is a demo. For backend integration, see ContactHandler.java)');
            contactForm.reset();
        } else {
            alert('Please correct the following errors:\n' + errorMessage);
        }
    });
}

// Animate progress bars on scroll
function animateProgressBars() {
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');

    if (skillsSection && progressBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width') || '0%';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
}

// Fade in sections on scroll
function fadeInOnScroll() {
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Background animation controls
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.width = Math.random() * 6 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 20 + 20) + 's';
    particle.style.animationDelay = Math.random() * 20 + 's';

    document.querySelector('.background-animation').appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        particle.remove();
    }, 40000);
}

// Create additional particles periodically
function startParticleGeneration() {
    setInterval(createParticle, 3000);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
    fadeInOnScroll();
    startParticleGeneration();
});



// Performance optimization - reduce animations on low-performance devices
function optimizeAnimations() {
    const isLowPerformance = navigator.hardwareConcurrency <= 2 ||
                           /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isLowPerformance) {
        // Reduce particle count and animation complexity
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 2) particle.remove();
        });

        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            if (index > 1) shape.remove();
        });
    }
}

// Run optimization check
optimizeAnimations();
