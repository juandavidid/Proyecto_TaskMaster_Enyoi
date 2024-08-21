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
    const { email, password } = req.body;
    try {
        //Check email not exists 
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'El email ya existe' });
        }
        //Create a new user object
        user = new Users(req.body);

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

exports.updateUserName = async (req, res) => {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userId = req.user.id;
        const { nameuser } = req.body;

        // Buscar y actualizar el nombre del usuario
        const user = await Users.findByIdAndUpdate(userId, { nameuser }, { new: true }).select('-password');

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

