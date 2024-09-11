import './changePassword.css'
import { useState } from 'react';
import axios from 'axios';


const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

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