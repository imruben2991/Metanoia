document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado y analizado'); // Verifica en la consola

    // Añadir la clase 'loaded' al body cuando la página esté completamente cargada
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    const menuToggle = document.querySelector('#menu-toggle');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const sliderWrapper = document.querySelector('.slider-wrapper'); // Asegúrate de que la clase sea 'slider-wrapper'
    const prevButton = document.querySelector('.slider-control-prev');
    const nextButton = document.querySelector('.slider-control-next');
    const indicatorsContainer = document.querySelector('.slider-indicators'); // Contenedor para los indicadores
    const slides = document.querySelectorAll('.slider-item');
    const itemsPerPage = 1; // Muestra un producto por vez
    const totalItems = slides.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage); // Número total de páginas
    let currentIndex = 0;

    // Manejo del menú desplegable
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

    // Función para actualizar el slider
    function updateSlider() {
        const offset = -currentIndex * (100 / totalPages); // Mueve en porcentaje basado en el número total de páginas
        gsap.to(sliderWrapper, {
            x: `${offset}%`,
            duration: 0.8, // Duración ajustada para un movimiento más suave
            ease: 'ease-in-out'
        });

        // Actualiza los indicadores
        if (indicatorsContainer) {
            indicatorsContainer.innerHTML = ''; // Limpia los indicadores existentes
            for (let i = 0; i < totalPages; i++) {
                const indicator = document.createElement('div');
                indicator.classList.add('slider-indicator');
                if (i === Math.floor(currentIndex / itemsPerPage)) {
                    indicator.classList.add('active');
                }
                indicatorsContainer.appendChild(indicator);
            }
        }
    }

    // Función para mostrar el slide anterior
    function showPrevSlide() {
        if (currentIndex > 0) {
            currentIndex -= itemsPerPage;
        } else {
            currentIndex = (totalItems - itemsPerPage); // Ir al último conjunto de slides
        }
        updateSlider();
    }

    // Función para mostrar el siguiente slide
    function showNextSlide() {
        if (currentIndex < (totalItems - itemsPerPage)) {
            currentIndex += itemsPerPage;
        } else {
            currentIndex = 0; // Regresar al primer conjunto de slides
        }
        updateSlider();
    }

    // Controladores de eventos para los botones de navegación
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', showPrevSlide);
        nextButton.addEventListener('click', showNextSlide);
    }

    // Inicializa el slider en la posición correcta
    updateSlider(); // Se asegura de que el slider comience en el primer conjunto de elementos sin moverse automáticamente
});
