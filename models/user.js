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

//Sentencoa que recupera todos la informacion de equipos por id laboratorio
User.getAllEquipo = (idlaboratorio) => {
  const sql = `


SELECT 
  L.idlaboratorio,
  L.nombre,

json_agg(
	json_build_object( 
    'name',EQ.nombre,    
    'code',EQ.codigo_barras,
    'mode',EQ.modelo,
    'ano',EQ.ano,
    'fallo',EQ.fallo,
    'estado',EQ.estado,
    'name_man',EQ.nombre_manual,
    'foto',EQ."Foto_fallo",
    'Disponible',EQ."Disponibilidad",
    'desc',EQ."Id_descripcion"	
	)
) as Equip
	
  FROM 
		public.laboratorio as L
	INNER join 
		public.equipamiento as EQ
	ON 
		EQ."idLaboratorio" = L.idlaboratorio
		
	where L.idlaboratorio=$1
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
    public.laboratorio as LAB
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
      session_token      
    FROM
        usuario
    WHERE
      idusuario = $1`;

  return db.oneOrNone(sql, id);
};

User.DebtByLab = (idlaboratorio) => {
  const sql = `
  SELECT
	la.idlaboratorio,
	la.nombre,

  json_agg(
    json_build_object( 
      'name', 	sa.nombre,
	'carrera',sa.carrera,
		'correo',sa.correo,
		'estatus',sa.estatus,
		'fecha_en',sa.fecha_entrega,
		'fecha_pe',sa.fecha_peticion,
		'idequipo',sa.idequipo,
      	'name',la.nombre
    )
  ) as Adeudo
  FROM 
    public.laboratorio as la
  INNER join 
    public.solicitud_alumno as sa
	ON sa.idlaboratorio = la.idlaboratorio 

  
  
  where 
    la.idlaboratorio=6
  group by la.idlaboratorio `;

  return db.oneOrNone(sql, idlaboratorio);
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

User.PostEquipo = (equipamiento) => {
  const sql = `
    INSERT INTO
      equipamiento(
            
            nombre,
            codigo_barras,
            modelo,
            ano,
            fallo,
            estado,
            nombre_manual,
            idLaboratorio,
            Foto_fallo,
            Disponibilidad,
            Id_descripcion,
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING idequipo
    `;
  return db.oneOrNone(sql, [
    equipamiento.nombre,
    equipamiento.codigo_barras,
    equipamiento.modelo,
    equipamiento.ano,
    equipamiento.fallo,
    equipamiento.estado,
    equipamiento.nombre_manual,
    equipamiento.idLaboratorio,
    equipamiento.Foto_fallo,
    equipamiento.Disponibilidad,
    equipamiento.Id_descripcion,
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
