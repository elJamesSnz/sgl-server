const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const http = require("http");

const users = require("./routes/usersRoutes");
const equips = require("./routes/equipRoutes");
const debts = require("./routes/debtsRoutes");
const hellos = require("./routes/hello");
const port = process.env.PORT || 5555;

const app = express();

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

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(logger("dev"));

app.disable("x-powered-by");

app.set("port", port);

//test routes
hellos(app);
//api routes
users(app);
equips(app);
debts(app);

const server = http.createServer(app);
server.listen(port, () => {
  console.log("Servidor iniciado en puerto: " + port);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});

module.exports = {
  app: app,
  server: server,
};
