import './register.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const navigate = useNavigate();

    // ESTADOS PARA LOS CAMPOS DEL FORMULARIO

    const [nameuser, setNameuser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState(''); // Nuevo estado para ciudad
    const [phone, setPhone] = useState(''); // Nuevo estado para teléfono
    const [profession, setProfession] = useState(''); // Nuevo estado para profesión
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClick = async (e) => {

        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // CREAR UN OBJETO CON LOS DATOS DEL USARIO
        const userData = {
            nameuser,
            email,
            password,
            city, // Incluir ciudad
            phone, // Incluir teléfono
            profession // Incluir profesión

        }

        try {

            //HACER LA SOLICITUD REGISTRO  METODO POST 

            const response = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users', userData);

            console.log(response);

            setSuccessMessage('Registro exitoso!'); // Mensaje de éxito
            setError(''); // Limpiar errores


            //Limpia los campos de formulario
            setNameuser('');
            setEmail('');
            setPassword('');
            setCity('');
            setPhone('');
            setProfession('');

            // Redirigir a la página de inicio
            // Esperar 3 segundos (3000 ms) antes de redirigir
            setTimeout(() => {
                navigate('/login'); // Cambia '/login' por la ruta de tu página de inicio
            }, 3000); // 3000 ms = 3 segundos




        } catch (err) {

            setError('Error al registrar el usuario: ' + err.response.data.msg); // Manejar errores
            setSuccessMessage(''); // Limpiar mensaje de éxito


        }

    }





    return (
        <div className="containerMain">
            <h1>Registrate</h1>
            <form>

                <div className="line">
                    <div className="lineleft">
                        <hr />
                    </div>
                    <p>O</p>
                    <div className="linerigth">
                        <hr />
                    </div>

                </div>



                {/*CAMPO DE USERNAME */}
                <div className="campoRegister">
                    {/**  <label htmlFor="nameuser">Nombre:</label>*/}

                    <input
                        className="textName"
                        type="text"
                        id="nameuser"
                        value={nameuser}
                        onChange={(e) => setNameuser(e.target.value)}
                        required
                        placeholder='Nombre'
                    />
                </div>


                {/*CAMPO DE EMAIL */}

                <div className="campoRegister">
                    {/**  <label htmlFor="email">Email:</label>*/}

                    <input
                        className="textEmail"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder='Email@gmail.com'
                    />
                </div>

                {/*CAMPO DE PASSWORS */}
                <div className="campoRegister">
                    {/*<label htmlFor="password">Contraseña:</label> */}

                    <input
                        className="textPassword"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder='Password'
                    />
                </div>
                {/* CAMPO DE CIUDAD */}
                <div className="campoRegister">
                    <input
                        className="textCity"
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        placeholder='Ciudad'
                    />
                </div>

                {/* CAMPO DE TELÉFONO */}
                <div className="campoRegister">
                    <input
                        className="textPhone"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder='Teléfono'
                    />
                </div>

                {/* CAMPO DE PROFESIÓN */}
                <div className="campoRegister">
                    <input
                        className="textProfession"
                        type="text"
                        id="profession"
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        required
                        placeholder='Profesión'
                    />
                </div>






                {/*BOTON DE REGISTRO */}
                <button className="btRegister" type="submit" onClick={handleClick}>Registrar</button>
                <div className="clauseText">
                    <p>
                        Al registrarmer, acepto la <span>Politica de privacidad</span> y
                        los <span>terminos de servicio</span>.
                    </p>

                </div>


            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

        </div>
    )
}

export default Register;