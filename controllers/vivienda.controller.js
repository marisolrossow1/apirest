import * as services from "../services/viviendas.service.js"
import * as views from "../views/viviendas.view.js"

/**
 * Obtiene todas las viviendas.
 * @param {*} req 
 * @param {*} res 
 */
const getViviendas = (req, res) => {
    const filtros = req.query;

    services.getViviendas(filtros)
        .then( (viviendas) => res.send(views.createPage("Viviendas", views.crearListadoDeViviendas(viviendas))) )
}

/**
 * Obtiene la vivienda por id mandado por param
 * @param {*} req 
 * @param {*} res 
 */
const getViviendaId = (req, res) => {
    const id = req.params.id;

    services.getViviendaId(id)
        .then( (vivienda) => {
            // console.log(vivienda);
            res.send(views.createPage("Vivienda", views.createPaginaDetalle(vivienda)))
        })
}

/**
 * Muestra la vista del form
 * para agregar vivienda.
 * @param {*} req 
 * @param {*} res 
 */
const formVivienda = (req, res) => {
    res.send(views.createPage( "Nueva Vivienda", views.nuevaVivienda() ))
}

/**
 * Agrega la vivienda al DB 
 * por POST del form.
 * @param {*} req 
 * @param {*} res 
 */
const addVivienda = (req, res) => {
    services.addVivienda(req.body)
        .then( () => res.redirect("/viviendas") )
}

/**
 * Agrega a la vivienda identificada por
 * param id una propiedad de eliminado: true.
 * Que si es true: está eliminada.
 * @param {*} req 
 * @param {*} res 
 */
const eliminarVivienda = (req, res) =>{
    const id = req.params.id;

    services.borrarViviendaLogica(id)
        .then( () => res.redirect("/viviendas") )
}

/**
 * Muestra la vista del Form para modificar 
 * la vivienda identificada por params ID.
 * @param {*} req 
 * @param {*} res 
 */
const modificarForm = (req, res) => {
    const id = req.params.id;

    services.getViviendaId(id)
        .then( (vivienda) => res.send(views.createPage( "Modificar Vivienda", views.modificarVivienda(vivienda) )) )
}

/**
 * Modifica la vivienda con los nuevos datos
 * enviados por POST.
 * @param {*} req 
 * @param {*} res 
 */
const modificarVivienda = (req, res) => {
    const id = req.params.id;

    const vivienda = req.body;
    services.modificarVivienda(id, vivienda)
        .then( () => res.redirect("/viviendas") )
}

export { 
    getViviendas,
    getViviendaId,
    formVivienda,
    addVivienda,
    eliminarVivienda,
    modificarForm,
    modificarVivienda,
}