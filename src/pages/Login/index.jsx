import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Telesaude_logo.png';
import './style.css';
import api from '../../services/api';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", {
                email: e.target.email.value,
                senha: e.target.senha.value
            });
    
            if (response.status === 200) {
                const medico = await api.get(`medicos/${response.data.id}`);
                // Salva o médico completo ou só o que quiser
                localStorage.setItem("medico", JSON.stringify(medico));
                localStorage.setItem("medicoId", medico.data.id);
                localStorage.setItem("imagem", medico.data.imageUrl);
                localStorage.setItem("nome", medico.data.nome);
                console.log(medico);
                navigate('/main');
            } else if (response.status === 401) {
                alert("Usuário ou senha inválidos");
            }
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            alert("Erro ao fazer login, tente novamente.");
        }
    };
    

    return (
        <div className="container">
            <div className="login-section">
                <img 
                    src={Logo}
                />
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="email" 
                            name="email" 
                            placeholder="E-mail"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            id="senha" 
                            name="senha" 
                            placeholder="Senha"
                            required 
                        />
                    </div>

                    <div className="buttons-container">
                        <button type="submit" className="btn-entrar2">
                            Entrar
                        </button>
                        <Link to="/" className="btn-voltar">
                            Voltar
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
