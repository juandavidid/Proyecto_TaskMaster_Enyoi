import './home.css'
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Drawer from '../../components/drawer/Drawer';



const Home = () => {

    const [view, setView] = useState('inicio'); // Estado para la vista seleccionada
    const [userName, setUserName] = useState('');
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const token = localStorage.getItem('authToken');



    const [selectedTask, setSelectedTask] = useState(null); // Estado para la tarea seleccionada
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    //const [isEditing, setIsEditing] = useState(false); // Estado para el modo de edición
    //const [newTaskName, setNewTaskName] = useState(''); // Estado para el nuevo nombre de la tarea

    const [showSuccessMessage, setShowSuccessMessage] = useState(false);


    // COMPONENTE DRAWER
    //const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };


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
                //console.log("LISTA DE PROYECTOS ", response);
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
                //console.log("ID PROYECTO", selectedProjectId)
                if (selectedProjectId) {
                    const response = await axios.get(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${selectedProjectId}`, {
                        headers: { 'x-auth-token': token }
                    });
                    //console.log("LISTA DE TAREA ", response);
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

    const handleSaveTaskName = async (taskId, newTaskName) => {
        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${taskId}`,
                { taskname: newTaskName },
                { headers: { 'x-auth-token': token } }
            );
            setTasks(tasks.map(t => t._id === taskId ? response.data : t));
            setSelectedTask(response.data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al actualizar el nombre de la tarea:", error);
        }
    };

    const handleSaveTaskState = async (taskId, newState) => {
        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${taskId}`,
                { state: newState },
                { headers: { 'x-auth-token': token } }
            );
            setTasks(tasks.map(t => t._id === taskId ? response.data : t));
            setSelectedTask(response.data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al actualizar el estado de la tarea:", error);
        }
    };







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
                                        <li key={task._id} onClick={() => {
                                            setSelectedTask({
                                                ...task,
                                                projectName: projects.find(p => p._id === task.projectId)?.projname || 'Sin proyecto',
                                                priority: task.priority || 'No especificada',
                                                description: task.description || 'Sin descripción',
                                                state: task.state || 'Sin estado' // Agregar el campo state aquí
                                            }
                                            ); toggleDrawer()
                                        }}>{task.taskname}</li>
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

    /*
    const handleSaveTask = async (newTaskName) => {
        const updatedTask = {
            ...selectedTask,
            taskname: newTaskName
        };

        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${selectedTask._id}`, updatedTask, {
                headers: { 'x-auth-token': token }
            });
            setTasks(tasks.map(t => t._id === selectedTask._id ? response.data : t));
            setSelectedTask(response.data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
    };
    */




    /*
    const handleSaveTask = async (updatedTask) => {
        console.log("INFORMACION ACTUALIZAR", updatedTask);
        // Validar que el nombre de la tarea no esté vacío
        if (!updatedTask.taskname.trim()) {
            console.error("El nombre de la tarea no puede estar vacío.");
            return; // Salir de la función si el nombre de la tarea está vacío
        }

        //console.log("Datos de la tarea a actualizar:", updatedTask); // Agregar esto para depurar

        // ESTA PARTE DEL CODIGO ESTA EN COMENTARIOS
        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${selectedTask._id}`, updatedTask, {
                headers: { 'x-auth-token': token }
            });
            setTasks(tasks.map(t => t._id === selectedTask._id ? response.data : t));
            setSelectedTask(response.data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }
        //-----------------------------------------------------------------------------------------------
        
        try {
            const response = await axios.put(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${updatedTask._id}`, updatedTask, {
                headers: { 'x-auth-token': token }
            });
            setTasks(tasks.map(t => t._id === updatedTask._id ? response.data : t));
            setSelectedTask(response.data);
            setShowSuccessMessage(true);
        } catch (error) {
            console.error("Error al actualizar la tarea:", error);
        }

    };
    */







    const handleDeleteTask = async () => {
        try {
            await axios.delete(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks/${selectedTask._id}`, {
                headers: { 'x-auth-token': token }
            });
            setTasks(tasks.filter(task => task._id !== selectedTask._id));
            setSelectedTask(null);
            toggleDrawer();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
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
                    {/* Other content... */}
                    {renderContent()}

                </div>

                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={toggleDrawer}
                    selectedTask={selectedTask}

                    onSaveTaskName={handleSaveTaskName}
                    onSaveTaskState={handleSaveTaskState}


                    onDeleteTask={handleDeleteTask}
                    showSuccessMessage={showSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}

                />

            </div>
        </div >
    )

}

export default Home;