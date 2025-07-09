// Animated code rain effect
function createCodeRain() {
    const codeRain = document.querySelector('.code-rain');
    const codeSnippets = [
        'function solve() {', 'if (condition) {', 'return result;', 'for (let i = 0;', 'console.log();', 
        'const array = [];', 'while (true) {', 'break;', 'continue;', '// TODO: fix bug',
        'import React from', 'export default', 'async function', 'await fetch()', 'try { catch (e)',
        'class Solution {', 'public static void', 'def main():', 'print("Hello")', 'lambda x: x**2',
        'git commit -m', 'npm install', 'docker run', 'SELECT * FROM', 'CREATE TABLE'
    ];

    for (let i = 0; i < 25; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeLine.style.left = Math.random() * 100 + '%';
        codeLine.style.animationDuration = (Math.random() * 3 + 2) + 's';
        codeLine.style.animationDelay = Math.random() * 2 + 's';
        codeRain.appendChild(codeLine);
    }
}

// QR Code generation function
function generateQRCode(text, elementId) {
    const qrContainer = document.getElementById(elementId);
    if (!qrContainer) return;

    // Clear existing content
    qrContainer.innerHTML = '';

    // Simple QR code generation using a web service
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=130x130&data=${encodeURIComponent(text)}`;
    
    const img = document.createElement('img');
    img.src = qrCodeURL;
    img.alt = 'QR Code';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '10px';
    img.style.objectFit = 'contain';
    
    // Add error handling
    img.onerror = function() {
        qrContainer.innerHTML = `
            <div style="text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
                <div>QR Code</div>
                <div style="font-size: 0.7rem; margin-top: 0.5rem;">Loading...</div>
            </div>
        `;
    };

    qrContainer.appendChild(img);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Enhanced 3D App Preview Interactions
function enhance3DAppPreview() {
    const appScreen = document.querySelector('.app-screen');
    const phoneFrame = document.querySelector('.phone-mockup');
    
    if (!appScreen || !phoneFrame) return;
    
    // Add mouse tracking for enhanced 3D effect
    phoneFrame.addEventListener('mousemove', (e) => {
        const rect = phoneFrame.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const rotateX = (mouseY / rect.height) * -10;
        const rotateY = (mouseX / rect.width) * 10;
        
        phoneFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });
    
    phoneFrame.addEventListener('mouseleave', () => {
        phoneFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    });
    
    // Add scroll-based 3D rotation
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const scrollDiff = scrollY - lastScrollY;
        
        // Only apply effect when hero section is visible
        const heroSection = document.querySelector('.hero');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            const rotationZ = Math.sin(scrollY * 0.001) * 2;
            const translateY = scrollDiff * 0.1;
            
            appScreen.style.transform = `translateZ(0) rotateZ(${rotationZ}deg) translateY(${translateY}px)`;
        }
        
        lastScrollY = scrollY;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create code rain
    createCodeRain();
    
    // Generate QR code for download
    const downloadUrl = window.CodeUpController?.CONFIG?.downloads?.android?.url || 'https://codeup.dev/download';
    generateQRCode(downloadUrl, 'qrCode');

    // Observe section titles and feature cards
    const animatedElements = document.querySelectorAll('.section-title, .feature-card');
    animatedElements.forEach(el => observer.observe(el));

    // Animate feature cards with stagger
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transitionDelay = `${index * 0.2}s`;
        }, 100);
    });
    
    // Initialize 3D app preview enhancements
    enhance3DAppPreview();
});

// Back to top button
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

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

// Modal functions
function openModal() {
    document.getElementById('demoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('demoModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('demoModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    // Show success message with enhanced animation
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(45deg, var(--accent-green), var(--accent-blue))';
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = 'linear-gradient(45deg, var(--accent-blue), var(--accent-purple))';
        this.reset();
    }, 3000);
});

// Enhanced interactive hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
        this.style.boxShadow = '0 25px 50px rgba(0, 122, 255, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.1)';
    });
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
    }
    
    // Subtle parallax effect for the title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add dynamic glow effect to CTA button on scroll
window.addEventListener('scroll', () => {
    const ctaButton = document.querySelector('.cta-button');
    const scrollProgress = window.pageYOffset / (document.body.scrollHeight - window.innerHeight);
    
    if (scrollProgress > 0.1) {
        ctaButton.style.boxShadow = `0 15px 40px rgba(0, 122, 255, ${0.3 + scrollProgress * 0.4})`;
    }
});

// Add typing effect to hero subtitle (fixed to not disappear)
function typeWriter(element, text, speed = 50) {
    // Store original text and hide it initially
    element.style.opacity = '0';
    element.setAttribute('data-original-text', text);
    element.textContent = '';
    
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    // Show element and start typing
    setTimeout(() => {
        element.style.opacity = '1';
        type();
    }, 100);
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 40);
        }, 1000);
    }
});

// Add particle effect on button clicks
function createParticles(x, y) {
    const colors = ['#007AFF', '#5856D6', '#30D158', '#FF9500'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 6;
        const velocity = 2 + Math.random() * 2;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        function animate() {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            opacity -= 0.02;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        }
        
        animate();
    }
}

// Add particle effects to buttons
document.querySelectorAll('.cta-button, .download-button, .submit-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        createParticles(e.clientX, e.clientY);
    });
});

// Add CSS for trail fade animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-50px); }
    }
`;
document.head.appendChild(style);
