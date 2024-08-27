document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado y analizado'); // Verifica en la consola

    // Añadir la clase 'loaded' al body cuando la página esté completamente cargada
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevButton = document.querySelector('.prev'); // Botón '<'
    const nextButton = document.querySelector('.next'); // Botón '>'
    const slides = document.querySelectorAll('.slider-item');
    const totalItems = slides.length;
    let currentIndex = 0;

    // Manejo del menú desplegable
    if (menuToggle && dropdownMenu) {
        let menuOpen = false;

        menuToggle.addEventListener('click', function () {
            menuOpen = !menuOpen;

            if (menuOpen) {
                document.body.classList.add('menu-open');
                menuToggle.classList.add('open'); // Cambia el estado del botón
            } else {
                document.body.classList.remove('menu-open');
                menuToggle.classList.remove('open'); // Restaura el estado del botón
            }
        });

        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                document.body.classList.remove('menu-open');
                menuToggle.classList.remove('open');
                menuOpen = false;
            }
        });
    }

    // Función para actualizar el slider
    function updateSlider() {
        const offset = -currentIndex * 100; // Mueve en porcentaje basado en el número total de items
        gsap.to(sliderWrapper, {
            x: `${offset}%`,
            duration: 0.8, // Duración ajustada para un movimiento más suave
            ease: 'ease-in-out'
        });
    }

    // Función para mostrar el slide anterior
    function showPrevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - 1; // Ir al último slide
        }
        updateSlider();
    }

    // Función para mostrar el siguiente slide
    function showNextSlide() {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Regresar al primer slide
        }
        updateSlider();
    }

    // Controladores de eventos para los botones de navegación
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPrevSlide);
        nextButton.addEventListener('click', showNextSlide);
    }

    // Inicializa el slider en la posición correcta
    updateSlider(); // Se asegura de que el slider comience en el primer slide

    // Función para desplazarse hacia arriba
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Mostrar el botón de desplazamiento hacia arriba al hacer scroll
    window.addEventListener('scroll', function () {
        const button = document.querySelector('.scroll-to-top');
        if (window.scrollY > 300) { // Muestra el botón si se ha desplazado más de 300px
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    // Añadir el evento de clic al botón de desplazamiento hacia arriba
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        scrollButton.addEventListener('click', scrollToTop);
    }
});
