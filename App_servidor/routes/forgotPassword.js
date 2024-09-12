// Importamos el módulo Express para crear y manejar rutas en el servidor.
const express = require('express');
// Usamos el Router de Express para definir rutas que serán manejadas por este archivo.
const router = express.Router();
// Importamos el módulo crypto, que se usará para generar tokens seguros de restablecimiento de contraseña.
const crypto = require('crypto');
// Importamos el modelo de usuario (User), que contiene la estructura y lógica para los documentos de usuarios en la base de datos.
const User = require('../models/Users'); // Tu modelo de usuario 
// Importamos una función personalizada que envía correos electrónicos. Se usará para enviar el enlace de restablecimiento de contraseña.
const sendEmail = require('../utils/sendEmail');// Función para enviar emails

// Definimos una ruta POST para el restablecimiento de contraseñas. Esta ruta se activará cuando el cliente envíe una solicitud para restablecer la contraseña.
router.post('/forgot-password', async (req, res) => {

    console.log("Informacion del Insomnia", req.body);


    // Extraemos el correo electrónico del cuerpo de la solicitud.
    const { email } = req.body;

    try {
        // Buscamos un usuario en la base de datos que tenga el correo electrónico que se recibió.
        const user = await User.findOne({ email });
        console.log("Informacion de User", user);


        // Si no se encuentra un usuario con ese correo, enviamos un mensaje de error con estado 404 (no encontrado).
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

        // Creamos la URL que el usuario utilizará para restablecer su contraseña, incluyendo el token como parte de la URL.
        const resetUrl = `https://proyecto-task-master-enyoiclient-btggna727.vercel.app/resetpassword/${resetToken}`;

        console.log("Crea URL ", resetUrl);

        // Definimos el contenido del mensaje que se enviará por correo electrónico, que contiene la URL de restablecimiento.
        const message = `
            Hola 
            Recibiste este correo porque solicitaste restablecer tu contraseña. Haz clic en el siguiente enlace para restablecer tu contraseña:
            ${resetUrl}
            Si no solicitaste este correo, ignóralo.
        `;

        // Usamos la función `sendEmail` para enviar el correo al usuario. Se incluye el correo del usuario, el asunto y el mensaje.

        await sendEmail({
            email: user.email,
            subject: 'Restablecimiento Contraseña',
            message
        });

        // Enviamos una respuesta exitosa al cliente, indicando que el correo de restablecimiento fue enviado correctamente.
        res.status(200).json({ msg: 'Correo de restablecimiento de contraseña enviado' });

    } catch (error) {
        // Si ocurre algún error durante el proceso, enviamos una respuesta con un código de error 500 (error del servidor) y un mensaje de error.
        res.status(500).json({ msg: 'Hubo un error al enviar el correo' });
    }
});

// Exportamos el router para que pueda ser utilizado en otras partes de la aplicación (normalmente en el archivo principal de las rutas).
module.exports = router;
