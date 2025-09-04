// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Video Modal Functionality
const videoModal = document.getElementById('videoModal');
const modalClose = document.getElementById('modalClose');
const videoWrapper = document.getElementById('videoWrapper');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const workItems = document.querySelectorAll('.work-item');

// Debug: Check if elements exist
console.log('Video modal elements check:');
console.log('videoModal:', videoModal);
console.log('modalClose:', modalClose);
console.log('videoWrapper:', videoWrapper);
console.log('modalTitle:', modalTitle);
console.log('modalDescription:', modalDescription);
console.log('workItems count:', workItems.length);

// Ensure body overflow is reset on page load
document.body.style.overflow = '';
document.body.style.overflowX = '';

// Sample video data with YouTube and Vimeo links
const videoData = {
    netflix: {
        title: 'Netflix Original Series Trailer - Editor',
        description: 'As lead editor for this Netflix original series trailer, I crafted a high-octane narrative that builds tension while showcasing key plot points without revealing spoilers. The edit combines rapid cuts with strategic moments of silence to create maximum impact, resulting in over 5 million views in the first week.',
        videoUrl: 'https://www.youtube.com/embed/viDRasOhQBw',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    netflix2: {
        title: 'Netflix Documentary Series - Editor',
        description: 'Lead editor for this compelling Netflix documentary series. The editing approach emphasized emotional storytelling through careful pacing and rhythm, weaving together interviews, archival footage, and dramatic recreations to create a cohesive narrative that captivated audiences worldwide.',
        videoUrl: 'https://www.youtube.com/embed/qz4TYHKJ89w',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    dicks: {
        title: "Dick's Sporting Goods Commercial - Editor",
        description: "As editor for this Dick's Sporting Goods campaign, I created dynamic, high-energy cuts that showcase athletic performance and product features. The edit emphasizes motion and impact, perfectly capturing the spirit of sports and competition while maintaining brand consistency across multiple platform deliverables.",
        videoUrl: 'https://www.youtube.com/embed/d_3zPj3HQnA',
        platform: 'youtube',
        client: "Dick's Sporting Goods",
        role: 'Editor'
    },
    dicks2: {
        title: "Dick's Sporting Goods - Videographer & Editor",
        description: "Served as both videographer and editor for this Dick's Sporting Goods campaign. Captured dynamic footage on location, then crafted the final edit to showcase athletic excellence and product innovation. The dual role allowed for seamless integration of creative vision from shoot to final delivery.",
        videoUrl: 'https://www.youtube.com/embed/E8wUAvOcImk',
        platform: 'youtube',
        client: "Dick's Sporting Goods",
        role: 'Videographer & Editor'
    },
    dicks3: {
        title: "Dick's Sporting Goods Promo - Editor",
        description: "Editor for this impactful Dick's Sporting Goods promotional campaign. Created a compelling narrative through strategic editing that highlights product quality and athletic achievement. The final cut successfully balanced brand messaging with emotional storytelling to drive customer engagement.",
        videoUrl: 'https://www.youtube.com/embed/U_uZx6JuYXA',
        platform: 'youtube',
        client: "Dick's Sporting Goods",
        role: 'Editor'
    },
    sony: {
        title: 'Sony Music Video - Artist Showcase',
        description: 'A dynamic music video that seamlessly blends performance footage with narrative elements. The editing rhythm was carefully synchronized with the beat, creating a visceral connection between the music and visuals. Multiple formats were delivered for various platforms.',
        videoUrl: 'https://player.vimeo.com/video/347119375', // Replace with actual Vimeo video ID
        platform: 'vimeo'
    },
    nike: {
        title: 'Nike Social Media Campaign',
        description: 'Fast-paced, vertical-format edits optimized for TikTok and Instagram Reels. Each cut was designed to capture attention within the first 3 seconds while maintaining brand consistency. The campaign generated over 10 million views across platforms.',
        videoUrl: 'https://www.youtube.com/embed/M7lc1UVf-VE', // Replace with actual YouTube video ID
        platform: 'youtube'
    },
    shortfilm: {
        title: 'Original Short Film - Writer/Director/Cinematographer/Editor',
        description: 'A passion project where I served as co-writer, director, cinematographer, and editor. This short film showcases my complete creative vision from concept to final cut. The project demonstrates my ability to handle all aspects of production, creating a cohesive narrative that has garnered recognition at film festivals.',
        videoUrl: 'https://www.youtube.com/embed/C6Hnr7fw5IM',
        platform: 'youtube',
        role: 'Co-Writer / Director / Cinematographer / Editor'
    },
    duolingo: {
        title: 'Duolingo Campaign - Director/DP/Editor/Animator',
        description: 'Served as director, cinematographer, editor, and animator for this innovative Duolingo campaign. Combined live-action footage with animated elements to create an engaging educational narrative that aligns with Duolingo\'s playful brand identity while effectively communicating language learning concepts.',
        videoUrl: 'https://www.youtube.com/embed/HWyga5E3Kpg',
        platform: 'youtube',
        client: 'Duolingo',
        role: 'Director / DP / Editor / Animator'
    },
    duolingo2: {
        title: 'Duolingo Social Content - Director/DP/Editor/Animator',
        description: 'Created dynamic social media content for Duolingo, handling all aspects from direction and cinematography to editing and animation. This project showcased the app\'s features through visually engaging storytelling, contributing to increased user engagement and brand awareness across digital platforms.',
        videoUrl: 'https://www.youtube.com/embed/JFMcCLt7Vr8',
        platform: 'youtube',
        client: 'Duolingo',
        role: 'Director / DP / Editor / Animator'
    },
    unitedway: {
        title: 'United Way Campaign - Editor/Animator',
        description: 'As editor and animator for United Way through Hullaballoo Agency, I crafted an emotionally resonant narrative that highlights community impact and social change. The project combined thoughtful editing with purposeful animation to create a compelling call-to-action that drives donor engagement and volunteer participation.',
        videoUrl: 'https://www.youtube.com/embed/TSarIt77ZCM',
        platform: 'youtube',
        client: 'United Way (Hullaballoo Agency)',
        role: 'Editor / Animator'
    },
    pozitivf: {
        title: 'PozitIVF - Editor/Animator',
        description: 'Editor and animator for PozitIVF through Hullaballoo Agency, creating sensitive and informative content for fertility services. The project required a delicate balance of professionalism and empathy, using thoughtful editing and subtle animation to convey hope and medical expertise while maintaining emotional resonance with prospective patients.',
        videoUrl: 'https://www.youtube.com/embed/nb65P731l_c',
        platform: 'youtube',
        client: 'PozitIVF (Hullaballoo Agency)',
        role: 'Editor / Animator'
    },
    documentary: {
        title: 'Documentary Feature - Human Stories',
        description: 'A feature-length documentary exploring human resilience. The editing approach prioritized emotional storytelling, using pacing and music to enhance the narrative arc. The film premiered at major festivals and received critical acclaim for its editing.',
        videoUrl: 'https://player.vimeo.com/video/824804225', // Replace with actual Vimeo video ID
        platform: 'vimeo'
    }
};

// Function to create iframe based on platform
function createVideoEmbed(url, platform) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    
    if (platform === 'youtube') {
        // Add YouTube specific parameters for better experience
        const separator = url.includes('?') ? '&' : '?';
        iframe.src = `${url}${separator}autoplay=1&rel=0&modestbranding=1`;
    } else if (platform === 'vimeo') {
        // Add Vimeo specific parameters
        const separator = url.includes('?') ? '&' : '?';
        iframe.src = `${url}${separator}autoplay=1&title=0&byline=0&portrait=0`;
    } else {
        iframe.src = url;
    }
    
    return iframe;
}

workItems.forEach(item => {
    item.addEventListener('click', () => {
        console.log('Work item clicked!');
        const projectId = item.dataset.project;
        console.log('Project ID:', projectId);
        const project = videoData[projectId];
        console.log('Project data:', project);
        
        if (project) {
            console.log('Setting modal content...');
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            
            // Clear previous iframe
            videoWrapper.innerHTML = '';
            console.log('Cleared video wrapper');
            
            // Create and append new iframe
            const iframe = createVideoEmbed(project.videoUrl, project.platform);
            console.log('Created iframe:', iframe);
            videoWrapper.appendChild(iframe);
            console.log('Appended iframe to wrapper');
            
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Modal should now be visible');
        } else {
            console.log('No project data found for:', projectId);
        }
    });
});

modalClose.addEventListener('click', closeModal);
videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeModal();
    }
});

function closeModal() {
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.overflowX = '';
    // Clear iframe to stop video playback
    videoWrapper.innerHTML = '';
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
    }
});

// Initialize EmailJS (You need to replace with your actual IDs)
// Sign up at https://www.emailjs.com to get these IDs
(function() {
    // REPLACE WITH YOUR PUBLIC KEY from EmailJS Dashboard
    emailjs.init("A_T4jQ3_mMyONf3fh"); // Get this from EmailJS Dashboard > Account > API Keys
})();

// Contact Form Handler with Validation
const contactForm = document.getElementById('contactForm');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Form field validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
    }
    
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.push({ field: 'email', message: 'Please enter a valid email address' });
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
    }
    
    return errors;
}

// Show validation error
function showError(field, message) {
    const input = document.getElementById(field);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #ff3333; font-size: 12px; margin-top: 5px; animation: fadeIn 0.3s ease;';
    
    // Remove any existing error
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#ff3333';
    
    // Add shake animation
    input.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

// Clear error
function clearError(field) {
    const input = document.getElementById(field);
    const errorDiv = input.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.style.borderColor = '';
}

// Real-time validation
['name', 'email', 'message'].forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (field) {
        field.addEventListener('blur', () => {
            const value = field.value;
            clearError(fieldId);
            
            if (fieldId === 'name' && value.trim().length < 2) {
                showError(fieldId, 'Name must be at least 2 characters');
            } else if (fieldId === 'email' && value && !emailRegex.test(value)) {
                showError(fieldId, 'Please enter a valid email address');
            } else if (fieldId === 'message' && value.trim().length < 10) {
                showError(fieldId, 'Message must be at least 10 characters');
            }
        });
        
        field.addEventListener('input', () => {
            clearError(fieldId);
        });
    }
});

// Add shake animation to CSS
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Clear all errors
    ['name', 'email', 'message'].forEach(clearError);
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
    };
    
    // Validate form
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        // Show errors
        errors.forEach(error => {
            showError(error.field, error.message);
        });
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.style.opacity = '0.7';
    
    // Send email using EmailJS
    try {
        // EmailJS send parameters
        // REPLACE THESE WITH YOUR ACTUAL IDS:
        // - YOUR_SERVICE_ID: Get from EmailJS Dashboard > Email Services
        // - YOUR_TEMPLATE_ID: Get from EmailJS Dashboard > Email Templates
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: 'Nicholas Verzilli', // Your name
            reply_to: formData.email
        };
        
        const response = await emailjs.send(
            'service_hfpqhn2',  // Replace with your EmailJS service ID
            'template_d9gfg89', // Replace with your EmailJS template ID
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        
        // Success state
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
        submitButton.style.opacity = '1';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
        
    } catch (error) {
        console.error('Email send failed:', error);
        
        // Error state
        submitButton.textContent = 'Error! Try again';
        submitButton.style.background = 'linear-gradient(135deg, #ff3333, #cc0000)';
        submitButton.style.opacity = '1';
        submitButton.disabled = false;
        
        // Show specific error message if available
        if (error.text) {
            console.error('EmailJS Error:', error.text);
        }
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    }
});

// Intersection Observer for Fade In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.glass-card, .work-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Section
const heroContent = document.querySelector('.hero-content');
const videoBackground = document.querySelector('.video-background');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    
    if (scrolled < windowHeight) {
        const speed = 0.5;
        heroContent.style.transform = `translateY(${scrolled * speed}px)`;
        videoBackground.style.transform = `translateY(${scrolled * speed * 0.5}px)`;
    }
});

// Add loading animation for images
document.querySelectorAll('.work-thumbnail img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
});

// Prevent right-click on videos (optional, for protection)
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
});

// Performance optimization: Pause background video when not in view
const heroVideo = document.querySelector('.video-background video');
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }
    });
}, { threshold: 0.1 });

if (heroVideo) {
    heroObserver.observe(heroVideo);
}

// Add subtle mouse movement effect to hero card
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        heroCard.style.transform = `perspective(1000px) rotateY(${xPos}deg) rotateX(${-yPos}deg)`;
    });
    
    document.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    });
}


// Parallax Effect for Background Images (disabled for now)
function initParallax() {
    // Parallax temporarily disabled to fix visual issues
    // const sections = document.querySelectorAll('.hero, .work-section, .skills-section, .clients-section, .about-section, .blog-section, .contact-section');
    
    // window.addEventListener('scroll', () => {
    //     // Parallax code commented out
    // }, { passive: true });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');
    
    // Initialize parallax
    initParallax();
    
    // Apply loading animations to elements
    const animatedElements = [
        { selector: '.hero-card', animation: 'scale-in', delay: 100 },
        { selector: '.section-title', animation: 'fade-in-up', delay: 200 },
        { selector: '.work-item', animation: 'fade-in-up', delay: 100, stagger: true },
        { selector: '.client-logo', animation: 'scale-in', delay: 50, stagger: true },
        { selector: '.glass-card', animation: 'fade-in', delay: 150, stagger: true }
    ];
    
    animatedElements.forEach(({ selector, animation, delay, stagger }) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            const totalDelay = stagger ? delay * index : delay;
            setTimeout(() => {
                el.classList.add(animation);
            }, totalDelay);
        });
    });
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('.work-thumbnail img');
    criticalImages.forEach(img => {
        const tempImg = new Image();
        tempImg.src = img.src;
    });
});

// Client logo hover effect enhancement
document.querySelectorAll('.client-logo').forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
    });
});