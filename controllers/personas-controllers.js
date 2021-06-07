const db = require('../db-conection');


/** POST PERSONAS */

const postPersonas = async (req, res, next) => {

  const { nombre, apellido, email, alias } = req.body;

  try {

    if (!nombre || !apellido || !email || !alias) {

      throw new Error("Se necesitan el nombre, apellido, Email y Alias");
    }

    let respuesta = await db.query("SELECT COUNT(*) as count FROM personas WHERE email = (?)", [email]);

    if (respuesta[0].count == 0) {

      respuesta = await db.query("INSERT INTO personas (nombre, apellido, email, alias) VALUES (?, ?, ?, ?)", [nombre, apellido, email, alias]);
      res.status(201).send({ "Error": "La Persona se ha insertado correctamente!" });

    } else {
      throw new Error("Ese Email ya esta asociado a una persona");
    }

  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });
  }

};

/** GET PERSONAS */
const getPersonas = async (req, res, next) => {

  try {
    const respuesta = await db.query('SELECT * FROM personas');
    res.status(200).send({ "respuesta": respuesta });

  } catch (err) {
    res.status(413).send({ "Error": err.message });
    console.log(err);
  }

};

/** GET CATEGORIA POR ID */
const getPersonasPorId = async (req, res, next) => {

  const personaId = req.params.id;

  try {
    const respuesta = await db.query('SELECT * FROM personas WHERE id = (?)', [personaId]);
    console.log(respuesta);

    if (respuesta == '') {
      throw new Error('Persona no encontrada');
    }

    else {
      res.status(200).send({ "respuesta": respuesta });
    }

  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });

  } finally {
    await db.close();
  }
};


/** DELETE PERSONA */
const deletePersonas = async (req, res, next) => {

  const personaId = req.params.id; // if empty undefinied

  try {

    const data = await db.query('DELETE FROM persona WHERE id = (?)', [personaId]);
    console.log(data);

    if (!data.affectedRows == 0) {
      throw new Error("La Persona fue borrada");
    } else {
      res.status(200).send({ "Error": 'No se ha borrado ninguna persona con ese ID' });
    }

    //FALTA VALIDAR QUE ESTA PERSONA NO TENGA NINGUN LIBRO ASOCIADO

  } catch (err) {
    console.error(err.message);
    res.status(413).send({ "Error": err.message });
  }
};


/** UPDATE PERSONAS */
// const updatePersonas = (req, res, next) => {

//   try {
//         if (!req.body.nombre) {
//             throw new Error('Nombre Vacio');
//         }

//         let query = 'SELECT id FROM personas WHERE nombre = ? AND id <> ?';
//         let respuesta = await qy (query, [req.body.nombre, req.params.id]);

//         if (respuesta.lenght > 0) {
//             throw new Error ('Esa Persona ya Existe');
//         }

//         query = 'UPDATE personas SET nombre = ? WHERE id= ?';
//         respuesta = await qy(query, [req.body.nombre, req.params.id]);
//         res.status(200).send({'Respuesta': respuesta}); 
//   }   
//   catch(err) {
//       console.error(err.message);
//       res.status(413).send({"Error": err.message});
//   }

// };





/** EXPORTS */
exports.getPersonas = getPersonas;
exports.getPersonasId = getPersonasPorId;
exports.postPersonas = postPersonas;
exports.updatePersonas = updatePersonas;
exports.deletePersonas = deletePersonas;


