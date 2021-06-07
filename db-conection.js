const mysql = require('mysql');
const { promisify } = require('util');

const mysqlConection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YES',
    database: 'Books'
  });

mysqlConection.connect((err) => {

    if(err) {
        throw err;
    }
    else {
        console.log('Conexion con BD exitosa')
    }
});

mysqlConection.query = promisify(mysqlConection.query).bind(mysqlConection);
module.exports = mysqlConection;
