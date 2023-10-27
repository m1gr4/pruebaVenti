const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwtValidation = require('./routes/jwtValidation');

// variable que contiene la ruta/url de la base de datos en mongo
// venti es el nombre de la coleccion
const mongoString = process.env.DATABASE_URL || 'localhost';
const collection = process.env.COLLECTION || 'venti';

//Rutina de coneccion a base de datos mongo

mongoose.connect(`mongodb://${mongoString}:27017/${collection}`);

//mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

//Constante para la creacion del contexto express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ruta para llegar a los datos de usuarios
app.use('/api/user', require('./routes/userRoute'));


//configuracion de variable para el puerto donde se va a levantar el backend
const port = process.env.PORT || 3000
const server = app.listen(
    port,
    console.log(`App listining in port ${port} - http://localhost:${port}`)
);

module.exports = { app, server }