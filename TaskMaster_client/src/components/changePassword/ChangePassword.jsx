import './changePassword.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();



    const handleChangePassword = async (e) => {

        e.preventDefault();
        try {

            const token = localStorage.getItem('authToken'); // Recuperar el token de localStorage
            console.log("Informacion del token desde Login", token);

            const res = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/auth/change-password', {
                currentPassword,
                newPassword,
            }, {
                headers: {
                    'x-auth-token': `${token}`,
                },
            });


            setMessage(res.data.message);
            // Redirigir a la página de inicio después de unos segundos
            setTimeout(() => {
                navigate('/profile');  // Ajusta la ruta a la que deseas redirigir
            }, 2000);  // 2 segundos de espera antes de redirigir





        } catch (error) {
            setMessage(error.response.data.message || 'Error al cambiar la contraseña');
        }

    };


    return (
        <div className="password-form-container">
            <h2>Cambiar Contraseña</h2>
            <form className="password-form">
                <div className="form-group">
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" onClick={handleChangePassword} className="submit-button">
                    Guardar Cambios
                </button>
            </form>

            {message && <p className="message">{message}</p>}
        </div>

    );

}

export default ChangePassword;