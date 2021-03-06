import express from "express";
import bodyParser from "body-parser";
import estadoRoutes from "./routers/estado";
import otiRoutes from "./routers/oti";
import rosca from "./routers/rosca";
import tareaRoutes from "./routers/tarea";
import ordenRoutes from "./routers/orden";
import sectorRoutes from "./routers/sector";
import clienteRoutes from "./routers/cliente";
import operarioRoutes from "./routers/operario";
import supervisorRoutes from "./routers/supervisor";
import empleadoRoutes from "./routers/empleado";
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
export const app = express();
app.use(bodyParser.json());
//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use("/oti", otiRoutes);
app.use("/estado", estadoRoutes);
app.use("/rosca", rosca);
app.use("/tarea", tareaRoutes);
app.use("/orden", ordenRoutes);
app.use("/sector", sectorRoutes);
app.use("/cliente", clienteRoutes);
app.use("/operario", operarioRoutes);
app.use("/supervisor", supervisorRoutes);
app.use("/empleado", empleadoRoutes)
