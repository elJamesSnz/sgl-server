//se accede al controlador
const EquipsController = require("../models/equipsController");

module.exports = (app) => {
  app.post("/api/equips/PostEquipo", EquipsController.PostEquipo);
  app.post("/api/equips/PostEquipoRelLab", EquipsController.PostEquipoRelLab);
  app.post("/api/equips/EditEquipo", EquipsController.EditEquipo);

  //GET al estados posibles para equipamiento
  app.get("/api/equips/getEstadosEquipo", EquipsController.getEstadosEquipo);
  //GET para traer equipamiento x laboratorio
  app.get("/api/equips/getEquipsByLab", EquipsController.getEquipsByLab);
  //GET para traer equipamiento
  app.get("/api/equips/getAllEquipo", EquipsController.getAllEquipo);
};
