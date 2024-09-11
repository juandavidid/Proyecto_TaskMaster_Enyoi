const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const User = require('../models/Users'); // Tu modelo de usuario 
const sendEmail = require('../utils/sendEmail');// Función para enviar emails


router.post('/forgot-password', async (req, res) => {


    console.log("Informacion del Insomnia", req.body);


    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Informacion de User", user);

        if (!user) {
            return res.status(404).json({ msg: 'No se encontró una cuenta con ese correo electrónico' });
        }

        // Generar un token temporal
        const resetToken = crypto.randomBytes(32).toString('hex');

        console.log("Reseteo del Token", resetToken)


        // Guardar el token y la fecha de expiración en el usuario
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 3600000; // 1 hora

        await user.save();

        // Crear la URL de restablecimiento de contraseña
        const resetUrl = `https://proyecto-task-master-enyoiclient-hgldcdk2a.vercel.app/resetpassword/${resetToken}`;

        console.log("Crea URL ", resetUrl);

        // Enviar el email con el enlace de restablecimiento
        const message = `
            Hola 
            Recibiste este correo porque solicitaste restablecer tu contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña:
            ${resetUrl}
            Si no solicitaste este correo, ignóralo.
        `;

        await sendEmail({
            email: user.email,
            subject: 'Restablecimiento Contraseña',
            message
        });

        res.status(200).json({ msg: 'Correo de restablecimiento de contraseña enviado' });

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error al enviar el correo' });
    }
});

module.exports = router;
