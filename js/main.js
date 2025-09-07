// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du formulaire de contact
    const contactFormElement = document.getElementById('contactForm');
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Réinitialiser les messages d'erreur
            resetErrors();
            
            // Validation des champs
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validation du nom
            if (name === '') {
                showError('name', 'Veuillez entrer votre nom');
                isValid = false;
            }
            
            // Validation de l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email === '') {
                showError('email', 'Veuillez entrer votre email');
                isValid = false;
            } else if (!emailRegex.test(email)) {
                showError('email', 'Veuillez entrer un email valide');
                isValid = false;
            }
            
            // Validation du sujet
            if (subject === '') {
                showError('subject', 'Veuillez entrer un sujet');
                isValid = false;
            }
            
            // Validation du message
            if (message === '') {
                showError('message', 'Veuillez entrer votre message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Le message doit contenir au moins 10 caractères');
                isValid = false;
            }
            
            // Si le formulaire est valide, l'envoyer
            if (isValid) {
                // Désactiver le bouton d'envoi
                const submitBtn = contactFormElement.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Envoi en cours...';
                
                // Simuler l'envoi du formulaire (à remplacer par un appel AJAX réel)
                setTimeout(() => {
                    // Réinitialiser le formulaire
contactFormElement.reset();
                    
                    // Afficher un message de succès
                    showSuccessMessage('Votre message a été envoyé avec succès !');
                    
                    // Réactiver le bouton
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 1500);
            }
        });
    }
    
    // Fonction pour afficher les messages d'erreur
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        
        // Créer ou mettre à jour le message d'erreur
        let errorElement = formGroup.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        field.classList.add('error');
    }
    
    // Fonction pour réinitialiser les erreurs
    function resetErrors() {
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
            el.classList.remove('error');
        });
    }
    
    // Fonction pour afficher un message de succès
    function showSuccessMessage(message) {
        // Supprimer les messages de succès existants
        const existingMessages = document.querySelectorAll('.success-message');
        existingMessages.forEach(el => el.remove());
        
        // Créer et afficher le nouveau message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = message;
        
        // Insérer le message avant le formulaire
        contactFormElement.parentNode.insertBefore(successMessage, contactFormElement);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Sticky Header - Reste fixe en haut de la page
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        // Ajoute une ombre au header quand on défile
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Testimonials Slider
    const testimonials = document.querySelector('.testimonials-slider');
    if (testimonials) {
        $(testimonials).slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            dotsClass: 'slick-dots custom-dots'
        });
    }
    
    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it and show a success message
            console.log('Form submitted:', formDataObj);
            
            // Show success message
            alert('Merci pour votre message ! Je vous recontacterai dès que possible.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Here you would typically send the email to your server
                console.log('Newsletter subscription:', email);
                
                // Show success message
                alert('Merci de vous être abonné à notre newsletter !');
                
                // Reset form
                this.reset();
            }
        });
    }
    
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                
                // Remove preloader from DOM after animation completes
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000); // Adjust time as needed
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

// Typewriter Effect
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];
        
        // Check if deleting
        if (this.isDeleting) {
            // Remove a character
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add a character
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        
        // Initial Type Speed
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize TypeWriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const txtElement = document.querySelector('.typewriter');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    // Initialize TypeWriter
    new TypeWriter(txtElement, words, wait);
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav ul li a');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add animation to skills on scroll
const skillBars = document.querySelectorAll('.progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Intersection Observer for skill bars
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('.about');
if (skillsSection) {
    observer.observe(skillsSection);
}
