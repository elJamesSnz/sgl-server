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
      const data2 = await User.getEstadosEquipo();
      dataFinal = { data, data2 };
      return res.status(201).json({
        success: true,
        message: "Laboratorio y equipos recuperados",
        data: dataFinal,
      });
    } catch (error) {
      console.log(`Error: ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al obtener equipos de laboratorio por ID",
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
      const data2 = await User.getEstadosAdeudo();
      const data3 = await User.getEstadosEquipo();
      dataFinal = { data, data2, data3 };
      return res.status(201).json({
        success: true,
        message: "Adeudos recuperados",
        data: dataFinal,
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
      const data2 = await User.getEstadosAdeudo();
      const data3 = await User.getEstadosEquipo();
      dataFinal = { data, data2, data3 };
      return res.status(201).json({
        success: true,
        message: "Adeudos por laboratorios recuperados",
        data: dataFinal,
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
      const data2 = await User.getEstadosAdeudo();
      const data3 = await User.getEstadosEquipo();
      dataFinal = { data, data2, data3 };

      return res.status(201).json({
        success: true,
        message: "Adeudos por Boleta recuperados",
        data: dataFinal,
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
      const data2 = await User.getEstadosAdeudo();
      const data3 = await User.getEstadosEquipo();
      dataFinal = { data, data2, data3 };
      return res.status(201).json({
        success: true,
        message: "Adeudos por laboratorios recuperados",
        data: dataFinal,
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
      const correo = req.query.correo;
      const fecha_peticion = req.query.fecha_peticion;
      const fecha_entrega = req.query.fecha_entrega;
      const boleta = req.query.boleta;
      const idequipo = req.query.idequipo;

      const data = await User.UpdateAdeudo(
        correo,
        fecha_peticion,
        fecha_entrega,
        boleta,
        idequipo
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
      const boleta = req.body.boleta;
      const carrera = req.body.carrera;
      const correo = req.body.correo;
      const estatus = req.body.estatus;
      const fecha_entrega = req.body.fecha_entrega;
      const fecha_peticion = req.body.fecha_peticion;
      const idequipo = req.body.idequipo;
      const idlaboratorio = req.body.idlaboratorio;
      const materia = req.body.materia;
      const nombre = req.body.nombre;
      const profesor = req.body.profesor;
      const otro = req.body.otro;
      const otro_name = req.body.otro_name;
      const otro_motivo = req.body.otro_motivo;

      //si la contraseña enviada por el usuario es igual a la cifrada en DB

      const data = {
        nombre: nombre,
        boleta: boleta,
        carrera: carrera,
        correo: correo,
        fecha_peticion: fecha_peticion,
        fecha_entrega: fecha_entrega,
        idlaboratorio: idlaboratorio,
        materia: materia,
        profesor: profesor,
        idequipo: idequipo,
        estatus: estatus,
        otro: otro,
        otro_name: otro_name,
        otro_motivo: otro_motivo,
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
        message: "Error al ingresar adeudo",
        error: error,
      });
    }
  },

  async PostEquipo(req, res, next) {
    try {
      //Se recuperan las variables del body de la request
      const nombre = req.body.nombre;
      const codigo_barras = req.body.codigo_barras;
      const modelo = req.body.modelo;
      const ano = req.body.ano;
      const fallo = req.body.fallo;
      const estado = req.body.estado;
      const nombre_manual = req.body.nombre_manual;
      const idLaboratorio = req.body.idLaboratorio;
      const Foto_fallo = req.body.Foto_fallo;
      const Disponibilidad = req.body.Disponibilidad;
      const Partida = req.body.Partida;

      //si la contraseña enviada por el usuario es igual a la cifrada en DB

      const data = {
        nombre: nombre,
        codigo_barras: codigo_barras,
        modelo: modelo,
        ano: ano,
        fallo: fallo,
        estado: estado,
        nombre_manual: nombre_manual,
        idLaboratorio: idLaboratorio,
        Foto_fallo: Foto_fallo,
        Disponibilidad: Disponibilidad,
        Partida: Partida,
      };

      const res = await User.PostEquipo(data);

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
      console.log(`Error post equipo. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al ingresar equipo",
        error: error,
      });
    }
  },
};
