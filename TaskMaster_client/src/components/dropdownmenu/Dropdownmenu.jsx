import './dropdownmenu.css'
import { useNavigate } from 'react-router-dom';

//Importan Contexto de React
import { useAuthContext } from '../../context/AuthContext';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Dropdownmenu = () => {

    const navigate = useNavigate();

    const handleItemClick = (path) => {
        navigate(path);
    };

    //CERRAR SESION
    const { logout } = useAuthContext();

    /*
    const handleProfile = () => {
        getUserInfo();
    }
        */
    const handleLogout = () => {
        // Eliminar el token del localStorage o cookies
        logout()
    };
    return (
        <div className="menu">
            <ul className="iconologoUsuario">
                <li  ><span ><FontAwesomeIcon icon={faSliders} className="iconUser" />Consola del administrador</span></li>
                <li  ><FontAwesomeIcon icon={faPlus} className="iconUser" /><span >Nuevo espacion de trabajo</span></li>
                <hr />
                <li onClick={() => handleItemClick('/profile')} ><FontAwesomeIcon icon={faUser} className="iconUser" /><span >Perfil</span></li>
                <li  ><FontAwesomeIcon icon={faPlus} className="iconUser" /><span >Agregar otra cuenta</span></li>
                <hr />
                <li onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className="iconUser" /><span  >Cerrar Sesion</span></li>
            </ul>

        </div>
    )
}

export default Dropdownmenu;