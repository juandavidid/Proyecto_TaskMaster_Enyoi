import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';




//Importar Componentes
import Dropdownmenu from '../dropdownmenu/Dropdownmenu';
//Importamos Hook
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ showSecurity }) => {

    //Inicializamos Hook
    const [isOpen, setIsOpen] = useState(false)

    const HandleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="navIcon">

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