const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db; // Variable para almacenar la referencia a la base de datos

async function connectDB() {
  try {
    await client.connect();
    db = client.db('id19887576_asistencia');
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

// Llamar a la función para establecer la conexión
connectDB();

module.exports = db; // Exportar la referencia a la base de datos
