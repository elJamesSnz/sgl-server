//se accede al controlador
const UsersController = require("../controllers/usersController");
const passport = require("passport");

//import s3 from "./";

module.exports = (app) => {
  //GET para traer datos
  app.get("/api/users/getAll", UsersController.getAll);

  app.get("/api/users/getEstadosEquipo", UsersController.getEstadosEquipo);
  app.get("/api/users/getEstadosAdeudo", UsersController.getEstadosAdeudo);
  app.get("/api/users/getProfesores", UsersController.getProfesores);
  app.get("/api/users/getMaterias", UsersController.getMaterias);
  app.get("/api/users/getPracticas", UsersController.getPracticas);

  //GET para traer profesores x laboratorio
  app.get("/api/users/getMe", UsersController.findById);

  //GET para traer equipamiento x laboratorio
  app.get("/api/users/getItemsLab", UsersController.findEquipLabById);

  //GET para todos los laboratorios
  app.get("/api/users/AllLab", UsersController.AllLab);

  //GET para traer equipamiento
  app.get("/api/users/getAllEquipo", UsersController.getAllEquipo);

  //GET para traer la deuda por laboratorio
  app.get("/api/users/DebtByLab", UsersController.DebtByLab);
  //GET para traer la deuda por laboratorio sin join
  app.get("/api/users/Debt", UsersController.Debt);

  //GET para traer todas las deudas
  app.get("/api/users/AllDebts", UsersController.AllDebts);

  //GET para traer todas las deudas por boleta
  app.get("/api/users/DebtByBoletaAdeudo", UsersController.DebtByBoletaAdeudo);

  //GET para traer todas  no deudas por boleta
  app.get(
    "/api/users/DebtByBoletaNoAdeudo",
    UsersController.DebtByBoletaNoAdeudo
  );
  //Update estatus adeudo con boleta y equipo
  app.post(
    "/api/users/UpdateEstatus",
    passport.authenticate("jwt", { session: false }),
    UsersController.UpdateEstatus
  );
  //Update  adeudo con boleta y equipo
  app.post("/api/users/UpdateAdeudo", UsersController.UpdateAdeudo);

  /*
  app.get(
    "/api/users/getMe",
    passport.authenticate("jwt", { session: false }),
    UsersController.findById
  );
*/
  //POST para crear / registrar datos
  app.post("/api/users/create", UsersController.register);

  //POST para hacer login y recuperar inicio de sesión JWT
  app.post("/api/users/login", UsersController.login);

  //POST para ingresar audeudo
  app.post("/api/users/PostAdeudo", UsersController.PostAdeudo);

  //POST para ingresar equipo
  app.post("/api/users/PostEquipo", UsersController.PostEquipo);
};
