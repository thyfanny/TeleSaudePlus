import { useNavigate } from 'react-router-dom';
import './style.css';
import api from '../../services/api';
import { useState,useEffect } from 'react';

function Consultas() {
    const medicoId = localStorage.getItem("medicoId");
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [consultas, setConsultas] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [motivoCancelamento, setMotivoCancelamento] = useState('');
    const [showMotivoModal, setShowMotivoModal] = useState(false);

    const handleVoltar = () => {
        navigate('/Main');
    };

    const handleEntrar = (consulta) => {
        navigate('/entrar', {
            state: {
                rtcToken: consulta.rtc_token,
                channelName: `consulta_${consulta.id}`,
            },
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('pt-BR');
    };

    const formatDateForComparison = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handlePreviousDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            return newDate;
        });
    };

    const handleNextDay = () => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        });
    };
    useEffect(()=>{
        async function getConsultas(){
            const response = await api.get(`/medicos/consultas/${medicoId}`);
            console.log(response.data);
            setConsultas(response.data);
        }
        getConsultas();
    },[medicoId]);

    const filteredConsultas = consultas.filter(consulta => {
        const dataConsulta = new Date(consulta.horario_inicio);
        return formatDateForComparison(dataConsulta) === formatDateForComparison(currentDate);
    });
    

    const handleCancelar = (consulta) => {
        setSelectedConsulta(consulta);
        setShowConfirmModal(true);
    };

    const handleConfirmCancelamento = () => {
        setShowConfirmModal(false);
        setShowMotivoModal(true);
    };

    const handleSubmitCancelamento = async () => {
        if (!motivoCancelamento.trim()) {
            alert('Por favor, insira um motivo para o cancelamento.');
            return;
        }

        try {
            await api.post(`/cancelamento-consulta/${selectedConsulta.id}`, {
                mensagem: motivoCancelamento,
                id_usuario:selectedConsulta.id_usuario,
                nome_medico:localStorage.getItem("nome"),
                nome_usuario:selectedConsulta.nome,
                horario_inicio:selectedConsulta.horario_inicio
            });
            
            // Atualiza a lista de consultas
            const response = await api.get(`/medicos/consultas/${medicoId}`);
            setConsultas(response.data);
            
            setShowMotivoModal(false);
            setMotivoCancelamento('');
            setSelectedConsulta(null);
            alert('Consulta cancelada com sucesso!');
        } catch (error) {
            console.error('Erro ao cancelar consulta:', error);
            alert('Erro ao cancelar consulta. Tente novamente.');
        }
    };

    return (
        <div className="Consultas-container">
            
            <div className="data-navegacao">
                <button className="nav-button" onClick={handlePreviousDay}>&#9664;</button>
                <span className="data-atual">{formatDate(currentDate)}</span>
                <button className="nav-button" onClick={handleNextDay}>&#9654;</button>
            </div>

            <div className="consultas-lista">
                {filteredConsultas.length > 0 ? (
                    filteredConsultas.map((consulta, index) => {
                        const horario = new Date(consulta.horario_inicio).toLocaleTimeString('pt-BR', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                    
                        return (
                            <div className="consulta-item" key={index}>
                                <div className="horario">{horario}</div>
                                <div className="paciente-info">
                                    {consulta.nome} - {consulta.cpf}
                                </div>
                                <div className="botoes-container">
                                    <button className="entrar-button" onClick={() => handleEntrar(consulta)}>Entrar</button>
                                    <button className="cancelar-button" onClick={() => handleCancelar(consulta)}>
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="sem-consultas">
                        Não há consultas agendadas para esta data
                    </div>
                )}
            </div>

            <button className="voltar-button" onClick={handleVoltar}>
                Voltar
            </button>
            
            {showConfirmModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Confirmar Cancelamento</h3>
                        <p>Tem certeza que deseja cancelar esta consulta?</p>
                        <div className="modal-buttons">
                            <button onClick={handleConfirmCancelamento}>Sim</button>
                            <button onClick={() => setShowConfirmModal(false)}>Não</button>
                        </div>
                    </div>
                </div>
            )}

            {showMotivoModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Motivo do Cancelamento</h3>
                        <textarea
                            value={motivoCancelamento}
                            onChange={(e) => setMotivoCancelamento(e.target.value)}
                            placeholder="Digite o motivo do cancelamento"
                            rows="4"
                        />
                        <div className="modal-buttons">
                            <button onClick={handleSubmitCancelamento}>Confirmar</button>
                            <button onClick={() => setShowMotivoModal(false)}>Voltar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Consultas;