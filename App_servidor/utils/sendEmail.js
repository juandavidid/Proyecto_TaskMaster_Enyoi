const nodemailer = require('nodemailer');
require('dotenv').config({ path: 'variables.env' });

const sendEmail = async (options) => {
    console.log("Informacion de ", options);


    const transporter = nodemailer.createTransport({
        service: 'Gmail', // O el servicio de correo que utilices    //host: "smtp.gmail.com"   port: 465  secure:true
        auth: {
            user: process.env.EMAIL_USERNAME, // Tu correo electrónico
            pass: process.env.EMAIL_PASSWORD // Tu contraseña o app password
        }


    });

    transporter.verify().then(() => console.log("gmail enviado con exito!...")).catch((error) => console.error(error))

    console.log("Informacion del correo", transporter);

    const mailOptions = {
        from: 'juandcg271@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
