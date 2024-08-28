import './taskprojmenu.css'

import { Link } from 'react-router-dom';

const TaskProjMenu = () => {
    return (
        <div className="menutaskProj">
            <ul>
                <Link to="/task" >
                    <li><span >Tarea</span></li>
                </Link>
                <Link to="/projects">
                    <li><span  >Projecto</span></li>
                </Link>

            </ul>

        </div>
    )
}

export default TaskProjMenu;