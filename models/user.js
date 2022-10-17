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
User.getAllEquipoByLabs = (idlaboratorio) => {
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
    'desc',EQ."Id_descripcion",
    'idequipo',EQ.idequipo
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

//Sentencoa que recupera todos la informacion de equipos por id laboratorio
User.getAllEquipo = () => {
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
    'desc',EQ."Id_descripcion",
    'idequipo',EQ.idequipo,
    'laboratorio',L.idlaboratorio
	)
) as Equipo
	
  FROM 
		public.laboratorio as L
	INNER join 
		public.equipamiento as EQ
	ON 
		EQ."idLaboratorio" = L.idlaboratorio
		
	
	group by L.idlaboratorio
  order by L.idlaboratorio

  `;

  return db.manyOrNone(sql);
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
//sentencia que recuoera deuda por laboratorio con inner join
User.DebtByLab = (idlaboratorio) => {
  const sql = `
  SELECT
	la.idlaboratorio,
	la.nombre,

  json_agg(
    json_build_object( 
      'name', sa.nombre,
      'boleta', sa.boleta,
      'carrera',sa.carrera,
      'correo',sa.correo,
      'estatus',sa.estatus,
      'fecha_en',sa.fecha_entrega,
      'fecha_pe',sa.fecha_peticion,
      'idequipo',sa.idequipo,
      'name',la.nombre,
      'equipo',Eq.nombre,
      'codigo',Eq.codigo_barras,
      'modelo', Eq.modelo,		
      'ano',Eq.ano,
      'Foto_fallo', Eq."Foto_fallo"
    )
  ) as Adeudo
  FROM 
    public.laboratorio as la
  INNER join 
    public.solicitud_alumno as sa
	ON sa.idlaboratorio = la.idlaboratorio 
  INNER join public.equipamiento as Eq
	ON Eq.idequipo = sa.idequipo


  
  
  where 
    la.idlaboratorio=$1
  group by la.idlaboratorio `;

  return db.oneOrNone(sql, idlaboratorio);
};

//sentencia que recuoera todas las deudas por laboratorio con inner join
User.AllDebts = () => {
  const sql = `
  SELECT
	la.idlaboratorio,
	la.nombre,

  json_agg(
    json_build_object( 
      'name', sa.nombre,
      'boleta', sa.boleta,
      'carrera',sa.carrera,
      'correo',sa.correo,
      'estatus',sa.estatus,
      'fecha_en',sa.fecha_entrega,
      'fecha_pe',sa.fecha_peticion,
      'idequipo',sa.idequipo,
      'name',la.nombre,
      'equipo',Eq.nombre,
      'codigo',Eq.codigo_barras,
      'modelo', Eq.modelo,		
      'ano',Eq.ano,
      'Foto_fallo', Eq."Foto_fallo"
    )
  ) as Adeudo
  FROM 
    public.laboratorio as la
  INNER join 
    public.solicitud_alumno as sa
	ON sa.idlaboratorio = la.idlaboratorio 
  INNER join public.equipamiento as Eq
	ON Eq.idequipo = sa.idequipo

  group by la.idlaboratorio
    
  order by la.idlaboratorio
  `;

  return db.manyOrNone(sql);
};

//sentencia que recuoera deuda por laboratorio sin inner join
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
            "idLaboratorio",
            "Foto_fallo",
            "Disponibilidad"
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning
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
  ]);
};

User.PostAdeudo = (solicitud_alumno) => {
  const sql = `
    INSERT INTO
    solicitud_alumno(
            
      nombre,
      boleta,
      carrera,
      idlaboratorio,
      idequipo,
      materia,
      profesor,
      estatus,
      correo,
      fecha_peticion,
      fecha_entrega
        )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning idsolicitud
    `;
  return db.oneOrNone(sql, [
    solicitud_alumno.nombre,
    solicitud_alumno.boleta,
    solicitud_alumno.carrera,
    solicitud_alumno.idlaboratorio,
    solicitud_alumno.idequipo,
    solicitud_alumno.materia,
    solicitud_alumno.profesor,
    solicitud_alumno.estatus,
    solicitud_alumno.correo,

    solicitud_alumno.fecha_peticion,
    solicitud_alumno.fecha_entrega,
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
