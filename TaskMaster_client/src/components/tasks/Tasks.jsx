import './tasks.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {

    const [taskname, setTaskname] = useState('');
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    const [description, setDescription] = useState(''); // Estado para la descripción
    const [priority, setPriority] = useState('Media'); // Estado para la prioridad con un valor por defecto

    const [dueDate, setDueDate] = useState(''); // Estado para la fecha de entrega

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(
                    'https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/projects',
                    {
                        headers: {
                            'x-auth-token': token
                        }
                    }
                );

                console.log(response.data);
                setProjects(response.data.projects || []);
            } catch (error) {
                console.error('Error obteniendo los proyectos:', error);
            }
        };

        fetchProjects();
    }, []);


    const handleCreateTask = async () => {
        try {
            const token = localStorage.getItem('authToken'); // Suponiendo que el token se almacena en localStorage
            console.log("INFORMACION DE FECHA", dueDate);


            const response = await axios.post(
                'https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/tasks',
                { taskname, description, priority, dueDate, projectId: selectedProjectId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': token // Enviando el token
                    }
                }
            );

            // Si la tarea se crea con éxito, muestra el mensaje
            setSuccessMessage('Tarea creada con éxito');
            setTaskname(''); // Limpiar el campo de la tarea
            setDescription(''); // Limpiar el campo de la descripción
            setPriority('Media'); // Reiniciar la prioridad al valor por defecto
            setSelectedProjectId(''); // Limpiar la selección del proyecto

            // Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

            console.log('Tarea creada:', response.data);
        } catch (error) {
            console.error('Error creando la tarea:', error);
        }
    };

    return (
        <div>
            <h1>  PAGINA CREAR LA TAREA</h1>
            {successMessage && <p>{successMessage}</p>} {/* Mostrar el mensaje de éxito */}

            <form onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }}>
                <div>
                    <label>Nombre de la Tarea:</label>
                    <input
                        type="text"
                        value={taskname}
                        onChange={(e) => setTaskname(e.target.value)}
                    />
                </div>


                <div>
                    <label>Descripción:</label> {/* Nuevo campo para la descripción */}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label>Prioridad:</label> {/* Nuevo campo para la prioridad */}
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>
                </div>

                <div>
                    <label>Fecha de Entrega:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>




                <div>
                    <label>Seleccionar Proyecto:</label>
                    <select
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un proyecto</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project._id}>
                                {project.projname}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Crear Tarea</button>

            </form>
        </div>
    )
}

export default Tasks;