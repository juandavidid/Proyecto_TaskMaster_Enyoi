import { BrowserRouter, Routes, Route } from "react-router-dom";

//IMPORTAMOS LAS RUTAS
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Passrequestreset from "./pages/login/passrequestreset/Passrequestreset";
import ResetPassword from './components/ResetPassword';
import Profile from './pages/profile/Profile';
import ChangePassword from './components/changePassword/ChangePassword';
import Projects from "./components/projects/Projects";

import { Navigate } from 'react-router-dom';

import ProtectedRoute from "./components/protectedroute/ProtectedRoute";

function App() {


  return (

    //Componente que permite Envolver todo una sola pagina
    <BrowserRouter>
      <Routes>

        {/*RUTA DE INICIAL  */}

        <Route path="/" element={<Navigate to="/login" />} />


        {/*RUTA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/*RUTA PAGINA PRINCIPAL */}


        <Route
          path="/home"
          element={

            <ProtectedRoute>
              <Home />

            </ProtectedRoute>


          }
        />


        {/*RUTA DE REGISTRO */}
        <Route path="/register" element={<Register />} />



        {/*RUTA DE PARA GESTIONAR RETABLECER CONTRASEÑA */}
        <Route path="/Passrequestreset" element={<Passrequestreset />} />

        {/*RUTA PARA RESTAURA CONTRASEÑA CONFIGURADA PARA ACEPTAR PARAMETROS */}
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

        {/*RUTA DE CONFIGURACION DE PERFIL */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/*RUTA DE CONFIGURACION DE PERFIL CAMBIO CONTRASEÑA */}
        <Route path="/changePassword" element={<ProtectedRoute><ChangePassword /> </ProtectedRoute>} />

        {/*RUTA PARA CREAR PROYECTO */}
        <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />



      </Routes>
    </BrowserRouter>

  )
}

export default App
