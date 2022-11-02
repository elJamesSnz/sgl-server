//se accede al controlador
const EquipsController = require("../controllers/EquipsController");

module.exports = (app) => {
  //GET para ///////
  app.post("/api/equips/PostEquipo", EquipsController.PostEquipo);
  //POST para //////////
  app.post("/api/equips/PostEquipoRelLab", EquipsController.PostEquipoRelLab);
};
