document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".lista-ordenes");
    const ordenes = JSON.parse(localStorage.getItem("ordenesStore")) || [];
    const modal = document.getElementById("modal-detalles");
    const cerrarModal = document.getElementById("cerrar-modal-detalles");
    const contenidoModal = document.getElementById("contenido-modal-detalles");

    actualizarContadorHeader();

    if (!contenedor) return;

    if (ordenes.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 3rem;">
                <h3>No tienes órdenes registradas</h3>
                <p>Las compras que realices aparecerán aquí.</p>
            </div>
        `;
        return;
    }

    contenedor.innerHTML = ordenes.map((orden, index) => `
        <article class="tarjeta-orden">
            <header class="orden-header">
                <div class="orden-info-meta">
                    <span class="orden-id">#${orden.id}</span>
                    <span class="orden-fecha">${orden.fecha}</span>
                </div>
                <span class="badge-estado estado-transito">En Tránsito</span>
            </header>

            <div class="orden-body">
                ${orden.productos.map(item => `
                    <div class="item-producto">
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <div class="item-detalles">
                            <h3>${item.nombre}</h3>
                            <p>Cantidad: ${item.cantidad} | Marca: ${item.marca}</p>
                        </div>
                        <div class="item-acciones">
                            <button class="btn-secundario btn-ver-detalles" data-index="${index}">Ver Detalles</button>
                        </div>
                    </div>
                `).join('')}

                <div class="seguimiento-despacho">
                    <h4>Seguimiento del paquete</h4>
                    <div class="linea-progreso">
                        <div class="paso completado"><span>1</span> Preparación</div>
                        <div class="paso activo"><span>2</span> En camino</div>
                        <div class="paso"><span>3</span> Entregado</div>
                    </div>
                </div>
            </div>

            <footer class="orden-footer">
                <span class="total-etiqueta">Total pagado:</span>
                <span class="total-monto">$${orden.total.toLocaleString('es-CL')}</span>
            </footer>
        </article>
    `).join('');

    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-ver-detalles")) {
            const index = e.target.getAttribute("data-index");
            const orden = ordenes[index];

            contenidoModal.innerHTML = `
                <p><strong>Comprador:</strong> ${orden.cliente || "Usuario Registrado"}</p>
                <p><strong>Fecha:</strong> ${orden.fecha}</p>
                <p><strong>N° Orden:</strong> #${orden.id}</p>
                
                <ul style="list-style:none; padding:0; margin-top:1rem;">
                    ${orden.productos.map(p => `
                        <li style="background:#252936; padding:0.8rem; border-radius:6px; margin-bottom:0.6rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <strong>${p.nombre}</strong>
                                <span>x${p.cantidad}</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
                <div style="text-align:right; margin-top:1rem; font-size:1.1rem;">
                    <strong>Total General:</strong> $${orden.total.toLocaleString('es-CL')}
                </div>
            `;

            modal.style.display = "flex";
        }
    });

    if (cerrarModal) {
        cerrarModal.addEventListener("click", () => modal.style.display = "none");
    }
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});

function actualizarContadorHeader() {
    const contadorCarrito = document.querySelector(".nav-carrito") || document.querySelector(".header-nav a[href='carrito.html']");
    const carrito = JSON.parse(localStorage.getItem("carritoStore")) || [];
    const totalItems = carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0);
    
    if (contadorCarrito) {
        contadorCarrito.textContent = `🛒 (${totalItems})`;
    }
}