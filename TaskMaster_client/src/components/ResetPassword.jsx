import './resetpassword.css';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [password, setPassword] = useState('');
    const { resetToken } = useParams();

    const navigate = useNavigate();

    const handleClick = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/auth/reset-password/${resetToken}`, { password });
            alert(response.data.msg);
            navigate("/login")

        } catch (error) {
            alert('Error al restablecer la contraseña');

        }


    }

    return (
        <div>
            <h1>
                PAGINA PARA RESTAURA LA CONTRASEÑA
            </h1>

            <form>
                <h2>Restablecer Contraseña</h2>
                <input
                    type="password"
                    placeholder="Ingresa tu nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" onClick={handleClick}>Restablecer</button>
            </form>


        </div>
    )
}

export default ResetPassword;