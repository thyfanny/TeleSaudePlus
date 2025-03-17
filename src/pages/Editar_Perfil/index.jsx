import { useNavigate } from 'react-router-dom';
import fotoPerfil from '../../assets/foto-perfil.jpg';
import './style.css';
//import api from '../../services/api';

function Editar_Perfil() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para salvar as alterações
        navigate('/');
    }

    const handleVoltar = () => {
        navigate('/Main');
    };

    const handleSair = () => {
        navigate('/');
    };

    return (
        <div className="editar-perfil-container">
            <div className="perfil-header">
                <div className="foto-container">
                    <img src={fotoPerfil} alt="Foto de Perfil" className="foto-perfil" />
                    <div className="editar-link">Editar</div>
                </div>
            </div>

            <form className="form-perfil" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Nome" 
                    className="input-perfil"
                />
                <input 
                    type="password" 
                    placeholder="Nova Senha" 
                    className="input-perfil"
                />
                <input 
                    type="password" 
                    placeholder="Confirmar Nova Senha" 
                    className="input-perfil"
                />
                
                <button type="button" className="salvar-button" onClick={handleVoltar}>
                    Salvar
                </button>

                <div className="botoes-navegacao">
                    <button type="button" className="btn-voltar" onClick={handleVoltar}>
                        Voltar
                    </button>
                    <button type="button" className="btn-sair" onClick={handleSair}>
                        Sair
                    </button>
                </div>
            </form>
        </div>
    );
}

//alterar horário de atendimento

export default Editar_Perfil;