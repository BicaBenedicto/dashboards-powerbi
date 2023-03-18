// import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
  Edit,
} from '@mui/icons-material';

import { Container } from './style';

import { Empresas, Usuarios } from '../../services/api.service';
import { ThemeContext } from "../../App";

export default function Profile() {
  const { user, setUser } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1) && index !== (array.length - 2)).join('/');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, toggleDisplayPassword] = useState(false);
  const [editPassword, toggleEditPassword] = useState(false);
  const [email, setEmail] = useState('');
  // const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  // const [permission, setPermission] = useState('');
  // const [usersStatus, toggleUsersStatus] = useState(true);
  // const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();

      setCompanies(empresas);
      // setCompany(user.permissaoInfo.empresaId);
      // setPermission(user.permissaoInfo.id);
      setName(user.nome);
      setEmail(user.email);
      // toggleUsersStatus(!!Number(user.status));
      // setCreatedAt(user.createdAt);
    })();
  }, [user]);

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {
      if (password) {
          await Usuarios.update(params.id, {
          nome: name,
          email,
          senha: password,
        });
      } else {
        await Usuarios.update(params.id, {
          nome: name,
          email,
        });
      }
    } catch (e) {
      throw e;
    }
  };

  const onLogoutButton = () => {
    localStorage.removeItem('@LOGIN')
    setUser({});
    return navigate('/');
  };

  return (
    <Container>
      <h1>Perfil</h1>
      <div className="status">
        <button onClick={onLogoutButton} className="logout">
          Deslogar
        </button>
      </div>
      {/* <div className="status">
        <span className="type">Status do usuário</span>
        <Switch
          size="medium"
          checked={usersStatus}
          onClick={() => toggleUsersStatus(!usersStatus)}
        />
      </div> */}
      <br />
      <form onSubmit={onSubmitDashboard}>
        <div>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome do usuário"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>E-mail</span>
            <input
              type="email"
              placeholder="teste@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
         <label className="password">
            <span className="type">Senha:</span>
            <div>
              <div>
                <input
                  type={displayPassword ? 'text' : 'password'}
                  value={password}
                  placeholder="******"
                  disabled={!editPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {editPassword && <button
                  type="button"
                  onClick={() => toggleDisplayPassword(!displayPassword)}
                  className="display-password"
                >
                  {displayPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
                </button>}
              </div>
              <button
                type="button"
                onClick={() => {toggleDisplayPassword(false); return toggleEditPassword(!editPassword)}}
              >
                <Edit />
              </button>
            </div>
          </label>
          <h3 className="date-register" style={{ alignItems: 'center', display: 'flex', width: '100%', margin: '5px auto', marginLeft: '2.5%' }}>Empresa: <span style={{ fontWeight: '300', marginLeft: '2.5%' }}>{companies.find((comp) => comp?.id === user?.permissaoInfo?.empresaId)?.razaoSocial}</span></h3>
          <h3 className="date-register" style={{ alignItems: 'center', display: 'flex', width: '100%', margin: '5px auto', marginLeft: '2.5%' }}>Permissão: <span style={{ fontWeight: '300', marginLeft: '2.5%' }}>{user?.permissaoInfo?.nome}</span></h3>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="submit"
          >
            Salvar
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => navigate(pathnameBack)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Container>
  );
}
