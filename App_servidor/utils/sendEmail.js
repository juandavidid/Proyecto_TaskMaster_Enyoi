// Importamos el módulo nodemailer, que se utilizará para enviar correos electrónicos.
const nodemailer = require('nodemailer');
// Cargamos las variables de entorno definidas en el archivo 'variables.env'.
require('dotenv').config({ path: 'variables.env' });

// Definimos una función asíncrona `sendEmail` que recibirá un objeto `options` con la información del correo a enviar.
const sendEmail = async (options) => {
    console.log("Informacion de ", options);

    // Creamos un transportador de correo electrónico utilizando nodemailer.
    // Este objeto define el servicio de correo (Gmail en este caso) y la autenticación del remitente.
    const transporter = nodemailer.createTransport({
        // Usamos el servicio de correo Gmail, pero puedes cambiarlo por otro como Outlook, Yahoo, etc.
        service: 'Gmail', // O el servicio de correo que utilices    //host: "smtp.gmail.com"   port: 465  secure:true
        // Definimos la autenticación usando variables de entorno para mayor seguridad (correo y contraseña).
        auth: {
            user: process.env.EMAIL_USERNAME, // Tu correo electrónico
            pass: process.env.EMAIL_PASSWORD // Tu contraseña o app password
        }


    });


    // Verificamos que el transportador esté correctamente configurado y se pueda conectar al servicio de correo.
    // Esto ayuda a identificar si hay algún problema antes de intentar enviar el correo.
    transporter.verify().then(() => console.log("gmail enviado con exito!...")).catch((error) => console.error(error))

    console.log("Informacion del correo", transporter);

    // Definimos las opciones del correo a enviar.
    const mailOptions = {
        from: 'juandcg271@gmail.com', // El correo electrónico desde el cual se enviará el mensaje (remitente).
        to: options.email,            // Dirección del destinatario (pasado como parte de las opciones).
        subject: options.subject,     // Asunto del correo (también pasado en las opciones).
        text: options.message         // Cuerpo del correo en formato de texto plano (pasado en las opciones).   
    };

    // Enviamos el correo usando el transportador previamente configurado y las opciones definidas.

    await transporter.sendMail(mailOptions);
};

// Exportamos la función `sendEmail` para que pueda ser utilizada en otras partes del proyecto.
module.exports = sendEmail;
