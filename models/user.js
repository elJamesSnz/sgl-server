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

//sentencia SQL que recupera todos los usurios
User.getEstadosAdeudo = () => {
  const sql = `
  SELECT
 json_agg(
    json_build_object( 
"Estados_Adeudo"."Id_estado_adeudo",
"Estados_Adeudo"."Descripcion_estado_adeudo"
 )
  ) as EstadoAdeudo
FROM public."Estados_Adeudo" `;

  return db.oneOrNone(sql);
};
User.getEstadosEquipo = () => {
  const sql = `
  SELECT
 json_agg(
    json_build_object( 
"Estados_Equipos"."Id_estado",
"Estados_Equipos"."Descripcion_estado"
 )
  ) as EstadosEquipos
FROM public."Estados_Equipos" `;

  return db.oneOrNone(sql);
};
//Sentencoa que recupera todos la informacion de equipos por id laboratorio
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
  "Alumnos_equipo",
  "Manual_equipo",
  LAB."Nombre_laboratorio",
  LAB."Id_laboratorio"

  FROM public."Equipos"
  INNER join public."Rel_Equipo_Laboratorios" AS Rel_LAB
  ON Rel_LAB."Id_equipo_rel" = "Equipos"."Id_equipo"
  INNER join public."Laboratorios" AS LAB
  ON LAB."Id_laboratorio" = Rel_LAB."Id_laboratorio_rel"
  where "Id_laboratorio"=$1

  `;

  return db.manyOrNone(sql, Id_laboratorio);
};

//Sentencoa que recupera todos los equipos de todos los laboratorios
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
 "Laboratorios"."Id_laboratorio"



FROM public."Equipos"
INNER join public."Rel_Equipo_Laboratorios"
ON "Rel_Equipo_Laboratorios"."Id_equipo_rel" = "Equipos"."Id_equipo"
INNER join public."Laboratorios" 
ON "Laboratorios"."Id_laboratorio" = "Rel_Equipo_Laboratorios"."Id_laboratorio_rel"


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
  "Estatus",
  
  "Equipos"."Nombre_equipo", 
  "Equipos"."Descripcion_equipo",
  "Equipos"."Año_equipo",
  "Equipos"."Marca_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Estado_equipo",
  "Equipos"."Foto_equipo",
  "Equipos"."Disponibilidad_equipo",
  "Equipos"."Utilidad_equipo", 
  "Equipos"."Asignatura_equipo",
  "Equipos"."Practicas_equipo",
  "Equipos"."Manual_equipo",
  "Equipos"."Alumnos_equipo",



  "Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno"
  
    
  FROM public."Adeudos"
  INNER JOIN public."Equipos" 
  ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
  INNER JOIN public."Alumnos"
  ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
  INNER JOIN public."Laboratorios"
  ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
  INNER JOIN public."Rel_Equipo_Laboratorios" 
  ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio"
    
    where "Laboratorios"."Id_laboratorio"=$1`;

  return db.manyOrNone(sql, Id_laboratorio);
};

//sentencia que recuoera deuda por boleta

//CHECAAAAR
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
"Estatus",

  "Equipos"."Nombre_equipo", 
  "Equipos"."Descripcion_equipo",
  "Equipos"."Año_equipo",
  "Equipos"."Marca_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Estado_equipo",
  "Equipos"."Foto_equipo",
  "Equipos"."Disponibilidad_equipo",
  "Equipos"."Utilidad_equipo", 
  "Equipos"."Asignatura_equipo",
  "Equipos"."Practicas_equipo",
  "Equipos"."Manual_equipo",
  "Equipos"."Alumnos_equipo",




"Alumnos"."Nombre_alumno",
"Alumnos"."Materno_alumno",
"Alumnos"."Paterno_alumno"

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
  "Estatus",
  "Equipos"."Nombre_equipo", 
  "Equipos"."Descripcion_equipo",
  "Equipos"."Año_equipo",
  "Equipos"."Marca_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Estado_equipo",
  "Equipos"."Foto_equipo",
  "Equipos"."Disponibilidad_equipo",
  "Equipos"."Utilidad_equipo", 
  "Equipos"."Asignatura_equipo",
  "Equipos"."Practicas_equipo",
  "Equipos"."Manual_equipo",
  "Equipos"."Alumnos_equipo",




  "Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno"
  
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
  "Estatus",


  "Equipos"."Nombre_equipo", 
  "Equipos"."Descripcion_equipo",
  "Equipos"."Año_equipo",
  "Equipos"."Marca_equipo",
  "Equipos"."Modelo_equipo",
  "Equipos"."Cams_equipo",
  "Equipos"."Estado_equipo",
  "Equipos"."Foto_equipo",
  "Equipos"."Disponibilidad_equipo",
  "Equipos"."Utilidad_equipo", 
  "Equipos"."Asignatura_equipo",
  "Equipos"."Practicas_equipo",
  "Equipos"."Manual_equipo",
  "Equipos"."Alumnos_equipo",


  "Alumnos"."Nombre_alumno",
  "Alumnos"."Materno_alumno",
  "Alumnos"."Paterno_alumno"		
  as Adeudo
  FROM public."Adeudos"
  INNER JOIN public."Equipos" 
  ON "Equipos"."Id_equipo" = "Adeudos"."Id_equipo_adeudo"
  INNER JOIN public."Alumnos"
  ON "Alumnos"."Boleta_alumno" = "Adeudos"."Boleta_adeudo"
  INNER JOIN public."Laboratorios"
  ON "Laboratorios"."Id_laboratorio" = "Adeudos"."Id_laboratorio_adeudo"
  INNER JOIN public."Rel_Equipo_Laboratorios" 
  ON "Rel_Equipo_Laboratorios"."Id_laboratorio_rel" = "Laboratorios"."Id_laboratorio"      
  `;

  return db.manyOrNone(sql);
};

//sentencia que recuoera deuda por laboratorio sin inner join
//CHECAAAAAR
User.Debt = (idlaboratorio) => {
  const sql = `
  SELECT 
  
  json_agg(
    json_build_object( 
      'nombre',SA.nombre,    
      'boleta',SA.boleta,
      'carrera',SA.carrera,
      'idlaboratorio',SA.idlaboratorio,
      'idequipo',SA.idequipo,
      'materia',SA.materia,
      'profesor',SA.profesor,
      'estatus',SA."estatus",
      'correo',SA.correo,
      'fecha_peticion',SA.fecha_peticion,
      'fecha_entrega',SA.fecha_entrega,
      'otro',SA.otro,
      'otro_name',SA.otro_name,
      'otro_motivo',SA.otro_motivo
    )
  ) as Debt

	FROM public.solicitud_alumno as SA
  
  
  where 
    idlaboratorio=$1
  group by idlaboratorio `;

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

User.PostEquipo = (Equipos) => {
  const sql = `
    INSERT INTO
    Equipos(

        "Nombre_equipo" as nombre,
        "Descripcion_equipo" as fallo,
        "Año_equipo" as ano,
        "Marca_equipo",
        "Modelo_equipo" as modelo,
        "Cams_equipo" as codigo_barras,
        "Estado_equipo" as estado,
        "Foto_equipo" as Foto_fallo,
        "Disponibilidad_equipo" as Disponibilidad,
        "Utilidad_equipo",
        "Asignatura_equipo",
        "Practicas_equipo",
        "Alumnos_equipo")
            
            
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,  $11, $12, $13) returning "Id_equipo"
    `;
  return db.oneOrNone(sql, [
    Equipos.Nombre_equipo,
    Equipos.Descripcion_equipo,
    Equipos.Año_equipo,
    Equipos.Marca_equipo,
    Equipos.Modelo_equipo,
    Equipos.Cams_equipo,
    Equipos.Estado_equipo,
    Equipos.Foto_equipo,
    Equipos.Disponibilidad_equipo,
    Equipos.Utilidad_equipo,
    Equipos.Asignatura_equipo,
    Equipos.Practicas_equipo,
    Equipos.Alumnos_equipo,
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
