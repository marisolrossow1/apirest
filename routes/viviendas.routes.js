import express from "express";
import * as controllers from "../controllers/vivienda.controller.js";

const route = express.Router();

route.get("/viviendas", controllers.getViviendas);
route.get("/viviendas/:id", controllers.getViviendaId);

// Agrega Vivienda:
route.get("/vivienda/nuevo", controllers.formVivienda);
route.post("/vivienda/nuevo", controllers.addVivienda);

// Eliminar Vivienda:
route.get("/vivienda/eliminar/:id", controllers.eliminarVivienda);

// Modificar Vivienda:
route.get("/vivienda/modificar/:id", controllers.modificarForm);
route.post("/vivienda/modificar/:id", controllers.modificarVivienda)

export default route;