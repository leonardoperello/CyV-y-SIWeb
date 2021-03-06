import express from "express";
import { modelRosca } from "../schemas/schemaRosca";
import { modelTipoDeRosca } from "../schemas/schemaTipoDeRosca";
import { altaRosca } from "../controllers/altaRosca";
const router = express.Router();

router.get("/", async function (req, res) {
  // #swagger.tags = ['Rosca']
  // #swagger.description = 'Endpoint para obtener roscas .'
  try {
    const resultado = await modelRosca.find({});
    /* #swagger.responses[200] = {
             description: 'se crea orden',
             schema: { $ref: '#/definitions/arrayRoscas' }
     } */
    res.status(200).send(resultado.reverse());
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

router.get("/tipoDeRosca", async function (req, res) {
  // #swagger.tags = ['Rosca']
  // #swagger.description = 'Endpoint para obtener los tipos de roscas.'
  try {
    const resultado = await modelTipoDeRosca.find({});
    /* #swagger.responses[200] = {
            description: 'se crea orden',
            schema: { $ref: '#/definitions/arrayTipoDeRosca' }
    } */
    res.status(200).send(resultado.reverse());
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

router.get("/:id", async function (req, res) {
  // #swagger.tags = ['Rosca']
  // #swagger.description = 'Endpoint para obtener una rosca.'
  //  #swagger.parameters['id'] = { description: 'rosca ID' }
  try {
    const id = req.params.id;
    const resultado = await modelRosca.findOne({ _id: id });
    /* #swagger.responses[200] = {
           description: 'se crea orden',
           schema: { $ref: '#/definitions/rosca' }
   } */
    res.status(200).send(resultado);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

router.post("/", async function (req, res) {
  // #swagger.tags = ['Rosca']
  // #swagger.description = 'Endpoint para crear una rosca.'
  let data = req.body;
  /* #swagger.parameters['rosca'] = {
             in: 'body',
             description: 'datos para crear una rosca',
             required: true,
             schema: { $ref: "#/definitions/rosca" }
      } */
  try {
    if (typeof data.descripcionTecnica !== "string") {
      return res
        .status(400)
        .send("El formato de la descripcion tecnica es incorrecto");
    }
    if (typeof data.medida !== "string") {
      return res.status(400).send("El formato de la medida es incorrecto");
    }
    if (Object.keys(data.tipoDeRosca).length === 0) {
      return res.status(400).send("La rosca no tiene un tipo de rosca");
    }
    const resultado = await altaRosca(data);
    /* #swagger.responses[200] = {
           description: 'se crea rosca',
           schema: { $ref: '#/definitions/rosca' }
   } */
    res.status(200).send(resultado);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

// router.patch("/:id", async function (req, res) {

//   try {
//     let rosca = { _id: req.params.id };
//     let data = req.body;
//     const resultado = await modelRosca.findOneAndUpdate(rosca, data);
//     res.status(200).send(resultado);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.delete("/:id", async function (req, res) {

//   try {
//     const id = req.params.id;
//     const resultado = await modelRosca.deleteOne({ _id: id });
//     res.status(200).send(resultado);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

export default router;
