import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../services/api";
import { useEffect } from "react";

function Editar_Horario() {
  const navigate = useNavigate(); 
  
  let horario = [];
  async function getHorario() {
      horario = await api.get("/horarios-medicos/:id");
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

  const handleSalvar = () => {

  //  try {
  //    const response = await api.put('/horarios-medicos/:id', {
  //        horario_inicio,
  //        horario_fim,
  //        dia_semana
  //    });

  //    if (response.status === 200) {
  //        alert('Horário alterado com sucesso!');
  //        navigate('/editar-horario');
  //    }
  //} catch (error) {
  //    alert('Erro ao alterar o horário.');
  //    console.error(error);
  //}

    const updatedHorarioInicio = horarios.map(horario => horario.hora_inicio);
    const updatedHorarioFim = horarios.map(horario => horario.hora_fim);

    console.log("Horários salvos:", horarios);
    console.log("Horário Início atualizado:", updatedHorarioInicio);
    console.log("Horário Fim atualizado:", updatedHorarioFim);

    // Atualize as variáveis horario_inicio e horario_fim

    navigate("/editar-horario");
  };

  const handleHorarioChange = (index, field, value) => {
    const newHorarios = [...horarios];
    newHorarios[index][field] = value;
    setHorarios(newHorarios);
  };

  //dados mockados para testes
  let [horarios, setHorarios] = useState([
    {
      id: 1,
      id_medico: 1,
      hora_inicio: "08:00",
      hora_fim: "11:00",
      dia_semana: "Segunda",
    },
    {
      id: 2,
      id_medico: 1,
      hora_inicio: "08:00",
      hora_fim: "13:00",
      dia_semana: "Terça",
    },
    {
      id: 3,
      id_medico: 1,
      hora_inicio: "08:00",
      hora_fim: "15:00",
      dia_semana: "Quarta",
    },
    {
      id: 4,
      id_medico: 1,
      hora_inicio: "08:00",
      hora_fim: "17:00",
      dia_semana: "Quinta",
    },
    {
      id: 5,
      id_medico: 1,
      hora_inicio: "08:00",
      hora_fim: "19:00",
      dia_semana: "Sexta",
    },
    {
      id: 6,
      id_medico: 1,
      hora_inicio: "00:00",
      hora_fim: "00:00",
      dia_semana: "Sábado",
    },
    {
      id: 7,
      id_medico: 1,
      hora_inicio: "00:00",
      hora_fim: "00:00",
      dia_semana: "Domingo",
    },
  ]);

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
                value={item.horario_inicio}
                onChange={(e) =>
                  handleHorarioChange(index, "horario_inicio", e.target.value)
                }
              />
              <input
                type="time"
                value={item.horario_fim}
                onChange={(e) =>
                  handleHorarioChange(index, "horario_fim", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <div className="botoes-navegacao">
        <button type="button" className="voltar-button-hor" onClick={handleVoltar}>
          Voltar
        </button>
        <button type="submit" className="salvar-button-hor" onClick={handleSalvar}>
          Salvar
        </button>
        <button type="button" className="cancelar-button-hor" onClick={handleCancelar}>
          Cancelar
        </button>
        
      </div>
    </div>
  );
}

export default Editar_Horario;
