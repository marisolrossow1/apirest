import express from "express"
import * as controllers from "../controllers/viviendas.controller.js"

const route = express.Router();

route.get("/viviendas", controllers.getViviendas)
route.get("/viviendas/:id", controllers.getViviendaId);

// Agrega vivienda:
route.post("/viviendas", controllers.crearVivienda);

// Elimina vivienda lógicamente:
route.delete("/vivienda/:id", controllers.borrarVivienda)

// Reemplaza vivienda (PUT):
route.put("/vivienda/:id", controllers.reemplazarVivienda);

// Actualiza vivienda (PATCH):
route.patch("/vivienda/:id", controllers.actualizarVivienda);

// Vistas Secciones:
// route.get("/viviendas?section=terrace", controllers.getViviendas);

export default route;