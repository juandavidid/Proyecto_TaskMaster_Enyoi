//Routes to create users
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { check } = require('express-validator');

const auth = require('../middleware/auth');

//Create an user
// api/users
router.post('/',
    [
        check('nameuser', 'Debe suministrar el nombre').trim().isLength({ min: 1 }),
        check('email', 'Debe suministrar un email válido').trim().isEmail(),
        check('password', 'Debe suministrar un password de al menos 6 caractere').trim().isLength({ min: 6 })
    ],
    usersController.createUser);

// informacion de usuario
//api/users
router.get('/Information', auth, usersController.getUser);



// Actualizar nombre de usuario
// api/users

router.put('/update-name', auth, [check('nameuser', 'El nombre np puede estar vacio').trim().isLength({ min: 1 })], usersController.updateUserName);


// Cargar Imagen de usuario
router.post('/profile/photo', auth, usersController.uploadProfileImage);

// Obtener la imagen de perfil
router.get('/profile/photo/:userId', auth, usersController.getProfileImage);


module.exports = router;


