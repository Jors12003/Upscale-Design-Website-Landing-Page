history.scrollRestoration = 'manual';

const parallax = document.querySelector(".parallax-bg");
const craftContent = document.querySelector('.craft-content');

function updateParallax() {
    const scrollY = window.scrollY;
    parallax.style.transform = `translateY(${scrollY * 0.3}px)`;
}

parallax.style.transform = 'translateY(0px)';

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
    requestAnimationFrame(updateParallax);
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

observer.observe(craftContent);

const swiper = new Swiper('.testimonial-swiper', {
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

/*hamburger menu*/
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
