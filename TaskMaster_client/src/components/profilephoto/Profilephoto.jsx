// Importamos el archivo de estilos CSS asociado con el componente Profilephoto.
import './profilephoto.css'
// Importamos el hook useState de React para gestionar el estado.
import { useState } from 'react';
// Importamos axios para realizar solicitudes HTTP.
import axios from 'axios';

// Definimos el componente `Profilephoto` que recibe dos props: `userId` (ID del usuario) y `onClose` (función para cerrar el modal o componente).
const Profilephoto = ({ userId, onClose }) => {

    // Definimos el estado `file` para almacenar el archivo de imagen seleccionado.
    const [file, setFile] = useState(null);
    // Definimos el estado `loading` para controlar el estado de carga durante la subida de la imagen.
    const [loading, setLoading] = useState(false);

    // Función que se ejecuta cuando el usuario selecciona un archivo de imagen.
    // Actualiza el estado `file` con el archivo seleccionado.
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };



    // Función que se ejecuta al enviar el formulario para subir la imagen.
    const handleSubmit = async (e) => {

        // Evitamos que la página se recargue al hacer submit.
        e.preventDefault();

        // Si no hay archivo seleccionado, salimos de la función.
        if (!file) return;

        // Obtenemos el token de autenticación desde el localStorage.
        const token = localStorage.getItem('authToken');

        // Creamos un objeto FormData para enviar tanto la imagen como el ID del usuario al backend.
        const formData = new FormData();

        // Añadimos el archivo de imagen al FormData.
        formData.append('profilePhoto', file);
        // Añadimos el userId al FormData.
        formData.append('userId', userId);


        try {

            // Activamos el estado de carga.
            setLoading(true);

            // Configuramos los headers de la solicitud, incluyendo el token y el tipo de contenido (multipart/form-data).
            const config = {

                headers: {
                    'x-auth-token': token,  // Token de autenticación del usuario.
                    'Content-Type': 'multipart/form-data', // Especifica que estamos enviando un archivo.
                },
            };

            // Hacemos la solicitud POST al backend para subir la imagen.
            await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users/profile/photo', formData, config);

            // Si la subida es exitosa, mostramos una alerta.
            alert('Imagen de perfil actualizada con éxito');

            // Llamamos a `onClose` para cerrar el modal o componente.
            onClose();

            // Recargamos la página para reflejar los cambios.
            window.location.reload();




        } catch (error) {

            console.error('Error al subir la imagen:', error);

            alert('Error al subir la imagen');

        } finally {

            // Independientemente del resultado, desactivamos el estado de carga.

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


