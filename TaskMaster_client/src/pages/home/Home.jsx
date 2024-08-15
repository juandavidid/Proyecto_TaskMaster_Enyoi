import './home.css'

//Importan Contexto de React
import { useAuthContext } from '../../context/AuthContext';


const Home = () => {
    const { logout } = useAuthContext();

    const handleLogout = () => {
        // Eliminar el token del localStorage o cookies
        logout()
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