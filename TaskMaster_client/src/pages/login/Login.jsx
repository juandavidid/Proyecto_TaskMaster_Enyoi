import './login.css'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext';


const Login = () => {

    // ESTADOS PARA LOS CAMPOS DEL FORMULARIO
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // ME ENVIA A OTRA RUTA QUE LE DEFINA
    const navigate = useNavigate();


    // METODO DE CONTEXTO
    const { login } = useAuthContext();
    console.log("Variable Login", login);


    const handleClick = async (e) => {

        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // CREAR UN OBJETO CON LOS DATOS DEL USARIO
        const userDataLogin = {
            email,
            password,
        }


        try {
            //HACER SOLICITUD SE INICIO DE SESION
            const responseLogin = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/auth', userDataLogin);

            //Almacenar el token en localStorage
            const token = responseLogin.data.token;
            //localStorage.setItem('token', token);

            //ENVIA EL TOKEN DEL USUARIO
            login(token);

            console.log("Informacion cuando inicia sesion", responseLogin);
            setSuccessMessage('Iniciio de Sesion  exitoso!'); // Mensaje de éxito
            setError(''); // Limpiar errores

            //Limpia los campos de formulario
            setEmail('');
            setPassword('');

            // Me Envia a la Ruta de Principal de Mi pagina
            navigate('/home')




        } catch (err) {
            setError('Error al registrar el usuario: ' + err.response.data.msg); // Manejar errores
            setSuccessMessage(''); // Limpiar mensaje de éxito


        }



    }


    return (
        <div>
            <h1>FORMULARIO DE LOGIN</h1>
            <form>
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
                <button type="submit" onClick={handleClick}>Login</button>


            </form>

            <Link to={"/Passrequestreset"}>
                <span> ¿Olvide Mi Contraseña? </span>
            </Link>

            <Link to={"/register"}>
                <span> Registrar usuario </span>

            </Link>



            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}


        </div>
    )
}

export default Login;
