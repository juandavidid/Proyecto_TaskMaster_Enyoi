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
            alert('Error al restablecer la contraseña', error);

        }


    }

    return (
        <div className="reset-password-container">
            <form className="reset-password-form">
                <div className="containerRestablcer">
                    <h2>Restablecer Contraseña</h2>
                    <input
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={handleClick} className="submit-button">
                        Restablecer
                    </button>

                </div>

            </form>
        </div>
    )
}

export default ResetPassword;