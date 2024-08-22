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
                const response = await axios.get('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users/Information', config);

                const userId = response.data.user._id;

                // Obtener la imagen de perfil del usuario
                const photoResponse = await axios.get(`https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users/profile/photo/${userId}`, {
                    responseType: 'arraybuffer', // Asegurarse de recibir los datos como arraybuffer
                    headers: {
                        'x-auth-token': token,
                    },
                });

                const base64Image = arrayBufferToBase64(photoResponse.data);
                const profilePhotoType = photoResponse.headers['content-type'];

                // Verifica los datos del perfil de usuario
                console.log('profilePhotoType:', response.data.user.profilePhotoType);
                console.log('profilePhoto:', response.data.user.profilePhoto);


                // Manejar la respuesta
                console.log('Información del usuario:', response.data);
                //setUserData(response.data);
                setUserData({
                    ...response.data,
                    user: {
                        ...response.data.user,
                        profilePhoto: base64Image,
                        profilePhotoType: profilePhotoType,
                    },
                });
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

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

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
            const response = await axios.put('https://proyecto-taskmaster-enyoi-app-servidor.onrender.com/api/users/update-name', { nameuser: newName }, config);
            setUserData({ ...userData, user: { ...userData.user, nameuser: newName } });
            setIsEditingName(false);
        } catch (error) {
            console.error('Error al actualizar el nombre del usuario:', error);
            setError(error);
        }
    };





    console.log("Informacio de Usuario", userData);

    const handleClick = () => {
        setOpenphoto(true);
    }

    const handleClosePhoto = () => {
        setOpenphoto(false);
        // Optionally, refresh user data to get the updated image
        // getUserInfo();
    };





    if (loading) {
        return <p>Cargando...</p>; // Mostrar un mensaje de carga mientras se obtiene la información
    }

    if (error) {
        return <p>Error al cargar la información del usuario.</p>;
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
                {userData?.user.profilePhoto ? (
                    <img
                        src={`data:${userData.user.profilePhotoType};base64,${userData.user.profilePhoto}`}
                        alt="Perfil"
                    />
                ) : (
                    <p>No se ha cargado la imagen de perfil.</p>
                )}
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

            {Openphoto && <Profilephoto userId={userData?.user._id} onClose={handleClosePhoto} />}
        </div>
    )
}

export default Profile;
