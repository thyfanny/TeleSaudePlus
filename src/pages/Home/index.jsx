import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Telesaude_logo.png';
import Doctor from '../../assets/online_doctor.png';
import './style.css'

function Home() {
    const navigate = useNavigate();

    const handleCadastro = () => {
        navigate('/cadastro');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="login-section">
                <img 
                    src={Logo}
                />
                
                <button 
                    className="btn-entrar"
                    onClick={handleLogin}
                >
                    Entrar
                </button>
                <button 
                    className="btn-cadastrar" 
                    onClick={handleCadastro}
                >
                    Cadastrar
                </button>
            </div>
            
            <div className="illustration-section">
                <img 
                    src={Doctor}
                    alt="Ilustração de médico"
                    className="doctor-img"
                />
            </div>
        </div>
    )
}

export default Home
