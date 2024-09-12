import './projects.css'

import axios from 'axios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const Projects = () => {
    const [projname, setProjname] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();


    const createProject = async () => {
        try {
            // Obtener el token desde localStorage o donde lo tengas almacenado
            const token = localStorage.getItem('authToken');

            // Configurar los headers de la solicitud
            const config = {
                headers: {

                    'x-auth-token': `${token}`
                }
            };

            // Hacer la solicitud POST al backend
            const response = await axios.post('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/projects', { projname }, config);

            // Manejar la respuesta si el proyecto se crea correctamente
            console.log('Proyecto creado:', response.data);


            // Establecer el mensaje de éxito
            setSuccessMessage('Proyecto creado con éxito!');

            // Redirigir a la página de inicio después de unos segundos
            setTimeout(() => {
                navigate('/home');  // Ajusta la ruta a la que deseas redirigir
            }, 2000);  // 2 segundos de espera antes de redirigir

        } catch (error) {
            console.error('Hubo un error creando el proyecto', error);
            setError('Error creando el proyecto');
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createProject();
    };



    return (
        <div className="containerProject">


            <h1 className="TituloProjecto">Nuevo proyecto</h1>

            <form className="formularioProject" onSubmit={onSubmit}>
                <div>
                    <label className="nameProjecto">Nombre del Proyecto</label>
                    <input
                        className="cajaTextoProjecto"
                        type="text"
                        value={projname}
                        onChange={(e) => setProjname(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="mensajeError">{error}</p>}
                <button className="btnProjecto" type="submit">Crear Proyecto</button>
            </form>

            {/* Mostrar mensajes de éxito o error */}
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}

        </div>
    )
}

export default Projects;