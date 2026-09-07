const productosDB = [
    {
        id: 1,
        nombre: "Audífonos Gamer HyperX Cloud III Wireless",
        marca: "HyperX",
        categoria: "perifericos",
        precioTransferencia: 114990,
        precioOtros: 120170,
        precioNormal: 149990,
        descuento: 23,
        imagen: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80"
    },
    {
        id: 2,
        nombre: "Teclado Mecánico Logitech G Pro X TKL",
        marca: "Logitech",
        categoria: "perifericos",
        precioTransferencia: 89990,
        precioOtros: 94490,
        precioNormal: 119990,
        descuento: 25,
        imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80"
    },
    {
        id: 3,
        nombre: "Mouse Gamer Logitech G Pro X Superlight 2",
        marca: "Logitech",
        categoria: "perifericos",
        precioTransferencia: 129990,
        precioOtros: 136490,
        precioNormal: 169990,
        descuento: 24,
        imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&q=80"
    },
    {
        id: 4,
        nombre: "Mouse Gamer Logitech G502 Hero",
        marca: "Logitech",
        categoria: "perifericos",
        precioTransferencia: 44990,
        precioOtros: 47240,
        precioNormal: 59990,
        descuento: 25,
        imagen: "https://images.unsplash.com/photo-1527814050087-379381547384?w=400&q=80"
    },
    {
        id: 5,
        nombre: "Audífonos Inalámbricos Logitech G733 Lightspeed",
        marca: "Logitech",
        categoria: "perifericos",
        precioTransferencia: 119990,
        precioOtros: 125990,
        precioNormal: 149990,
        descuento: 20,
        imagen: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&q=80"
    },
    {
        id: 6,
        nombre: "Notebook Gamer Asus ROG Strix Scar i9 RTX 4080",
        marca: "Asus",
        categoria: "notebooks",
        precioTransferencia: 2299990,
        precioOtros: 2999990,
        precioNormal: 4600000,
        descuento: 50,
        imagen: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80"
    },
    {
        id: 7,
        nombre: "Notebook Asus TUF Gaming F15 i5 RTX 3050",
        marca: "Asus",
        categoria: "notebooks",
        precioTransferencia: 749990,
        precioOtros: 787490,
        precioNormal: 999990,
        descuento: 25,
        imagen: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80"
    },
    {
        id: 8,
        nombre: "Notebook Asus ROG Zephyrus G14 Ryzen 9",
        marca: "Asus",
        categoria: "notebooks",
        precioTransferencia: 1299990,
        precioOtros: 1364990,
        precioNormal: 1699990,
        descuento: 23,
        imagen: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80"
    },
    {
        id: 9,
        nombre: "Notebook Asus VivoBook Pro 15 OLED",
        marca: "Asus",
        categoria: "notebooks",
        precioTransferencia: 899990,
        precioOtros: 944990,
        precioNormal: 119990,
        descuento: 25,
        imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80"
    },
    {
        id: 10,
        nombre: "Notebook Asus ZenBook Duo 14 i7",
        marca: "Asus",
        categoria: "notebooks",
        precioTransferencia: 1149990,
        precioOtros: 1207490,
        precioNormal: 1499990,
        descuento: 23,
        imagen: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&q=80"
    },
    {
        id: 11,
        nombre: "Tarjeta de Video MSI NVIDIA GeForce RTX 4060",
        marca: "Nvidia",
        categoria: "gpu",
        precioTransferencia: 429990,
        precioOtros: 449345,
        precioNormal: 569990,
        descuento: 25,
        imagen: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80"
    },
    {
        id: 12,
        nombre: "Tarjeta de Video ASUS Dual NVIDIA GeForce RTX 4070",
        marca: "Nvidia",
        categoria: "gpu",
        precioTransferencia: 689990,
        precioOtros: 724490,
        precioNormal: 849990,
        descuento: 19,
        imagen: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80"
    },
    {
        id: 13,
        nombre: "Tarjeta de Video ZOTAC NVIDIA GeForce RTX 4080 Super",
        marca: "Nvidia",
        categoria: "gpu",
        precioTransferencia: 1199990,
        precioOtros: 1259990,
        precioNormal: 1499990,
        descuento: 20,
        imagen: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=400&q=80"
    },
    {
        id: 14,
        nombre: "Tarjeta de Video Gigabyte NVIDIA GeForce RTX 3060",
        marca: "Nvidia",
        categoria: "gpu",
        precioTransferencia: 299990,
        precioOtros: 314990,
        precioNormal: 389990,
        descuento: 23,
        imagen: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80"
    },
    {
        id: 15,
        nombre: "Tarjeta de Video Sapphire AMD Radeon RX 7900 XTX",
        marca: "AMD",
        categoria: "gpu",
        precioTransferencia: 1049990,
        precioOtros: 1102490,
        precioNormal: 1349990,
        descuento: 22,
        imagen: "https://images.unsplash.com/photo-1624704146112-9c6e26214bf8?w=400&q=80"
    },
    {
        id: 16,
        nombre: "Procesador AMD Ryzen 7 7800X3D",
        marca: "AMD",
        categoria: "procesadores",
        precioTransferencia: 389990,
        precioOtros: 409490,
        precioNormal: 479990,
        descuento: 19,
        imagen: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=400&q=80"
    },
    {
        id: 17,
        nombre: "Procesador AMD Ryzen 5 7600X",
        marca: "AMD",
        categoria: "procesadores",
        precioTransferencia: 249990,
        precioOtros: 262490,
        precioNormal: 319990,
        descuento: 22,
        imagen: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80"
    },
    {
        id: 18,
        nombre: "Procesador AMD Ryzen 9 7950X3D",
        marca: "AMD",
        categoria: "procesadores",
        precioTransferencia: 649990,
        precioOtros: 682490,
        precioNormal: 799990,
        descuento: 19,
        imagen: "https://images.unsplash.com/photo-1626407763391-766723223ceb?w=400&q=80"
    },
    {
        id: 19,
        nombre: "Procesador AMD Ryzen 5 5600G con Gráficos Integrados",
        marca: "AMD",
        categoria: "procesadores",
        precioTransferencia: 139990,
        precioOtros: 146990,
        precioNormal: 189990,
        descuento: 26,
        imagen: "amd5600g.png"
    },
    {
        id: 20,
        nombre: "Procesador AMD Ryzen 7 5700X",
        marca: "AMD",
        categoria: "procesadores",
        precioTransferencia: 189990,
        precioOtros: 199490,
        precioNormal: 249990,
        descuento: 24,
        imagen: "https://images.unsplash.com/photo-1631583020626-d668c2ec68bd?w=400&q=80"
    },
    
    {
        id: 21,
        nombre: "Tarjeta de Video Yeston NVIDIA GeForce RTX 5080 Hatsune Miku Edition",
        marca: "Nvidia", 
        categoria: "gpu",
        precioTransferencia: 1499990,
        precioOtros: 1679999,
        precioNormal: 2999990,
        descuento: 50,
        imagen: "grafica_miku.png" 
    }

];