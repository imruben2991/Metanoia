document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado y analizado'); // Verifica en la consola

    // Añadir la clase 'loaded' al body cuando la página esté completamente cargada
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const sliderContainer = document.querySelector('.slider-container');
    const productos = document.querySelectorAll('.producto');

    if (menuToggle && dropdownToggle && dropdownMenu) {
        let menuOpen = false;

        menuToggle.addEventListener('click', function () {
            menuOpen = !menuOpen;

            if (menuOpen) {
                document.body.classList.add('menu-open');
            } else {
                document.body.classList.remove('menu-open');
            }
        });

        dropdownToggle.addEventListener('click', function () {
            document.body.classList.remove('menu-open');
            menuOpen = false;
        });

        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target) && !dropdownToggle.contains(event.target)) {
                document.body.classList.remove('menu-open');
                menuOpen = false;
            }
        });
    }

    // Implementación del slider con GSAP y ScrollTrigger
    if (sliderContainer && productos.length > 0) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.to(sliderContainer, {
            xPercent: -100 * (productos.length - 1),
            ease: 'none',
            scrollTrigger: {
                trigger: sliderContainer,
                pin: true,
                scrub: 1,
                snap: 1 / (productos.length - 1),
                end: () => "+=" + sliderContainer.offsetWidth
            }
        });
    }
});


