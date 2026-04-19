history.scrollRestoration = 'manual';

const parallax = document.querySelector(".parallax-bg");

function updateParallax() {
    const scrollY = window.scrollY;
    parallax.style.transform = `translateY(${scrollY * 0.3}px)`;
}

// Reset parallax immediately before anything renders
parallax.style.transform = 'translateY(0px)';

window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { // double rAF ensures DOM is fully painted
            document.body.classList.remove("preload");
            updateParallax();
        });
    });
});

window.addEventListener("scroll", () => {
    requestAnimationFrame(updateParallax);
});

const observer = new IntersectionObserver ((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.slide-left, .slide-right').forEach((el) => {
    observer.observe(el);
});