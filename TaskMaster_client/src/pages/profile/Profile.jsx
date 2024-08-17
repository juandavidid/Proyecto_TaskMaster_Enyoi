import './profile.css'
import axios from 'axios';

//Importar componentes
import Navbar from '../../components/navbar/Navbar';

import { useEffect, useState } from 'react';

const Profile = () => {
    const [userData, setUserData] = useState(null);

    const [loading, setLoading] = useState(true); // Estado de carga

    const [error, setError] = useState(null);


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

    console.log("Informacio de Usuario", userData);


    if (loading) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtiene la información
    }

    if (error) {
        return <p>Error al cargar la información del usuario.</p>;
    }





    return (
        <div className="container">
            <Navbar />
            <h1>PAGINA Administrar tu informacion personal</h1>

            <h2>Foto de Perfil e Imagen de Encabezado</h2>
            <div className="containerProfilePhoto">
                <h2> Mostra contenido</h2>
            </div>

            <h2>Acerta de ti</h2>
            <div className="containerProfilePhoto">
                <h2> Mostra contenido</h2>
                <p> Nombre : {userData?.user.nameuser || "Información no disponible"} </p>
                <p> Nombre : {userData?.user.email || "Información no disponible"} </p>


            </div>
        </div>
    )
}

export default Profile;
