import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';




//Importar Componentes
import Dropdownmenu from '../dropdownmenu/Dropdownmenu';
//Importamos Hook
import { useState } from 'react';


const Navbar = () => {

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


        </div>
    )
}

export default Navbar;