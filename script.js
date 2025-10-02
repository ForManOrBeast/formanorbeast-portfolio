// Easter Egg Tooltip Following Cursor
document.addEventListener('mousemove', (e) => {
    const tooltip = document.querySelector('.easter-egg:hover::after');
    const easterEgg = document.querySelector('.easter-egg:hover');

    if (easterEgg) {
        const computedStyle = window.getComputedStyle(easterEgg, '::after');
        if (computedStyle.opacity > 0) {
            const afterElement = easterEgg.querySelector('::after');
            if (afterElement) {
                afterElement.style.left = e.clientX + 10 + 'px';
                afterElement.style.top = e.clientY - 30 + 'px';
            }
        }
    }
});

// Better approach for tooltip positioning
document.addEventListener('DOMContentLoaded', () => {
    const easterEggs = document.querySelectorAll('.easter-egg');

    easterEggs.forEach(egg => {
        let tooltip = null;

        egg.addEventListener('mouseenter', (e) => {
            tooltip = document.createElement('div');
            tooltip.textContent = egg.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: fixed;
                background: var(--glass-bg);
                backdrop-filter: blur(var(--blur-amount));
                border: 1px solid var(--glass-border);
                color: var(--text-primary);
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(tooltip);
        });

        egg.addEventListener('mousemove', (e) => {
            if (tooltip) {
                tooltip.style.left = e.clientX + 10 + 'px';
                tooltip.style.top = e.clientY - 30 + 'px';
            }
        });

        egg.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });
});

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
        description: 'Edited promotional content featuring Natalie Portman, Julianne Moore, and Charles Melton discussing their collaborative process. Working from a loose script and raw footage, I crafted the pacing and structure to highlight authentic moments while teasing the film\'s most compelling scenes.',
        videoUrl: 'https://www.youtube.com/embed/viDRasOhQBw',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    netflix2: {
        title: 'Netflix Documentary Series - Editor',
        description: 'Edited Bailey Sarian\'s full-episode reaction to Wednesday into a cohesive piece that balances her crime-sleuth commentary with makeup content. I chose the strongest moments and structured the edit to flow naturally between her insights on the show and the beauty elements.',
        videoUrl: 'https://www.youtube.com/embed/qz4TYHKJ89w',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    netflix3: {
        title: 'Glass Onion - Solving Mysteries',
        description: 'Edited promotional content featuring Leslie Odom Jr., Jessica Henwick, and Madelyn Cline debating lighthearted topics. I structured the edit to showcase their natural chemistry and comedic timing, creating an entertaining piece that highlights the ensemble dynamic at the heart of Glass Onion.',
        videoUrl: 'https://www.youtube.com/embed/HQWeVG86kMI',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    netflix4: {
        title: 'Rebel Moon - Sophia\'s Fight',
        description: 'Edited behind-the-scenes content featuring Zack Snyder and Sofia Boutella discussing her physical preparation for the film. I assembled footage from multiple sources including BTS material, on-set phone captures used for real-time review, and finished film sequences to create an engaging piece that balances entertainment value with authentic insight into the training process.',
        videoUrl: 'https://www.youtube.com/embed/XoNzf4IXrm8',
        platform: 'youtube',
        client: 'Netflix',
        role: 'Editor'
    },
    dicks: {
        title: "Dick's Sporting Goods Commercial - Editor",
        description: 'Edited multi-cam factory tour footage into a streamlined look at Louisville Slugger\'s bat-making process. I condensed the tour into an engaging piece that showcases both the traditional craftsmanship and modern techniques behind a company with over 135 years of history in baseball bat manufacturing.',
        videoUrl: 'https://www.youtube.com/embed/d_3zPj3HQnA',
        platform: 'youtube',
        client: "Dick's Sporting Goods",
        role: 'Editor'
    },
    dicks2: {
        title: "Dick's Sporting Goods - Videographer & Editor",
        description: 'Served as videographer and editor for this Pro Tips segment featuring Blair Wiggins demonstrating proper saltwater leader techniques. I captured on-location footage and shaped the edit to make specialized fishing knowledge accessible while maintaining technical accuracy, balancing instructional clarity with product showcase for saltwater anglers.',
        videoUrl: 'https://www.youtube.com/embed/E8wUAvOcImk',
        platform: 'youtube',
        client: "Dick's Sporting Goods",
        role: 'Videographer & Editor'
    },
    dicks3: {
        title: "Dick's Sporting Goods Promo - Editor",
        description: 'Edited promotional content featuring NFL running back Stevan Ridley\'s journey toward peak performance. I structured the edit to showcase his athletic dedication and struggle while integrating product placement, creating a narrative that balances brand messaging with the authentic story of an athlete pushing his limits.',
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
        description: 'Co-wrote, directed, shot, and edited this short film for the Pittsburgh 48 Hour Film Project. Managing the complete production pipeline under tight time constraints, I crafted a cohesive narrative that earned Best Film and Best Editing awards, demonstrating my ability to execute a unified creative vision across all filmmaking disciplines.',
        videoUrl: 'https://www.youtube.com/embed/C6Hnr7fw5IM',
        platform: 'youtube',
        role: 'Co-Writer / Director / Cinematographer / Editor'
    },
    duolingo: {
        title: 'Duolingo Campaign - Director/DP/Editor/Animator',
        description: 'Served as director, DP, editor, and animator for this campaign. I combined live-action footage with basic animation to create digestible content for an audience using English as a second language, explaining updates to the Duolingo English Test while maintaining the brand\'s playful identity.',
        videoUrl: 'https://www.youtube.com/embed/HWyga5E3Kpg',
        platform: 'youtube',
        client: 'Duolingo',
        role: 'Director / DP / Editor / Animator'
    },
    duolingo2: {
        title: 'Duolingo Social Content - Director/DP/Editor/Animator',
        description: 'Directed, shot, edited, and animated social media content answering frequently asked questions about the Duolingo English Test. I created visually engaging explanations designed for an ESL audience, using a mix of live-action and basic animation to make complex testing information accessible across digital platforms.',
        videoUrl: 'https://www.youtube.com/embed/JFMcCLt7Vr8',
        platform: 'youtube',
        client: 'Duolingo',
        role: 'Director / DP / Editor / Animator'
    },
    unitedway: {
        title: 'United Way Campaign - Editor/Animator',
        description: 'Edited and animated this piece for United Way, crafting a narrative that highlights community impact and social change. I combined thoughtful editing with simple animation to draw attention to powerful audio testimonials, creating an emotionally resonant story about the organization\'s work.',
        videoUrl: 'https://www.youtube.com/embed/TSarIt77ZCM',
        platform: 'youtube',
        client: 'United Way (Hullaballoo Agency)',
        role: 'Editor / Animator'
    },
    pozitivf: {
        title: 'PozitIVF - Editor/Animator',
        description: 'Edited and animated informative content for PozitIVF\'s fertility services. I used thoughtful pacing and subtle animation to balance medical expertise with emotional sensitivity, creating content that conveys hope and professionalism while resonating with prospective patients navigating their fertility journey.',
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

console.log('Adding click listeners to', workItems.length, 'work items');

workItems.forEach((item, index) => {
    console.log('Adding listener to item', index, 'with project:', item.dataset.project);
    
    item.addEventListener('click', (event) => {
        console.log('=== WORK ITEM CLICKED ===');
        console.log('Event target:', event.target);
        console.log('Item clicked:', item);
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
            
            // Re-enable video now that positioning works
            const iframe = createVideoEmbed(project.videoUrl, project.platform);
            console.log('Created iframe:', iframe);
            
            // CREATE PROPER VIDEO MODAL with scroll-aware positioning
            const scrollY = window.scrollY;
            console.log('Creating video modal at scroll position:', scrollY);
            
            const videoModal = document.createElement('div');
            videoModal.id = 'video-modal-overlay';
            // Use 100% instead of 100vw to avoid horizontal scroll issues on mobile
            const isMobile = window.innerWidth <= 768;
            videoModal.style.cssText = `
                position: absolute;
                top: ${scrollY}px;
                left: 0;
                width: ${isMobile ? '100%' : '100vw'};
                height: 100vh;
                background: rgba(0, 0, 0, 0.9);
                z-index: 2147483647;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: ${isMobile ? '10px' : '20px'};
                cursor: pointer;
            `;
            
            // Close modal function
            const closeVideoModal = () => {
                videoModal.remove();
                document.body.style.overflow = '';
            };
            
            // Click on overlay to close
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });
            
            videoModal.innerHTML = `
                <div style="
                    background: var(--glass-bg);
                    backdrop-filter: blur(12px);
                    border: 1px solid var(--glass-border);
                    border-radius: 20px;
                    padding: 30px;
                    max-width: 900px;
                    width: 90%;
                    position: relative;
                    cursor: default;
                " onclick="event.stopPropagation()">
                    <button id="modal-close-btn" style="position: absolute; top: -40px; right: 0; color: white; background: none; border: none; font-size: 40px; cursor: pointer;">&times;</button>
                    <h3 style="color: var(--accent-color); margin-bottom: 20px; text-align: center;">${project.title}</h3>
                    <div style="width: 100%; aspect-ratio: 16/9; background: #000; position: relative; overflow: hidden;">
                        <iframe src="${iframe.src}" 
                                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                                frameborder="0" 
                                allowfullscreen 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                        </iframe>
                    </div>
                    <p style="color: var(--text-secondary); margin-top: 20px; line-height: 1.6;">${project.description}</p>
                </div>
            `;
            
            document.documentElement.appendChild(videoModal);
            document.body.style.overflow = 'hidden';
            
            // Connect close button
            const closeBtn = document.getElementById('modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeVideoModal);
            }
            
            // Also close on Escape key
            const escapeHandler = (e) => {
                if (e.key === 'Escape') {
                    closeVideoModal();
                    document.removeEventListener('keydown', escapeHandler);
                }
            };
            document.addEventListener('keydown', escapeHandler);
            
            console.log('Video modal created successfully!');
            
            // Debug modal visibility
            setTimeout(() => {
                console.log('=== MODAL DEBUG ===');
                console.log('Modal display:', getComputedStyle(videoModal).display);
                console.log('Modal visibility:', getComputedStyle(videoModal).visibility);
                console.log('Modal position:', videoModal.getBoundingClientRect());
                console.log('Modal computed styles:', {
                    position: getComputedStyle(videoModal).position,
                    top: getComputedStyle(videoModal).top,
                    left: getComputedStyle(videoModal).left,
                    transform: getComputedStyle(videoModal).transform
                });
                
                // Check body styles that might interfere
                console.log('Body styles:', {
                    position: getComputedStyle(document.body).position,
                    transform: getComputedStyle(document.body).transform,
                    overflow: getComputedStyle(document.body).overflow
                });
                
                const modalContent = document.querySelector('.modal-content');
                console.log('Modal content position:', modalContent.getBoundingClientRect());
                console.log('Modal content display:', getComputedStyle(modalContent).display);
                
                const videoContainer = document.querySelector('.modal-video-container');
                console.log('Video container position:', videoContainer.getBoundingClientRect());
                
                console.log('Video wrapper position:', videoWrapper.getBoundingClientRect());
                
                // Force position the modal as a test
                videoModal.style.position = 'fixed';
                videoModal.style.top = '0px';
                videoModal.style.left = '0px';
                videoModal.style.right = '0px';
                videoModal.style.bottom = '0px';
                videoModal.style.transform = 'none';
                videoModal.style.display = 'flex';
                videoModal.style.alignItems = 'center';
                videoModal.style.justifyContent = 'center';
                
                // Also force position the modal content to be centered
                modalContent.style.position = 'relative';
                modalContent.style.margin = 'auto';
                modalContent.style.maxWidth = '800px';
                modalContent.style.width = '90%';
                
                console.log('Force-positioned modal, new position:', videoModal.getBoundingClientRect());
                console.log('Modal content after centering:', modalContent.getBoundingClientRect());
            }, 100);
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

// Enhanced image loading with skeleton loaders
document.querySelectorAll('.work-thumbnail').forEach(thumbnail => {
    thumbnail.classList.add('loading');
    const img = thumbnail.querySelector('img');

    if (img) {
        // Check if image is already cached
        if (img.complete && img.naturalHeight !== 0) {
            thumbnail.classList.remove('loading');
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';

            img.addEventListener('load', function() {
                thumbnail.classList.remove('loading');
                this.style.opacity = '1';
            });

            img.addEventListener('error', function() {
                thumbnail.classList.remove('loading');
                // Keep placeholder background visible on error
            });
        }
    }
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
    
    // Preload critical images with priority
    const criticalImages = document.querySelectorAll('.work-thumbnail img');
    criticalImages.forEach((img, index) => {
        // Add loading attribute for browser optimization
        if (index < 3) {
            img.loading = 'eager';
        } else {
            img.loading = 'lazy';
        }

        // Preload first 3 images immediately
        if (index < 3) {
            const tempImg = new Image();
            tempImg.src = img.src;
        }
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

// Theme Switcher Functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeMenu = document.getElementById('themeMenu');
    const themeOptions = document.querySelectorAll('.theme-option');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('selectedTheme') || 'default';
    if (savedTheme !== 'default') {
        body.setAttribute('data-theme', savedTheme);
        updateActiveThemeOption(savedTheme);
    }

    // Toggle theme menu
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        themeMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!themeMenu.contains(e.target) && !themeToggle.contains(e.target)) {
            themeMenu.classList.remove('active');
        }
    });

    // Handle theme selection
    themeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');

            // Add transition class
            body.classList.add('theme-transitioning');

            // Apply theme
            if (theme === 'default') {
                body.removeAttribute('data-theme');
            } else {
                body.setAttribute('data-theme', theme);
            }

            // Save to localStorage
            localStorage.setItem('selectedTheme', theme);

            // Update active state
            updateActiveThemeOption(theme);

            // Close menu
            themeMenu.classList.remove('active');

            // Remove transition class after animation
            setTimeout(() => {
                body.classList.remove('theme-transitioning');
            }, 500);
        });
    });

    function updateActiveThemeOption(theme) {
        themeOptions.forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-theme') === theme) {
                opt.classList.add('active');
            }
        });
    }

    // Keyboard shortcut for theme switching (Ctrl/Cmd + Shift + T)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
            e.preventDefault();
            themeMenu.classList.toggle('active');
        }
    });
})();