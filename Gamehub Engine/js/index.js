document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorHeader();

    const carrusel = document.querySelector('.carrusel-simple');
    const slides = document.querySelectorAll('.slide-banner');

    if (carrusel && slides.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('slide-activo');
                } else {
                    entry.target.classList.remove('slide-activo');
                }
            });
        }, {
            root: carrusel,
            threshold: 0.6
        });

        slides.forEach(slide => observer.observe(slide));

        let direccion = 1;
        setInterval(() => {
            const maxScroll = carrusel.scrollWidth - carrusel.clientWidth;
            
            if (carrusel.scrollLeft >= maxScroll - 10) {
                direccion = -1;
            } else if (carrusel.scrollLeft <= 0) {
                direccion = 1;
            }

            carrusel.scrollBy({
                left: carrusel.clientWidth * direccion,
                behavior: 'smooth'
            });
        }, 4500);
    }
});

function actualizarContadorHeader() {
    const contadorCarrito = document.querySelector(".nav-carrito") || document.querySelector(".header-nav a[href='carrito.html']");
        const carrito = JSON.parse(localStorage.getItem("carritoStore")) || [];
        const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);    
    if (contadorCarrito) {
        contadorCarrito.textContent = `🛒 (${totalItems})`;
    } else {
        console.warn("No se encontró el elemento del carrito en el HTML.");
    }
}