const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  //petición asíncrona para todos los usuarios
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
      console.log(`Usuarios: ${data}`);
      return res.status(201).json(data);
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener todos los usuarios\n" + error,
      });
    }
  },
  //petición asíncrona para insertar nuevos usuarios
  async register(req, res, next) {
    try {
      const user = req.body;
      //se espera a que se termine el  proceso
      const data = await User.create(user);
      return res.status(201).json({
        success: true,
        message: "Registro realizado. Inicia sesión.",
        data: data.session_token,
      });
    } catch (error) {
      console.log(`${error}`);
      return res.status(501).json({
        success: false,
        message: "Error con el registro+\n" + error,
        error: error,
      });
    }
  },
  async login(req, res, next) {
    try {
      //Se recuperan las variables del body de la request
      const email = req.body.email;
      const password = req.body.password;
      //Se busca el usuario por el email recibido
      const rUser = await User.FindByEmail(email);
      //si no hay usuario con ese email

      if (!rUser) {
        return res.status(401).json({
          success: false,
          message: "El email no fue encontrado",
          error: error,
        });
      }

      //si la contraseña enviada por el usuario es igual a la cifrada en DB
      if (User.isPwMatched(password, rUser.contraseña)) {
        const token = jwt.sign(
          { id: rUser.idusuario, email: rUser.correo },
          //Token de sesión se le puede asignar expiración
          keys.secretOrKey,
          {
            //Duración de una hora
            expiresIn: 60 * 60 * 24,
          }
        );

        const data = {
          id: rUser.idusuario,
          name: rUser.nombre,
          email: rUser.correo,
          session_token: `${token}`,
        };

        return res.status(201).json({
          success: true,
          data: data,
          message: "Ingreso correcto",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "La contraseña es incorrecta",
        });
      }
    } catch (error) {
      console.log(`Error login. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al hacer login",
        error: error,
      });
    }
  },
  async findById(req, res, next) {
    try {
      const id = req.query.idUser;
      const data = await User.getAllLabsPUser(id);
      console.log(data);
      return res.status(201).json({
        success: true,
        message: "Usuario recuperado",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener el usuario por ID",
      });
    }
  },
  async findEquipLabById(req, res, next) {
    try {
      const id = req.query.idLab;
      const data = await User.getAllEquipo(id);
      console.log(data);
      return res.status(201).json({
        success: true,
        message: "Laboratorio y equipos recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos de laboratorio por ID",
      });
    }
  },

  async DebtByLab(req, res, next) {
    try {
      const id = req.query.idLab;
      console.log(id);
      const data = await User.DebtByLab(id);
      console.log(data);
      return res.status(201).json({
        success: true,
        message: "Adeudos por laboratorios recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos por laboratorios",
      });
    }
  },

  async login(req, res, next) {
    try {
      //Se recuperan las variables del body de la request
      const email = req.body.email;

      //si la contraseña enviada por el usuario es igual a la cifrada en DB

      const data = {
        id: rUser.idusuario,
        name: rUser.nombre,
        email: rUser.correo,
        session_token: `${token}`,
      };

      const res = await User.PostAdeudo(data);

      return res.status(201).json({
        success: true,
        data: data,
        message: "Ingreso correcto",
      });
      /*
       else {
        return res.status(401).json({
          success: false,
          message: "La contraseña es incorrecta",
        });
      }
      */
    } catch (error) {
      console.log(`Error login. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al hacer login",
        error: error,
      });
    }
  },
};
