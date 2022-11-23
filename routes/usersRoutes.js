//se accede al controlador
const UsersController = require("../controllers/usersController");
const passport = require("passport");

//import s3 from "./";

module.exports = (app) => {
  //POST para hacer login y recuperar inicio de sesión JWT
  app.post("/api/users/login", UsersController.login);

  //GET para traer datos
  app.get("/api/users/getAll", UsersController.getAll);

  //GET para traer profesores x laboratorio
  app.get("/api/users/getMe", UsersController.findById);

  //GET all carreras
  app.get("/api/users/getECarreras", UsersController.getECarreras);

  //GET disponibilidad equipos
  app.get("/api/users/getDisponibilidad", UsersController.getDisponibilidad);

  //GET para traer equipamiento x laboratorio
  app.get("/api/users/getItemsLab", UsersController.findEquipLabById);

  //GET para todos los laboratorios
  app.get("/api/users/AllLab", UsersController.AllLab);
};
