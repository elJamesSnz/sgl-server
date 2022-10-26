const express = require("express");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const http = require("http");

const users = require("./routes/usersRoutes");
const hellos = require("./routes/hello");
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "-",
  })
);

app.use(logger("dev"));

app.disable("x-powered-by");

app.set("port", port);

users(app);
hellos(app);

const server = http.createServer(app);
server.listen(port, "192.168.47.1" || "localhost", () => {
  console.log("Servidor iniciado en puerto: " + port);
});
