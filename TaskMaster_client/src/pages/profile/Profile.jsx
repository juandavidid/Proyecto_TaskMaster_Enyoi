import './profile.css'
import axios from 'axios';

//Importar componentes
import Navbar from '../../components/navbar/Navbar';
import Profilephoto from '../../components/profilephoto/Profilephoto';

import { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null);

    const [Openphoto, setOpenphoto] = useState(false);

    //Estudiar parte del codigo 

    const [isEditingName, setIsEditingName] = useState(false);
    const [newName, setNewName] = useState('');


    useEffect(() => {
        // Función para obtener la información del usuario
        const getUserInfo = async () => {
            const token = localStorage.getItem('authToken'); // Recuperar el token de localStorage
            console.log("Informacion del token desde Login", token);
            // Configurar el encabezado de autorización con el token
            const config = {
                headers: {
                    'x-auth-token': `${token}`
                }
            };

            try {
                // Hacer la petición GET al servidor
                const response = await axios.get('http://localhost:4000/api/users/Information', config);
                // Manejar la respuesta
                console.log('Información del usuario:', response.data);
                setUserData(response.data);
                setNewName(response.data?.user.nameuser); // Inicializar con el nombre actual
            } catch (error) {
                // Manejar errores
                console.error('Error al obtener la información del usuario:', error);
                throw error;
            } finally {
                setLoading(false); // Finalizar el estado de carga
            }


        };
        console.log("CADA VEZ QUE SE EJECUTE USEEFFECT() ")

        // Llamar a la función para obtener la información del usuario
        getUserInfo();


    }, [])

    //Estudiar parte de este codigo
    const handleNameClick = () => {
        setIsEditingName(true);
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNameSubmit = async () => {
        const token = localStorage.getItem('authToken');
        const config = {
            headers: {
                'x-auth-token': `${token}`
            }
        };

        try {
            const response = await axios.put('http://localhost:4000/api/users/update-name', { nameuser: newName }, config);
            setUserData({ ...userData, user: { ...userData.user, nameuser: newName } });
            setIsEditingName(false);
        } catch (error) {
            console.error('Error al actualizar el nombre del usuario:', error);
            setError(error);
        }
    };





    console.log("Informacio de Usuario", userData);


    if (loading) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtiene la información
    }

    if (error) {
        return <p>Error al cargar la información del usuario.</p>;
    }

    const handleClick = () => {
        setOpenphoto(true);
    }

    return (
        <div className="container">
            {/* Pasando showSecurity como true para mostrar "Seguridad" */}
            <Navbar showSecurity={true} />
            <h1>PAGINA Administrar tu informacion personal</h1>
            <h2>Foto de Perfil e Imagen de Encabezado</h2>
            <div className="containerProfilePhoto">
                <h2> Mostra contenido</h2>
                <h1> Foto de perfil Usuario  </h1>
                <button onClick={handleClick}>Agregar imagen</button>
            </div>
            <h2>Acerta de ti</h2>
            <div className="containerProfilePhoto">
                <h2> Mostra contenido</h2>
                {/* <p>  Nombre : {userData?.user.nameuser || "Información no disponible"} </p>*/}
                <p>Nombre:
                    {isEditingName ? (
                        <>
                            <input
                                type="text"
                                value={newName}
                                onChange={handleNameChange}
                            />
                            <button onClick={handleNameSubmit}>✔</button>
                        </>
                    ) : (
                        <span onClick={handleNameClick}>{userData?.user.nameuser || "Información no disponible"}</span>
                    )}
                </p>




                <p> Nombre : {userData?.user.email || "Información no disponible"} </p>


            </div>

            {Openphoto && <Profilephoto />}
        </div>
    )
}

export default Profile;
