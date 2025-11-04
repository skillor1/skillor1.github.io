// Skillor - Main JavaScript

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.width = Math.random() * 5 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = Math.random() * 10 + 10 + 's';
            particlesContainer.appendChild(particle);
        }
    }
}

// Initialize particles on page load
createParticles();

// Initialize header and footer for tool pages
function initializeToolPage() {
    // Check if we're on a tool page (not index.html)
    const isToolPage = !window.location.pathname.endsWith('index.html') && 
                       !window.location.pathname.endsWith('/') &&
                       window.location.pathname.includes('.html');
    
    // Don't add extra headers/footers if they already exist in the HTML
    // Category pages already have their own navbar
    if (isToolPage) {
        // Only check if we need to add elements for pages without them
        // Skip this function since category pages already have navbars
        return;
    }
}

// Create header element
function createHeader() {
    const header = document.createElement('header');
    header.innerHTML = `
        <div class="header-content">
            <div class="logo">Skillor</div>
            <nav>
                <a href="./index.html">Home</a>
                <a href="./index.html#categories">Categories</a>
                <a href="./index.html#tools">Tools</a>
                <a href="./index.html#about">About</a>
            </nav>
        </div>
    `;
    return header;
}

// Create footer element
function createFooter() {
    const footer = document.createElement('footer');
    footer.innerHTML = `
        <div class="footer-content">
            <div class="footer-section">
                <h3>Skillor</h3>
                <p>Master real skills with interactive practice tools. Learn programming, aptitude, typing, and more.</p>
                <div class="social-links">
                    <a href="#" aria-label="Twitter">𝕏</a>
                    <a href="#" aria-label="GitHub">⚙</a>
                    <a href="#" aria-label="LinkedIn">in</a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="./index.html">Home</a></li>
                    <li><a href="./index.html#categories">Categories</a></li>
                    <li><a href="./index.html#tools">Tools</a></li>
                    <li><a href="./index.html#about">About Us</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Categories</h3>
                <ul class="footer-links">
                    <li><a href="./programming.html">Programming</a></li>
                    <li><a href="./aptitude.html">Aptitude</a></li>
                    <li><a href="./typing.html">Typing</a></li>
                    <li><a href="./ai-tools.html">AI Tools</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Support</h3>
                <ul class="footer-links">
                    <li><a href="#">Help Center</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} Skillor. All rights reserved. Built with ❤️ for learners.</p>
        </div>
    `;
    return footer;
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeToolPage);
} else {
    initializeToolPage();
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
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

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

if (revealElements.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Counter animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    };
    
    updateCounter();
}

// Utility: Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// FAQ Toggle Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize FAQ when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeFAQ);
} else {
    initializeFAQ();
}

// Export utilities
window.Skillor = {
    showNotification,
    animateCounter,
    initializeFAQ
};
