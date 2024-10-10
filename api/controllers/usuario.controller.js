import * as services from "../../services/usuarios.service.js"

/**
 * Obtiene todos los usuarios de DB.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 200.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function getUsuarios(req, res){
    const filtros = req.query;
    services.getUsuarios(filtros)
        .then( (usuarios) => res.status(200).json(usuarios) )
        .catch( () => res.status(404).json({ mensaje: "Recursos no encontrados" }) )
}

/**
 * Obtiene el usuario obtenido por id.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 200.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
export function getUsuarioId(req, res){
    const id = req.params.id;

    services.getUsuarioId(id)
        .then( (usuario) => res.status(200).json(usuario) )
        .catch( () => res.status(404).json({ mensaje: "Recurso no encontrado" }) )
}

/**
 * Agregar usuario por método POST.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 201.
 * - Si no tiene éxito: Status 400.
 * @param {*} req 
 * @param {*} res 
 */
function agregarUsuario(req, res){
    // Recibo todos los datos de mi usuario en el body:
    const usuario = req.body

    // Agregar el usuario
    services.addUsuario(usuario)
        .then( (usuario) => res.status(201).json(usuario) )
        .catch( () => res.status(400).json({mensaje: 'No se pudo agregar'}))
}

/**
 * Borra el usuario de manera lógica por ID y método DELETE.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
export function borrarUsuario(req, res){
    const id = req.params.id;

    services.borrarUsuario(id)
        .then( () => res.status(204).json({mensaje: 'Usuario eliminado'}))
        .catch( () => res.status(404).json({mensaje: 'No se pudo eliminar'}))
}

/**
 * Reemplaza el usuario buscado por ID, 
 * con el nuevo usuario enviado por BODY, 
 * por el método PUT.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
export function reemplazarUsuario(req, res){
    const id = req.params.id;
    const usuario = req.body;

    services.modificarUsuario(id, usuario)
        .then( (usuario) => res.status(204).json(usuario) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

/**
 * Actualiza el usuario buscado por ID,
 * con nuevos datos enviados por BODY,
 * por el método PATCH.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
export function actualizarUsuario(req, res){
    const id = req.params.id;
    const usuario = req.body;

    services.actualizarUsuario(id, usuario)
        .then( (usuario) => res.status(204).json(usuario) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}


/**
 * Agregar vivienda enviada por body
 * a un usuario identificado por id 
 * en propiedades del user en DB.
 * @param {*} req 
 * @param {*} res 
 */
export function agregarPropiedades(req, res){
    const idUsuario = req.params.idUsuario;

    const vivienda = req.body;

    services.agregarViviendaPropiedades(idUsuario, vivienda)
        .then( propiedades => res.status(201).json(propiedades) )
        .catch( () => res.status(404).json( {mensaje: 'No se pudo agregar a propiedades.'} ))
}

/**
 * Ver todas las viviendas de un usuario
 * identificado por id  en params,
 * en propiedades del user en DB.
 * @param {*} req 
 * @param {*} res 
 */
export function getUsuarioPropiedades(req, res){
    const idUsuario = req.params.idUsuario;

    services.getUsuarioPropiedades(idUsuario)
        .then( usuario => res.status(200).json( usuario ) )
        .catch( () => res.status(404).json( {mensaje: 'No se pudo agregar a propiedades.'} ))
}

export{
    getUsuarios,
    agregarUsuario,
}