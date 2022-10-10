//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");
//recuperar dependencia para encriptar las contraseñas
const crypto = require("crypto");
const { default: jwtDecode } = require("jwt-decode");
const { Console } = require("console");
const { json } = require("express");

const User = {};

//sentencia SQL que recupera todos los usurios
User.getAll = () => {
  const sql = `
    SELECT 
    * 
    FROM 
    users`;

  return db.manyOrNone(sql);
};

//sentencia SQL que recupera un único usuario por I_D
User.findById = (id) => {
  const sql = `
    SELECT
      id,
      email,
      name,
      lastname,
      password,
      session_token
    FROM
        users
    WHERE
        id = $1`;

  return db.oneOrNone(sql, id).then((user) => {
    if (user) {
      console.log(user[0]);
      return JSON.stringify(user[0]);
    }
  });
};

//Sentencia SQL que recupera un único usuario por email
User.FindByEmail = (email) => {
  const sql = `
    SELECT
      id,
      email,
      name,
      lastname,
      password,
      session_token
    FROM
      users
    WHERE
      email = $1
  `;

  return db.oneOrNone(sql, email);
};

//sentencia SQL que crea nuevo usuario
User.create = (user) => {
  //se encripta en md5, update(pasamos el valor) digest para mantener formato hex
  const pwHash = crypto.createHash("md5").update(user.password).digest("hex");

  user.password = pwHash;
  const sql = `
      INSERT INTO
        users(
          email,
          name,
          lastname,
          password,
          created_at,
          updated_at
        )
      VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;
  return db.oneOrNone(sql, [
    user.email,
    user.name,
    user.lastname,
    user.password,
    new Date(),
    new Date(),
  ]);
};

//Comparar una contraseña enviada con pw encriptado en DB
User.isPwMatched = (uPW, hash) => {
  const pwHashed = crypto.createHash("md5").update(uPW).digest("hex");
  if (pwHashed === hash) {
    return true;
  }
  return false;
};

//objeto para el controlador
module.exports = User;
