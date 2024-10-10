import express from "express";
import * as controllers from "../controllers/usuario.controller.js";

const route = express.Router();

route.get("/usuarios", controllers.getUsuarios);
route.get("/usuarios/:id", controllers.getUsuarioId);

// Agrega Usuario:
route.get("/usuario/nuevo", controllers.formUsuario);
route.post("/usuario/nuevo", controllers.addUsuario);

// Eliminar Usuario:
route.get("/usuario/eliminar/:id", controllers.eliminarUsuario);

// Modificar Usuario:
route.get("/usuario/modificar/:id", controllers.modificarForm);
route.post("/usuario/modificar/:id", controllers.modificarUsuario)

export default route;