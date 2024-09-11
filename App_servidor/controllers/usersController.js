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

    console.log("Informacion del insomnia", req.body);

    try {
        const userId = req.user.id; // Obtener el ID del usuario desde el middleware de autenticación
        const file = req.files?.profilePhoto; // Asegúrate de que `req.files` y `profilePhoto` existan

        if (!file) {
            return res.status(400).json({ msg: 'No se ha enviado ninguna imagen' });
        }

        //--------------CODIGO NUEVO--------------

        // Validar tipo de archivo
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
            return res.status(400).json({ msg: 'Tipo de archivo no permitido. Solo se permiten imágenes.' });
        }



        //-----------------------------------------




        const user = await Users.findById(userId);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        user.profilePhoto = file.data;
        user.profilePhotoType = file.mimetype;

        await user.save();
        res.json({ msg: 'Imagen de perfil actualizada con éxito' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }

}

// Obtener la imagen de perfil
exports.getProfileImage = async (req, res) => {

    try {
        const user = await Users.findById(req.params.userId);
        if (!user || !user.profilePhoto) return res.status(404).json({ msg: 'Imagen no encontrada' });


        // Convertir el Buffer a base64
        //const base64Image = user.profilePhoto.toString('base64');



        res.set('Content-Type', user.profilePhotoType);
        res.send(user.profilePhoto);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}


