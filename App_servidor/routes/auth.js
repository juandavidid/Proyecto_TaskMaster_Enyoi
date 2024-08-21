//Routes to authenticate users
const express = require('express'); //
const router = express.Router();  //
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const crypto = require('crypto');
const User = require('../models/Users'); // Asegúrate de que la ruta sea correcta

const bcryptjs = require('bcryptjs');

const { verifyToken } = require('../middleware/auth');



// Iniciar sesion 
// api/auth
router.post('/', authController.authUsers);

//Getting authenticated user recently created
router.get('/',
    auth,
    authController.getAuthUser
);


// Ruta para restablcer contraseña
router.put('/reset-password/:resetToken', async (req, res) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() } // Verifica que el token no ha expirado
        });

        if (!user) {
            return res.status(400).json({ msg: 'Token inválido o expirado' });
        }

        // Actualizar la contraseña
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(req.body.password, salt);

        user.resetPasswordToken = undefined; // Eliminar el token
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ msg: 'Contraseña restablecida con éxito' });

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error al restablecer la contraseña' });
    }
});


// Ruta para cambiar contraseña usuario con Iniciar sesion
router.post('/change-password', auth, authController.changePassword);



module.exports = router;