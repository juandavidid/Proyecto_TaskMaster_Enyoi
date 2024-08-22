import './register.css'
import { useState } from 'react';
import axios from 'axios'


const Register = () => {

    // ESTADOS PARA LOS CAMPOS DEL FORMULARIO

    const [nameuser, setNameuser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleClick = async (e) => {

        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // CREAR UN OBJETO CON LOS DATOS DEL USARIO
        const userData = {
            nameuser,
            email,
            password,

        }

        try {

            //HACER LA SOLICITUD REGISTRO  METODO POST 
            const response = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users', userData);
            setSuccessMessage('Registro exitoso!'); // Mensaje de éxito
            setError(''); // Limpiar errores


            //Limpia los campos de formulario
            setNameuser('');
            setEmail('');
            setPassword('');



        } catch (err) {

            setError('Error al registrar el usuario: ' + err.response.data.msg); // Manejar errores
            setSuccessMessage(''); // Limpiar mensaje de éxito


        }

    }





    return (
        <div>
            <h1>FORMULARIO DE  REGISTRO</h1>
            <form>

                {/*CAMPO DE USERNAME */}
                <div>
                    <label htmlFor="nameuser">Nombre:</label>
                    <input
                        type="text"
                        id="nameuser"
                        value={nameuser}
                        onChange={(e) => setNameuser(e.target.value)}
                        required
                    />
                </div>


                {/*CAMPO DE EMAIL */}

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/*CAMPO DE PASSWORS */}
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>


                {/*BOTON DE REGISTRO */}
                <button type="submit" onClick={handleClick}>Registrar</button>

            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        </div>
    )
}

export default Register;