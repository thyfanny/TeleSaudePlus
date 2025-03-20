import { useNavigate } from 'react-router-dom';
import videoIcon from '../../assets/video-icon.png';
import folderIcon from '../../assets/folder-icon.png';  
import fotoPerfil from '../../assets/foto-perfil.jpg';
import agendaIcon from '../../assets/agenda-icon.png';
import './style.css';

function Main() {
    const navigate = useNavigate();

    const handleVisualizarClick = () => {
        navigate('/consultas');
    };

    const handleEditarPerfil = () => {
        navigate('/editar-perfil');
    };

    const handleHistoricoClick = () => {
        navigate('/historico');
    };

    const handleEditarHorarioClick = () => {
        navigate('/editar-horario');
    };

    return (
        <div className="main-container">
            
            <div className="profile-photo" onClick={handleEditarPerfil}>
                <img src={fotoPerfil} alt="Perfil" />
            </div>

            <div className="cards-container">
                <div className="card" onClick={handleVisualizarClick}>
                    <div className="card-icon blue">
                        <img src={videoIcon} alt="Visualizar" className="icon-image" />
                    </div>
                    <span>Visualizar Consultas</span>
                </div>

                <div className="card" onClick={handleHistoricoClick}>
                    <div className="card-icon yellow">
                        <img src={folderIcon} alt="Histórico" className="icon-image" />
                    </div>
                    <span>Histórico de consultas</span>
                </div>

                <div className="card" onClick={handleEditarHorarioClick}>
                    <div className="card-icon horario">
                        <img src={agendaIcon} alt="Histórico" className="icon-image" />
                    </div>
                    <span>Horários</span>
                </div>

            </div>
        </div>
    );
}

export default Main;
