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
