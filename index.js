const express = require("express");
const cors = require("cors");

const users = require("./routes/usersRoutes");
const hellos = require("./routes/hello");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

users(app);
hellos(app);

app.listen(process.env.port, () => {
  console.log("Servidor iniciado");
});
