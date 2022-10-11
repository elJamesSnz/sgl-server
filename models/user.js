//recuperar el módulo db desde config para sentencias SQL
const db = require("../config/config");
//recuperar dependencia para encriptar las contraseñas
const crypto = require("crypto");

const User = {};

//sentencia SQL que recupera todos los usurios
User.getAll = () => {
  const sql = `
    SELECT 
    * 
    FROM 
    usuario`;

  return db.manyOrNone(sql);
};

//Sentencoa que recupera todos la la informacion de equipos por id laboratorio
User.getAllEquipo = (idlaboratorio) => {
  const sql = `


SELECT 
  L.idlaboratorio,
  L.nombre,

json_agg(
	json_build_object( 
    'name',EQ.nombre,
    'desc',EQ.descripcion,
    'code',EQ.codigo_barras,
    'mode',EQ.modelo,
    'ano',EQ.ano,
    'fallo',EQ.fallo,
    'estado',EQ.estado,
    'manual',EQ.manual,
    'name_man',EQ.nombre_manual,
    'foto',EQ."Foto_fallo",
    'Disponible',EQ."Disponibilidad"	
	)
) as Equip
	
  FROM 
		public.laboratorio as L
	INNER join 
		public.equipamiento as EQ
	ON 
		EQ."idLaboratorio" = L.idlaboratorio
		
	where L.idlaboratorio=$5
	group by L.idlaboratorio

  `;

  return db.oneOrNone(sql, idlaboratorio);
};

//Sentencia Sql que solicita los laboratorios a los que tiene acceso
User.getAllLabsPUser = (idusuario) => {
  const sql = `
  SELECT 
    u.idusuario,
    u.nombre, 
    json_agg(
      json_build_object( 
        'id', RLU.id_laboratorio,
        'name',LAB.nombre
      )
    ) as Labs
      
    FROM 
      public.usuario as u
      
    INNER join 
      public."Relacion_lab_user" as RLU
    ON 
      RLU.id_usuario = u.idusuario
    INNER join 
      public.laboratorio  as LAB
    ON LAB.idlaboratorio = RLU.id_laboratorio
    
    where 
      u.idusuario=$1
    
    group by u.idusuario
    `;

  return db.oneOrNone(sql, idusuario);
};

//sentencia SQL que recupera un único usuario por I_D
User.findById = (id) => {
  const sql = `
    SELECT
      idusuario,
      correo,
      nombre,
      contraseña,
      session_token,      
    FROM
        usuario
    WHERE
      idusuario = $1`;

  return db.oneOrNone(sql, id);
};

//Sentencia SQL que recupera un único usuario por email
User.FindByEmail = (email) => {
  const sql = `
    SELECT
      idusuario,
      correo,
      nombre,
      contraseña,
      session_token
    FROM
      usuario
    WHERE
      correo = $1
  `;

  return db.oneOrNone(sql, email);
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
