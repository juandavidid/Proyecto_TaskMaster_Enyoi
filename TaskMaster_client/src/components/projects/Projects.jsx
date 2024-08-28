import './projects.css'

import axios from 'axios';

import { useState } from 'react';




const Projects = () => {
    const [projname, setProjname] = useState('');
    const [error, setError] = useState('');


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
        <div>
            <h1>PAGINA PARA CREAR PROYECTO</h1>

            <h2>Nuevo proyecto</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <label>Nombre del Proyecto</label>
                    <input
                        type="text"
                        value={projname}
                        onChange={(e) => setProjname(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Crear Proyecto</button>
            </form>

        </div>
    )
}

export default Projects;