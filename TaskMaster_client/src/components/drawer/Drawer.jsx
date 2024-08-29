import { useState } from 'react';
import './Drawer.css'; // Asegúrate de crear y configurar este archivo CSS

/*
const Drawer = ({ isOpen, onClose, selectedTask, onSaveTask, onDeleteTask, showSuccessMessage, setShowSuccessMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskName, setNewTaskName] = useState(selectedTask?.taskname || '');

    const handleSave = () => {
        onSaveTask(newTaskName);
        setIsEditing(false);
    };
    return (

        <div className={`drawer ${isOpen ? 'open' : ''}`}>
            <button onClick={onClose}>Cerrar</button>
            {selectedTask ? (
                <>
                    <h2>{isEditing ? "Editar Tarea" : selectedTask.taskname}</h2>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                            />
                            <button onClick={handleSave}>Guardar</button>
                            <button onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => setIsEditing(true)}>Editar</button>
                            <button onClick={onDeleteTask}>Eliminar</button>
                        </div>
                    )}
                </>
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

export default Drawer;

*/

const Drawer = ({ isOpen, onClose, selectedTask, onSaveTask, onDeleteTask, showSuccessMessage, setShowSuccessMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskName, setNewTaskName] = useState(selectedTask?.taskname || '');

    const handleSave = () => {
        onSaveTask(newTaskName);
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
                            <button className="save-button" onClick={handleSave}>✔</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div className="view-container">
                            <span onClick={() => setIsEditing(true)}>{selectedTask.taskname}</span>

                            <button onClick={onDeleteTask}>Eliminar</button>
                        </div>
                    )}
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

export default Drawer;


