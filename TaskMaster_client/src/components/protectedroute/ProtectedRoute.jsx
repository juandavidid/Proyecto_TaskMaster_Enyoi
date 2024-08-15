import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../../context/AuthContext'


// Componente de React lo llaman Ruta Protegida
function ProtectedRoute({ children }) {
    console.log("Informacion de Componentes Hijos rutas Protegidas", children)
    const { isAuthenticated, loading } = useAuthContext();
    console.log("Informacion del estado de la variable iniciar sesion", isAuthenticated)

    console.log("Estado de la carga", loading);
    if (loading) {
        // Puedes mostrar un spinner o mensaje de carga aquí
        return <div>Loading...</div>;
    }



    //Expresion ternaria
    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;