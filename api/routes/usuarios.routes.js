import express from "express";
import * as controllers from "../controllers/usuario.controller.js";

const route = express.Router();

route.get("/usuarios", controllers.getUsuarios);
route.get("/usuarios/:id", controllers.getUsuarioId);
route.post("/usuarios", controllers.agregarUsuario);
route.delete('/usuarios/:id', controllers.borrarUsuario);

// Reemplaza usuario:
route.put('/usuarios/:id', controllers.reemplazarUsuario);

// Actualiza usuario:
route.patch('/usuarios/:id', controllers.actualizarUsuario);

// Agregar vivienda a usuario:
route.post('/usuarios/:idUsuario/propiedades', controllers.agregarPropiedades);

// Obtener todas las propiedades de un usuario (viviendas)
route.get("/usuarios/:idUsuario/propiedades", controllers.getUsuarioPropiedades);

export default route;