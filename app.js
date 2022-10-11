const express = require("express");
const app = express();
const users = require("./routes/usersRoutes");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers, Authorization",
    "Origin, X-Requested-With, Content-Type, Accept",
    "Access-Control-Allow-Methods",
    "GET,POST,OPTIONS,DELETE,PUT"
  );
  next();
});

// Cargar rutas
const hello_routes = require("./routes/hello");
// Rutas base
app.use("/api", hello_routes);

//rutas
users(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = app;
