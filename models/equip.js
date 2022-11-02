//MODELO Equipamientos

//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");

const Equip = {};

Equip.PostEquipo = (equip) => {
  const sql = `
  INSERT INTO public."Equipos"(
	
	"Nombre_equipo",
	"Descripcion_equipo", 
	"Año_equipo",
	"Marca_equipo",
	"Modelo_equipo",
	"Cams_equipo",
	"Estado_equipo",
	"Foto_equipo",
	"Utilidad_equipo",
	"Alumnos_equipo",
	"Manual_equipo",
	"Disponibilidad_equipo",
	"Descripcion_fallo_equipo",
	"Asignatura_equipo",
	"Practicas_equipo")
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING Id_equipo;
      `;
  return db.oneOrNone(sql, [
    equip.Nombre_equipo,
    equip.Descripcion_equipo,
    equip.Año_equipo,
    equip.Marca_equipo,
    equip.Modelo_equipo,
    equip.Cams_equipo,
    equip.Estado_equipo,
    equip.Foto_equipo,
    equip.Utilidad_equipo,
    equip.Alumnos_equipo,
    equip.Manual_equipo,
    equip.Disponibilidad_equipo,
    equip.Descripcion_fallo_equipo,
    equip.Asignatura_equipo,
    equip.Practicas_equipo,
  ]);
};

Equip.PostEquipoRelLab = (Id_equipo, Id_laboratorio_rel) => {
  const sql = `
    INSERT INTO public."Rel_Equipo_Laboratorios"(
        "Id_equipo_rel", 
       "Id_laboratorio_rel")
       VALUES ( Id_equipo, $1);
        `;
  return db.oneOrNone(sql, []);
};

//objeto para el controlador
module.exports = Equip;
