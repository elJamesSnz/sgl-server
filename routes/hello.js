const passport = require("passport");
//se accede al controlador
const HelloController = require("../controllers/hello");
module.exports = (app) => {
  app.get("/hello", HelloController.getHello);
};
