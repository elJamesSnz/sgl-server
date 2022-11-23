//MODELO Adeudo

//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");

const Debt = {};

Debt.PostAdeudo = (debt) => {
  const sql = `
    INSERT INTO public."Adeudos"(
      "Boleta_adeudo", 
     "Id_laboratorio_adeudo",
     "Id_equipo_adeudo",
     "Id_componente_adeudo",
     "Fecha_alta",
     "Fecha_entrega",
     "Id_profesor_adeudo",
     "Asignatura_adeudo",
     "Estatus_adeudo",
     "Visualizacion_adeudo")
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `;
  return db.oneOrNone(sql, [
    debt.Boleta_adeudo,
    debt.Id_laboratorio_adeudo,
    debt.Id_equipo_adeudo,
    debt.Id_componente_adeudo,
    debt.Fecha_alta,
    debt.Fecha_entrega,
    debt.Id_profesor_adeudo,
    debt.Asignatura_adeudo,
    debt.Estatus_adeudo,
    debt.Visualizacion_adeudo,
  ]);
};


Debt.UpdateAdeudo = (
  Id_adeudo,
  Boleta_adeudo,
  Id_laboratorio_adeudo,
  Id_equipo_adeudo,
  Id_componente_adeudo,
  Fecha_alta,
  Fecha_entrega,
  Id_profesor_adeudo,
  Asignatura_adeudo,
  Estatus_adeudo,
  Visualizacion_adeudo
) => {
  const sql = `
  
  
   
  
    UPDATE public."Adeudos"
      SET
      "Id_adeudo"=$1, 
      "Id_laboratorio_adeudo"=$3, 
      "Id_componente_adeudo"=$5, 
      "Fecha_alta"=$6,
      "Fecha_entrega"=$7,
      "Id_profesor_adeudo"=$8,
      "Asignatura_adeudo"=$9, 
      "Estatus_adeudo"=$10,
      "Visualizacion_adeudo"=$11
  
  
    WHERE 
      "Adeudos"."Boleta_adeudo"=$2
      and
      "Adeudos"."Id_equipo_adeudo"=$4;
  
  
  
  
  
    `;

  return db.manyOrNone(sql, [
    Fecha_alta,
    Fecha_entrega,
    Boleta_adeudo,
    Id_equipo_adeudo,
  ]);
};


//sentencia que recuoera deuda por laboratorio con inner join
Debt.DebtByLab = (Id_laboratorio) => {
  const sql = `
  SELECT

  "Id_adeudo",
  "Boleta_adeudo",
  "Id_laboratorio_adeudo",
  "Id_equipo_adeudo",
  "Id_componente_adeudo",
  "Fecha_alta",
  "Fecha_entrega",
  "Equipos"."Nombre_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Descripcion_equipo",
  "Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno",
  "Alumnos"."Correo_alumno",
  "Carreras"."Nombre_carrera",
  "Empleados"."Nombre_empleado",
  "Empleados"."Materno_empleado",
  "Empleados"."Paterno_empleado",
  "Laboratorios"."Nombre_laboratorio",
  "Estados_Adeudo"."Descripcion_estado_adeudo" as Estatus,
  "Asignatura_adeudo"
  
    
  FROM public."Adeudos"
  INNER JOIN public."Equipos" 
  ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
  INNER JOIN public."Alumnos"
  ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
  INNER JOIN public."Laboratorios"
  ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
  INNER JOIN public."Rel_Equipo_Laboratorios" 
  ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio"
  inner join public."Carreras"
  ON "Carreras"."Id_carrera" = "Alumnos"."Id_carrera"
  inner join public."Empleados"  
  ON "Empleados"."Id_empleado"="Adeudos"."Id_profesor_adeudo"
  inner join public."Estados_Adeudo"
  ON "Estados_Adeudo"."Id_estado_adeudo"="Adeudos"."Estatus_adeudo"
    
    where "Laboratorios"."Id_laboratorio"=$1
    and "Visualizacion_adeudo"=1
    
    `;

  return db.manyOrNone(sql, Id_laboratorio);
};
//CHECAR
Debt.DebtByBoletaAdeudo = (Boleta_alumno) => {
  const sql = `
  
  SELECT

json_agg(
    json_build_object( 
      "Id_adeudo",
"Boleta_adeudo",
"Id_laboratorio_adeudo",
"Id_equipo_adeudo",
"Id_componente_adeudo",
"Fecha_alta",
"Fecha_entrega",
"Equipos"."Nombre_equipo",
"Equipos"."Modelo_equipo",
"Equipos"."Cams_equipo",
"Equipos"."Descripcion_equipo",
"Alumnos"."Nombre_alumno",
"Alumnos"."Materno_alumno",
"Alumnos"."Paterno_alumno",
"Alumnos"."Correo_alumno",
"Carreras"."Nombre_carrera",
"Empleados"."Nombre_empleado",
"Empleados"."Materno_empleado",
"Empleados"."Paterno_empleado",
"Laboratorios"."Nombre_laboratorio",
"Estados_Adeudo"."Descripcion_estado_adeudo" as Estatus,
"Asignatura_adeudo"

		)
  ) as Adeudo
	FROM public."Adeudos"
INNER JOIN public."Equipos" 
ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
INNER JOIN public."Alumnos"
ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
INNER JOIN public."Laboratorios"
ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
INNER JOIN public."Rel_Equipo_Laboratorios" 
ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio"
inner join public."Carreras"
  ON "Carreras"."Id_carrera" = "Alumnos"."Id_carrera"
  inner join public."Empleados"  
  ON "Empleados"."Id_empleado"="Adeudos"."Id_profesor_adeudo"
  inner join public."Estados_Adeudo"
  ON "Estados_Adeudo"."Id_estado_adeudo"="Adeudos"."Estatus_adeudo"
	
	where "Alumnos"."Boleta_alumno"=$1
 and "Adeudos"."Estatus"=FALSE
 and "Visualizacion_adeudo"=1
 
 `;

  return db.manyOrNone(sql, Boleta_alumno);
};
//sentencia que recuoera no deuda por boleta
Debt.DebtByBoletaNoAdeudo = (Boleta_alumno) => {
  const sql = `
  SELECT

  json_agg(
      json_build_object( 
        "Id_adeudo",
  "Boleta_adeudo",
  "Id_laboratorio_adeudo",
  "Id_equipo_adeudo",
  "Id_componente_adeudo",
  "Fecha_alta",
  "Fecha_entrega",
  "Equipos"."Nombre_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Descripcion_equipo",
  "Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno",
  "Alumnos"."Correo_alumno",
  "Carreras"."Nombre_carrera",
  "Empleados"."Nombre_empleado",
  "Empleados"."Materno_empleado",
  "Empleados"."Paterno_empleado",
  "Laboratorios"."Nombre_laboratorio",
  "Estados_Adeudo"."Descripcion_estado_adeudo" as Estatus,
  "Asignatura_adeudo"
  
      )
    ) as Adeudo
    FROM public."Adeudos"
  INNER JOIN public."Equipos" 
  ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
  INNER JOIN public."Alumnos"
  ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
  INNER JOIN public."Laboratorios"
  ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
  INNER JOIN public."Rel_Equipo_Laboratorios" 
  ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio"
  inner join public."Carreras"
  ON "Carreras"."Id_carrera" = "Alumnos"."Id_carrera"
  inner join public."Empleados"  
  ON "Empleados"."Id_empleado"="Adeudos"."Id_profesor_adeudo"
  inner join public."Estados_Adeudo"
  ON "Estados_Adeudo"."Id_estado_adeudo"="Adeudos"."Estatus_adeudo"
    
    where "Alumnos"."Boleta_alumno"=$1
   and "Adeudos"."Estatus"=TRUE`;

  return db.manyOrNone(sql, Boleta_alumno);
};

//sentencia que recuoera todas las deudas por laboratorio con inner join
Debt.AllDebts = () => {
  const sql = `
  SELECT
  "Id_adeudo",
  "Boleta_adeudo",
  "Id_laboratorio_adeudo",
  "Id_equipo_adeudo",
  "Id_componente_adeudo",
  "Fecha_alta",
  "Fecha_entrega",
  "Equipos"."Nombre_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Descripcion_equipo",
"Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno",
  "Alumnos"."Correo_alumno",
  "Carreras"."Nombre_carrera",
  "Estados_Adeudo"."Descripcion_estado_adeudo" ,
  "Asignatura_adeudo",
  "Empleados"."Nombre_empleado",
  "Empleados"."Materno_empleado",
  "Empleados"."Paterno_empleado",
  "Laboratorios"."Nombre_laboratorio"


  FROM public."Adeudos"
  INNER JOIN public."Equipos" 
  ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
  INNER JOIN public."Alumnos"
  ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
  INNER JOIN public."Laboratorios"
  ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
  INNER JOIN public."Rel_Equipo_Laboratorios" 
  ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio" 
  inner join public."Carreras"
  ON "Carreras"."Id_carrera" = "Alumnos"."Id_carrera"    
  inner join public."Estados_Adeudo"
  ON "Estados_Adeudo"."Id_estado_adeudo"="Adeudos"."Estatus_adeudo" 
  INNER JOIN public."Empleados" 
	ON "Empleados"."Id_empleado" = "Adeudos"."Id_profesor_adeudo"

  where "Visualizacion_adeudo"=1
  `;

  return db.manyOrNone(sql);
};

//sentencia que recuoera deuda por laboratorio sin inner join
Debt.Debt = (idlaboratorio) => {
  const sql = `
  SELECT 
  
  json_agg(
    json_build_object( 
      "Id_adeudo",
     "Asignatura_adeudo",
      "Boleta_adeudo",
      "Carreras"."Nombre_carrera",
      "Id_laboratorio_adeudo",
	 "Laboratorios"."Nombre_laboratorio",
    "Id_equipo_adeudo",
    "Adeudos"."Asignatura_adeudo",
    "Empleados"."Nombre_empleado",
    "Estados_Adeudo"."Descripcion_estado_adeudo",
    "Alumnos"."Correo_alumno",
    "Adeudos"."Fecha_alta",
     "Adeudos"."Fecha_entrega",
     "Adeudos"."Fecha_entrega"
     
    )
  ) as Debt

	FROM public."Adeudos" 
	INNER JOIN public."Alumnos" 
	ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
	INNER JOIN public."Carreras"
	ON "Carreras"."Id_carrera" = "Alumnos"."Id_carrera"
	INNER JOIN public."Empleados" 
	ON "Empleados"."Id_empleado" = "Adeudos"."Id_profesor_adeudo"
	INNER JOIN public."Estados_Adeudo" 
	ON "Estados_Adeudo"."Id_estado_adeudo" = "Adeudos"."Estatus_adeudo"
	inner join public."Laboratorios"
	ON "Laboratorios"."Id_laboratorio"="Adeudos"."Id_laboratorio_adeudo"
  
  
  where 
    "Adeudos"."Id_laboratorio_adeudo"=$1
    and  "Visualizacion_adeudo"=1
    `;

  return db.oneOrNone(sql, idlaboratorio);
};

//objeto para el controlador
module.exports = Debt;
