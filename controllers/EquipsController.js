//CONTROLADORT EQUIP
const Equip = require("../models/equip");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = {
  //petición asíncrona para todos los usuarios
  async PostEquipo(req, res) {
    try {
      //Se recuperan las variables del body de la request

      const reqNombre_equipo = req.body.Nombre_equipo;
      const reqDescripcion_equipo = req.body.Descripcion_equipo;
      const reqAño_equipo = req.body.Año_equipo;
      const reqMarca_equipo = req.body.Marca_equipo;
      const reqModelo_equipo = req.body.Modelo_equipo;
      const reqCams_equipo = req.body.Cams_equipo;
      const reqEstado_equipo = req.body.Estado_equipo;
      const reqFoto_equipo = req.body.Foto_equipo;
      const reqUtilidad_equipo = req.body.Utilidad_equipo;
      const reqAlumnos_equipo = req.body.Alumnos_equipo;
      const reqManual_equipo = req.body.Manual_equipo;
      const reqDisponibilidad_equipo = req.body.Disponibilidad_equipo;
      const reqDescripcion_fallo_equipo = req.body.Descripcion_fallo_equipo;
      const reqAsignatura_equipo = req.body.Asignatura_equipo;
      const reqPracticas_equipo = req.body.Practicas_equipo;

      //se hace objeto para el modelo Equip
      const ReqEquip = {
        Nombre_equipo: reqNombre_equipo,
        Descripcion_equipo: reqDescripcion_equipo,
        Año_equipo: reqAño_equipo,
        Marca_equipo: reqMarca_equipo,
        Modelo_equipo: reqModelo_equipo,
        Cams_equipo: reqCams_equipo,
        Estado_equipo: reqEstado_equipo,
        Foto_equipo: reqFoto_equipo,
        Utilidad_equipo: reqUtilidad_equipo,
        Alumnos_equipo: reqAlumnos_equipo,
        Manual_equipo: reqManual_equipo,
        Disponibilidad_equipo: reqDisponibilidad_equipo,
        Descripcion_fallo_equipo: reqDescripcion_fallo_equipo,
        Asignatura_equipo: reqAsignatura_equipo,
        Practicas_equipo: reqPracticas_equipo,
      };

      //Petición a DB de PostEquipo que retorna Id_equipo
      const rEquip = await Equip.PostEquipo(ReqEquip);
      console.log(rEquip);
      //Validas data recuperada
      if (!rEquip) {
        return res.status(501).json({
          success: false,
          message: "No fue posible agregar yo recuperar el Id_equipo",
          error: error,
        });
      } else {
        //otra petición insert
        //const rRelLabEquipo = await Equip.PostEquipoRelLab(rEquip.id_equipo);
      }
      return res.status(201).json({
        success: true,
        data: data,
        message: "Equipamiento agregado correctamente",
      });
    } catch (error) {
      console.log(`Error login. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al asgregar equipo",
        error: error,
      });
    }
  },
  async PostEquipoRelLab(req, res) {
    try {
      //Se recuperan las variables del body de la request

      const reqNombre_equipo = req.body.Id_equipo_rel;
      const reqDescripcion_equipo = req.body.Descripcion_equipo;
      

      //se hace objeto para el modelo Equip
      const ReqEquip = {
        Id_equipo_rel: reqNombre_equipo,
        Descripcion_equipo: reqDescripcion_equipo,
      
      };

      //Petición a DB de PostEquipo que retorna Id_equipo
      const rEquip = await Equip.PostEquipo(ReqEquip);
      console.log(rEquip);
      //Validas data recuperada
      if (!rEquip) {
        return res.status(501).json({
          success: false,
          message: "No fue posible agregar yo recuperar el Id_equipo",
          error: error,
        });
      } else {
        //otra petición insert
        //const rRelLabEquipo = await Equip.PostEquipoRelLab(rEquip.id_equipo);
      }
      return res.status(201).json({
        success: true,
        data: data,
        message: "Equipamiento agregado correctamente",
      });
    } catch (error) {
      console.log(`Error login. ${error}`);
      return res.status(501).json({
        success: false,
        message: "Error al asgregar equipo",
        error: error,
      });
    }
  },
};
