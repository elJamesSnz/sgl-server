//se accede al controlador
const EquipsController = require("../controllers/EquipsController");

module.exports = (app) => {
  app.post("/api/equips/PostEquipo", EquipsController.PostEquipo);
  app.post("/api/equips/PostEquipoRelLab", EquipsController.PostEquipoRelLab);
  app.post("/api/equips/EditEquipo", EquipsController.EditEquipo);
};
