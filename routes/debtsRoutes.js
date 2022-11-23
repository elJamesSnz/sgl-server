const DebtsController = require("../controllers/debtsController");

module.exports = (app) => {
  app.post("/api/debts/PostAdeudo", DebtsController.PostAdeudo);
  app.post("/api/debts/UpdateAdeudo", DebtsController.UpdateAdeudo);

  //GET para traer la deuda por laboratorio
  app.get("/api/debts/DebtByLab", UsersController.DebtByLab);
  //GET para traer la deuda por laboratorio sin join
  app.get("/api/debts/Debt", UsersController.Debt);

  //GET para traer todas las deudas
  app.get("/api/debts/AllDebts", UsersController.AllDebts);

  //GET para traer todas las deudas por boleta
  app.get("/api/debts/DebtByBoletaAdeudo", UsersController.DebtByBoletaAdeudo);

  //GET para traer todas  no deudas por boleta
  app.get(
    "/api/debts/DebtByBoletaNoAdeudo",
    UsersController.DebtByBoletaNoAdeudo
  );
};
