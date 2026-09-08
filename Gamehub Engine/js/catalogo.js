const contenedorGrilla = document.getElementById("grilla-productos");
const btnAplicar = document.getElementById("btn-aplicar");
const btnLimpiar = document.getElementById("btn-limpiar");
const selectCategoria = document.getElementById("filtro-categoria");
const selectMarca = document.getElementById("filtro-marca");
const inputMin = document.getElementById("precio-min");
const inputMax = document.getElementById("precio-max");
const selectOrdenar = document.getElementById("ordenar");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carritoStore")) || [];

function actualizarContador() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contadorCarrito) {
        contadorCarrito.textContent = `(${totalItems})`;
    }
}

actualizarContador();


function renderizarProductos(productos) {
    contenedorGrilla.innerHTML = "";
    
    if (productos.length === 0) {
        contenedorGrilla.innerHTML = "<p class='mensaje-vacio'>No se encontraron productos con estos filtros.</p>";
        return;
    }

    productos.forEach(prod => {
        const card = document.createElement("article");
        card.className = "Fractal-ProductCard--container";

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
                    <span class="badge-dcto">${prod.descuento}% DCTO.</span>
                    <span class="precio-normal">$${prod.precioNormal.toLocaleString('es-CL')}</span>
                </div>
                
                <div class="Fractal-ProductCard--priceVariantContainer">
                    <span class="precio-principal">$${prod.precioTransferencia.toLocaleString('es-CL')}</span>
                    <span class="caption acento">Transferencias</span>
                </div>
                
                <div class="Fractal-ProductCard--priceVariantContainer" style="margin-top: 6px;">
                    <span class="precio-secundario">$${prod.precioOtros.toLocaleString('es-CL')}</span>
                    <span class="caption">Otros medios de pago</span>
                </div>
            </div>
            
            <button class="btn-agregar-carrito" data-id="${prod.id}">
                Agregar al carrito
            </button>
        `;
        contenedorGrilla.appendChild(card);
    });
}


function aplicarFiltros() {
    let filtrados = productosDB.filter(prod => {
        const cumpleCategoria = selectCategoria.value === "todas" || prod.categoria === selectCategoria.value;
        const cumpleMarca = selectMarca.value === "todas" || prod.marca.toLowerCase() === selectMarca.value.toLowerCase();
        const cumpleMin = prod.precioTransferencia >= (Number(inputMin.value) || 0);
        const cumpleMax = prod.precioTransferencia <= (Number(inputMax.value) || Infinity);
        
        return cumpleCategoria && cumpleMarca && cumpleMin && cumpleMax;
    });

    if (selectOrdenar.value === "menor-precio") {
        filtrados.sort((a, b) => a.precioTransferencia - b.precioTransferencia);
    } else if (selectOrdenar.value === "mayor-precio") {
        filtrados.sort((a, b) => b.precioTransferencia - a.precioTransferencia);
    }

    renderizarProductos(filtrados);
}

btnAplicar.addEventListener("click", aplicarFiltros);
selectOrdenar.addEventListener("change", aplicarFiltros);

btnLimpiar.addEventListener("click", () => {
    selectCategoria.value = "todas";
    selectMarca.value = "todas";
    inputMin.value = "0";
    inputMax.value = "2000000";
    selectOrdenar.value = "destacados";
    renderizarProductos(productosDB);
});

contenedorGrilla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-agregar-carrito")) {
        const boton = e.target;
        const idProducto = parseInt(boton.getAttribute("data-id"));
        
        const producto = productosDB.find(p => p.id === idProducto);
        
        const existe = carrito.find(p => p.id === idProducto);
        
        if (existe) {
            existe.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        localStorage.setItem("carritoStore", JSON.stringify(carrito));

        actualizarContador();

        const textoOriginal = boton.textContent;
        boton.textContent = "¡Agregado!";
        boton.style.backgroundColor = "var(--color-exito)"; 
        
        setTimeout(() => {
            boton.textContent = textoOriginal;
            boton.style.backgroundColor = ""; 
        }, 1000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderizarProductos(productosDB);
});