import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VideoRoom } from "../../components/VideoRoom";
import './style.css';

function Entrar_Consulta() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log("Estado recebido:", state);

    const [joined, setJoined] = useState(false);

    const handleSair = () => {
        setJoined(false); // Limpeza do estado de "joined"
        navigate("/consultas");
    };

    return (
        <div className="entrar-container">
            <h1>Iniciar Consulta</h1>

            {!joined ? (
                <button className="entrar-button" onClick={() => setJoined(true)}>
                    Entrar
                </button>
            ) : (
                <button className="sair-button" onClick={handleSair}>
                    Sair
                </button>
            )}

            {joined && state?.rtcToken && state?.channelName ? (
                <VideoRoom rtcToken={state.rtcToken} channelName={state.channelName} />
            ) : null}
        </div>
    );
}

export default Entrar_Consulta;
