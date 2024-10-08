// Get express
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const fileUpload = require('express-fileupload');

//Creating the server
const app = express();

//Connect to Data Base
connectDB()

//Enable cors  
app.use(cors());

//Enable express.json
app.use(express.json({ extended: true }));

// Enable file upload middleware
app.use(fileUpload()); // Agrega esta línea para manejar archivos subidos

// app PORT
const PORT = process.env.PORT || 4000;

//Importing routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/password', require('./routes/forgotPassword'));


//Specify the main page
app.get('/', (req, res) => {
    res.send('Hello ')
});

//Start app
app.listen(PORT, '0.0.0.0', () => {
    console.log(`The server is running at port: ${PORT}`);
});
