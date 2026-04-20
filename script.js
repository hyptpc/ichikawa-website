document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-based animations (Fade in sections)
    const fadeElems = document.querySelectorAll('section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(el => fadeObserver.observe(el));

    // 2. Navigation bar styling on scroll
    const navContainer = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
    });

    // 3. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.main-nav ul');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = navLinks.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
            spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navLinks.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
        });

        // Close menu when clicking a link
        document.querySelectorAll('.main-nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                resetHamburger();
            });
        });
    }

    function resetHamburger() {
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // 4. Page Top Button
    const topBtn = document.createElement('button');
    topBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>';
    topBtn.id = "topBtn";
    
    // Minimal styles for the top button to fit the tech theme
    Object.assign(topBtn.style, {
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        display: 'none',
        zIndex: '1000',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(topBtn);

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            topBtn.style.display = 'flex';
        } else {
            topBtn.style.display = 'none';
        }
    });

    // 5. Universal Lightbox for Images
    const zoomableImages = document.querySelectorAll('.lab-gallery img, .card img:not(.footer-logo)');
    
    if (zoomableImages.length > 0) {
        // Create Lightbox Elements if they don't exist
        let overlay = document.querySelector('.lightbox-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'lightbox-overlay';
            overlay.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                    <img src="" alt="Enlarged view" class="lightbox-img">
                    <div class="lightbox-caption"></div>
                </div>
            `;
            document.body.appendChild(overlay);
        }

        const lightboxImg = overlay.querySelector('.lightbox-img');
        const lightboxCaption = overlay.querySelector('.lightbox-caption');
        const closeBtn = overlay.querySelector('.lightbox-close');

        zoomableImages.forEach(img => {
            // Add a pointer cursor to indicate it's clickable
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                
                // Try to find a caption (from alt or sibling p)
                let captionText = img.getAttribute('alt') || '';
                const siblingP = img.nextElementSibling;
                if (siblingP && siblingP.tagName === 'P') {
                    captionText = siblingP.textContent;
                }
                
                lightboxCaption.textContent = captionText;
                lightboxCaption.style.display = captionText ? 'block' : 'none';
                
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });

        const closeLightbox = () => {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeLightbox();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
