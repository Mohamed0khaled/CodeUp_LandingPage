// Configuration and Controller for Code Up Landing Page
const CONFIG = {
    // App Information
    app: {
        name: "Code Up",
        tagline: "Launch your coding skills to the next level",
        description: "The ultimate coding competition platform where developers battle in real-time challenges and rocket to the top of the leaderboards"
    },
    
    // Developer Information
    developer: {
        name: "Mohamed Khaled",
        title: " iOS and Android Mobile App Developer & Ai Developer",
        bio: "Passionate about creating innovative coding education platforms. Specializing in gamification and competitive programming experiences.",
        email: "azmohamed0909@gmail.com",
        linkedin: "https://linkedin.com/in/mohamed-khaled-46a4b0299",
        github: "https://github.com/Mohamed0khaled",
        portfolio: "https://alexrodriguez.dev"
    },
    
    // Download Links
    downloads: {
        android: {
            url: "https://play.google.com/store/apps/details?id=com.codeup.app",
            filename: "CodeUp-Android-v1.0.0.apk",
            version: "2.1.0",
            size: "45.2 MB"
        },
        ios: {
            url: "https://apps.apple.com/app/code-up/id123456789",
            filename: "CodeUp-iOS-v1.0.0.ipa",
            version: "2.1.0",
            size: "38.7 MB"
        }
    },
    
    // Social Media Links
    social: {
        twitter: "https://twitter.com/codeup_app",
        instagram: "https://www.instagram.com/azmohamed0909/",
        //discord: "https://discord.gg/codeup",
        youtube: "https://www.youtube.com/@cof-mk",
        //reddit: "https://reddit.com/r/CodeUp"
    },
    
    // Demo and Media
    media: {
        demoVideo: "https://www.youtube.com/watch?v=nB9-ZVuMJWw&ab_channel=%D8%B3%D9%8E%D9%83%D9%90%D9%8A%D9%86%D9%8E%D8%A9-Sakena",
        screenshots: [
            "https://codeup.dev/assets/screenshots/screen1.png",
            "https://codeup.dev/assets/screenshots/screen2.png",
            "https://codeup.dev/assets/screenshots/screen3.png"
        ],
        appIcon: "https://codeup.dev/assets/icon-512.png"
    },
    
    // Contact Information
    contact: {
        email: "azmohamed0909@gmail.com",
        support: "support@codeup.dev",
        business: "partnerships@codeup.dev",
        phone: "01008951489",
        address: "Cairo, Egypt"
    }
};

// Download Handler Functions
function downloadApp(platform = 'auto') {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let downloadUrl = '';
    let filename = '';
    
    // Auto-detect platform if not specified
    if (platform === 'auto') {
        if (/android/i.test(userAgent)) {
            platform = 'android';
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            platform = 'ios';
        } else {
            // Default to Android for all other platforms
            platform = 'android';
        }
    }
    
    // Get download URL based on platform
    switch (platform) {
        case 'android':
            downloadUrl = CONFIG.downloads.android.url;
            filename = CONFIG.downloads.android.filename;
            break;
        case 'ios':
            downloadUrl = CONFIG.downloads.ios.url;
            filename = CONFIG.downloads.ios.filename;
            break;
        default:
            downloadUrl = CONFIG.downloads.android.url;
            filename = CONFIG.downloads.android.filename;
    }
    
    // Analytics tracking (replace with your analytics service)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'App',
            'event_label': platform,
            'value': 1
        });
    }
    
    // Show download notification
    showDownloadNotification(platform, filename);
    
    // Update QR code to show the download URL for this platform
    updateQRCode(downloadUrl);
    
    // For mobile app stores, open in new tab
    window.open(downloadUrl, '_blank');
}

// Show download notification
function showDownloadNotification(platform, filename) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #007AFF, #5856D6);
        color: white;
        padding: 1rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 122, 255, 0.3);
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        max-width: 350px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5rem;">🚀</span>
            <div>
                <div style="font-weight: 600;">Download Starting...</div>
                <div style="font-size: 12px; opacity: 0.9;">${filename}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Contact form handler
function handleContactForm(formData) {
    // Replace with your actual form submission logic
    // This could be a serverless function, EmailJS, or another service
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // Example: Send to a serverless function
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Contact form submitted:', result);
    })
    .catch(error => {
        console.error('Error submitting contact form:', error);
    });
    
    return true; // Return true to show success message
}

// QR Code generator and updater
function updateQRCode(url) {
    if (typeof generateQRCode === 'function') {
        generateQRCode(url, 'qrCode');
    }
}

// Initialize page content with config data
function initializePageContent() {
    // Update app name and tagline
    document.title = `${CONFIG.app.name} - ${CONFIG.app.tagline}`;
    
    // Update logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.textContent = CONFIG.app.name;
    }
    
    // Update hero section
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.textContent = CONFIG.app.name;
    }
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        heroSubtitle.textContent = CONFIG.app.description;
    }
    
    // Update developer information
    const developerName = document.querySelector('.developer-card h3');
    if (developerName) {
        developerName.textContent = CONFIG.developer.name;
    }
    
    const developerTitle = document.querySelector('.developer-card p:first-of-type');
    if (developerTitle) {
        developerTitle.textContent = CONFIG.developer.title;
    }
    
    const developerBio = document.querySelector('.developer-card p:last-of-type');
    if (developerBio) {
        developerBio.textContent = CONFIG.developer.bio;
    }
    
    // Update social links
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks.length >= 3) {
        socialLinks[0].href = `mailto:${CONFIG.developer.email}`;
        socialLinks[1].href = CONFIG.developer.linkedin;
        socialLinks[2].href = CONFIG.developer.github;
    }
    
    // Update app preview
    const appName = document.querySelector('.app-name');
    if (appName) {
        appName.textContent = CONFIG.app.name;
    }
    
    const appTagline = document.querySelector('.app-tagline');
    if (appTagline) {
        appTagline.textContent = CONFIG.app.tagline;
    }
    
    // Update QR code with current download URL
    const defaultDownloadUrl = CONFIG.downloads.android.url;
    updateQRCode(defaultDownloadUrl);
}

// QR Code generator (simple placeholder - replace with actual QR code library)
function generateQRCode() {
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        // This is a placeholder - use a real QR code library like qrcode.js
        qrCode.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📱</div>
            <div style="font-size: 0.8rem;">Scan to Download</div>
        `;
    }
}

// Analytics and tracking
function trackUserInteraction(action, category, label) {
    // Replace with your analytics service (Google Analytics, Mixpanel, etc.)
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log(`Analytics: ${action} - ${category} - ${label}`);
}

// Feature flags for A/B testing
const FEATURES = {
    rocketAnimations: true,
    particleEffects: true,
    typewriterEffect: true,
    advancedParallax: true
};

// Initialize controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePageContent();
    generateQRCode();
    
    // Track page view
    trackUserInteraction('page_view', 'Landing Page', 'Initial Load');
});

// Export functions for use in other files
window.CodeUpController = {
    CONFIG,
    downloadApp,
    handleContactForm,
    trackUserInteraction,
    updateQRCode,
    FEATURES
};
