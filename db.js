const mysql = require('mysql2');

const dbConfig = {
  host: 'localhost',
  user: 'tu_usuario_de_mysql',
  password: 'tu_contraseña_de_mysql',
  database: 'tu_base_de_datos_mysql'
};

const pool = mysql.createPool(dbConfig);

module.exports = pool.promise();
