import './profilephoto.css'

import { useState } from 'react';
import axios from 'axios';


const Profilephoto = ({ userId, onClose }) => {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        const token = localStorage.getItem('authToken');
        const formData = new FormData();
        formData.append('profilePhoto', file);
        formData.append('userId', userId);

        try {
            setLoading(true);
            const config = {
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'multipart/form-data',
                },
            };
            await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users/profile/photo', formData, config);
            alert('Imagen de perfil actualizada con éxito');
            onClose(); // Cerrar el modal o el componente después de subir la imagen
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="photo">
            <div className="Profilephoto">
                <h1> componente para subir imagen</h1>
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                    <button type="submit" disabled={loading}>Subir Imagen</button>
                </form>
                <button onClick={onClose}>Cerrar</button>
            </div>


        </div>
    )
}

export default Profilephoto;


