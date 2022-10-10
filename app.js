const express = require("express");
const app = express();
const users = require("./routes/usersRoutes");
const User = require("./models/user");

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const hello_routes = require("./routes/hello");

// Rutas base
app.use("/api", hello_routes);

//rutas
users(app);

/* RUTAS PROTEGIDAS */

//GET para traer la informaciòn de un usuario
app.get("/api/users/getMe", verifyToken, (req, res, next) => {
  try {
    console.log(req.query.idUser);
    const data = User.findById(idUser);
    console.log(`Usuario: ${data}`);
    return res.status(201).json(data);
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(501).json({
      success: false,
      message: "Error al obtener el info del usuario\n" + error,
    });
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //no es undefined
  if (typeof bearerHeader !== "undefined") {
    //split @ bearer
    const bearer = bearerHeader.split(" ");
    //token
    const bearerToken = bearer[1];
    //set token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = app;
