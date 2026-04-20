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
