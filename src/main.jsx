import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/index.jsx";
import Login from "./pages/Login/index.jsx";
import Main from "./pages/Main/index.jsx";
import Consultas from "./pages/Consultas/index.jsx";
import Editar_Perfil from "./pages/Editar_Perfil/index.jsx";
import Historico from "./pages/Historico/index.jsx";
import Token from "./pages/Token/index.jsx";
import Cadastro from "./pages/Cadastro/index.jsx";
import Editar_Horario from "./pages/Editar_Horario/index.jsx";
import Entrar_Consulta from "./pages/Entrar_Consulta/index.jsx";
import { onMessage } from "firebase/messaging";
import {messaging} from './middlewares/notificacoes.js'

onMessage(messaging, (payload) => {
  console.log("Mensagem recebida em primeiro plano:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    
  };
  new Notification(notificationTitle, notificationOptions);
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/consultas" element={<Consultas />} />
        <Route path="/editar-perfil" element={<Editar_Perfil />} />
        <Route path="/historico" element={<Historico />} />
        <Route path="/token" element={<Token />} />
        <Route path="/editar-horario" element={<Editar_Horario />} />
        <Route path="/entrar" element={<Entrar_Consulta />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
