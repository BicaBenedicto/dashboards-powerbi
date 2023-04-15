import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
// import {
//   Edit,
// } from '@mui/icons-material';

import { Container } from './style';

import { Empresas, Usuarios } from '../../../services/api.service';
import { ThemeContext } from "../../../App";
import { Delete } from "@mui/icons-material";

export default function EditUsers() {
  const { user, setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1) && index !== (array.length - 2)).join('/');
  const [name, setName] = useState('');
  // const [password, setPassword] = useState('@123456@');
  // const [editPassword, toggleEditPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [permission, setPermission] = useState('');
  const [usersStatus, toggleUsersStatus] = useState(true);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    if (user.id) {
      (async () => {
        const empresas = await Empresas.get();
        const [user] = await Usuarios.get(`id=${params.id}`);

        setCompanies(empresas);
        setCompany(user.permissao.empresaId);
        setPermission(user.permissao.id);
        setName(user.nome);
        setEmail(user.email);
        toggleUsersStatus(!!Number(user.status));
        setCreatedAt(user.createdAt);
      })();
    }
  }, [user, params]);

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {
      if (Number(permission) === 1 && Number(company) !== 1) {
        const empresa = companies.find((emp) => emp.id === Number(company));
        setTooltipDetails({ icon: 'error', text: "Ops, a permissão que está tentou cadastrar para uma empresa diferente, por favor recarregue a página e tenta novamente."});
        setPermission(empresa?.permissoes[0]?.id);
        return;
      }
      await Usuarios.update(params.id, {
        nome: name,
        email,
        empresaId: Number(company),
        permissao: Number(permission),
        // senha: password,
        status: usersStatus,
      });
      setTooltipDetails({ icon: 'sucess', text: 'Usuário(a) atualizado(a) com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <div className="status">
        <h1>Edição de Usuário</h1>
        <button
          type="button"
          style={{ alignItems: 'center', display: 'flex', backgroundColor: 'transparent', border: 'none', color: 'red' }}
          onClick={async () => {
            await Usuarios.remove(params.id);
            return navigate(pathnameBack);
          }}
        ><Delete /> Apagar empresa</button>
      </div>
      <br />
      {/* <div className="status">
        <span className="type">Senha padrão:</span>
        <input
          type="text"
          placeholder="@123456@"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!editPassword}
          className="password"
        />
        <button
          type="button"
          onClick={() => toggleEditPassword(!editPassword)}
        ><Edit /></button>
      </div> */}
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
         {user?.permissao === 1000 && <label>
            <span>Empresa</span>
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.razaoSocial}</option>)}
            </select>
          </label>}
          <label>
            <span>Permissão</span>
            <select
              placeholder="Permissão"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            >
              {companies.find((comp) => comp.id === Number(company))?.permissoes?.length > 0 && companies.find((comp) => comp.id === Number(company))?.permissoes.filter((perm) => perm.level < Number(user.permissao)).map((perm) => <option key={perm.id} value={perm.id}>{perm.nome}</option>)}
            </select>
          </label>
          <h3 className="date-register">Data do Cadastro: {new Date(createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>
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
            Voltar
          </button>
        </div>
      </form>
    </Container>
  );
}
