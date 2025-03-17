import React, { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { AgoraRTCProvider } from "agora-rtc-react";
import App from "./App";
import VideoCall from "./VideoCall";
import AgoraRTCClient from "../../AgoraRTCClient";

function Teste_entrar() {
  const rootElement = document.getElementById("root");
  const root = createRoot(rootElement);
  const navigate = useNavigate();

  const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });

  useEffect(() => {
    client.startBasicCall();
  }, []);

  const handleBackClick = () => {
    navigate("/consultas");
  };

  root.render(
    <StrictMode>
      <AgoraRTCProvider client={client}>
        <div>
          <VideoCall client={client} />
          <AgoraRTCClient />
          <App />
        </div>
        <button onClick={handleBackClick}>Voltar à página principal</button>
      </AgoraRTCProvider>
    </StrictMode>
  );
}

export default Teste_entrar;
