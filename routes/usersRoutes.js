//se accede al controlador
const UsersController = require("../controllers/usersController");

module.exports = (app) => {
  //GET para traer datos
  app.get("/api/users/getAll", UsersController.getAll);

  //GET para traer la informaciòn de un usuario
  app.get("/api/users/getMe", verifyToken, UsersController.getMe);

  //POST para crear / registrar datos
  app.post("/api/users/create", UsersController.register);

  //POST para hacer login y recuperar inicio de sesión JWT
  app.post("/api/users/login", UsersController.login);
};
