import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Logo from '../../assets/Telesaude_logo.png';
import api from '../../services/api';
import './style.css';

function Token() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await api.post('/verificar-token', {
                email,
                token
            });

            if (response.status === 200) {
                alert('Cadastro validado com sucesso!');
                navigate('/login');
            }
        } catch (error) {
            alert('Código inválido. Por favor, tente novamente.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="token-section">
                <img src={Logo} alt="Logo" />
                <h2>Validação de Cadastro</h2>
                <p>Um código foi enviado para {email}</p>
                
                <form className="token-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="Digite o código"
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn-validar">
                        Validar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Token;
