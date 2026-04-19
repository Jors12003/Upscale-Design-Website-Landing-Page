window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const hero = document.querySelector('.parallax-bg');
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
});

let lastScroll = 0;

window.addEventListener('scroll', function() {
    const nav = document.querySelector(".nav-section");
    const logo = document.querySelector("nav img");
    const links = document.querySelectorAll(".navlinks ul li");

    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        nav.classList.add("nav-hidden");
        logo.style.opacity = "0";

    } else {
        nav.classList.remove("nav-hidden");
        logo.style.opacity = "1";
    }

    lastScroll = currentScroll;
    link.forEach(links, index => {
        link.style.animation = "0.5s ease"
        item.style.transform = `translateY(${currentScroll > 50 ? 0 : -20}px)`;
        link.style.animationDelay = `${index * 0.5}s`;
    });
});