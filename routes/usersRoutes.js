//se accede al controlador
const UsersController = require("../controllers/usersController");
const passport = require("passport");

//import s3 from "./";

module.exports = (app) => {
  //GET para traer datos
  app.get("/api/users/getAll", UsersController.getAll);

  //GET para traer profesores x laboratorio
  app.get("/api/users/getMe", UsersController.findById);

  //GET para traer equipamiento x laboratorio
  app.get("/api/users/getItemsLab", UsersController.findEquipLabById);

  app.get("/api/users/DebtByLab", UsersController.DebtByLab);
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
};
