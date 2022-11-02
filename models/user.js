//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");
//recuperar dependencia para encriptar las contraseñas
const crypto = require("crypto");

const User = {};

//sentencia SQL que recupera todos los usurios
User.getAll = () => {
  const sql = `
  SELECT * FROM public."Empleados"
  ORDER BY "Id_empleado" ASC `;

  return db.manyOrNone(sql);
};

User.getEstadosEquipo = () => {
  const sql = `
  SELECT
  "Estados_Equipos"."Id_estado",
  "Estados_Equipos"."Descripcion_estado"
  FROM public."Estados_Equipos"
 `;

  return db.manyOrNone(sql);
};

User.getECarreras = () => {
  const sql = `
  SELECT 
  "Id_carrera", 
  "Nombre_carrera"
	FROM public."Carreras";
 `;

  return db.manyOrNone(sql);
};

User.getDisponibilidad = () => {
  const sql = `
  SELECT
   "Id_disponibilidad_equipo",
   "Descripcion"
	FROM public."Disponibilidad_Equipos";
 `;

  return db.manyOrNone(sql);
};

User.getAllEquipoByLabs = (Id_laboratorio) => {
  const sql = `
  SELECT

	
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

  `;

  return db.manyOrNone(sql, Id_laboratorio);
};

User.getAllEquipo = () => {
  const sql = `


  SELECT

	
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


order by "Laboratorios"."Id_laboratorio"


  `;

  return db.manyOrNone(sql);
};

//Sentencia Sql que solicita los laboratorios a los que tiene acceso
User.getAllLabsPUser = (Id_empleado) => {
  const sql = `
  SELECT
 json_agg(
    json_build_object( 
"Laboratorios"."Id_laboratorio",
"Laboratorios"."Nombre_laboratorio"
 )
  ) as Labs
FROM public."Empleados"
inner join public."Rel_Laboratorio_Empleado" 
ON "Rel_Laboratorio_Empleado"."Id_empleado_rel" = "Empleados"."Id_empleado"
inner join public."Laboratorios" 
ON "Laboratorios"."Id_laboratorio" = "Rel_Laboratorio_Empleado"."Id_laboratorio_rel"

where "Empleados"."Id_empleado"=$1
  
  group by "Empleados"."Id_empleado"
    `;

  return db.oneOrNone(sql, Id_empleado);
};

//sentencia SQL que recupera un único usuario por I_D
User.findById = (Id_empleado) => {
  const sql = `
  SELECT
  "Correo_empleado",
  "Numero_empleado",
  "Nombre_empleado",
  "Paterno_empleado",
  "Materno_empleado",
  "RFC/CURP",
  "Correo_empleado", 
  "Session_token"
  
  
  FROM public."Empleados"
  
  where "Id_empleado"=$1;

      `;

  return db.oneOrNone(sql, Id_empleado);
};

//sentencia SQL que recupera un único usuario por I_D
User.AllLab = () => {
  const sql = `
  SELECT "Id_laboratorio", "Nombre_laboratorio"
	FROM public."Laboratorios";`;

  return db.manyOrNone(sql);
};

//sentencia que recuoera deuda por laboratorio con inner join
User.DebtByLab = (Id_laboratorio) => {
  const sql = `
  SELECT

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
    
    where "Laboratorios"."Id_laboratorio"=$1`;

  return db.manyOrNone(sql, Id_laboratorio);
};

User.DebtByBoletaAdeudo = (Boleta_alumno) => {
  const sql = `
  
  SELECT

json_agg(
    json_build_object( 

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
 and "Adeudos"."Estatus"=FALSE`;

  return db.manyOrNone(sql, Boleta_alumno);
};
//sentencia que recuoera no deuda por boleta
User.DebtByBoletaNoAdeudo = (Boleta_alumno) => {
  const sql = `
  SELECT

  json_agg(
      json_build_object( 
  
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
User.AllDebts = () => {
  const sql = `
  SELECT

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
  "Estados_Adeudo"."Descripcion_estado_adeudo" as Estatus,
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
  `;

  return db.manyOrNone(sql);
};

//sentencia que recuoera deuda por laboratorio sin inner join
User.Debt = (idlaboratorio) => {
  const sql = `
  SELECT 
  
  json_agg(
    json_build_object( 
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
    "Adeudos"."Id_laboratorio_adeudo"=$1`;

  return db.oneOrNone(sql, idlaboratorio);
};

//Sentencia SQL que recupera un único usuario por email
User.FindByEmail = (email) => {
  const sql = `
  SELECT 
"Id_empleado" as idusuario,
 "Numero_empleado",
 "Nombre_empleado", 
 "Paterno_empleado",
 "Materno_empleado",
 "RFC/CURP",
 "Correo_empleado" as correo,
 "Session_token",
 "Perfiles"."Descripcion",
 "Perfiles"."Id_perfil" as id_rol,
 "Contraseñas"."Contraseña" as contraseña


 
	FROM public."Empleados"
inner join public."Accesos" ON
"Accesos"."Id_empleado_Acceso" = "Empleados"."Id_empleado"
inner join public."Perfiles" 
ON "Perfiles"."Id_perfil" = "Accesos"."Id_perfil_Acceso"
inner join public."Contraseñas"
ON "Contraseñas"."Id_empleado_contraseña" = "Empleados"."Id_empleado"
   
   where "Empleados"."Correo_empleado"=$1
      
  `;

  return db.oneOrNone(sql, email);
};

User.UpdateEstatus = (Boleta_adeudo, Id_equipo_adeudo) => {
  const sql = `
  UPDATE public."Adeudos"
	SET 
 "Estatus"=TRUE
	WHERE 
	"Boleta_adeudo"=$1
	AND
	"Id_equipo_adeudo"=$2;

	
  `;

  return db.manyOrNone(sql, [Boleta_adeudo, Id_equipo_adeudo]);
};

User.UpdateAdeudo = (
  Fecha_alta,
  Fecha_entrega,
  Boleta_adeudo,
  Id_equipo_adeudo
) => {
  const sql = `


  UPDATE public."Adeudos"
	SET   
	"Fecha_alta"=$1,
	"Fecha_entrega"=$2
	
	
	WHERE 
	"Adeudos"."Boleta_adeudo"=$3
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

//sentencia SQL que crea nuevo usuario
User.create = (user) => {
  //se encripta en md5, update(pasamos el valor) digest para mantener formato hex
  const pwHash = crypto.createHash("md5").update(user.password).digest("hex");

  user.password = pwHash;
  const sql = `
      INSERT INTO
        usuario(
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

User.PostAdeudo = (Adeudos) => {
  const sql = `
    INSERT INTO
    "Adeudos"(



      "Boleta_adeudo" as boleta, 
      "Id_laboratorio_adeudo" as idlaboratorio,
      "Id_equipo_adeudo" as idequipo, 
      "Id_componente_adeudo",
      "Fecha_alta" as fecha_peticion,
      "Fecha_entrega" as fecha_entrega,
      "Estatus"      
    
      
        )
    VALUES($1, $2, $3, $4, $5, $6, $7) returning "Id_adeudo"
    `;
  return db.oneOrNone(sql, [
    Adeudos.Boleta_adeudo,
    Adeudos.Id_laboratorio_adeudo,
    Adeudos.Id_equipo_adeudo,
    Adeudos.Id_componente_adeudo,
    Adeudos.Fecha_alta,
    Adeudos.Fecha_entrega,
    Adeudos.Estatus,
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
