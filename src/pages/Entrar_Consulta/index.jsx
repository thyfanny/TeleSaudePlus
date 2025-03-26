import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoRoom } from "../../components/VideoRoom";
import './style.css';

const APP_ID= '0bd5051c48e94ca799ad873e186a761e';
const TOKEN= '0060bd5051c48e94ca799ad873e186a761eIAAQBTZs2CpCzj2lY2w8lpqQLETqwYeLorRs6v74VJEuBA9JtOYh39v0IgCXtiH/kKzkZwQAAQAgaeNnAgAgaeNnAwAgaeNnBAAgaeNn';
const CHANNEL= 'teste';


function Entrar_Consulta () {
    const navigate = useNavigate();
    const out = useState(false);
    const [joined, setJoined] = useState(false);

    const handleSair = () => {
        navigate("/consultas");
      };

    return(
        <div className="entrar-containder">
            <h1>Iniciar Consulta</h1>

            {!joined && (
                <button className="entrar-button" onClick={() => setJoined(true)}>
                    Entrar
                </button>) ||
                (<button className="sair-button" onClick={handleSair}>
                    Sair
                </button>)
                }
            {joined && (
                <VideoRoom />
            )}

        </div>
    )
    
}

export default Entrar_Consulta;