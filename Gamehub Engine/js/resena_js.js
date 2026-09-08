function abrirModalResena(ordenId, productoId, nombreProducto) {
    document.getElementById('modal-resena-producto').textContent = "Producto: " + nombreProducto;
    document.getElementById('resena-orden-id').value = ordenId;
    document.getElementById('resena-producto-id').value = productoId;

    document.getElementById('modal-resena').classList.remove('hidden');
}

function abrirModalGarantia(ordenId, nombreProducto) {
    document.getElementById('modal-garantia-producto').textContent = "Producto: " + nombreProducto;
    document.getElementById('garantia-orden-id').value = ordenId;

    document.getElementById('modal-garantia').classList.remove('hidden');
}

function cerrarModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}