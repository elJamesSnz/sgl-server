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
	"Practicas_equipo",
  "Visualizacion_equipo"
    
    )
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING "Id_equipo";
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
    1,
  ]);
};

Equip.PostEquipoRelLab = (Id_equipo, Id_laboratorio_rel) => {
  const sql = `
    INSERT INTO public."Rel_Equipo_Laboratorios"(
        "Id_equipo_rel", 
       "Id_laboratorio_rel")
       VALUES ($1, $2);
        `;
  return db.oneOrNone(sql, [Id_equipo, Id_laboratorio_rel]);
};

Equip.EditEquipo = (equip) => {
  const sql = `
  UPDATE
  
  public."Equipos"

  SET
	
	"Nombre_equipo" = $1,
	"Descripcion_equipo" = $2, 
	"Año_equipo" = $3,
	"Marca_equipo" = $4,
	"Modelo_equipo" = $5,
	"Cams_equipo" = $6,
	"Estado_equipo" = $7,
	"Foto_equipo" = $8,
	"Utilidad_equipo" = $9,
	"Alumnos_equipo" = $10,
	"Manual_equipo" = $11,
	"Disponibilidad_equipo" = $12,
	"Descripcion_fallo_equipo" = $13,
	"Asignatura_equipo" = $14,
	"Practicas_equipo" = $15,
	
  WHERE Id_equipo = $16

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
    equip.Id_equipo,
  ]);
};

Equip.getAllEquipoByLabs = (Id_laboratorio) => {
  const sql = `
  SELECT

  "Id_equipo",
  "Nombre_equipo", 
  "Descripcion_equipo",
  "Año_equipo",
  "Marca_equipo",
  "Modelo_equipo",
  "Cams_equipo",
  "Estado_equipo",
  "Foto_equipo",
  "Disponibilidad_equipo",
  "Utilidad_equipo", 
  "Asignatura_equipo",
  "Practicas_equipo",
  "Manual_equipo",
  "Alumnos_equipo",
  "Descripcion_fallo_equipo",
  "Laboratorios"."Id_laboratorio",
  "Laboratorios"."Nombre_laboratorio",
  "Estados_Equipos"."Descripcion_estado",
  "Disponibilidad_Equipos"."Descripcion"
    
  
  
  
  FROM public."Equipos"
  INNER join public."Rel_Equipo_Laboratorios"
  ON "Rel_Equipo_Laboratorios"."Id_equipo_rel" = "Equipos"."Id_equipo"
  INNER join public."Laboratorios" 
  ON "Laboratorios"."Id_laboratorio" = "Rel_Equipo_Laboratorios"."Id_laboratorio_rel"
  INNER JOIN public."Estados_Equipos" 
  ON "Estados_Equipos"."Id_estado" = "Equipos"."Estado_equipo"
  INNER JOIN public."Disponibilidad_Equipos" 
  ON "Disponibilidad_Equipos"."Id_disponibilidad_equipo" = "Equipos"."Disponibilidad_equipo"
  
  
  
  
  
  where "Id_laboratorio"=$1
    
    and  "Visualizacion_equipo"=1







  `;

  return db.manyOrNone(sql, Id_laboratorio);
};

Equip.getAllEquipo = () => {
  const sql = `


  SELECT

  "Id_equipo",
"Nombre_equipo", 
"Descripcion_equipo",
"Año_equipo",
"Marca_equipo",
"Modelo_equipo",
"Cams_equipo",
"Estado_equipo",
"Foto_equipo",
"Disponibilidad_equipo",
"Utilidad_equipo", 
"Asignatura_equipo",
"Practicas_equipo",
"Manual_equipo",
"Alumnos_equipo",
"Descripcion_fallo_equipo",
"Laboratorios"."Id_laboratorio",
"Laboratorios"."Nombre_laboratorio",
"Estados_Equipos"."Descripcion_estado",
"Disponibilidad_Equipos"."Descripcion"
  



FROM public."Equipos"
INNER join public."Rel_Equipo_Laboratorios"
ON "Rel_Equipo_Laboratorios"."Id_equipo_rel" = "Equipos"."Id_equipo"
INNER join public."Laboratorios" 
ON "Laboratorios"."Id_laboratorio" = "Rel_Equipo_Laboratorios"."Id_laboratorio_rel"
INNER JOIN public."Estados_Equipos" 
ON "Estados_Equipos"."Id_estado" = "Equipos"."Estado_equipo"
INNER JOIN public."Disponibilidad_Equipos" 
ON "Disponibilidad_Equipos"."Id_disponibilidad_equipo" = "Equipos"."Disponibilidad_equipo"

where  "Visualizacion_equipo"=1
order by "Laboratorios"."Id_laboratorio"



  `;

  return db.manyOrNone(sql);
};

//objeto para el controlador
module.exports = Equip;
