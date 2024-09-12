// Importamos el módulo mongoose, que es una biblioteca para modelar datos y gestionar interacciones con MongoDB.
const mongoose = require('mongoose');
// Cargamos las variables de entorno definidas en el archivo 'variables.env'.
require('dotenv').config({ path: 'variables.env' });

// Definimos una función asíncrona llamada `connectDB` para conectar a la base de datos de MongoDB.
const connectDB = async () => {
    try {
        // Intentamos conectar a la base de datos utilizando la URI de conexión de MongoDB almacenada en las variables de entorno.
        await mongoose.connect(process.env.DB_MONGO);
        // Si la conexión es exitosa, imprimimos este mensaje en la consola.
        console.log('DB Successfully Connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
// Exportamos la función `connectDB` para que pueda ser utilizada en otras partes del proyecto.
module.exports = connectDB;