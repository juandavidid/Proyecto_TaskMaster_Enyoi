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

            const res = await axios.post('http://localhost:4000/api/auth/change-password', {
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
        <div>
            <h1>Hola pagina para cambio de contraseña</h1>
            <h2>Cambiar Contraseña</h2>
            <form>
                <div>
                    <label>Contraseña Actual:</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                    />
                </div>



                <div>
                    <label>Nueva Contraseña:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />

                </div>

                <button type="submit" onClick={handleChangePassword}>Guardar Cambios</button>
            </form>

            {message && <p>{message}</p>}
        </div>

    );

}

export default ChangePassword;