import './taskprojmenu.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faListCheck } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

const TaskProjMenu = () => {
    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
    };


    return (
        <div className="menutaskProj">


            <ul className="menuTaskProject">


                <li onClick={() => handleItemClick('/task')} ><FontAwesomeIcon icon={faCircleCheck} className="icon" /><span className="textTarea">Tarea</span></li>
                <li onClick={() => handleItemClick('/projects')}><FontAwesomeIcon icon={faListCheck} className="icon" />Projecto</li>
                <li><FontAwesomeIcon icon={faMessage} className="icon" />Mensaje</li>
                <li><FontAwesomeIcon icon={faFolder} className="icon" />Portafolio</li>

            </ul>

        </div>
    )
}

export default TaskProjMenu;