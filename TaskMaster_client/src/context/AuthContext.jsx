import { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto

/**
 * Este contexto se utilizará para compartir el estado de autenticación 
 * (si un usuario está autenticado o no) y las funciones relacionadas con la autenticación
 *  (login y logout) entre componentes.
 * 
 */
const AuthContext = createContext();


// Crear un proveedor de contexto para envolver tu aplicación

export function AuthProvider({ children }) {



    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial

    const [token, setToken] = useState(null);


    console.log("Estado de Authenticacion", isAuthenticated);

    useEffect(() => {

        console.log("se activo el useEffect() ")

        // Aquí podrías comprobar si el usuario tiene un token almacenado en localStorage o cookies
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        setLoading(false); // Finalizar la carga una vez verificado el token

    }, []);


    const login = (token) => {

        // Aquí guardarías el token en localStorage o cookies
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        setToken(token);
    };

    console.log("Funcion login", login)


    const logout = () => {
        // Elimina el token al cerrar sesión
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
    };


    console.log("Fuinciones", logout);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, token }}>
            {children}
        </AuthContext.Provider>
    );
}


// Crear un hook para utilizar el contexto más fácilmente
export function useAuthContext() {
    return useContext(AuthContext);
}


