history.scrollRestoration = 'manual';

// get elements
const parallax = document.querySelector(".parallax-bg");
const craftContent = document.querySelector('.craft-content');

// parallax function para sa hero
function updateParallax() {
    const scrollY = window.scrollY;
    parallax.style.transform = `translateY(${scrollY * 0.3}px)`;
}

// parallax function para sa craft section
function updateCraft() {
    const scrollY = window.scrollY;

    // kunin kung nasaan yung craft section
    const rect = craftContent.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // kung gaano kalayo pa from bottom ng screen
    const distanceFromBottom = rect.top - windowHeight;

    // pag malayo pa = naka-taas, pag papalapit = bumababa papunta sa 0
    const translateY = Math.max(0, distanceFromBottom * 0.3);
    craftContent.style.transform = `translateY(${translateY}px)`;
}

// reset parallax on load
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

// IISA LANG NA SCROLL EVENT — lahat naka-sama dito
window.addEventListener("scroll", () => {
    requestAnimationFrame(() => {
        updateParallax();
        updateCraft();
    });
});

// intersection observer para sa slide animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-left, .slide-right').forEach((el) => {
    observer.observe(el);
});