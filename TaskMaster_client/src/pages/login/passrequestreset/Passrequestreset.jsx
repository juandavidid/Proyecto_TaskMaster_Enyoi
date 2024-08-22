import './passrequestreset.css'
import axios from 'axios';
import { useState } from 'react';

const Passrequestreset = () => {
    const [email, setEmail] = useState('');
    const handleClick = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/password/forgot-password', { email });
            alert(response.data.msg);

        } catch (error) {
            alert('Error al enviar el correo de restablecimiento de contraseña');
        }

    }
    return (
        <div>
            <h1>
                PAGINA PARA GESTIONAR O SOLICITAR RESTABLECER CONTRASEÑA
            </h1>

            <form>
                <h2>Recuperar Contraseña</h2>
                <input
                    type="email"
                    placeholder="Ingresa tu correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit" onClick={handleClick}>Enviar</button>
            </form>
        </div>
    )
}


export default Passrequestreset;