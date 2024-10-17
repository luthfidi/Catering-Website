// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Banner slider
const bannerImages = [
    './assets/images/test.png',
    './assets/images/test2.png',
    './assets/images/test.png'
];
let currentBannerIndex = 0;

function changeBanner() {
    const banner = document.querySelector('.banner');
    banner.style.backgroundImage = `url(${bannerImages[currentBannerIndex]})`;
    currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
}

setInterval(changeBanner, 5000); // Change banner every 5 seconds

// Scroll-triggered animations
const scrollAnimateElements = document.querySelectorAll('.scroll-animate');

function checkScroll() {
    scrollAnimateElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // Check on load

// Parallax effect for banner
window.addEventListener('scroll', () => {
    const banner = document.querySelector('.banner');
    const scrollPosition = window.pageYOffset;
    banner.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = target => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                img.setAttribute('src', src);
                img.classList.add('fade-in');

                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

lazyImages.forEach(lazyLoad);

// Section fade-in effect
const sections = document.querySelectorAll('.section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Dynamic copyright year
document.querySelector('.footer p').innerHTML = `&copy; ${new Date().getFullYear()} Isma Catering. All rights reserved.`;