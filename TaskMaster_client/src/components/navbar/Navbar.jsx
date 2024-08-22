import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

//Importar Componentes
import Dropdownmenu from '../dropdownmenu/Dropdownmenu';
import TaskProjMenu from '../TaskProjMenu/TaskProjMenu';
//Importamos Hook
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ showSecurity }) => {

    //Inicializamos Hook
    const [isOpen, setIsOpen] = useState(false)

    const [isOpenTaskProj, setIsOpenTaskProj] = useState(false);

    const HandleClick = () => {
        setIsOpen(!isOpen);
    }

    const HandleClickTaskProj = () => {
        setIsOpenTaskProj(!isOpenTaskProj);
    }

    return (
        <div className="navIcon">

            <div className="ContainerCreate">
                <span onClick={HandleClickTaskProj} >Crear</span>
            </div>
            {isOpenTaskProj && (<TaskProjMenu />)}

            {/*ICONO DE USUARIO */}
            <FontAwesomeIcon className="iconUser" onClick={HandleClick} icon={faUser} />

            {isOpen && (
                <Dropdownmenu />
            )}

            {showSecurity && (
                <div className="security-option">
                    <Link to="/changePassword">
                        <span>Seguridad</span>
                    </Link>

                </div>
            )}


        </div>
    )
}

export default Navbar;