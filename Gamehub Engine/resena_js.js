<script>
    // Función para abrir el modal de Reseñas
    function abrirModalResena(ordenId, productoId, nombreProducto) {
        // Rellenar los datos en el modal
        document.getElementById('modal-resena-producto').textContent = "Producto: " + nombreProducto;
        document.getElementById('resena-orden-id').value = ordenId;
        document.getElementById('resena-producto-id').value = productoId;
        
        // Quitar la clase 'hidden' para mostrar el modal
        document.getElementById('modal-resena').classList.remove('hidden');
    }

    // Función para abrir el modal de Garantía
    function abrirModalGarantia(ordenId, nombreProducto) {
        // Rellenar los datos
        document.getElementById('modal-garantia-producto').textContent = "Producto: " + nombreProducto;
        document.getElementById('garantia-orden-id').value = ordenId;
        
        // Mostrar el modal
        document.getElementById('modal-garantia').classList.remove('hidden');
    }

    // Función para cerrar cualquier modal
    function cerrarModales() {
        document.getElementById('modal-resena').classList.add('hidden');
        document.getElementById('modal-garantia').classList.add('hidden');
    }
</script>