import './home.css'
import Navbar from '../../components/navbar/Navbar';

import axios from 'axios';
import { useState, useEffect } from 'react';





const Home = () => {

    const [view, setView] = useState('inicio'); // Estado para la vista seleccionada
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const token = localStorage.getItem('authToken');


    // Simulación de obtener el nombre de usuario
    useEffect(() => {
        // Aquí deberías obtener el nombre de usuario desde el backend
        setUserName('Nombre de Usuario');
    }, []);

    // Cargar proyectos cuando se selecciona la vista de proyectos
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/projects`, {
                    headers: { 'x-auth-token': token }
                });
                console.log("LISTA DE PROYECTOS ", response);
                setProjects(response.data.projects || []);
            } catch (error) {
                console.error('Error al obtener proyectos:', error);
            }
        };

        if (view === 'proyectos' || view === 'tareas') {
            fetchProjects();
        }
    }, [view, token]);

    // Cargar tareas del proyecto seleccionado
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                console.log("ID PROYECTO", selectedProjectId)
                if (selectedProjectId) {
                    const response = await axios.get(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${selectedProjectId}`, {
                        headers: { 'x-auth-token': token }
                    });
                    console.log("LISTA DE TAREA ", response);
                    setTasks(response.data.tasks || []);
                }
            } catch (error) {
                console.error('Error al obtener tareas:', error);
            }
        };

        if (view === 'tareas' && selectedProjectId) {
            fetchTasks();
        }
    }, [view, selectedProjectId, token]);


    const renderContent = () => {
        switch (view) {
            case 'inicio':
                return <h3>Hola, {userName}</h3>;
            case 'tareas':
                return (
                    <div>
                        <h3>Selecciona un proyecto para ver sus tareas:</h3>
                        <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            <option value="">Selecciona un proyecto</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project._id}>
                                    {project.projname}
                                </option>
                            ))}
                        </select>

                        {selectedProjectId && (
                            <div>
                                {console.log('ID del Proyecto seleccionado antes de renderizar tareas:', selectedProjectId)} {/* Verificar el ID */}
                                <h3>Tareas del Proyecto</h3>
                                <ul>
                                    {console.log("Informacion de ", tasks)}
                                    {tasks.map(task => (
                                        console.log(task),
                                        <li key={task._id}>{task.taskname}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case 'proyectos':
                return (
                    <div>
                        <h3>Proyectos</h3>
                        <ul>
                            {projects.map(project => (
                                <li key={project._id}>{project.projname}</li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };


    return (
        <div>
            <Navbar />
            <h1>PAGINA PRINCIPAL DEL GESTOR DE TAREAS</h1>

            <div className="ContainerPrincipal">


                <div className="listElements">
                    <h2 >Contenedor de elementos</h2>
                    <span onClick={() => setView('inicio')}>Inicio</span>
                    <span onClick={() => setView('tareas')}>Tareas</span>
                    <span onClick={() => setView('proyectos')}>Proyectos</span>
                </div>

                <div className="ContainerInformation">
                    <h2 style={{ textAlign: 'center' }}>Contenedor de Informacion</h2>
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default Home;