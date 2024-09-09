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

        </div>
    )
}

export default Projects;