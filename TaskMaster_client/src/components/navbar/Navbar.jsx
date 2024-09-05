import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';


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
            <div className="containerIconoMenu">
                <FontAwesomeIcon className="iconMenu" icon={faBars} />
                <div className="ContainerCreate">

                    <div className="iconoMas">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <span className="wordCreate" onClick={HandleClickTaskProj} >Crear</span>
                </div>
                {isOpenTaskProj && (<TaskProjMenu />)}

            </div>

            <div className="iconologoflecha">
                {/*ICONO DE USUARIO */}
                <div className="iconoUsuario" onClick={HandleClick} >
                    <FontAwesomeIcon className="iconUser" onClick={HandleClick} icon={faUser} />
                </div>
                <FontAwesomeIcon icon={faChevronDown} className="iconflechabajo" onClick={HandleClick} />

            </div>





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