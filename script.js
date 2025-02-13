// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom cursor implementation
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.links = document.querySelectorAll('a, button, .magnetic');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.speed = 0.7;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // Update cursor position immediately
            this.cursor.style.transform = `translate3d(${this.mouse.x}px, ${this.mouse.y}px, 0)`;
        });
        
        // Smooth follower animation
        const followCursor = () => {
            this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
            this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
            
            this.follower.style.transform = `translate3d(${this.pos.x}px, ${this.pos.y}px, 0)`;
            requestAnimationFrame(followCursor);
        };
        followCursor();
        
        // Add hover effects
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
                this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Matrix rain effect
class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'AIML DeepLearning NeuralNetwork DataScience MachineLearning Algorithm BigData';
        this.fontSize = 16;
        this.columns = 0;
        this.drops = [];
        
        this.init();
    }
    
    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(1);
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#0f0';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        requestAnimationFrame(() => this.animate());
    }
}

// Typed.js implementation
class TypedText {
    constructor() {
        this.typed = new Typed('.typed-text', {
            strings: [
                'AI/ML Engineer',
                'Deep Learning Specialist',
                'Problem Solver',
                'Innovation Enthusiast'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
}

// Scroll animations
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Reveal text animations
        gsap.utils.toArray('.reveal-text').forEach(text => {
            gsap.from(text, {
                scrollTrigger: {
                    trigger: text,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
        
        // Project cards animation
        gsap.utils.toArray('.project-card').forEach(card => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: 'power4.out'
            });
        });
    }
}

// Navbar scroll effect
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                this.navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > this.lastScroll && !this.navbar.classList.contains('scroll-down')) {
                this.navbar.classList.remove('scroll-up');
                this.navbar.classList.add('scroll-down');
            } else if (currentScroll < this.lastScroll && this.navbar.classList.contains('scroll-down')) {
                this.navbar.classList.remove('scroll-down');
                this.navbar.classList.add('scroll-up');
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-animation"></div>';
    document.body.appendChild(loading);
    
    // Initialize all classes
    const cursor = new CustomCursor();
    const matrix = new MatrixRain();
    const typed = new TypedText();
    const scrollAnims = new ScrollAnimations();
    const navbar = new NavbarScroll();
    
    // Remove loading screen
    window.addEventListener('load', () => {
        gsap.to(loading, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => loading.remove()
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 70
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
    
    // Add parallax effect to hero section
    gsap.to('.hero-background', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});
