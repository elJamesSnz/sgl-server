const express = require("express");
const app = express();
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
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

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

// Cargar rutas
const hello_routes = require("./routes/hello");
// Rutas base
app.use("/api", hello_routes);

//rutas
users(app);

module.exports = app;
