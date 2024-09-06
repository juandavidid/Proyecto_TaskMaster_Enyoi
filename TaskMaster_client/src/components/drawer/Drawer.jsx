import { useState, useEffect } from 'react';
import './drawer.css'; // Asegúrate de crear y configurar este archivo CSS
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';



//import moment from 'moment-timezone';
//import 'moment/locale/es'; // Importa el idioma español
//import { format, parseISO } from 'date-fns';
//import { es } from 'date-fns/locale';


const Drawer = ({ isOpen, onClose, selectedTask, onSaveTaskName, onSaveTaskState, onDeleteTask, showSuccessMessage, setShowSuccessMessage }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTaskName, setNewTaskName] = useState(selectedTask?.taskname || '');
    const [taskStatus, setTaskStatus] = useState(selectedTask?.state || 'Pendiente'); // Nuevo estado

    // Sincroniza los estados locales con la tarea seleccionada
    useEffect(() => {
        setNewTaskName(selectedTask?.taskname || '');
        setTaskStatus(selectedTask?.state || 'Pendiente');
    }, [selectedTask]);

    const handleSaveTaskName = () => {
        if (newTaskName !== selectedTask.taskname) {
            onSaveTaskName(selectedTask._id, newTaskName);
        }
        setIsEditing(false);
    };

    const handleSaveTaskState = () => {
        if (taskStatus !== selectedTask.state) {
            onSaveTaskState(selectedTask._id, taskStatus);
        }
    };

    const fechaFormateada = selectedTask?.dueDate
        ? new Intl.DateTimeFormat('es-ES', {
            timeZone: 'America/Bogota',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(new Date(selectedTask.dueDate))
        : 'Fecha no disponible';





    /*
    const fechaFormateada = selectedTask?.dueDate
        ? moment.tz(selectedTask.dueDate, 'America/Bogota').format('D [de] MMMM YYYY')
        : 'Fecha no disponible';
    */


    return (
        <div className={`drawer ${isOpen ? 'open' : ''}`}>

            <button className="btnClosed" onClick={onClose}><FontAwesomeIcon icon={faRightFromBracket} /></button>
            <hr className="lineDetalles" />
            {selectedTask ? (
                <div>


                    {isEditing ? (
                        <div className="edit-container">
                            <input
                                type="text"
                                value={newTaskName}
                                onChange={(e) => setNewTaskName(e.target.value)}
                                autoFocus
                            />
                            <button className="save-button" onClick={handleSaveTaskName}>✔</button>
                            <button className="cancel-button" onClick={() => setIsEditing(false)}>Cancelar</button>
                        </div>
                    ) : (
                        <div className="view-container">
                            <span onClick={() => setIsEditing(true)} className="nameTask">{selectedTask.taskname}</span>

                        </div>
                    )}

                    <div className="task-details">
                        <p><strong className="textdetails">Fecha de Entrega:</strong>     <span className="variable">{fechaFormateada}</span>         </p>
                        <p ><strong className="textdetailsProjecto">Proyecto:</strong> <span className="variable">{selectedTask.projectName}</span></p>
                        <p><strong className="textdetailsPrioridad">Prioridad:</strong> <span className="variable">{selectedTask.priority}</span></p>
                        <label className="textdetailsEstado">
                            <strong>Estado:</strong>
                        </label>
                        <select
                            className="selectEstado"

                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            onBlur={handleSaveTaskState}
                        >
                            <option className="optionEstado" value="Pendiente">Pendiente</option>
                            <option className="optionEstado" value="En progreso">En progreso</option>
                            <option className="optionEstado" value="Completado">Completado</option>
                        </select>


                        <p><strong className="textDescripcion">Descripción:</strong> </p>
                        <p className="parrafo">{selectedTask.description}</p>




                    </div>
                    <hr className="lineDetallesDos" />

                    <div className="btnEliminar">
                        <button className="btnElim" onClick={onDeleteTask}>Eliminar</button>

                    </div>


                </div>
            ) : (
                <p>No hay tarea seleccionada</p>
            )
            }
            {
                showSuccessMessage && (
                    <div className="successMessage">
                        <p>Tarea modificada con éxito</p>
                        <button onClick={() => setShowSuccessMessage(false)}>Aceptar</button>
                    </div>
                )
            }
        </div >
    );
};

// Agrega las validaciones de PropTypes
Drawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    selectedTask: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        taskname: PropTypes.string,
        projectName: PropTypes.string, // Asegúrate de que estos campos estén en el objeto
        priority: PropTypes.string,
        description: PropTypes.string,
        state: PropTypes.string, // Nuevo campo para el estado de la tarea
        dueDate: PropTypes.string,
        createDate: PropTypes.string

    }),
    onSaveTaskName: PropTypes.func.isRequired,
    onSaveTaskState: PropTypes.func.isRequired,
    onSaveTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired,
    showSuccessMessage: PropTypes.bool.isRequired,
    setShowSuccessMessage: PropTypes.func.isRequired,
};

export default Drawer;


