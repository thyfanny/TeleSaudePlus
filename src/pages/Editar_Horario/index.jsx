import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

function Editar_Horario() {
  const navigate = useNavigate();

  const [horarios, setHorarios] = useState([]);

  const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  const horarioPadrao = {
    hora_inicio: "08:00",
    hora_fim: "17:00",
    dia_semana: "",
    id_medico: 1, // Ajuste conforme necessário
    modified: false,
  };

  async function getHorario() {
    const response = await api.get("/horarios-medicos/:id");
    const horarioData = response.data;

    // Adiciona horários padrão para os dias que não possuem horários definidos
    const horariosCompletos = diasSemana.map(dia => {
      const horarioExistente = horarioData.find(horario => horario.dia_semana === dia);
      return horarioExistente || { ...horarioPadrao, dia_semana: dia };
    });

    setHorarios(horariosCompletos);
    console.log("Conectado ao banco de dados");
  }

  useEffect(() => {
    getHorario();
  }, []);

  const handleVoltar = () => {
    navigate("/main");
  };

  const handleCancelar = () => {
    navigate("/editar-horario");
  };

  const handleSalvar = async () => {
    try {
      for (const horario of horarios) {
        if (horario.modified) {
          if (horario.id < 0) {
            await api.post("/horarios-medicos", {
              horario_inicio: horario.hora_inicio,
              horario_fim: horario.hora_fim,
              dia_semana: horario.dia_semana,
              id_medico: horario.id_medico,
            });
          } else {
            await api.put(`/horarios-medicos/${horario.id}`, {
              horario_inicio: horario.hora_inicio,
              horario_fim: horario.hora_fim,
              dia_semana: horario.dia_semana,
              id_medico: horario.id_medico,
            });
          }
        }
      }
      alert("Horários alterados com sucesso!");
      navigate("/editar-horario");
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
              <p>{item.dia_semana}</p>
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
