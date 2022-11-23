const DebtsController = require("../controllers/debtsController");

module.exports = (app) => {
  app.post("/api/debts/PostAdeudo", DebtsController.PostAdeudo);
  app.post("/api/debts/UpdateAdeudo", DebtsController.UpdateAdeudo);

  //GET para traer la deuda por laboratorio
  app.get("/api/debts/DebtByLab", DebtsController.DebtByLab);
  //GET para traer la deuda por laboratorio sin join
  app.get("/api/debts/Debt", DebtsController.Debt);

  //GET para traer todas las deudas
  app.get("/api/debts/AllDebts", DebtsController.AllDebts);

  //GET para traer todas las deudas por boleta
  app.get("/api/debts/DebtByBoletaAdeudo", DebtsController.DebtByBoletaAdeudo);

  //GET para traer todas  no deudas por boleta
  app.get(
    "/api/debts/DebtByBoletaNoAdeudo",
    DebtsController.DebtByBoletaNoAdeudo
  );
};
