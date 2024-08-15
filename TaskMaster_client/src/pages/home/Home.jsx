import './home.css'


import { useNavigate } from 'react-router-dom';



const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar el token del localStorage o cookies
        localStorage.removeItem('token'); // Si lo estás guardando en localStorage

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/login'); // Cambia '/login' por la ruta de tu página de inicio de sesión
    };



    return (
        <div>
            <nav className="navHome">
                <button onClick={handleLogout} >CERRAR SESION</button>

            </nav>
            <h1>PAGINA PRINCIPAL DEL GESTOR DE TAREAS</h1>

        </div>
    )
}

export default Home;