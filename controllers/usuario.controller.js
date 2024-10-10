import * as services from "../services/usuarios.service.js"
import * as viviendasServices from "../services/viviendas.service.js"
import * as views from "../views/usuarios.view.js"

/**
 * Obtiene todos los usuarios.
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarios = (req, res) => {
    services.getUsuarios()
        .then( (usuarios) => res.send(views.createPage("Usuarios", views.crearListadoDeUsuarios(usuarios))) )
}

/**
 * Obtiene el usuario por id mandado por param
 * @param {*} req 
 * @param {*} res 
 */
const getUsuarioId = (req, res) => {
    const id = req.params.id;

    services.getUsuarioId(id)
        .then( (usuario) => {
            // console.log(usuario);
            res.send(views.createPage("Usuario", views.createPaginaDetalle(usuario)))
        })
}

/**
 * Muestra la vista del form
 * para agregar usuario.
 * @param {*} req 
 * @param {*} res 
 */
const formUsuario = (req, res) => {
    res.send(views.createPage( "Nuevo Usuario", views.nuevoUsuario() ))
}

/**
 * Agrega la usuario al DB 
 * por POST del form.
 * @param {*} req 
 * @param {*} res 
 */
const addUsuario = (req, res) => {
    services.addUsuario(req.body)
        .then( () => res.redirect("/usuarios") )
}

/**
 * Agrega a la usuario identificada por
 * param id una propiedad de eliminado: true.
 * Que si es true: está eliminada.
 * @param {*} req 
 * @param {*} res 
 */
const eliminarUsuario = (req, res) =>{
    const id = req.params.id;

    services.borrarUsuario(id)
        .then( () => res.redirect("/usuarios") )
}

/**
 * Muestra la vista del Form para modificar 
 * el usuario identificado por params ID.
 * @param {*} req 
 * @param {*} res 
 */
const modificarForm = (req, res) => {
    const id = req.params.id;

    services.getUsuarioId(id)
        .then( (usuario) => res.send(views.createPage( "Modificar Usuario", views.modificarUsuario(usuario) )) )
}

/**
 * Modifica el usuario con los nuevos datos
 * enviados por POST.
 * @param {*} req 
 * @param {*} res 
 */
const modificarUsuario = (req, res) => {
    const id = req.params.id;

    const usuario = req.body;
    services.modificarUsuario(id, usuario)
        .then( () => res.redirect("/usuarios") )
}

export { 
    getUsuarios,
    getUsuarioId,
    formUsuario,
    addUsuario,
    eliminarUsuario,
    modificarForm,
    modificarUsuario,
}