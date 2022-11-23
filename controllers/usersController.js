const User = require("../models/user");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  //petición asíncrona para todos los usuarios
  async getAll(req, res, next) {
    try {
      const data = await User.getAll();
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
      console.log(rUser);
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
          { id: rUser.idusuario, email: rUser.correo, idRol: rUser.id_rol },
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

        //await User.updateToken(rUser.idusuario, `${token}`);

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
      const data = await User.getAllEquipoByLabs(id);
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
  async getEstadosEquipo(req, res, next) {
    try {
      const data = await User.getEstadosEquipo();
      return res.status(201).json({
        success: true,
        message: "Estados de equipos recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error en funcionalidades: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener estados de equipos",
      });
    }
  },

  async getECarreras(req, res, next) {
    try {
      const data = await User.getECarreras();
      return res.status(201).json({
        success: true,
        message: "Carreras recuperadas",
        data: data,
      });
    } catch (error) {
      console.log(`Error en funcionalidades: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener Carreras",
      });
    }
  },

  async getDisponibilidad(req, res, next) {
    try {
      const data = await User.getDisponibilidad();
      return res.status(201).json({
        success: true,
        message: "Disponibilidad recuperada",
        data: data,
      });
    } catch (error) {
      console.log(`Error en funcionalidades: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener Disponibilidad",
      });
    }
  },

  async getAllEquipo(req, res, next) {
    try {
      const data = await User.getAllEquipo();
      console.log(data);
      return res.status(201).json({
        success: true,
        message: "Equipos recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos ",
      });
    }
  },

  async AllLab(req, res, next) {
    try {
      const data = await User.AllLab();
      console.log(data);
      return res.status(201).json({
        success: true,
        message: "Laboratorios recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener Laboratorios ",
      });
    }
  },

  async AllDebts(req, res, next) {
    try {
      const data = await User.AllDebts();
      return res.status(201).json({
        success: true,
        message: "Adeudos recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener adeudos",
      });
    }
  },

  async DebtByLab(req, res, next) {
    try {
      const id = req.query.idLab;
      const data = await User.DebtByLab(id);
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
  async DebtByBoletaAdeudo(req, res, next) {
    try {
      const boleta = req.query.boleta;
      console.log(boleta);
      const data = await User.DebtByBoletaAdeudo(boleta);
      return res.status(201).json({
        success: true,
        message: "Adeudos por Boleta recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener adeudo por Boleta",
      });
    }
  },

  async DebtByBoletaNoAdeudo(req, res, next) {
    try {
      const boleta = req.query.boleta;
      console.log(boleta);
      const data = await User.DebtByBoletaNoAdeudo(boleta);
      return res.status(201).json({
        success: true,
        message: "No Adeudos por Boleta recuperados",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener no adeudo por Boleta",
      });
    }
  },

  async Debt(req, res, next) {
    try {
      const id = req.query.idLab;
      console.log(id);
      const data = await User.Debt(id);
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
  async UpdateEstatus(req, res, next) {
    try {
      const boleta = req.query.boleta;
      const idequipo = req.query.idequipo;

      const data = await User.UpdateEstatus(boleta, idequipo);
      return res.status(201).json({
        success: true,
        message: "Adeudos editados correctamente",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener editar adeudos",
      });
    }
  },
  async UpdateAdeudo(req, res, next) {
    try {
    

      const Id_adeudo =req.query.Id_adeudo;
      const Boleta_adeudo =req.query.Boleta_adeudo;
      const Id_laboratorio_adeudo =req.query.Id_laboratorio_adeudo;
      const Id_equipo_adeudo =req.query.Id_equipo_adeudo;
      const Id_componente_adeudo =req.query.Id_componente_adeudo;
      const Fecha_alta =req.query.Fecha_alta;
      const Fecha_entrega =req.query.Fecha_entrega;
      const Id_profesor_adeudo =req.query.Id_profesor_adeudo;
      const Asignatura_adeudo =req.query.Asignatura_adeudo;
      const Estatus_adeudo =req.query.Estatus_adeudo;
      const Visualizacion_adeudo =req.query.Visualizacion_adeudo;

      const data = await User.UpdateAdeudo(
      Id_adeudo,
      Boleta_adeudo ,
      Id_laboratorio_adeudo,
      Id_equipo_adeudo,
      Id_componente_adeudo ,
      Fecha_alta ,
      Fecha_entrega,
      Id_profesor_adeudo ,
      Asignatura_adeudo ,
      Estatus_adeudo ,
      Visualizacion_adeudo ,
      );
      return res.status(201).json({
        success: true,
        message: "Adeudos editados correctamente",
        data: data,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener editar adeudos",
      });
    }
  },

  async PostAdeudo(req, res, next) {
    try {
      //Se recuperan las variables del body de la request

      const reqBoleta_adeudo = req.body.Boleta_adeudo;
      const reqId_laboratorio_adeudo = req.body.Id_laboratorio_adeudo;
      const reqId_equipo_adeudo = req.body.Id_equipo_adeudo;
      const reqId_componente_adeudo = req.body.Id_componente_adeudo;
      const reqFecha_alta = req.body.Fecha_alta;
      const reqFecha_entrega = req.body.Fecha_entrega;
      const reqId_profesor_adeudo = req.body.Id_profesor_adeudo;
      const reqAsignatura_adeudo = req.body.Asignatura_adeudo;
      const reqEstatus_adeudo = req.body.Estatus_adeudo;
      // const reqVisualizacion_adeudo = req.body.Visualizacion_adeudo;

      const data = {
        Boleta_adeudo: reqBoleta_adeudo,
        Id_laboratorio_adeudo: reqId_laboratorio_adeudo,
        Id_equipo_adeudo: reqId_equipo_adeudo,
        Id_componente_adeudo: reqId_componente_adeudo,
        Fecha_alta: reqFecha_alta,
        Fecha_entrega: reqFecha_entrega,
        Id_profesor_adeudo: reqId_profesor_adeudo,
        Asignatura_adeudo: reqAsignatura_adeudo,
        Estatus_adeudo: reqEstatus_adeudo,
        Visualizacion_adeudo: 1,
      };

      const res = await User.PostAdeudo(data);

      return res.status(201).json({
        success: true,
        data: data,
        message: "Ingreso correcto",
      });
    } catch (error) {
      console.log(`Error adeudo. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al ingresar adeudo",
        error: error,
      });
    }
  },
};
