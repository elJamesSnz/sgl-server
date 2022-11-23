//se accede al controlador
const EquipsController = require("../controllers/EquipsController");

module.exports = (app) => {
  app.post("/api/equips/PostEquipo", EquipsController.PostEquipo);
  app.post("/api/equips/PostEquipoRelLab", EquipsController.PostEquipoRelLab);
  app.post("/api/equips/EditEquipo", EquipsController.EditEquipo);

  //GET al estados posibles para equipamiento
  app.get("/api/equips/getEstadosEquipo", UsersController.getEstadosEquipo);

  //GET para traer equipamiento
  app.get("/api/equips/getAllEquipo", UsersController.getAllEquipo);
};
