const db = require('../db-conection'); 


/** GET CATEGORIAS */
const getCategorias = async (req, res, next) => {

	try {
		const respuesta = await db.query('SELECT * FROM categorias');
		res.status(200).send({"respuesta": respuesta});

	}	catch(err) {
			res.status(413).send({"Error": err.message});

	} 
};


/** GET CATEGORIA POR ID */
const getCategoriaPorId = async (req, res, next) => {

  const categoriaId = req.params.id;

  try {
	  const respuesta = await db.query('SELECT * FROM categorias WHERE id = (?)', [categoriaId]);
	  console.log(respuesta);

	  if (respuesta == '') {
			throw new Error('Categoria no encontrada');
	  } 
	  
	  else {
		  res.status(200).send({"respuesta": respuesta});
	  }
		  
  } catch(err) {
			console.error(err.message);
			res.status(413).send({"Error": err.message});

  } finally {
			await db.close();
  }
};


/** POST CATEGORIA */
const postCategoria = async (req, res, next) => {

  const categoria = req.body.nombreCategoria; // if empty undefinied

  try {

	  if (!categoria) {
		throw new Error ('Falta enviar el nombre de Categoria');
	  }

	  let respuesta = await db.query('SELECT id FROM categorias WHERE nombre = (?)', [categoria]);
	  console.log(respuesta);

	  if (!respuesta) {
		  throw new Error ('Esa Categoría ya Existe');
	  }

	  respuesta = await db.query('INSERT INTO categorias (nombre) VALUE (?)', [categoria]);

	  res.status(200).send({'Se Agrego correctamene id': respuesta.insertId});

  } catch(err) {
			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};


/** UPDATE CATEGORIA */
const updateCategoria = async (req, res, next) => {

  const categoriaName = req.body.nombreCategoria; // if empty undefinied
  const categoriaId = req.params.id; // if empty undefinied

  try {

	  if (!categoriaName || !categoriaId) {
		throw new Error ('Falta enviar el nombre de Categoria');
	  }

	  let respuesta = await db.query('UPDATE categorias SET nombre = (?) WHERE id = (?)', [categoriaName, categoriaId]);

	  console.log(respuesta);

	  res.status(200).send({'Se Agrego correctamene id': respuesta.insertId});

  } catch(err) {

			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};


/** DELETE CATEGORIA */
const deleteCategoria = async (req, res, next) => {
 
  const categoriaId = req.params.id; // if empty undefinied

  try {

	  let data = await db.query('SELECT COUNT(id) as cantidad FROM libros WHERE categoria_id = (?)', [categoriaId]);
	  let respuesta = data[0].cantidad;

	  if (!respuesta == '') {
		  throw new Error ("Esta Categoria tiene un Libro o Mas asociados");
	  }
	  
	  // query = 'SELECT COUNT(id) as cantidad FROM categorias WHERE id = ?';
	  // data = await promiseQuery (query, categoriaId);
	  // respuesta = data[0].cantidad;
	  // console.log(respuesta);
	  
	  data = await db.query('DELETE FROM categorias WHERE id = ?', [categoriaId]);
	  respuesta = data.affectedRows;
	  
	  if (respuesta == '') {
		  throw new Error ('Categoria no Econtrada');
	  } 

	  res.status(200).send({"Error": 'Se Borro Correctamente'});

  } catch(err) {
			console.error(err.message);
			res.status(413).send({"Error": err.message});
  }
};


/** EXPORTS */
exports.getCategorias = getCategorias;
exports.getCategoriaPorId = getCategoriaPorId;
exports.postCategoria = postCategoria;
exports.updateCategoria = updateCategoria;
exports.deleteCategoria = deleteCategoria;
