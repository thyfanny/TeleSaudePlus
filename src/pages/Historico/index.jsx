import { useNavigate } from 'react-router-dom';
import './style.css';
import api from '../../services/api';
import { useState } from 'react';
import { useEffect } from 'react';

function Historico() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [consultas, setConsultas] = useState([]);
    const medicoId= localStorage.getItem("medicoId");

    // Chama o banco de dados para pegar o histórico de consultas
    async function getHistórico() {
        const result = await api.get(`/consultas-agendadas/medico/antes-hoje/${medicoId}`);
        setConsultas(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        getHistórico();
    }, [medicoId]);

    // Agrupa consultas por paciente
    const consultasPorPaciente = consultas.reduce((acc, consulta) => {
        const nomePaciente = consulta.nome || 'Paciente Desconhecido';
        const cpfPaciente = consulta.cpf || '---';
        const key = `${nomePaciente}-${cpfPaciente}`;
    
        if (!acc[key]) {
            acc[key] = {
                paciente: nomePaciente,
                cpf: cpfPaciente,
                consultas: []
            };
        }
        acc[key].consultas.push(consulta);
        return acc;
    }, {});

    // Converte para array e ordena alfabeticamente
    const pacientesOrdenados = Object.values(consultasPorPaciente)
        .sort((a, b) => a.paciente.localeCompare(b.paciente));

    // Filtra baseado na pesquisa
    const pacientesFiltrados = pacientesOrdenados.filter(paciente => 
        paciente.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paciente.cpf.includes(searchTerm)
    );

    const handleVoltar = () => {
        navigate('/main');
    };

    return (
        <div className="historico-container">
            <h1>Histórico de Consultas</h1>
            
            <div className="pesquisa-container">
                <input
                    type="text"
                    placeholder="Pesquisar por nome ou CPF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pesquisa-input"
                />
            </div>

            <div className="pacientes-lista">
                {pacientesFiltrados.map((paciente, index) => (
                    <div className="paciente-card" key={index}>
                        <div className="paciente-header">
                            <h2>{paciente.paciente}</h2>
                            <p>CPF: {paciente.cpf}</p>
                        </div>
                        
                        <div className="consultas-historico">
                            {paciente.consultas.map((consulta, consultaIndex) => (
                                <div className="consulta-item" key={consultaIndex}>
                                    <div className="consulta-data">
                                        {new Date(consulta.horario_inicio).toLocaleDateString('pt-BR')}
                                    </div>
                                    <span className={`status-consulta ${consulta.status}`}>
                                        {consulta.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button className="voltar-button" onClick={handleVoltar}>
                Voltar
            </button>
        </div>
    );
}

export default Historico;