/**
 * Validación para la etiqueta img
 * En caso de que no tenga valor:
 * Párrafo de "Sin especificar",
 * Y si tiene valor: en una etiqueta img.
 * @param {Object} usuario 
 * @return {string} - contenido html
 */
function validarImgDetalle(usuario){
    return usuario.picture.trim() === ""
        ? "Sin especificar"
        : `<img src="${usuario.picture}" alt="Imagen de ${usuario.name}" class="img-fluid rounded mb-3">`;
}

/**
 * Validación de las propiedades.
 * En caso de ser un array vacío o undefined, 
 * "Sin especificar".
 * En caso de tener más de un valor,
 * lo separa por comas.
 * @param {Object} usuario 
 * @param {Array} viviendasArray - Todas las viviendas de DB
 * @returns {string} - contenido html: 'Sin especificar' o las propiedades.
 */
function validarPropiedadesUsuario(usuario){
    if(!usuario.propiedades || (usuario.propiedades && usuario.propiedades.length === 0)){
        return 'Sin especificar'
    } else{
        const arrayPropiedades = usuario.propiedades ?? [];

        const propiedadesHtml = arrayPropiedades.map(vivienda => {
            if(vivienda._id.toString()){
                return vivienda.location;
            }
            console.log(vivienda._id.toString())
        }).join(', ')

        return propiedadesHtml || 'Sin especificar';
    }
}

/**
 * Crear listado de usuarios con sus acciones, como vista.
 * @param {*} usuarios 
 * @returns {html} La vista renderizada del listado.
 */
export function crearListadoDeUsuarios(usuarios){
    // console.log(usuarios)
    let html = "<a class='btn btn-primary' href='/usuario/nuevo' >Nuevo Usuario</a>"

    if(!usuarios || usuarios.length === 0){
        html += "<h2 class='mt-3 text-danger'>No se ha encontrado ninguna usuario, intenta de otra forma.</h2>"
    } else{
        html += `<h2 class='mt-3 text-secondary fs-3'>Usuarios (${usuarios.length}):</h2>`
        html += "<ul class='list-group list-group-flush'>"

        for( let i = 0; i < usuarios.length ; i++ ){
            html += "<li class='list-group-item'>"+ usuarios[i].name + ", " + usuarios[i].surname + " <a class='btn btn-sm me-1 btn-info' href="+ "/usuarios/" + usuarios[i]._id +" >Ver</a>"+ "<a class='btn btn-sm btn-danger me-1' href="+ "/usuario/eliminar/" + usuarios[i]._id +" >Eliminar</a>" + "<a class='btn btn-sm btn-secondary' href="+ "/usuario/modificar/" + usuarios[i]._id +" >Modificar</a>" + "</li>"
        }
        html += "</ul>"
    }

    return html
} 

/**
 * Crear una plantilla de página general con dos parámetros, Título para head y Contenido del tipo cualquiera.
 * @param {string} titulo 
 * @param {*} contenido 
 * @returns {html} - Vista de una página general con head y body.
 */
export function createPage(titulo, contenido){ 
    const nav =  //html
    ` 
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container">
            <a class="navbar-brand" href="#">EntrePisos</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Viviendas
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/viviendas?section=terrace">Con Terraza</a></li>
                    <li><a class="dropdown-item" href="/viviendas?section=garage">Con Garage</a></li>
                    <li><a class="dropdown-item" href="/viviendas?section=pool">Con Pileta</a></li>
                    <li><a class="dropdown-item" href="/viviendas?section=elevator">Con Ascensor</a></li>
                    <li><a class="dropdown-item" href="/viviendas?section=sum">Con Sum</a></li>
                    <li><a class="dropdown-item" href="/viviendas?section=gym">Con Gimnasio</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="/viviendas">Ver todas las viviendas</a></li>
                    <li><a class="dropdown-item" href="/vivienda/nuevo">Agregar nueva vivienda</a></li>
                </ul>
                </li>

                <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usuarios
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/usuarios">Ver todos los usuarios</a></li>
                    <li><a class="dropdown-item" href="/usuario/nuevo">Agregar nuevo usuario</a></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    `

    //html
    const footer = ` 
        <footer class="mt-5 bg-light text-center text-lg-start py-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h2 class="text-uppercase h5">EntrePisos</h2>
                        <p>Panel administrativo, viviendas y usuarios.</p>
                    </div>
    
                    <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h2 class="text-uppercase h5">Contacto</h2>
                        <p>Email: contacto@entrepisos.com</p>
                        <p>Teléfono: +54 9 11 1234-56XX</p>
                    </div>
                </div>
                <div class="text-center py-3">
                    &copy; 2024 EntrePisos. Todos los derechos reservados. Marisol Rossow, Sofía Lorenzo, Melina Ortiz.
                </div>
            </div>
        </footer>
    `;

    //html
    return `
    <!DOCTYPE html>
    <html lang="es-AR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${titulo}</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous" defer></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous" defer></script>
        </head>
        <body>
            ${nav}
            <main class="container">
            <h1>EntrePisos - Usuarios</h1>
            ${contenido}
            </main>
            ${footer}
        </body>
    </html>
    `
}

/**
 * Crear plantilla para los detalles del Usuario enviado por parámetro.
 * @param {*} usuario 
 * @returns {html} - Vista de la página de la usuario con sus detalles
 */
export function createPaginaDetalle(usuario){
    const imgValidada = validarImgDetalle(usuario);

    return `
    <div class="card my-4">
        <div class="card-header">
            <h3>Detalles del Usuario</h3>
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-md-4 text-center">
                    ${imgValidada}
                </div>
                <div class="col-md-8">
                    <ul class="list-group">
                        <li class="list-group-item"><strong>ID:</strong> ${usuario._id}</li>
                        <li class="list-group-item"><strong>Nombre:</strong> ${usuario.name}</li>
                        <li class="list-group-item"><strong>Apellido:</strong> ${usuario.surname}</li>
                        <li class="list-group-item"><strong>Correo Electrónico:</strong> ${usuario.email}</li>
                        <li class="list-group-item"><strong>Edad:</strong> ${usuario.age}</li>
                        <li class="list-group-item"><strong>DNI:</strong> ${usuario.dni}</li>
                        <li class="list-group-item"><strong>Descripción:</strong> ${usuario.description}</li>
                        <li class="list-group-item"><strong>Propiedades:</strong> ${validarPropiedadesUsuario(usuario)}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="card-footer text-end">
            <a href="/usuarios" class="btn btn-secondary">Atrás</a>
        </div>
    </div>
    `;
}

/**
 * Vista para crear un nuevo usuario.
 * @returns {html} - Form para agregar otra Vivienda
 */
export function nuevoUsuario(){
    return `
       <div class="card my-4">
        <div class="card-header">
            <h2>Agregar Usuario</h2>
        </div>
        <div class="card-body">
            <form action="/usuario/nuevo" method="POST" class="row g-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Nombre:</label>
                    <input type="text" name="name" class="form-control" placeholder="Nombre" required>
                </div>
                <div class="col-md-6">
                    <label for="surname" class="form-label">Apellido:</label>
                    <input type="text" name="surname" class="form-control" placeholder="Apellido" required>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Correo Electrónico:</label>
                    <input type="email" name="email" class="form-control" placeholder="Correo electrónico" required>
                </div>
                <div class="col-md-6">
                    <label for="age" class="form-label">Edad:</label>
                    <input type="number" name="age" class="form-control" placeholder="Edad">
                </div>
                <div class="col-md-6">
                    <label for="dni" class="form-label">DNI:</label>
                    <input type="text" name="dni" class="form-control" placeholder="DNI">
                </div>
                <div class="col-md-12">
                    <label for="description" class="form-label">Descripción:</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Descripción del usuario"></textarea>
                </div>
                <div class="col-md-12">
                    <label for="picture" class="form-label">Imagen:</label>
                    <input type="url" name="picture" class="form-control" placeholder="URL de imagen">
                </div>
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-primary">Agregar</button>
                </div>
            </form>
        </div>
    </div>
    `
}

/**
 * Vista para editar los datos 
 * del usuario enviado.
 * @param {Object} usuario 
 * @returns {html} - Form para modificar el     
 *                  usuario enviado.
 */
export function modificarUsuario(usuario) {
    // Función para cuando una clave tenga como valor "Sin especificar" lo ponga el input vacío:
    const getValue = (value) => value === "Sin especificar" ? "" : value;

    return `
    <div class="card my-4">
        <div class="card-header">
            <h2>Modificar Usuario</h2>
        </div>
        <div class="card-body">
            <form action="/usuario/modificar/${usuario._id}" method="POST" class="row g-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Nombre:</label>
                    <input type="text" name="name" class="form-control" value="${getValue(usuario.name)}" placeholder="Nombre" required>
                </div>
                <div class="col-md-6">
                    <label for="surname" class="form-label">Apellido:</label>
                    <input type="text" name="surname" class="form-control" value="${getValue(usuario.surname)}" placeholder="Apellido" required>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Correo Electrónico:</label>
                    <input type="email" name="email" class="form-control" value="${getValue(usuario.email)}" placeholder="Correo electrónico" required>
                </div>
                <div class="col-md-6">
                    <label for="age" class="form-label">Edad:</label>
                    <input type="number" name="age" class="form-control" value="${getValue(usuario.age)}" placeholder="Edad">
                </div>
                <div class="col-md-6">
                    <label for="dni" class="form-label">DNI:</label>
                    <input type="text" name="dni" class="form-control" value="${getValue(usuario.dni)}" placeholder="DNI">
                </div>
                <div class="col-md-12">
                    <label for="description" class="form-label">Descripción:</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Descripción del usuario">${getValue(usuario.description)}</textarea>
                </div>
                <div class="col-md-12">
                    <label for="picture" class="form-label">Foto de portada:</label>
                    <input type="url" name="picture" class="form-control" value="${getValue(usuario.picture)}" placeholder="URL de imagen">
                </div>
                <div class="col-12 text-end">
                    <button type="submit" class="btn btn-primary">Modificar</button>
                </div>
            </form>
        </div>
    </div>
    `;
}