// Certificate Modal Functions
function openCertificateModal(imageSrc, title) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    modalImage.src = imageSrc;
    modalTitle.textContent = title;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function downloadCertificate() {
    const modalImage = document.getElementById('modalImage');
    const link = document.createElement('a');
    link.href = modalImage.src;
    link.download = modalImage.src.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

// Certifications Carousel
class CertificationsCarousel {
    constructor() {
        this.carousel = document.getElementById('certificationsCarousel');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.indicators = document.querySelectorAll('.indicator');
        this.slides = document.querySelectorAll('.certificate-slide');
        this.currentSlide = 0;
        this.slideWidth = 370; // 350px + 20px gap
        this.maxSlides = this.slides.length;
        this.visibleSlides = this.getVisibleSlides();
        
        if (this.carousel && this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        this.updateCarousel();
        this.bindEvents();
        this.startAutoPlay();
        
        // Update on window resize
        window.addEventListener('resize', () => {
            this.visibleSlides = this.getVisibleSlides();
            this.updateCarousel();
        });
    }
    
    getVisibleSlides() {
        const containerWidth = this.carousel.parentElement.offsetWidth;
        return Math.max(1, Math.floor(containerWidth / this.slideWidth));
    }
    
    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Touch/swipe support
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });
        
        this.carousel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.carousel.addEventListener('touchend', () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });
    }
    
    updateCarousel() {
        const translateX = -this.currentSlide * this.slideWidth;
        this.carousel.style.transform = `translateX(${translateX}px)`;
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = this.currentSlide === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = this.currentSlide >= this.maxSlides - this.visibleSlides;
        }
    }
    
    nextSlide() {
        if (this.currentSlide < this.maxSlides - this.visibleSlides) {
            this.currentSlide++;
        } else {
            this.currentSlide = 0; // Loop back to first slide
        }
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    prevSlide() {
        if (this.currentSlide > 0) {
            this.currentSlide--;
        } else {
            this.currentSlide = this.maxSlides - this.visibleSlides; // Loop to last slide
        }
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    goToSlide(index) {
        this.currentSlide = Math.min(index, this.maxSlides - this.visibleSlides);
        this.updateCarousel();
        this.resetAutoPlay();
    }
    
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    resetAutoPlay() {
        clearInterval(this.autoPlayInterval);
        this.startAutoPlay();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const carousel = new CertificationsCarousel();
});

// Enhanced Timeline Scroll Animation
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item-modern');
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Animate timeline item
                entry.target.classList.add('animate-in');
                
                // Animate corresponding node
                const nodeIndex = Array.from(timelineItems).indexOf(entry.target);
                if (timelineNodes[nodeIndex]) {
                    timelineNodes[nodeIndex].classList.add('active');
                }
                
                // Animate corresponding card
                const card = entry.target.querySelector('.timeline-card');
                if (card) {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, 200);
                }
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// Initialize timeline animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTimelineAnimations();
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100,
        delay: 100
    });
});

// Typed.js - Typing Animation for Hero Section
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('#typed-text', {
        strings: [
            'B.Tech CSE Student',
            'MERN Stack Developer',
            'Full Stack Developer',
            'Problem Solver'
        ],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
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

// Enhanced Intersection Observer for additional animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe additional elements not covered by AOS
const additionalElements = document.querySelectorAll(
    '.timeline-item, .experience-card, .certification-card, .achievement-card'
);

additionalElements.forEach(el => {
    observer.observe(el);
});

// Add animate-in class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
`;
document.head.appendChild(style);

// Contact Form Handling with Backend Integration
// Contact Form Handling with Web3Forms
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Submit to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                showNotification('Message sent successfully! I will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                showNotification('Failed to send message. Please try again.', 'error');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            showNotification('Failed to send message. Please try again later.', 'error');
        } finally {
            // Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                     type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                     'linear-gradient(135deg, #38bdf8, #6366f1)'};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.8rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.2rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification animations to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Skill icon hover enhancement
document.addEventListener('DOMContentLoaded', () => {
    const skillIcons = document.querySelectorAll('.skill-icon-item');
    
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });
    });
});

// Enhanced card hover effects
const cards = document.querySelectorAll('.skill-card-modern, .project-card, .stat-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });
});

// Progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage && scrolled < window.innerHeight) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Add cursor trail effect (optional)
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

if (circles.length === 0) {
    // Create cursor trail circles
    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        circle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: linear-gradient(135deg, #38bdf8, #6366f1);
            pointer-events: none;
            opacity: 0;
            z-index: 9999;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(circle);
    }
}

const allCircles = document.querySelectorAll('.circle');

allCircles.forEach((circle, index) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener('mousemove', (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    allCircles.forEach((circle, index) => {
        circle.style.left = x - 5 + 'px';
        circle.style.top = y - 5 + 'px';
        circle.style.opacity = (20 - index) / 20;
        circle.style.transform = `scale(${(20 - index) / 20})`;
        
        circle.x = x;
        circle.y = y;
        
        const nextCircle = allCircles[index + 1] || allCircles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
    
    requestAnimationFrame(animateCircles);
}

animateCircles();

// Add particle background effect
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const randomX = Math.random() * 100 - 50;
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(56, 189, 248, 0.5);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle${i} ${5 + Math.random() * 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
        
        // Create unique animation for each particle
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes floatParticle${i} {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                50% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${randomX}px);
                }
            }
        `;
        document.head.appendChild(particleStyle);
    }
}

createParticles();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console message for developers
console.log('%c👋 Hello Developer!', 'color: #38bdf8; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #6366f1; font-size: 14px;');
console.log('%chttps://github.com/sarnoor-kaur', 'color: #94a3b8; font-size: 12px;');
// Learning Modal Functions
function openLearningModal(certType) {
    const modal = document.getElementById('learningModal');
    const modalTitle = document.getElementById('learningModalTitle');
    const modalContent = document.getElementById('learningModalContent');
    
    const learningData = {
        mern: {
            title: 'MERN Stack Development - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Built full-stack web applications using MongoDB, Express, React, and Node.js</li>
                        <li>Created REST APIs and connected frontend with backend services</li>
                        <li>Implemented authentication and database operations</li>
                        <li>Deployed applications using modern DevOps practices</li>
                        <li>Worked with state management using Redux and Context API</li>
                        <li>Integrated third-party APIs and payment gateways</li>
                    </ul>
                </div>
            `
        },
        cloud: {
            title: 'Cloud Computing - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Mastered cloud service models (IaaS, PaaS, SaaS) and deployment strategies</li>
                        <li>Worked with AWS, Azure, and Google Cloud Platform services</li>
                        <li>Implemented containerization using Docker and Kubernetes</li>
                        <li>Designed scalable and fault-tolerant cloud architectures</li>
                        <li>Configured auto-scaling and load balancing solutions</li>
                        <li>Implemented cloud security best practices and monitoring</li>
                    </ul>
                </div>
            `
        },
        web: {
            title: 'HTML, CSS, and Javascript for Web Developers - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Mastered responsive web design principles and mobile-first development</li>
                        <li>Built interactive web applications using modern HTML5, CSS3, and JavaScript</li>
                        <li>Implemented CSS Grid and Flexbox for complex layouts</li>
                        <li>Created dynamic user interfaces with DOM manipulation and event handling</li>
                        <li>Applied modern CSS techniques including animations and transitions</li>
                        <li>Developed cross-browser compatible and accessible web applications</li>
                    </ul>
                </div>
            `
        },
        java: {
            title: 'Java with GUI Development - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Developed desktop applications using Java Swing and JavaFX frameworks</li>
                        <li>Implemented event-driven programming and user interface design patterns</li>
                        <li>Created responsive layouts and custom components for desktop apps</li>
                        <li>Applied object-oriented programming principles in GUI development</li>
                        <li>Integrated database connectivity with JDBC</li>
                        <li>Built multi-threaded applications with proper synchronization</li>
                    </ul>
                </div>
            `
        },
        dsa: {
            title: 'Data Structures & Algorithms - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Mastered advanced data structures like trees, graphs, and hash tables</li>
                        <li>Implemented sorting and searching algorithms with optimal time complexity</li>
                        <li>Solved dynamic programming and greedy algorithm problems</li>
                        <li>Enhanced problem-solving skills for competitive programming</li>
                        <li>Analyzed algorithm complexity using Big O notation</li>
                        <li>Applied data structures to solve real-world programming challenges</li>
                    </ul>
                </div>
            `
        },
        programming: {
            title: 'Programming Certifications - Detailed Learning',
            content: `
                <div class="learning-details">
                    <h4>What I Learned:</h4>
                    <ul>
                        <li>Gained proficiency in C, C++, and Java programming languages</li>
                        <li>Applied object-oriented programming concepts and design patterns</li>
                        <li>Developed memory management skills and pointer manipulation in C/C++</li>
                        <li>Built console applications and solved algorithmic challenges</li>
                        <li>Implemented data structures from scratch in multiple languages</li>
                        <li>Mastered debugging techniques and code optimization strategies</li>
                    </ul>
                </div>
            `
        }
    };
    
    const data = learningData[certType];
    if (data) {
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeLearningModal();
            }
        });
    }
}

function closeLearningModal() {
    const modal = document.getElementById('learningModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close learning modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLearningModal();
    }
});


// Certificate Carousel Functions
let currentCertSlide = 0;
const certSlideWidth = 370; // 350px card + 20px gap

function moveCertCarousel(direction) {
    const carousel = document.getElementById('certCarousel');
    const slides = document.querySelectorAll('.certificate-slide');
    const totalSlides = slides.length;
    const containerWidth = carousel.parentElement.offsetWidth;
    const visibleSlides = Math.max(1, Math.floor(containerWidth / certSlideWidth));
    const maxSlide = totalSlides - visibleSlides;
    
    currentCertSlide += direction;
    
    // Loop carousel
    if (currentCertSlide < 0) {
        currentCertSlide = maxSlide;
    } else if (currentCertSlide > maxSlide) {
        currentCertSlide = 0;
    }
    
    const translateX = -currentCertSlide * certSlideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    
    updateCertDots();
}

function updateCertDots() {
    const dotsContainer = document.getElementById('certDots');
    const slides = document.querySelectorAll('.certificate-slide');
    
    if (!dotsContainer || slides.length === 0) return;
    
    // Create dots if they don't exist
    if (dotsContainer.children.length === 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            dot.onclick = () => goToCertSlide(index);
            dotsContainer.appendChild(dot);
        });
    }
    
    // Update active dot
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCertSlide);
    });
}

function goToCertSlide(index) {
    const carousel = document.getElementById('certCarousel');
    const slides = document.querySelectorAll('.certificate-slide');
    const containerWidth = carousel.parentElement.offsetWidth;
    const visibleSlides = Math.max(1, Math.floor(containerWidth / certSlideWidth));
    const maxSlide = slides.length - visibleSlides;
    
    currentCertSlide = Math.min(index, maxSlide);
    const translateX = -currentCertSlide * certSlideWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
    
    updateCertDots();
}

// Certificate Modal Functions
function openCertModal(imageSrc) {
    if (!imageSrc) return;
    
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    
    modal.style.display = 'block';
    modalImg.src = imageSrc;
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function toggleCertDetails(button) {
    // This function can be used for additional interactions if needed
    console.log('Certificate details toggled');
}

// Auto-play carousel
let certAutoPlayInterval;

function startCertAutoPlay() {
    certAutoPlayInterval = setInterval(() => {
        moveCertCarousel(1);
    }, 5000);
}

function stopCertAutoPlay() {
    clearInterval(certAutoPlayInterval);
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCertDots();
    startCertAutoPlay();
    
    // Stop autoplay on hover
    const carousel = document.getElementById('certCarousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCertAutoPlay);
        carousel.addEventListener('mouseleave', startCertAutoPlay);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const translateX = -currentCertSlide * certSlideWidth;
        carousel.style.transform = `translateX(${translateX}px)`;
    });
});

// Touch/swipe support for carousel
let certTouchStartX = 0;
let certTouchEndX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('certCarousel');
    if (!carousel) return;
    
    carousel.addEventListener('touchstart', (e) => {
        certTouchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', (e) => {
        certTouchEndX = e.changedTouches[0].screenX;
        handleCertSwipe();
    });
});

function handleCertSwipe() {
    const swipeThreshold = 50;
    const diff = certTouchStartX - certTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            moveCertCarousel(1); // Swipe left
        } else {
            moveCertCarousel(-1); // Swipe right
        }
    }
}
