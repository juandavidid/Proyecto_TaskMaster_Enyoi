import { BrowserRouter, Routes, Route } from "react-router-dom";

//IMPORTAMOS LAS RUTAS
import Home from './pages/home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Passrequestreset from "./pages/login/passrequestreset/Passrequestreset";
import ResetPassword from './components/ResetPassword';

function App() {


  return (

    //Componente que permite Envolver todo una sola pagina
    <BrowserRouter>
      <Routes>
        {/*RUTA DE INICIAL  */}
        <Route path="/" element={<Home />} />

        {/*RUTA DE REGISTRO */}
        <Route path="/register" element={<Register />} />

        {/*RUTA DE LOGIN */}
        <Route path="/login" element={<Login />} />

        {/*RUTA DE PARA GESTIONAR RETABLECER CONTRASEÑA */}
        <Route path="/Passrequestreset" element={<Passrequestreset />} />

        {/*RUTA PARA RESTAURA CONTRASEÑA CONFIGURADA PARA ACEPTAR PARAMETROS */}
        <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />


      </Routes>
    </BrowserRouter>

  )
}

export default App
