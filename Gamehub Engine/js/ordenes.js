document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".lista-ordenes");
    const ordenes = JSON.parse(localStorage.getItem("ordenesStore")) || [];
    const modal = document.getElementById("modal-detalles");
    const cerrarModal = document.getElementById("cerrar-modal-detalles");
    const contenidoModal = document.getElementById("contenido-modal-detalles");

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

    // Renderizar tarjetas de órdenes pasándole el índice a cada botón
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
                            <button class="btn-resena" onclick="window.location.href='resenas.html'">⭐ Dejar Reseña</button>
                            <button class="btn-accion-garantia" onclick="window.location.href='modelo_de_garantia.html'">Solicitar Garantía</button>
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

    // Evento para abrir el modal y mostrar información detallada
    contenedor.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-ver-detalles")) {
            const index = e.target.getAttribute("data-index");
            const orden = ordenes[index];
            const reseñasGuardadas = JSON.parse(localStorage.getItem("reseñasStore")) || [];

            contenidoModal.innerHTML = `
                <p><strong>Comprador:</strong> ${orden.cliente || "Usuario Registrado"}</p>
                <p><strong>Fecha:</strong> ${orden.fecha}</p>
                <p><strong>N° Orden:</strong> #${orden.id}</p>
                
                <h4 style="margin-top:1.2rem; color:#00e676;">Productos y Reseñas:</h4>
                <ul style="list-style:none; padding:0; margin-top:0.5rem;">
                    ${orden.productos.map(p => {
                        const reseña = reseñasGuardadas.find(r => r.productoId === p.id);
                        return `
                            <li style="background:#252936; padding:0.8rem; border-radius:6px; margin-bottom:0.6rem;">
                                <div style="display:flex; justify-between; align-items:center;">
                                    <strong>${p.nombre}</strong>
                                    <span>x${p.cantidad}</span>
                                </div>
                                <div style="margin-top:0.4rem; font-size:0.9rem; color:#bbb;">
                                    ${reseña 
                                        ? `<p style="margin:0; color:#ffca28;">⭐ ${reseña.comentario}</p>` 
                                        : `<p style="margin:0; italic; color:#888;">Sin reseña escrita aún.</p>`
                                    }
                                </div>
                            </li>
                        `;
                    }).join('')}
                </ul>
                <div style="text-align:right; margin-top:1rem; font-size:1.1rem;">
                    <strong>Total General:</strong> $${orden.total.toLocaleString('es-CL')}
                </div>
            `;

            modal.style.display = "flex";
        }
    });

    // Eventos para cerrar el modal
    if (cerrarModal) {
        cerrarModal.addEventListener("click", () => modal.style.display = "none");
    }
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});