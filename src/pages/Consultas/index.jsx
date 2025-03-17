import { useNavigate } from 'react-router-dom';
import './style.css';
//import api from '../../services/api';
import { useState } from 'react';

function Consultas() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleVoltar = () => {
        navigate('/Main');
    };

    const handleEntrar = () => {
        navigate('/entrar');
    }

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

    const consultas = [
        {
            id: 4,
            horario: "09:40",
            data: "2025-02-24",
            paciente: "Tatiane Silva Alves",
            cpf: "022.594.559-08",
            status: "agendada"
        },
        {
            id: 5,
            horario: "13:50",
            data: "2025-02-25",
            paciente: "João Ribeiro",
            cpf: "011.541.559-88",
            status: "agendada"
        },
        {
            id: 6,
            horario: "16:10",
            data: "2025-02-23",
            paciente: "Rafaela Silva",
            cpf: "077.094.559-28",
            status: "agendada"
        },
        {
            id: 7,
            horario: "17:30",
            data: "2025-03-16",
            paciente: "Carlos Silva",
            cpf: "077.094.559-28",
            status: "agendada"
        }
    ];

    const filteredConsultas = consultas.filter(consulta => 
        consulta.data === formatDateForComparison(currentDate)
    );

    return (
        <div className="Consultas-container">
            
            <div className="data-navegacao">
                <button className="nav-button" onClick={handlePreviousDay}>&#9664;</button>
                <span className="data-atual">{formatDate(currentDate)}</span>
                <button className="nav-button" onClick={handleNextDay}>&#9654;</button>
            </div>

            <div className="consultas-lista">
                {filteredConsultas.length > 0 ? (
                    filteredConsultas.map((consulta, index) => (
                        <div className="consulta-item" key={index}>
                            <div className="horario">{consulta.horario}</div>
                            <div className="paciente-info">
                                {consulta.paciente} - {consulta.cpf}
                            </div>
                            <div className="botoes-container">
                                <button className="entrar-button" onClick={handleEntrar}>Entrar</button>
                                <button className="cancelar-button">Cancelar</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="sem-consultas">
                        Não há consultas agendadas para esta data
                    </div>
                )}
            </div>

            <button className="voltar-button" onClick={handleVoltar}>
                Voltar
            </button>
            
        </div>
    );
}

export default Consultas;