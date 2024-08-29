import { useState } from 'react';
import './drawer.css'; // Asegúrate de crear y configurar este archivo CSS
import PropTypes from 'prop-types';


const Drawer = ({ isOpen, onClose, selectedTask, onSaveTask, onDeleteTask, showSuccessMessage, setShowSuccessMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskName, setNewTaskName] = useState(selectedTask?.taskname || '');
    const [taskStatus, setTaskStatus] = useState(selectedTask?.state || 'Pendiente'); // Nuevo estado

    console.log("Estado de la tarea", taskStatus)

    const handleSave = () => {
        const updatedTask = {
            ...selectedTask,
            taskname: newTaskName,
            state: taskStatus, // Guardar el estado seleccionado
        };
        onSaveTask(updatedTask);
        setIsEditing(false);
        setShowSuccessMessage(true); // Mostrar mensaje de éxito al guardar
    };




    return (

        <div className={`drawer ${isOpen ? 'open' : ''}`}>

            <button onClick={onClose}>Cerrar</button>

            {selectedTask ? (
                <div>
                    <h2>Tarea:</h2>
                    {isEditing ? (
                        <div className="edit-container">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                autoFocus
                            />
                            {console.log("Estado de la tarea", taskStatus)}



                            <button className="save-button" onClick={handleSave}>✔</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div className="view-container">

                            <span onClick={() => setIsEditing(true)}>{selectedTask.taskname}</span>

                            <button onClick={onDeleteTask}>Eliminar</button>
                        </div>
                    )}
                    <div className="task-details">
                        <p><strong>Proyecto:</strong> {selectedTask.projectName}</p>
                        <p><strong>Prioridad:</strong> {selectedTask.priority}</p>
                        <p><strong>Descripción:</strong> {selectedTask.description}</p>
                        <label>
                            Estado:
                            <select

                                value={taskStatus}
                                onChange={(e) => setTaskStatus(e.target.value)}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="En progreso">En progreso</option>
                                <option value="Completado">Completado</option>
                            </select>
                        </label>

                    </div>


                </div>
            ) : (
                <p>No hay tarea seleccionada</p>
            )}



            {showSuccessMessage && (
                <div className="successMessage">
                    <p>Tarea modificada con éxito</p>
                    <button onClick={() => setShowSuccessMessage(false)}>Aceptar</button>
                </div>
            )}

        </div>
    );
};

// Agrega las validaciones de PropTypes
Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedTask: PropTypes.shape({
        taskname: PropTypes.string,
        projectName: PropTypes.string, // Asegúrate de que estos campos estén en el objeto
        priority: PropTypes.string,
        description: PropTypes.string,
        state: PropTypes.string, // Nuevo campo para el estado de la tarea
    }),
    onSaveTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    showSuccessMessage: PropTypes.bool.isRequired,
    setShowSuccessMessage: PropTypes.func.isRequired,
};

export default Drawer;


