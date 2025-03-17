import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Telesaude_logo.png';
import './style.css';
//import api from '../../services/api';

function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/main'); // Redireciona para a página Main após o login
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
