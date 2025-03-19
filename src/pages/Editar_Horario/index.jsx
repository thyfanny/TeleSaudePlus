import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

function Editar_Horario() {
  const navigate = useNavigate();
  const medicoId = localStorage.getItem("medicoId");
  console.log("id do médico:", medicoId);
  const [horarios, setHorarios] = useState([]);

  // Mapeamento: 0 = Domingo, 1 = Segunda...
  const diasSemanaLabel = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const horarioPadrao = {
    hora_inicio: "0:00",
    hora_fim: "00:00",
    dia_semana: 0,
    id_medico: medicoId,
    modified: false,
  };

  async function getHorario() {
    try {
      const response = await api.get(`/horarios-medicos/${medicoId}`);
      const horarioData = response.data;

      const horariosCompletos = diasSemanaLabel.map((_, index) => {
        const horarioExistente = horarioData.find(horario => horario.dia_semana === index);

        if (horarioExistente) {
          return {
            id: horarioExistente.id,
            id_medico: horarioExistente.id_medico,
            dia_semana: horarioExistente.dia_semana,
            hora_inicio: horarioExistente.horario_inicio.slice(0,5), // '08:00'
            hora_fim: horarioExistente.horario_fim.slice(0,5),       // '16:00'
            modified: false,
          };
        } else {
          return { ...horarioPadrao, dia_semana: index };
        }
      });

      setHorarios(horariosCompletos);
      console.log("Horários carregados", horariosCompletos);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  }

  useEffect(() => {
    if (medicoId) {
      getHorario();
    }
  }, [medicoId]);

  const handleVoltar = () => navigate("/main", { state: { id: medicoId } });

  const handleCancelar = () => navigate("/editar-horario", { state: { id: medicoId } });

  const handleSalvar = async () => {
    try {
      for (const horario of horarios) {
        if (horario.modified) {
          const payload = {
            horario_inicio: horario.hora_inicio,
            horario_fim: horario.hora_fim,
            dia_semana: horario.dia_semana,
            id_medico: horario.id_medico,
          };

          if (!horario.id) {
            const result=await api.post("/horarios-medicos", payload);
            console.log(result)
          } else {
            const result= await api.put(`/horarios-medicos/${horario.id}`, payload);
            console.log(payload)
            console.log(result)
          }
        }
      }
      alert("Horários alterados com sucesso!");
      navigate("/editar-horario", { state: { id: medicoId } });
    } catch (error) {
      alert("Erro ao alterar os horários.");
      console.error(error);
    }
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][field] = value;
    newHorarios[index].modified = true;
    setHorarios(newHorarios);
  };

  return (
    <div className="horarios-container">
      <div className="horario-header">
        <h2>Editar Horário</h2>
        <div className="horario-lista">
          {horarios.map((item, index) => (
            <div className="horario-item" key={index}>
              <p>{diasSemanaLabel[item.dia_semana]}</p>
              <input
                type="time"
                value={item.hora_inicio}
                onChange={(e) =>
                  handleHorarioChange(index, "hora_inicio", e.target.value)
                }
              />
              <input
                type="time"
                value={item.hora_fim}
                onChange={(e) =>
                  handleHorarioChange(index, "hora_fim", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="botoes-navegacao">
        <button
          type="button"
          className="voltar-button-hor"
          onClick={handleVoltar}
        >
          Voltar
        </button>
        <button
          type="submit"
          className="salvar-button-hor"
          onClick={handleSalvar}
        >
          Salvar
        </button>
        <button
          type="button"
          className="cancelar-button-hor"
          onClick={handleCancelar}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default Editar_Horario;
