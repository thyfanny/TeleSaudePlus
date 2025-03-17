import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoRoom } from "../../components/VideoRoom";

const APP_ID= '0bd5051c48e94ca799ad873e186a761e';
const TOKEN= '0060bd5051c48e94ca799ad873e186a761eIACLwyMtmfQqlcjqzExiLgO1hKjar66v+6uQKzy/Hebi8A9JtOYh39v0IgCjzfJi6dHZZwQAAQB5jthnAgB5jthnAwB5jthnBAB5jthn';
const CHANNEL= 'teste';


function Entrar_Consulta () {
    const [joined, setJoined] = useState(false);

    return(
        <div>
            <h1>Iniciar Consulta</h1>

            {!joined && (
                <button onClick={() => setJoined(true)}>
                    Entrar
                </button>)}
            {joined && (
                <VideoRoom />
            )}
        </div>
    )
    
}

export default Entrar_Consulta;