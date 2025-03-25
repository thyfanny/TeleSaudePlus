import { getMessaging, getToken } from "firebase/messaging";
import app from "./firebase";
import api from "../services/api";
// Função para obter o token do dispositivo
const messaging = getMessaging(app);
const sendTokenToServer = async (token) => {
    try {
      const id_usuario = localStorage.getItem("id"); 
      console.log("id do usuario",id_usuario);
      await api.post('/tokenFCM', { token,id_usuario });
      console.log("Token enviado para o servidor com sucesso");
    } catch (error) {
      console.error("Erro ao enviar o token para o servidor", error);
    }
  };
const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, { vapidKey: 'BAELTyWte_7EgcspDFzZp-YIWydncYMewjG0P1eX9r-QdSvPxc-esGnOVqZp6dPHTG7FA4ukJply4w8siaAjKMg' });
      console.log("Token de FCM:", token);
      await sendTokenToServer(token);
      // Você pode enviar esse token para o servidor para enviar notificações
    }
  } catch (error) {
    console.error("Erro ao obter permissão ou token", error);
  }
};
export  {messaging,requestPermission};

