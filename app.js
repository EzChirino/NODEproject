const express = require('express');

const app = express();
const puerto = 5000;

const librosRoutes = require('./routes/libros-routes');
const personasRoutes = require('./routes/personas-routes');
const categoriasRoutes = require('./routes/categorias-routes');

/** FORM/DATA */
app.use(express.urlencoded());

/** APP ROUTES */
app.use('/libros', librosRoutes); // => /libros
app.use('/personas', personasRoutes); // => /personas
app.use('/categorias', categoriasRoutes); // => /personas

/** SERVER */
app.listen(puerto,() => {
    console.log('Servidor escuchando puerto',puerto);
});
