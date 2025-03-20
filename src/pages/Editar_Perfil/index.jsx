import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fotoPadrao from '../../assets/foto-perfil.jpg';
import './style.css';
import api from '../../services/api';

function Editar_Perfil() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const medicoId = localStorage.getItem("medicoId");
    console.log()
    const [foto, setFoto] = useState(fotoPadrao);
    const [nome, setNome] = useState('');
    const [file, setFile] = useState(null);
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    useEffect(() => {
        const imagem= localStorage.getItem("imagem") || fotoPadrao;
        const nome= localStorage.getItem("nome") || ''; 
        
            setNome(nome);
            setFoto(imagem);
        
    }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFoto(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    const handleEditarClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (senha && senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nome", nome);
            if (file) {
                formData.append("imagem", file);
            }
            if (senha) {
                formData.append("senha", senha);
            }

            await api.put(`/medicos/editarPerfil/${medicoId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            localStorage.setItem("nome", nome);
            localStorage.setItem("imagem", foto);


            alert('Perfil atualizado com sucesso!');
            navigate('/Main');
        } catch (err) {
            console.error("Erro ao atualizar perfil", err);
            alert('Erro ao salvar, tente novamente.');
        }
    };

    const handleVoltar = () => {
        navigate('/Main');
    };

    const handleSair = () => {
        localStorage.removeItem("medico");
        navigate('/');
    };

    return (
        <div className="editar-perfil-container">
            <div className="perfil-header">
                <div className="foto-container">
                    <img src={foto} alt="Foto de Perfil" className="foto-perfil" />
                    <div className="editar-link" onClick={handleEditarClick}>Editar</div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                </div>
            </div>

            <form className="form-perfil" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome"
                    className="input-perfil"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Nova Senha (opcional)"
                    className="input-perfil"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirmar Nova Senha (opcional)"
                    className="input-perfil"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <button type="submit" className="salvar-button">
                    Salvar
                </button>

                <div className="botoes-navegacao">
                    <button type="button" className="btn-voltar" onClick={handleVoltar}>
                        Voltar
                    </button>
                    <button type="button" className="btn-sair" onClick={handleSair}>
                        Sair
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Editar_Perfil;
