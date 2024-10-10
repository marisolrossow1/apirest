import * as services from "../../services/viviendas.service.js"
import * as views from "../../views/viviendas.view.js"

/**
 * Obtiene las viviendas y también las filtra
 * (si es que tiene filtros enviados por GET).
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 200.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function getViviendas(req, res){
    const filtros = req.query;

    services.getViviendas(filtros)
        .then( (viviendas) => {
            res.status(200).json(viviendas)
        } )
        .catch( () => res.status(404).json({ mensaje: "Recursos no encontrados" }) )
}

/**
 * Obtiene la vivienda obtenida por id.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 200.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function getViviendaId(req, res){
    const id = req.params.id;

    services.getViviendaId(id)
        .then( (vivienda) => res.status(200).json(vivienda) )
        .catch( () => res.status(404).json({ mensaje: "Recurso no encontrado" }) )
}

/**
 * Crear Vivienda por método POST.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 201.
 * - Si no tiene éxito: Status 400.
 * @param {*} req 
 * @param {*} res 
 */
function crearVivienda(req, res){
    const vivienda = req.body;

    services.addVivienda(vivienda)
        .then( (viviendas) => res.status(201).json(viviendas) )
        .catch( () => res.status(400).json({ mensaje: "Solicitud incorrecta. Vivienda no creada." }) )
}

/**
 * Borra la vivienda de manera lógica por ID y método DELETE.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function borrarVivienda(req, res){
    const id = req.params.id;
    console.log("Llego para borrar: ", req.params.id)

    services.borrarViviendaLogica(id)
        .then( () => res.status(204).json(id) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

/**
 * Reemplaza la vivienda buscada por ID, 
 * con la nueva vivienda enviada por BODY, 
 * por el método PUT.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function reemplazarVivienda(req, res){
    const id = req.params.id;
    const vivienda = req.body;

    services.modificarVivienda(id, vivienda)
        .then( (vivienda) => res.status(204).json(vivienda) )
        .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )
}

/**
 * Actualiza la vivienda buscada por ID,
 * con nuevos datos enviados por BODY,
 * por el método PATCH.
 * Informa tipo de estado: 
 * - Si tiene éxito: Status 204.
 * - Si no tiene éxito: Status 404.
 * @param {*} req 
 * @param {*} res 
 */
function actualizarVivienda(req, res){
    const id = req.params.id;
    const vivienda = req.body;

    services.actualizarVivienda(id, vivienda)
    .then( (vivienda) => res.status(204).json(vivienda) )
    .catch( () => res.status(404).json({mensaje: "Recurso no encontrado"}) )

}


export {
    getViviendas,
    getViviendaId,
    crearVivienda,
    borrarVivienda,
    reemplazarVivienda,
    actualizarVivienda,
}