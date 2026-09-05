document.addEventListener("DOMContentLoaded", () => {
    let productosActuales = [...productosDB];

    // Referencias al DOM
    const contenedorGrilla = document.getElementById("grilla-productos");
    const formFiltros = document.getElementById("form-filtros");
    const selectCategoria = document.getElementById("filtro-categoria");
    const selectMarca = document.getElementById("filtro-marca");
    const inputMin = document.getElementById("precio-min");
    const inputMax = document.getElementById("precio-max");
    const errorPrecio = document.getElementById("error-precio");
    const selectOrden = document.getElementById("ordenar-por");
    const btnLimpiar = document.getElementById("btn-limpiar");

    function renderizarProductos(productos) {
        contenedorGrilla.innerHTML = "";

        if (productos.length === 0) {
            contenedorGrilla.innerHTML = `<p class="mensaje-vacio">No se encontraron productos que coincidan con los filtros.</p>`;
            return;
        }

        productos.forEach(prod => {
            const articulo = document.createElement("article");
            articulo.classList.add("tarjeta-producto");

            const tieneStock = prod.stock > 0;

            articulo.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <div class="info-producto">
                    <span class="badge-marca">${prod.marca}</span>
                    <h3>${prod.nombre}</h3>
                    <p class="precio">$${prod.precio.toLocaleString('es-CL')}</p>
                    <p class="stock ${tieneStock ? 'en-stock' : 'sin-stock'}">
                        ${tieneStock ? `Stock disponible: ${prod.stock}` : 'Agotado'}
                    </p>
                    <button 
                        class="boton-primario btn-agregar" 
                        data-id="${prod.id}"
                        ${!tieneStock ? 'disabled' : ''}>
                        ${tieneStock ? 'Agregar al Carrito' : 'Sin Stock'}
                    </button>
                </div>
            `;

            contenedorGrilla.appendChild(articulo);
        });

        asignarEventosAgregar();
    }

    function aplicarFiltros(e) {
        if (e) e.preventDefault();

        errorPrecio.textContent = "";

        const min = inputMin.value !== "" ? Number(inputMin.value) : 0;
        const max = inputMax.value !== "" ? Number(inputMax.value) : Infinity;

        if (min > max && max !== Infinity) {
            errorPrecio.textContent = "El precio mínimo no puede ser mayor que el máximo.";
            return;
        }

        const catSeleccionada = selectCategoria.value;
        const marcaSeleccionada = selectMarca.value;

        productosActuales = productosDB.filter(prod => {
            const coincideCat = catSeleccionada === "todas" || prod.categoria === catSeleccionada;
            const coincideMarca = marcaSeleccionada === "todas" || prod.marca === marcaSeleccionada;
            const coincidePrecio = prod.precio >= min && prod.precio <= max;

            return coincideCat && coincideMarca && coincidePrecio;
        });

        aplicarOrdenamiento();
    }

    function aplicarOrdenamiento() {
        const opcion = selectOrden.value;

        if (opcion === "precio-asc") {
            productosActuales.sort((a, b) => a.precio - b.precio);
        } else if (opcion === "precio-desc") {
            productosActuales.sort((a, b) => b.precio - a.precio);
        } else if (opcion === "nombre-asc") {
            productosActuales.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }

        renderizarProductos(productosActuales);
    }

    function asignarEventosAgregar() {
        const botones = document.querySelectorAll(".btn-agregar");
        botones.forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idProd = Number(e.target.dataset.id);
                const productoSeleccionado = productosDB.find(p => p.id === idProd);

                let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                const existeIndex = carrito.findIndex(p => p.id === idProd);

                if (existeIndex !== -1) {
                    if (carrito[existeIndex].cantidad < productoSeleccionado.stock) {
                        carrito[existeIndex].cantidad += 1;
                    } else {
                        alert("No puedes agregar más unidades de las disponibles en stock.");
                        return;
                    }
                } else {
                    carrito.push({ ...productoSeleccionado, cantidad: 1 });
                }

                localStorage.setItem("carrito", JSON.stringify(carrito));
                actualizarContadorCarrito();
                alert(`¡${productoSeleccionado.nombre} agregado al carrito!`);
            });
        });
    }

    function actualizarContadorCarrito() {
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const badge = document.getElementById("contador-carrito");
        if (badge) badge.textContent = totalItems;
    }

    formFiltros.addEventListener("submit", aplicarFiltros);
    selectOrden.addEventListener("change", aplicarOrdenamiento);

    btnLimpiar.addEventListener("click", () => {
        formFiltros.reset();
        errorPrecio.textContent = "";
        productosActuales = [...productosDB];
        selectOrden.value = "destacados";
        renderizarProductos(productosActuales);
    });

    renderizarProductos(productosActuales);
    actualizarContadorCarrito();
});