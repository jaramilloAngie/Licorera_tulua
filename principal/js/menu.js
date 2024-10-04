const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");
// Selección de los elementos del DOM para la búsqueda
const searchInput = document.querySelector("#search-input");
const searchButton = document.querySelector("#search-button");




function showPopupOnce() {
    if (!localStorage.getItem('popupShown')) {
        document.getElementById('floating-window').style.display = 'block';
        localStorage.setItem('popupShown', 'true');
    }
};

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('floatingWindow').style.display = 'block';
});

document.getElementById('closeButton').addEventListener('click', function () {
    alert('Lo siento, debes seleccionar una opción')
});
//Funcion de botones de la ventanan emergente
document.addEventListener("DOMContentLoaded", function () {
    const button1 = document.getElementById("button1");
    const floatingWindow = document.getElementById("floatingWindow");

    button1.addEventListener("click", function () {
        // Ocultar la ventana flotante al hacer clic en el botón de cerrar
        floatingWindow.style.display = "none";
    });
    document.getElementById('button2').addEventListener('click', function () {
        alert('Lo siento, no puedes acceder en este momento no puedes acceder')
    })
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('floatingWindow').style.display = 'block';
});

document.getElementById('closeButton').addEventListener('click', function () {
    document.getElementById('floatingWindow').style.display = 'none';
});
//Funcion de botones de la ventanan emergente
document.addEventListener("DOMContentLoaded", function () {
    const button1 = document.getElementById("button1");
    const floatingWindow = document.getElementById("floatingWindow");

    button1.addEventListener("click", function () {
        // Ocultar la ventana flotante al hacer clic en el botón de cerrar
        floatingWindow.style.display = "none";
    });
});
openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})
/*Logica de la busqueda*/
searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const productosFiltrados = productos.filter(producto =>
        producto.titulo.toLowerCase().includes(searchTerm) ||
        producto.categoria.nombre.toLowerCase().includes(searchTerm)
    );
    cargarProductos(productosFiltrados);
});

// También se puede habilitar la búsqueda al presionar la tecla "Enter"
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchButton.click();
    }
});

// Función para cargar los productos (sin cambios)
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();
}

// Función para mostrar la ventana emergente una vez
function mostrarVentanaEmergenteUnaVez() {
    // Verificar si ya se mostró la ventana emergente
    if (!localStorage.getItem('ventanaEmergenteMostrada')) {
        // Si no se ha mostrado, mostrar la ventana emergente
        document.getElementById('floatingWindow').style.display = 'block';
        // Establecer una marca en el almacenamiento local indicando que la ventana emergente se ha mostrado
        localStorage.setItem('ventanaEmergenteMostrada', 'true');
    }
}

// Llamar a la función cuando se carga la página
window.onload = mostrarVentanaEmergenteUnaVez;

//Logica ventana
document.addEventListener("DOMContentLoaded", function () {
    var overlay = document.getElementById("overlay");
    var floatingWindow = document.getElementById("floatingWindow");
    var closeButton = document.getElementById("closeButton");
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");

    closeButton.addEventListener("click", function () {
        alert("Acceso denegado");
        floatingWindow.style.display = "block";
    });

    button1.addEventListener("click", function () {
        floatingWindow.style.display = "none";
        overlay.style.display = "none";
    });

    button2.addEventListener("click", function () {
        alert("Acceso denegado");
        window.location.href = "https://www.google.com";
    });

    // Prevent interaction with the rest of the page
    overlay.style.display = "block";
    floatingWindow.style.display = "block";
});