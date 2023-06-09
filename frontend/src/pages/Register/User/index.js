import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Edit,
} from '@mui/icons-material';

import { ThemeContext } from "../../../App";

import { Container } from './style';

import { Empresas, Usuarios } from '../../../services/api.service';

export default function RegisterUsers() {
  const { user, setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('@123456@');
  const [editPassword, toggleEditPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [permission, setPermission] = useState('');
  const [usersStatus, toggleUsersStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();
      const empresasFiltered = empresas.filter((empresa) => (user?.permissao === 1000 || empresa.id === user?.permissaoInfo?.empresaId));

      const empresa = empresasFiltered.find((empresa) => empresa.id !== 1 && empresa.id !== 0);

      setCompanies(empresasFiltered);
      setCompany(empresa.id);
      setPermission(empresa?.permissoes[0]?.id);
    })();
  }, []);

  useEffect(() => {
    const empresa = companies.find((empresa) => empresa.id === Number(company));
    setPermission(empresa?.permissoes[0]?.id);
  }, [company]);

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {

      if (Number(permission) === 1 && Number(company) !== 1) {
        const empresa = companies.find((emp) => emp.id === Number(company));
        setTooltipDetails({ icon: 'error', text: "Ops, a permissão que tentou cadastrar é de uma empresa diferente, por favor recarregue a página e tenta novamente."});
        setPermission(empresa?.permissoes[0]?.id);
        return;
      }
      await Usuarios.create({
        nome: name,
        email,
        empresaId: Number(company),
        permissao: Number(permission),
        senha: password,
        status: usersStatus,
      });

      const empresa = companies.find((empresa) => empresa.id === Number(company));

      setName('');
      setEmail('');
      setPermission(empresa?.permissoes[0]?.id);

      setTooltipDetails({ icon: 'sucess', text: 'Usuário(a) cadastrado(a) com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <div className="status">
        <h1>Cadastro de Usuário</h1>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <span className="type">Status do usuário</span>
          <Switch
            size="medium"
            checked={usersStatus}
            onClick={() => toggleUsersStatus(!usersStatus)}
          />
        </div>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
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
        </div>
      </div>
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
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.nome}</option>)}
            </select>
          </label>}
          <label>
            <span>Permissão</span>
            <select
              placeholder="Permissão"
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
            >
              {companies.find((comp) => comp.id === Number(company))?.permissoes?.length > 0 && companies.find((comp) => comp.id === Number(company))?.permissoes.filter((perm) => perm.level < Number(user.permissao) || Number(user.permissao) === 1000).map((perm) => <option key={perm.id} value={perm.id}>{perm.nome} | Nível {perm.level}</option>)}
            </select>
          </label>
          <h3 className="date-register">Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>
        </div>
        <div className="buttons">
          <button
            type="submit"
            className="submit"
          >
            Criar
          </button>
          <button
            type="button"
            className="cancel"
            onClick={() => {
              const empresa = companies.find((empresa) => empresa.id === Number(company));
              setName('');
              setEmail('');
              setPermission(empresa?.permissoes[0]?.id);
              return navigate(pathnameBack);
            }}
          >
            Voltar
          </button>
        </div>
      </form>
    </Container>
  );
}
