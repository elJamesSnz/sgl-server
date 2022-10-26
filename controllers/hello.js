const jwt = require("jsonwebtoken");

function getHello(req, res) {
  const token = req.headers["authorization"];

  //token, clave, callback
  jwt.verify(String(token), "asd", (err, user) => {
    if (err) {
      res.status(403).json({ msg: "No autorizado" });
    } else {
      res.status(200).json({ msg: "Hola mundo" });
    }
  });
}

module.exports = {
  getHello,
};
