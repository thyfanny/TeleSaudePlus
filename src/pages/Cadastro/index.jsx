import { Link } from 'react-router-dom';
import Logo from '../../assets/Telesaude_logo.png';
import './style.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const navigate = useNavigate();

    const formatarCPF = (cpf) => {
        // Remove todos os caracteres não numéricos
        const apenasNumeros = cpf.replace(/\D/g, '');
        
        // Aplica a máscara do CPF (XXX.XXX.XXX-XX)
        return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const validarCPF = (cpf) => {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/\D/g, '');

        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;

        // Validação do primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let digito1 = 11 - (soma % 11);
        if (digito1 > 9) digito1 = 0;
        
        // Validação do segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let digito2 = 11 - (soma % 11);
        if (digito2 > 9) digito2 = 0;

        // Verifica se os dígitos calculados são iguais aos dígitos informados
        return (
            digito1 === parseInt(cpf.charAt(9)) &&
            digito2 === parseInt(cpf.charAt(10))
        );
    };

    const handleCPFChange = (e) => {
        let valor = e.target.value;
        // Remove caracteres não numéricos
        valor = valor.replace(/\D/g, '');
        
        if (valor.length <= 11) {
            // Formata o CPF
            valor = formatarCPF(valor);
            e.target.value = valor;
        }
    };

    const handleNomeChange = (e) => {
        // Remove caracteres especiais e números, mantendo apenas letras e espaços
        let valor = e.target.value;
        valor = valor.replace(/[^a-zA-ZÀ-ÿ\s]/g, '');
        e.target.value = valor;
    };

    const validarEmail = (email) => {
        // Regex para validação de email
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        
        if (!regexEmail.test(email)) {
            alert('Por favor, insira um email válido!');
            return false;
        }
        return true;
    };

    const handleEmailChange = (e) => {
        let valor = e.target.value;
        // Remove espaços em branco
        valor = valor.trim();
        e.target.value = valor;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nome = e.target.nome.value;
        const email = e.target.email.value;
        const cpf = e.target.cpf.value.replace(/\D/g, '');
        const telefone = e.target.telefone.value;
        const senha = e.target.senha.value;
        const confirmarSenha = e.target.confirmarSenha.value;
        const crm = e.target.crm.value;
        
        if (!validarEmail(email)) {
            return;
        }

        if (!validarCPF(cpf)) {
            alert('CPF inválido! Por favor, verifique o número informado.');
            return;
        }

        try {
            const response = await api.post('/cadastro', {
                nome,
                email,
                cpf,
                telefone,
                senha,
                crm
            });

            if (response.status === 201) {
                navigate('/token', { state: { email } });
            }
        } catch (error) {
            alert('Erro ao realizar cadastro. Por favor, tente novamente.');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="cadastro-section">
                <img 
                    src={Logo}
                />
                <h2>Cadastro</h2>
                <form className="cadastro-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="nome" 
                            name="nome" 
                            placeholder="Nome"
                            required 
                            onChange={handleNomeChange}
                            pattern="[a-zA-ZÀ-ÿ\s]+"
                            title="Apenas letras são permitidas"
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="E-mail"
                            required 
                            onChange={handleEmailChange}
                            pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}"
                            title="Por favor, insira um email válido"
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="text" 
                            id="cpf" 
                            name="cpf" 
                            placeholder="CPF"
                            required 
                            maxLength="14"
                            onChange={handleCPFChange}
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="date"   
                            id="data_aniversário" 
                            name="data_aniversário" 
                            placeholder="Data de nascimento"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="tel" 
                            id="telefone" 
                            name="telefone" 
                            placeholder="Telefone"
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

                    <div className="form-group">
                        <input 
                            type="password" 
                            id="confirmarSenha" 
                            name="confirmarSenha" 
                            placeholder="Confirmar Senha"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="text" 
                            id="crm" 
                            name="crm" 
                            placeholder="CRM"
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="text" 
                            id="especializacao" 
                            name="especializacao" 
                            placeholder="Especialização"
                            required 
                        />
                    </div>

                    <div className="buttons-container">
                        <button type="submit" className="btn-cadastrar">
                            Cadastrar
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

export default Cadastro;
