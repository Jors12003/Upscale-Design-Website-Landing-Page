const parallax = document.querySelector(".parallax-bg");
const craftContent = document.querySelector('.craft-content');
const servicesBg = document.querySelector('.services');

function updateParallax() {
    if (!parallax) return;
    const scrollY = window.scrollY;
    parallax.style.transform = `translateY(${scrollY * 0.3}px)`;
}

function updateServicesBg() {
    if (!servicesBg) return;
    const rect = servicesBg.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (rect.top - window.innerHeight) * -0.2;
        servicesBg.style.backgroundPositionY = `${offset}px`;
    }
}

if (parallax) {
    parallax.style.transform = 'translateY(0px)';
}

window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.remove("preload");
            updateParallax();
        });
    });
});

window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
        updateParallax();
        updateServicesBg();
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-left, .slide-right, .slide-up').forEach((el) => {
    observer.observe(el);
});

if (craftContent) {
    observer.observe(craftContent);
}

const testimonialEl = document.querySelector('.testimonial-swiper');
if (testimonialEl) {
    const swiper = new Swiper('.testimonial-swiper', {
        loop: true,
        autoplay: { delay: 4000, disableOnInteraction: false },
        pagination: { el: '.testimonial-swiper .swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.testimonial-swiper .swiper-button-next',
            prevEl: '.testimonial-swiper .swiper-button-prev',
        }
    });
}

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navlinks');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.querySelector('ul').classList.toggle('open');
    });
}

document.querySelectorAll('.navlinks a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.querySelector('ul').classList.remove('open');
    });
});

const projectSwiperEl = document.querySelector('.project-swiper');
if (projectSwiperEl) {
    const projectSwiper = new Swiper('.project-swiper', {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.project-swiper .swiper-pagination', clickable: true },
        navigation: {
            nextEl: '.project-swiper .swiper-button-next',
            prevEl: '.project-swiper .swiper-button-prev',
        },
        on: {
            slideChange: function() {
                const videos = document.querySelectorAll('.project-video-container video');
                videos.forEach(v => { v.pause(); v.currentTime = 0; });
                setTimeout(() => {
                    const activeVideo = this.slides[this.activeIndex]?.querySelector('video');
                    if (activeVideo) activeVideo.play().catch(() => {});
                }, 100);
            }
        }
    });
}