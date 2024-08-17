import './dropdownmenu.css'

//Importan Contexto de React
import { useAuthContext } from '../../context/AuthContext';

import { Link } from 'react-router-dom';

const Dropdownmenu = () => {

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
            <ul>
                <Link to="/profile">
                    <li><span >Configuracion de la cuenta</span></li>
                </Link>

                <li><span onClick={handleLogout} >Cerrar Sesion</span></li>

            </ul>

        </div>
    )
}

export default Dropdownmenu;