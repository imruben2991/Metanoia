document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado y analizado'); // Verifica en la consola

    // Añadir la clase 'loaded' al body cuando la página esté completamente cargada
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // Selección de elementos
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const prevButton = document.querySelector('.slider-control-prev');
    const nextButton = document.querySelector('.slider-control-next');
    const indicators = document.querySelectorAll('.slider-indicator');
    const slides = document.querySelectorAll('.slider-item');
    let currentIndex = 0;
    const itemsPerPage = 1; // Cambia esto según el número de items visibles en una página
    const totalItems = slides.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Función para actualizar el slider
    function updateSlider() {
        const offset = -currentIndex * (100 / totalPages);
        gsap.to(sliderWrapper, {
            x: `${offset}%`,
            duration: 0.5
        });
        indicators.forEach((indicator, index) => {
            indicator.style.backgroundColor = index === Math.floor(currentIndex / itemsPerPage) ? 'white' : 'rgba(0, 0, 0, 0.5)';
        });
    }

    // Función para mostrar el slide anterior
    function showPrevSlide() {
        currentIndex = (currentIndex - itemsPerPage + totalItems) % totalItems;
        updateSlider();
    }

    // Función para mostrar el siguiente slide
    function showNextSlide() {
        currentIndex = (currentIndex + itemsPerPage) % totalItems;
        updateSlider();
    }

    // Controladores de eventos para los botones de navegación
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPrevSlide);
        nextButton.addEventListener('click', showNextSlide);
    }

    // Manejo del menú desplegable
    if (menuToggle && dropdownToggle && dropdownMenu) {
        let menuOpen = false;

        menuToggle.addEventListener('click', function () {
            menuOpen = !menuOpen;
            document.body.classList.toggle('menu-open', menuOpen);
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
});


