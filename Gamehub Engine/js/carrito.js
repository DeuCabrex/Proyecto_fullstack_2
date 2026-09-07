const contenedorItems = document.getElementById("contenedor-items-carrito");
const resumenSubtotal = document.getElementById("resumen-subtotal");
const resumenDescuentos = document.getElementById("resumen-descuentos");
const resumenTotal = document.getElementById("resumen-total");
const contadorCarrito = document.getElementById("contador-carrito");

let carrito = JSON.parse(localStorage.getItem("carritoStore")) || [];

function formatearDinero(valor) {
    return `$${valor.toLocaleString('es-CL')}`;
}

function actualizarContador() {
    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    if (contadorCarrito) contadorCarrito.textContent = `(${totalItems})`;
}

function calcularTotales() {
    let subtotal = 0;
    let totalPagar = 0;

    carrito.forEach(item => {
        subtotal += item.precioNormal * item.cantidad;
        totalPagar += item.precioTransferencia * item.cantidad;
    });

    const descuentos = subtotal - totalPagar;

    resumenSubtotal.textContent = formatearDinero(subtotal);
    resumenDescuentos.textContent = `-${formatearDinero(descuentos)}`;
    resumenTotal.textContent = formatearDinero(totalPagar);
}

function renderizarCarrito() {
    contenedorItems.innerHTML = "";
    
    if (carrito.length === 0) {
        contenedorItems.innerHTML = `
            <div class="carrito-vacio">
                <h3>Tu carrito está vacío</h3>
                <p>¡Explora nuestro catálogo y encuentra lo mejor en hardware!</p>
            </div>
        `;
        calcularTotales();
        actualizarContador();
        return;
    }

    carrito.forEach((item, index) => {
        const div = document.createElement("article");
        div.className = "item-carrito";
        div.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}">
            
            <div class="item-detalles">
                <span class="marca">${item.marca}</span>
                <h4>${item.nombre}</h4>
            </div>

            <div class="item-precio-controles">
                <span class="item-precio">${formatearDinero(item.precioTransferencia)}</span>
                
                <div class="controles-cantidad">
                    <button class="btn-cantidad disminuir" data-index="${index}">-</button>
                    <input type="text" class="cantidad-input" value="${item.cantidad}" readonly>
                    <button class="btn-cantidad aumentar" data-index="${index}">+</button>
                </div>
                
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        `;
        contenedorItems.appendChild(div);
    });

    calcularTotales();
    actualizarContador();
}

contenedorItems.addEventListener("click", (e) => {
    const index = e.target.getAttribute("data-index");
    
    if (index === null) return;

    if (e.target.classList.contains("aumentar")) {
        carrito[index].cantidad++;
    } else if (e.target.classList.contains("disminuir")) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        }
    } else if (e.target.classList.contains("btn-eliminar")) {
        carrito.splice(index, 1);
    }

    localStorage.setItem("carritoStore", JSON.stringify(carrito));
    renderizarCarrito();
});

document.addEventListener("DOMContentLoaded", renderizarCarrito);

const btnPagar = document.getElementById("btn-pagar");
const modalCheckout = document.getElementById("modal-checkout");
const btnCerrarModal = document.getElementById("cerrar-modal");
const formCheckout = document.getElementById("formulario-checkout");
const btnConfirmarPago = document.getElementById("btn-confirmar-pago");

if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. ¡Agrega algunos productos antes de pagar!");
            return;
        }
        modalCheckout.style.display = "flex"; 
    });
}

if (btnCerrarModal) {
    btnCerrarModal.addEventListener("click", () => {
        modalCheckout.style.display = "none";
    });
}

window.addEventListener("click", (e) => {
    if (e.target === modalCheckout) {
        modalCheckout.style.display = "none";
    }
});

if (formCheckout) {
    formCheckout.addEventListener("submit", (e) => {
        e.preventDefault(); 

        const nombreCliente = document.getElementById("nombre").value;
        const direccionEnvio = document.getElementById("direccion").value;

        const textoOriginal = btnConfirmarPago.textContent;
        btnConfirmarPago.textContent = "Procesando pago...";
        btnConfirmarPago.style.opacity = "0.7";
        btnConfirmarPago.style.cursor = "not-allowed";
        btnConfirmarPago.disabled = true;

        setTimeout(() => {
            const totalPagado = carrito.reduce((acc, item) => acc + (item.precioTransferencia * item.cantidad), 0);

            const nuevaOrden = {
                id: `ORD-${Date.now()}`,
                fecha: new Date().toLocaleDateString('es-CL'),
                cliente: nombreCliente,
                direccion: direccionEnvio,
                total: totalPagado,
                productos: [...carrito] 
            };

            const historialOrdenes = JSON.parse(localStorage.getItem("ordenesStore")) || [];
            historialOrdenes.unshift(nuevaOrden);
            localStorage.setItem("ordenesStore", JSON.stringify(historialOrdenes));

            carrito = [];
            localStorage.removeItem("carritoStore");
            renderizarCarrito();
            formCheckout.reset();

            btnConfirmarPago.textContent = textoOriginal;
            btnConfirmarPago.style.opacity = "1";
            btnConfirmarPago.style.cursor = "pointer";
            btnConfirmarPago.disabled = false;
            modalCheckout.style.display = "none";

            alert(`¡Pago realizado con éxito! 🎮\n\nGracias ${nombreCliente}. Tu pedido será enviado a: ${direccionEnvio}.\n\nTu número de orden es: ${nuevaOrden.id}.`);
            
        }, 1500);
    });
}