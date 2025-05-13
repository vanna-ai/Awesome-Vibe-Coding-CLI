// Smooth scrolling for anchor links
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

// Mobile menu
function createMobileMenu() {
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Create menu icon
    const menuIcon = document.createElement('svg');
    menuIcon.setAttribute('viewBox', '0 0 24 24');
    menuIcon.setAttribute('width', '24');
    menuIcon.setAttribute('height', '24');
    
    const path = document.createElement('path');
    path.setAttribute('fill', 'currentColor');
    path.setAttribute('d', 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z');
    
    menuIcon.appendChild(path);
    mobileMenuButton.appendChild(menuIcon);

    const navbar = document.querySelector('.navbar .container');
    navbar.appendChild(mobileMenuButton);

    mobileMenuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        const isExpanded = navLinks.classList.contains('active');
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
    });
}

// Form handling
function handleFormSubmission() {
    const betaForm = document.querySelector('.beta-form');
    if (!betaForm) return;

    betaForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = betaForm.querySelector('button');
        const input = betaForm.querySelector('input');
        const originalText = button.textContent;

        try {
            button.textContent = 'Submitting...';
            button.disabled = true;
            input.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create success message
            const successDiv = document.createElement('div');
            successDiv.className = 'success-message';
            successDiv.setAttribute('role', 'alert');
            
            const checkIcon = document.createElement('svg');
            checkIcon.setAttribute('viewBox', '0 0 24 24');
            checkIcon.setAttribute('width', '24');
            checkIcon.setAttribute('height', '24');
            
            const checkPath = document.createElement('path');
            checkPath.setAttribute('fill', 'currentColor');
            checkPath.setAttribute('d', 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z');
            
            checkIcon.appendChild(checkPath);
            successDiv.appendChild(checkIcon);
            
            const message = document.createTextNode('Thanks for joining! Check your email for next steps.');
            successDiv.appendChild(message);

            betaForm.innerHTML = '';
            betaForm.appendChild(successDiv);
        } catch (error) {
            button.textContent = originalText;
            button.disabled = false;
            input.disabled = false;
            alert('Something went wrong. Please try again.');
        }
    });
}

// Code preview typing animation
function setupTypingAnimation() {
    const codePreview = document.querySelector('.code-preview');
    if (!codePreview) return;

    const codeText = codePreview.innerHTML;
    codePreview.innerHTML = '';
    let i = 0;

    function typeCode() {
        if (i < codeText.length) {
            codePreview.innerHTML += codeText.charAt(i);
            i++;
            requestAnimationFrame(() => setTimeout(typeCode, 50));
        }
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeCode();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(codePreview);
}

// Scroll animations
function setupScrollAnimations() {
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    document.querySelectorAll('.feature-card, .use-case-card').forEach(card => {
        animateOnScroll.observe(card);
    });
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-nav');
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    handleFormSubmission();
    setupTypingAnimation();
    setupScrollAnimations();
    setupKeyboardNavigation();
});