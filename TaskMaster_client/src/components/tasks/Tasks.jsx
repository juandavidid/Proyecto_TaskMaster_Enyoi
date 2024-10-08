import './tasks.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {

    const [taskname, setTaskname] = useState('');
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

    const [description, setDescription] = useState(''); // Estado para la descripción
    const [priority, setPriority] = useState('Media'); // Estado para la prioridad con un valor por defecto

    const [dueDate, setDueDate] = useState(''); // Estado para la fecha de entrega
    const navigate = useNavigate();

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

            // Redirigir a la página de inicio después de unos segundos
            setTimeout(() => {
                navigate('/home');  // Ajusta la ruta a la que deseas redirigir
            }, 2000);  // 2 segundos de espera antes de redirigir

            console.log('Tarea creada:', response.data);
        } catch (error) {
            console.error('Error creando la tarea:', error);
        }
    };

    return (
        <div className="containerTask">


            <form className="formTask" onSubmit={(e) => { e.preventDefault(); handleCreateTask(); }}>

                <div>

                    <label className="labelTask">Nombre de la Tarea:</label>
                    <input

                        className="inputTask"
                        type="text"
                        value={taskname}
                        onChange={(e) => setTaskname(e.target.value)}
                    />

                </div>


                <div>

                    <label className="labelTask">Descripción:</label> {/* Nuevo campo para la descripción */}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                </div>

                <div>

                    <label className="labelTask">Prioridad:</label> {/* Nuevo campo para la prioridad */}
                    <select
                        className="selecTask"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Alta">Alta</option>
                        <option value="Media">Media</option>
                        <option value="Baja">Baja</option>
                    </select>

                </div>

                <div>

                    <label className="labelTask">Fecha de Entrega:</label>

                    <input
                        className="inputTask"
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />

                </div>




                <div>

                    <label className="labelTask">Seleccionar Proyecto:</label>
                    <select
                        className="selecTask"
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

                <button className="buttonTask" type="submit">Crear Tarea</button>

            </form>

            {successMessage && <p className="pTask">{successMessage}</p>} {/* Mostrar el mensaje de éxito */}

        </div>
    )
}

export default Tasks;