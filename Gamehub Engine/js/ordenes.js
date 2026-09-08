document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".lista-ordenes");
    const ordenes = JSON.parse(localStorage.getItem("ordenesStore")) || [];

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

    contenedor.innerHTML = ordenes.map(orden => `
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
                            <button class="btn-secundario">Ver Detalles</button>
                            <button class="btn-resena" onclick="window.location.href='modelo_de_reseñas.html'">⭐ Dejar Reseña</button>
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
});