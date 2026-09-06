document.addEventListener("DOMContentLoaded", () => {
    const contenedorGrilla = document.getElementById("grilla-productos");
    const formFiltros = document.getElementById("form-filtros");
    const selectCategoria = document.getElementById("filtro-categoria");
    const selectMarca = document.getElementById("filtro-marca");
    const inputPrecioMin = document.getElementById("precio-min");
    const inputPrecioMax = document.getElementById("precio-max");
    const selectOrdenar = document.getElementById("ordenar-por");
    const btnLimpiar = document.getElementById("btn-limpiar");
    const errorPrecio = document.getElementById("error-precio");

    let productosActuales = [...productosDB];

    function renderizarProductos(productos) {
        contenedorGrilla.innerHTML = "";

        if (productos.length === 0) {
            contenedorGrilla.innerHTML = `<p class="mensaje-vacio">No se encontraron productos que coincidan con la búsqueda.</p>`;
            return;
        }

        productos.forEach(prod => {
            const card = document.createElement("article");
            card.className = "Fractal-ProductCard--container";

            const pTransferencia = prod.precioTransferencia || 0;
            const pNormal = prod.precioNormal || Math.round(pTransferencia * 1.25);
            const pOtros = prod.precioOtros || Math.round(pTransferencia * 1.05);
            const dcto = prod.descuento || 20;

            card.innerHTML = `
                <div class="Fractal-ProductCard__image--container">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                </div>
                
                <div class="Fractal-ProductCard__description--container">
                    <span class="marca-sp">${prod.marca}</span>
                    <h3 class="titulo-sp">${prod.nombre}</h3>
                </div>

                <div class="Fractal-ProductCard__price--container">
                    <div class="fila-descuento">
                        <span class="badge-dcto">${dcto}% DCTO.</span>
                        <span class="precio-normal">$${pNormal.toLocaleString('es-CL')}</span>
                    </div>
                    
                    <div class="Fractal-ProductCard--priceVariantContainer">
                        <span class="Fractal-Price--price principal">$${pTransferencia.toLocaleString('es-CL')}</span>
                        <span class="Fractal-Typography__typography--caption acento">Transferencias</span>
                    </div>
                    
                    <div class="Fractal-ProductCard--priceVariantContainer" style="margin-top: 6px;">
                        <span class="Fractal-Price--price secundario">$${pOtros.toLocaleString('es-CL')}</span>
                        <span class="Fractal-Typography__typography--caption">Otros medios de pago</span>
                    </div>
                </div>
            `;
            contenedorGrilla.appendChild(card);
        });
    }

    function aplicarFiltrosYOrden() {
        errorPrecio.textContent = "";

        const categoriaVal = selectCategoria.value.toLowerCase();
        const marcaVal = selectMarca.value.toLowerCase();
        const precioMin = parseInt(inputPrecioMin.value) || 0;
        const precioMax = parseInt(inputPrecioMax.value) || Infinity;
        const ordenVal = selectOrdenar.value;

        if (precioMin > precioMax) {
            errorPrecio.textContent = "El precio mínimo no puede ser mayor al máximo.";
            return;
        }

        productosActuales = productosDB.filter(prod => {
            const prodCat = prod.categoria ? prod.categoria.toLowerCase() : "";
            const prodMarca = prod.marca ? prod.marca.toLowerCase() : "";
            const precio = prod.precioTransferencia || 0;

            const coincideCategoria = categoriaVal === "todas" || prodCat === categoriaVal;
            const coincideMarca = marcaVal === "todas" || prodMarca === marcaVal;
            const coincidePrecio = precio >= precioMin && precio <= precioMax;

            return coincideCategoria && coincideMarca && coincidePrecio;
        });

        if (ordenVal === "precio-asc") {
            productosActuales.sort((a, b) => a.precioTransferencia - b.precioTransferencia);
        } else if (ordenVal === "precio-desc") {
            productosActuales.sort((a, b) => b.precioTransferencia - a.precioTransferencia);
        } else if (ordenVal === "nombre-asc") {
            productosActuales.sort((a, b) => a.nombre.localeCompare(b.nombre));
        } else {
            productosActuales.sort((a, b) => a.id - b.id);
        }

        renderizarProductos(productosActuales);
    }

    formFiltros.addEventListener("submit", (e) => {
        e.preventDefault();
        aplicarFiltrosYOrden();
    });

    btnLimpiar.addEventListener("click", () => {
        formFiltros.reset();
        errorPrecio.textContent = "";
        selectOrdenar.value = "destacados";
        aplicarFiltrosYOrden();
    });

    selectOrdenar.addEventListener("change", aplicarFiltrosYOrden);

    renderizarProductos(productosActuales);
});