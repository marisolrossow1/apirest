/**
 * Validación para la etiqueta img
 * En caso de que no tenga valor:
 * Párrafo de "Sin especificar",
 * Y si tiene valor: en una etiqueta img.
 * @param {Object} vivienda 
 * @return {string} - contenido html
 */
function validarImgDetalle(vivienda){
    return vivienda.flat_img.trim() === ""
        ? "Sin especificar"
        : `<img src="${vivienda.flat_img}" alt="Imagen de la vivienda ${vivienda.location}" class="img-fluid">`;
}

/**
 * Valida el link de dirección
 * En caso de no tener valor, "Sin especificar".
 * En caso de tener valor, en etiqueta <a></a>.
 * @param {*} vivienda 
 * @returns {string} - contenido html
 */
function validarLinkDetalle(vivienda){
    return vivienda.link_location.trim() === "" || vivienda.link_location.trim() === "Sin especificar"
        ? "Sin especificar"
        : `<a target="_blank" href="${vivienda.link_location}">${vivienda.link_location}</a>`;
}

/**
 * Validación y traducción de los slug
 * de las secciones.
 * En caso de ser un array vacío, "Sin especificar".
 * En caso de tener más de un valor,
 * lo separa por comas.
 * @param {*} vivienda 
 * @returns {string} - contenido html.
 */
function validarSeccionesDetalle(vivienda){
    // Traducción de secciones:
    const seccionTraduccion = {
        terrace: 'Terraza',
        pool: 'Pileta',
        elevator: 'Ascensor',
        garage: 'Garage',
        sum: 'Sum',
        gym: 'Gimnasio'
    };

    return vivienda.section.length === 0
        ? "Sin especificar"
        : vivienda.section.map(seccion => seccionTraduccion[seccion] || seccion).join(', ');
}

/**
 * Crear listado de viviendas con sus acciones, como vista.
 * @param {*} viviendas 
 * @returns {html} La vista renderizada del listado.
 */
export function crearListadoDeViviendas(viviendas){
    let html = "<a class='btn btn-primary mb-3' href='/vivienda/nuevo' >Nueva Vivienda</a>";

    html += "<div class='p-2 border'><p class='fs-4'>Filtros</p>";

    // Filtro de búsqueda por tipo (PH o Departamento)
    html += `<div class="row">
    <form class="mb-3 col-md-6" role="search" action="/viviendas" method="GET">
        <label class="form-label" for="tipoVivienda">Buscar por tipo de vivienda:</label>
        <div class="d-flex align-items-center flex-wrap">
            <div class="form-check me-3">
                <input class="form-check-input" type="radio" name="type" id="tipoPH" value="PH" required>
                <label class="form-check-label" for="tipoPH">
                    PH
                </label>
            </div>
            <div class="form-check me-3">
                <input class="form-check-input" type="radio" name="type" id="tipoDepartamento" value="Departamento" required>
                <label class="form-check-label" for="tipoDepartamento">
                    Departamento
                </label>
            </div>
            <button class="btn btn-outline-success" type="submit">Buscar</button>
        </div>
    </form>
    `;

    // Filtro de ambientes mínimo y máximo:
    html += `
    <form class="d-flex mb-3 col-md-6 flex-wrap" role="search" action="/viviendas" method="GET">
        <div class="me-2">
            <label for="minAmbientes" class="form-label">Ambientes (mínimo)</label>
            <input class="form-control" type="number" id="minAmbientes" name="cantidadAmbientesMayorQue" placeholder="Ej: 2" aria-label="Min Ambientes" required>
        </div>
        <div class="me-2">
            <label for="maxAmbientes" class="form-label">Ambientes (máximo)</label>
            <input class="form-control" type="number" id="maxAmbientes" name="cantidadAmbientesMenorQue" placeholder="Ej: 4" aria-label="Max Ambientes" required>
        </div>
        <button class="btn btn-outline-success" type="submit">Filtrar</button>
    </form></div>`

    html += "</div>";

    if(!viviendas || viviendas.length === 0){
        html += "<h2 class='mt-3 text-danger'>No se ha encontrado ninguna vivienda, intenta de otra forma.</h2>"
    } else{
        html += `<h2 class='mt-3 text-secondary fs-3'>Viviendas (${viviendas.length}):</h2>`
        html += "<ul class='list-group list-group-flush'>"
    
        for( let i = 0; i < viviendas.length ; i++ ){
            html += "<li class='list-group-item'>"+ viviendas[i].type + ", " + viviendas[i].location + " <a class='btn btn-sm me-1 btn-info' href="+ "/viviendas/" + viviendas[i]._id +" >Ver</a>"+ "<a class='btn btn-sm btn-danger me-1' href="+ "/vivienda/eliminar/" + viviendas[i]._id +" >Eliminar</a>" + "<a class='btn btn-sm btn-secondary' href="+ "/vivienda/modificar/" + viviendas[i]._id +" >Modificar</a>" + "</li>"
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
                    <li><a class="dropdown-item" href="http://localhost:3333/usuarios">Ver todos los usuarios</a></li>
                    <li><a class="dropdown-item" href="http://localhost:3333/usuario/nuevo">Agregar nuevo usuario</a></li>
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
            <h1>EntrePisos - Viviendas</h1>
            ${contenido}
            </main>

            ${footer}
        </body>
    </html>
    `
}

/**
 * Crear plantilla para los detalles de la Vivienda enviada por parámetro.
 * @param {*} vivienda 
 * @returns {html} - Vista de la página de la vivienda con sus detalles
 */
export function createPaginaDetalle(vivienda){
    const imgValidada = validarImgDetalle(vivienda);
    const linkValidado = validarLinkDetalle(vivienda);
    const seccionesValidadas = validarSeccionesDetalle(vivienda);

    const html = `
    <div class="container mt-5">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Detalles de la Vivienda</h2>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <p><strong>ID:</strong> ${vivienda._id}</p>
                        <p><strong>Tipo:</strong> ${vivienda.type}</p>
                        <p><strong>Dirección:</strong> ${vivienda.location}</p>
                        <p><strong>Piso:</strong> ${vivienda.floor}</p>
                        <p><strong>Departamento:</strong> ${vivienda.department}</p>
                        <p><strong>Barrio:</strong> ${vivienda.district}</p>
                        <p><strong>Cantidad de ambientes:</strong> ${vivienda.flat_rooms}</p>
                    </div>
                    <div class="col-md-6 mb-3">
                        <p><strong>Link de la dirección:</strong> ${linkValidado}</p>
                        <p><strong>Imagen:</strong></p>
                        ${imgValidada}
                    </div>
                </div>
                <hr>
                <p><strong>Sección:</strong> ${seccionesValidadas}</p>
                <a href="/viviendas" class="btn btn-primary mt-3">Ver todas las viviendas</a>
            </div>
        </div>
    </div>
    `;

    return html
}

/**
 * Vista para crear una nueva vivienda.
 * @returns {html} - Form para agregar otra Vivienda
 */
export function nuevaVivienda() {
    return `
        <h2 class="mb-4">Agregar Vivienda</h2>
        <form action="/vivienda/nuevo" method="POST">
                        <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="type" class="form-label">Tipo:</label>
                    <input type="text" class="form-control" name="type" placeholder="Tipo de vivienda" required>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="location" class="form-label">Ubicación:</label>
                    <input type="text" class="form-control" name="location" placeholder="Dirección" required>
                </div>

                <div class="col-md-6 mb-3">
                    <label for="floor" class="form-label">Piso:</label>
                    <input type="text" class="form-control" name="floor" placeholder="Piso">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="department" class="form-label">Departamento:</label>
                    <input type="text" class="form-control" name="department" placeholder="Departamento">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="district" class="form-label">Distrito:</label>
                    <input type="text" class="form-control" name="district" placeholder="Distrito/Barrio">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="flat_rooms" class="form-label">Habitaciones:</label>
                    <input type="number" class="form-control" name="flat_rooms" placeholder="Cantidad de habitaciones">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="link_location" class="form-label">Enlace a la ubicación (Maps):</label>
                    <input type="url" class="form-control" name="link_location" placeholder="URL de ubicación">
                </div>

                <div class="col-md-6 mb-3">
                    <label for="flat_img" class="form-label">Imagen:</label>
                    <input type="url" class="form-control" name="flat_img" placeholder="URL de imagen">
                </div>
            </div>

            <div class="mb-3">
                <label for="section" class="form-label">Secciones:</label><br>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="terrace" id="terrace">
                    <label class="form-check-label" for="terrace">Terraza</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="garage" id="garage">
                    <label class="form-check-label" for="garage">Garage</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="elevator" id="elevator">
                    <label class="form-check-label" for="elevator">Ascensor</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="pool" id="pool">
                    <label class="form-check-label" for="pool">Pileta</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="sum" id="sum">
                    <label class="form-check-label" for="sum">SUM</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" name="section" value="gym" id="gym">
                    <label class="form-check-label" for="gym">Gimnasio</label>
                </div>
            </div>

            <button type="submit" class="btn btn-primary">Agregar</button>
        </form>
`;}

/**
 * Vista para editar los datos 
 * de la vivienda enviada.
 * @param {Object} vivienda 
 * @returns {html} - Form para modificar la     
 *                  vivienda enviada.
 */
export function modificarVivienda(vivienda) {
    // Función para cuando una clave tenga como valor "Sin especificar" lo ponga el input vacío:
    const getValue = (value) => value === "Sin especificar" ? "" : value;

    return `
    <h2 class="mb-4">Modificar Vivienda</h2>
    <form action="/vivienda/modificar/${vivienda._id}" method="POST">
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="type" class="form-label">Tipo:</label>
                <input type="text" class="form-control" name="type" value="${getValue(vivienda.type)}" placeholder="Tipo de vivienda" required>
            </div>
            <div class="col-md-6 mb-3">
                <label for="location" class="form-label">Ubicación:</label>
                <input type="text" class="form-control" name="location" value="${getValue(vivienda.location)}" placeholder="Dirección" required>
            </div>
            <div class="col-md-6 mb-3">
                <label for="floor" class="form-label">Piso:</label>
                <input type="text" class="form-control" name="floor" value="${getValue(vivienda.floor)}" placeholder="Piso">
            </div>
            <div class="col-md-6 mb-3">
                <label for="department" class="form-label">Departamento:</label>
                <input type="text" class="form-control" name="department" value="${getValue(vivienda.department)}" placeholder="Departamento">
            </div>
            <div class="col-md-6 mb-3">
                <label for="district" class="form-label">Distrito:</label>
                <input type="text" class="form-control" name="district" value="${getValue(vivienda.district)}" placeholder="Distrito/Barrio">
            </div>
            <div class="col-md-6 mb-3">
                <label for="flat_rooms" class="form-label">Habitaciones:</label>
                <input type="number" class="form-control" name="flat_rooms" value="${getValue(vivienda.flat_rooms)}" placeholder="Cantidad de habitaciones">
            </div>
            <div class="col-md-6 mb-3">
                <label for="link_location" class="form-label">Enlace a la ubicación (Maps):</label>
                <input type="url" class="form-control" name="link_location" value="${getValue(vivienda.link_location)}" placeholder="URL de ubicación">
            </div>
            <div class="col-md-6 mb-3">
                <label for="flat_img" class="form-label">Imagen:</label>
                <input type="url" class="form-control" name="flat_img" value="${getValue(vivienda.flat_img)}" placeholder="URL de imagen">
            </div>
        </div>

        <div class="mb-3">
            <label for="section" class="form-label">Secciones:</label><br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="terrace" ${vivienda.section.includes('terrace') ? 'checked' : ''}>
                <label class="form-check-label" for="terrace">Terraza</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="garage" ${vivienda.section.includes('garage') ? 'checked' : ''}>
                <label class="form-check-label" for="garage">Garage</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="elevator" ${vivienda.section.includes('elevator') ? 'checked' : ''}>
                <label class="form-check-label" for="elevator">Ascensor</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="pool" ${vivienda.section.includes('pool') ? 'checked' : ''}>
                <label class="form-check-label" for="pool">Pileta</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="sum" ${vivienda.section.includes('sum') ? 'checked' : ''}>
                <label class="form-check-label" for="sum">SUM</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" name="section" value="gym" ${vivienda.section.includes('gym') ? 'checked' : ''}>
                <label class="form-check-label" for="gym">Gimnasio</label>
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Modificar</button>
    </form>
    `;
}