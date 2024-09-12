const Users = require('../models/Users');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    //Check for errors in express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Getting the fields
    const { email, password, city, phone, profession } = req.body;
    try {
        //Check email not exists 
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El email ya existe' });
        }
        //Create a new user object
        //user = new Users(req.body);

        user = new Users({
            ...req.body,   // Incluye todos los campos enviados en el body
            city,          // Añadir ciudad
            phone,         // Añadir teléfono
            profession     // Añadir profesión
        });

        //password Hash   encriptan la contraseña
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Save de new object created into de DB
        await user.save();

        //Create a sign JWT
        const payload = {
            user: {
                id: user.id
            }
        };
        //Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;

            //Confirmation message
            res.json({ token });
        });

    } catch (error) {
        console.log('Hay un error: ', error);
        res.status(500).send('Hubo un error creando el usuario');
    }
}

exports.getUser = async (req, res) => {

    try {
        // Obtener el usuario desde el token
        const userId = req.user.id;

        // Buscar la información del usuario en la base de datos
        const user = await Users.findById(userId).select('-password'); // Excluir el campo de la contraseña

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Enviar la información del usuario
        res.json({ user });


    } catch (error) {

        console.log('Hay un error: ', error);
        res.status(500).send('Hubo un error obteniendo la información del usuario');
    }


}

exports.updateUseProfile = async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        /*const { nameuser, email, city, phone, profession } = req.body;*/
        const updateFields = {}; // Crear un objeto para los campos a actualizar



        // Solo agregar campos al objeto si están definidos en la solicitud
        if (req.body.nameuser) updateFields.nameuser = req.body.nameuser;
        if (req.body.email) updateFields.email = req.body.email;
        if (req.body.city) updateFields.city = req.body.city;
        if (req.body.phone) updateFields.phone = req.body.phone;
        if (req.body.profession) updateFields.profession = req.body.profession;



        // Buscar y actualizar el nombre del usuario
        /*const user = await Users.findByIdAndUpdate(userId, { nameuser, email, city, phone, profession }, { new: true }).select('-password');*/
        const user = await Users.findByIdAndUpdate(userId, updateFields, { new: true }).select('-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Enviar la información del usuario actualizada
        res.json({ user });
    } catch (error) {
        console.error('Hay un error: ', error);
        res.status(500).send('Hubo un error actualizando el nombre de usuario');
    }
};


// Ruta para subir una imagen de perfil

exports.uploadProfileImage = async (req, res) => {

    // Imprime la información del cuerpo de la solicitud en la consola para depuración.
    console.log("Informacion del insomnia", req.body);

    try {

        // Obtiene el ID del usuario desde el middleware de autenticación.
        const userId = req.user.id;

        // Accede al archivo enviado en la solicitud. `req.files` es un objeto que contiene los archivos cargados.
        // `profilePhoto` es el nombre del campo en el formulario de carga de archivos.
        const file = req.files?.profilePhoto;

        // Si no se ha enviado un archivo, responde con un error 400 y un mensaje.
        if (!file) {
            return res.status(400).json({ msg: 'No se ha enviado ninguna imagen' });
        }

        // Define los tipos de archivo permitidos para la imagen de perfil.
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];

        // Verifica si el tipo MIME del archivo cargado está en la lista de tipos permitidos.
        // Si no está permitido, responde con un error 400 y un mensaje.
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ msg: 'Tipo de archivo no permitido. Solo se permiten imágenes.' });
        }







        // Busca al usuario en la base de datos por su ID.
        const user = await Users.findById(userId);
        // Si el usuario no se encuentra, responde con un error 404 y un mensaje.
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        // Actualiza el campo `profilePhoto` del usuario con los datos del archivo.
        // `profilePhotoType` almacena el tipo MIME del archivo.
        user.profilePhoto = file.data;
        user.profilePhotoType = file.mimetype;

        // Guarda los cambios en la base de datos.
        await user.save();
        // Responde con un mensaje de éxito.
        res.json({ msg: 'Imagen de perfil actualizada con éxito' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }

}

// Obtener la imagen de perfil
exports.getProfileImage = async (req, res) => {

    try {
        // Busca al usuario en la base de datos por el ID proporcionado en los parámetros de la solicitud.
        const user = await Users.findById(req.params.userId);

        // Si el usuario no se encuentra o no tiene una imagen de perfil, responde con un error 404 y un mensaje.
        if (!user || !user.profilePhoto) return res.status(404).json({ msg: 'Imagen no encontrada' });





        // Configura el tipo de contenido de la respuesta con el tipo MIME de la imagen.
        res.set('Content-Type', user.profilePhotoType);
        // Envía los datos de la imagen de perfil como respuesta.
        res.send(user.profilePhoto);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}


