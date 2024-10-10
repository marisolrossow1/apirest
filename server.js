import express from "express";
import ViviendasRoute from "./routes/viviendas.routes.js";
import UsuariosRoute from "./routes/usuarios.routes.js";
import ApiRoute from "./api/routes/viviendas.routes.js";
import ApiUsuario from "./api/routes/usuarios.routes.js"

const app = express();

app.use( express.urlencoded({ extended: true }) );
app.use( express.json() );

app.use('/api', ApiRoute);
app.use(ViviendasRoute);
app.use(UsuariosRoute);
app.use("/api", ApiUsuario);

app.listen(3333, () => console.log("Se inició correctamente"));