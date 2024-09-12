import './passrequestreset.css'
import axios from 'axios';
import { useState } from 'react';

import { Link } from 'react-router-dom';

const Passrequestreset = () => {

    const [email, setEmail] = useState('');

    const handleClick = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/password/forgot-password', { email });
            alert(response.data.msg);

        } catch (error) {
            alert('Error al enviar el correo de restablecimiento de contraseña', error);
        }

    }
    return (

        <div className="containerPassreques">

            <h1>
                ¿Olvidaste tu contraseña?
            </h1>
            <h2 className="textH2">
                Completa tu direccion de email para recibir instrucciones
            </h2>


            <form>

                <div className="containerElement">
                    <label className="textLabel">Direccion de Email</label>
                    <input
                        className="fielEmail"
                        type="email"
                        placeholder="Ingresa tu correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="btnEnviar" type="submit" onClick={handleClick}>Enviar las instrucciones</button>

                </div>

            </form>

            <div className="containeLink">
                <Link to={"/login"} style={{ textDecoration: 'none' }}>
                    <div className="textIniciSe">
                        <span > Iniciar Sesion </span>
                    </div>

                </Link>

                <Link to={"/register"} style={{ textDecoration: 'none' }}>
                    <div className="textRegis">
                        <span > Registrate </span>
                    </div>

                </Link>


            </div>


        </div>
    )
}


export default Passrequestreset;