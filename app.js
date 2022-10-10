const express = require("express");
const app = express();
const users = require("./routes/usersRoutes");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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
app.get("/api/users/getMe", verifyToken, async (req, res, next) => {
  if (!verifyToken(req, res)) {
    res.sendStatus(403);
  } else {
    try {
      const id = req.body.id;
      const data = await User.findById(id);
      console.log(`Usuario: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener el info del usuario\n" + error,
      });
    }
  }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  //no es undefined
  if (typeof bearerHeader !== "undefined") {
    return true;
  } else {
    return false;
  }
}

module.exports = app;
