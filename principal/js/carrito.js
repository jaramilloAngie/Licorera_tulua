document.addEventListener('DOMContentLoaded', () => {

    let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito);

    const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
    const contenedorCarritoProductos = document.querySelector("#carrito-productos");
    const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
    const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
    let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
    const contenedorTotal = document.querySelector("#total");
    const botonComprar = document.querySelector("#carrito-acciones-comprar");

    const modalPago = document.querySelector("#modalPago");
    const cerrarModal = document.querySelectorAll(".cerrar");
    const formularioPago = document.querySelector("#formularioPago");
    const totalPago = document.querySelector("#totalPago");
    const modalExitoso = document.querySelector("#modalExitoso");

    function cargarProductosCarrito() {
        if (productosEnCarrito && productosEnCarrito.length > 0) {

            contenedorCarritoVacio.classList.add("disabled");
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoAcciones.classList.remove("disabled");
            contenedorCarritoComprado.classList.add("disabled");

            contenedorCarritoProductos.innerHTML = "";

            productosEnCarrito.forEach(producto => {

                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;

                contenedorCarritoProductos.append(div);
            })

            actualizarBotonesEliminar();
            actualizarTotal();

        } else {
            contenedorCarritoVacio.classList.remove("disabled");
            contenedorCarritoProductos.classList.add("disabled");
            contenedorCarritoAcciones.classList.add("disabled");
            contenedorCarritoComprado.classList.add("disabled");
        }

    }

    cargarProductosCarrito();

    function actualizarBotonesEliminar() {
        botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

        botonesEliminar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }


    function eliminarDelCarrito(e) {
        // Muestra mensaje de confirmación
        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #4b33a8, #785ce9)",
                borderRadius: "2rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            offset: {
                x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
            },
            onClick: function () { } // Callback after click
        }).showToast();

        const idBoton = e.currentTarget.id;

        // Recorrer el arreglo de productos en el carrito
        productosEnCarrito.forEach(producto => {
            if (producto.id === idBoton && producto.cantidad > 0) {
                producto.cantidad--; // Reducir la cantidad en 1

                // Si la cantidad es 0, eliminar el producto
                if (producto.cantidad === 0) {
                    const index = productosEnCarrito.indexOf(producto);
                    productosEnCarrito.splice(index, 1);
                }
            }
        })

        cargarProductosCarrito();
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    }


    botonVaciar.addEventListener("click", vaciarCarrito);
    function vaciarCarrito() {

        Swal.fire({
            title: '¿Estás seguro?',
            icon: 'question',
            html: `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                productosEnCarrito.length = 0;
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
            }
        })
    }

    function actualizarTotal() {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        contenedorTotal.innerText = `Total: $${totalCalculado}`;
        totalPago.innerText = `Total a pagar: $${totalCalculado}`;
    }

    // Boton comprar
    botonComprar.addEventListener("click", mostrarModalPago);

    // Mostrar el modal de pago
    function mostrarModalPago() {
        actualizarTotal(); // Actualizar el total de la compra
        modalPago.style.display = "flex";c// Hacer visible el modal de pago
    }

    // Vaciar el carrito luego de hacer la compra
    function vaciarCarro(){
        productosEnCarrito.length = 0; // Limpiar el arreglo de productos en el carrito
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guardar el estado vacío del carrito en el almacenamiento local
        cargarProductosCarrito(); // Recargar la lista de productos en el carrito desde el almacenamiento local
    }

    // Agregar un listener a cada span dentro de cerrarModal
    cerrarModal.forEach((span) => {
        span.addEventListener("click", () => {
            modalPago.style.display = "none"; // Ocultar el modal de pago
            modalExitoso.style.display = "none"; // Ocultar el modal de éxito
            vaciarCarro(); // Vaciar el carrito de compras
            window.location.href = 'http://127.0.0.1:5500/index.html?forceGet=true'; // Redirigir a la página iniciar del sitio web
        });
    });

    // Agregar un listener al evento submit del formulario de pago
    formularioPago.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        modalPago.style.display = "none"; // Ocultar el modal de pago
        modalExitoso.style.display = "flex"; // Ocultar el modal de éxito

        // Aquí puedes añadir la lógica para procesar el pago
        // Por ahora, simplemente mostramos el mensaje de éxito
    });

    // Llamar a la función al cargar la página
    window.onload = showPopupOnce;
});