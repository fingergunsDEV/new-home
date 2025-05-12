import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger

document.addEventListener('DOMContentLoaded', () => {

    // Animate header elements
    gsap.from('.site-logo', { opacity: 0, y: -20, duration: 0.6, delay: 0.2, ease: 'power2.out' });
    gsap.from('.site-nav ul li', { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power2.out' });
    gsap.from('.auth-buttons .btn', { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, delay: 0.6, ease: 'power2.out' });

    // Animate hero section
    gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 0.8, delay: 0.8, ease: 'power2.out' });
    gsap.from('.hero-content p', { opacity: 0, y: 30, duration: 0.8, delay: 1, ease: 'power2.out' });
    gsap.from('.hero-signup-form', { opacity: 0, y: 30, duration: 0.8, delay: 1.2, ease: 'power2.out' });
    gsap.from('.hero-image img', { opacity: 0, scale: 0.9, duration: 1, delay: 1.4, ease: 'power2.out' });

    // Animate sections on scroll
    const sections = ['.testimonials-section', '.benefits-section', '.process-section']; // Add process section

    sections.forEach(sectionClass => {
        const heading = document.querySelector(`${sectionClass} h2`);
        const items = document.querySelectorAll(`${sectionClass} .testimonials-grid .testimonial-card, ${sectionClass} .benefits-grid .benefit-item, ${sectionClass} .process-grid .process-step`); // Select items in all relevant grids

        if (heading) {
            gsap.from(heading, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heading, // Trigger on the heading
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }

        if (items.length > 0) {
             // Find the closest grid container to the items for the trigger
            let triggerElement = items[0].closest('.testimonials-grid, .benefits-grid, .process-grid');

            gsap.from(items, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: triggerElement || sectionClass, // Use the grid or the section as trigger
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
        }
    });


    // Animate footer columns on page load (using ScrollTrigger for consistency)
    gsap.from('.footer-col', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.modern-footer',
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });


    // Animate social icons with hover effects
    const socialIcons = document.querySelectorAll('.social-icon');

    socialIcons.forEach(icon => {
        // Check if the icon is already animated by a previous instance before applying float
        if (!gsap.getTweensOf(icon).some(tween => tween.vars.yoyo === true)) {
            gsap.to(icon, {
                y: '-5px',
                duration: 1.5 + Math.random(),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 0.5 // Reduce delay slightly
            });
        }

        // Add bounce on hover
        icon.addEventListener('mouseenter', () => {
            // Kill the floating animation temporarily
            gsap.killTweensOf(icon);
            gsap.to(icon, {
                scale: 1.1,
                duration: 0.3,
                ease: 'back.out(1.5)'
            });
        });

        icon.addEventListener('mouseleave', () => {
            // Check if scale is still above 1 before animating back
            if (gsap.getProperty(icon, 'scale') > 1) {
                gsap.to(icon, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                         // Restart the floating animation after the bounce is complete
                         if (!gsap.getTweensOf(icon).some(tween => tween.vars.yoyo === true)) {
                             gsap.to(icon, {
                                y: '-5px',
                                duration: 1.5 + Math.random(),
                                repeat: -1,
                                yoyo: true,
                                ease: 'sine.inOut',
                                delay: Math.random() * 0.5 // Random delay before restarting
                            });
                         }
                    }
                });
            } else {
                 // If no bounce occurred, just restart the floating animation
                 if (!gsap.getTweensOf(icon).some(tween => tween.vars.yoyo === true)) {
                     gsap.to(icon, {
                        y: '-5px',
                        duration: 1.5 + Math.random(),
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: Math.random() * 0.5 // Random delay before restarting
                    });
                 }
            }
        });
    });

    // Animate contact icons
    const contactIcons = document.querySelectorAll('.contact-icon');

    contactIcons.forEach((icon, index) => {
         // Ensure animation is applied only once
         if (!icon.dataset.animated) {
             icon.dataset.animated = 'true'; // Mark as animated

             // Initial animation (optional, can be removed if not needed)
             gsap.from(icon, {
                 rotate: -30,
                 opacity: 0,
                 duration: 0.5,
                 delay: 1.5 + (index * 0.1) // Adjust delay
             });

             // Pulse animation
             gsap.to(icon, {
                 scale: 1.2,
                 duration: 0.8,
                 repeat: -1,
                 yoyo: true,
                 ease: 'sine.inOut',
                 delay: 2 + (index * 0.2) // Adjust delay
             });
         }
    });


    // Animate the newsletter button
    const subscribeBtn = document.querySelector('.btn-subscribe');

    if (subscribeBtn) {
        subscribeBtn.addEventListener('mouseenter', () => {
            gsap.to(subscribeBtn.querySelector('i'), {
                rotation: 360,
                duration: 0.5
            });
        });
        subscribeBtn.addEventListener('mouseleave', () => {
            // Optional: animate back to 0 or other state on mouseleave
             gsap.to(subscribeBtn.querySelector('i'), {
                 rotation: 0, // Reset rotation
                 duration: 0.5
             });
        });
    }

    // Add a simple fade-in for the map image using ScrollTrigger
    const footerMapImg = document.querySelector('.footer-map img');
    if (footerMapImg) {
        gsap.from(footerMapImg, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: 'power2.out',
             scrollTrigger: {
                trigger: footerMapImg,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    }

});
