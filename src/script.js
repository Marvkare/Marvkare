// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header'); // Para controlar la altura del header si el menú se posiciona debajo

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active'); // Alterna la clase 'active' para mostrar/ocultar
            // Opcional: Si quieres que el header cambie de altura o estilo al abrir el menú
            // header.classList.toggle('menu-open');
        });

        // Opcional: Cierra el menú móvil si se hace clic en un enlace de navegación
        // Esto es útil para mejorar la experiencia de usuario en móviles
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    // header.classList.remove('menu-open'); // Si usaste esta clase
                }
            });
        });
    }

    // 2. Desplazamiento Suave (Smooth Scroll)
    // Selecciona todos los enlaces que apuntan a una sección de la misma página (ej. #inicio, #sobre-mi)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Previene el comportamiento por defecto del enlace (salto instantáneo)
            e.preventDefault();

            // Obtiene el ID del destino del enlace (ej. "inicio", "sobre-mi")
            const targetId = this.getAttribute('href');

            // Encuentra el elemento destino
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcula la posición a la que hacer scroll
                // Opcional: Ajusta el desplazamiento para tener en cuenta el header fijo
                const headerOffset = header ? header.offsetHeight : 0; // Obtiene la altura del header
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                // Realiza el scroll suave
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // Esto activa el scroll suave
                });
            }
        });
    });

    // 3. Opcional: Resaltar enlace de navegación activo al hacer scroll
    // Esto es un poco más avanzado y puede requerir un poco más de CSS y lógica
    const sections = document.querySelectorAll('section');
    const navLi = document.querySelectorAll('.nav-links li');

    const highlightNavOnScroll = () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - (header ? header.offsetHeight + 50 : 50); // Ajusta offset
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLi.forEach(li => {
            li.classList.remove('active');
            if (li.querySelector('a').getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavOnScroll);
    // Llama una vez al cargar la página para establecer el activo inicial
    highlightNavOnScroll();
});