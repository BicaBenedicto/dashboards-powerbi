import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Edit,
} from '@mui/icons-material';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas, Usuarios } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ user, callback }) => {
  const initStatus = user?.status === "1" || user?.status === "true";
  const [status, setStatus] = useState(initStatus);

  const onSwitchChange = async () => {
    try {
      await Usuarios.update(user.id, {
        status: !status,
      })
      callback({ icon: 'sucess', text: 'Status dos usuários salvos com sucesso'});
      return setStatus(!status)
    } catch (e) {
      callback({ icon: 'error', text: e});
    }
  };

  return <><button type="button" onClick={() => {}}/><Switch value={status} checked={status} onClick={onSwitchChange} /></>;
};

const ButtonEdit = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onButtonEditClick = async () => {
    return navigate(`${location.pathname}/edit/${id}`);
  };

  return <button style={{ backgroundColor: 'transparent' }} type="button" onClick={onButtonEditClick}><Edit /></button>;
};

export default function AdminPagesUsers() {
  const { user, setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [company, setCompany] = useState(user?.permissaoInfo?.empresaId);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();
      setCompanies(empresas.concat({ id: 0, razaoSocial: 'Todos' }));
      setCompany(user?.permissaoInfo?.empresaId);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const empresaId = company === '0' ? '' : `empresaId=${company}`
      const usuarios = await Usuarios.get(empresaId);

      if (usuarios.length === 0) {
        setUsers([]);
        setHeaderTable([]);
        return;
      }

      let usersFormatted = usuarios.filter((userItem) =>  user?.permissao === 1000 || userItem?.permissao?.empresaId === user?.permissaoInfo?.empresaId).map((userItem) => {
        return user?.permissao === 1000 ? ({
          Id: userItem.id,
          Nome: userItem.nome,
          Email: userItem.email,
          Permissão: userItem?.permissao?.nome,
          Empresa: userItem?.empresa?.razaoSocial,
          'Data de criação': new Date(userItem.createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          'Última atualização': new Date(userItem.updatedAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          Status: (Number(user.permissao) > userItem?.permissao?.level && userItem.permissao !== 1000 )? <StatusSwitch key={userItem.id} user={userItem} callback={setTooltipDetails} /> : <></>,
          Editar: Number(user.permissao) >= userItem?.permissao?.level ? <ButtonEdit key={userItem.id} id={userItem.id} /> : <></>
        }) : ({
          Id: userItem.id,
          Nome: userItem.nome,
          Email: userItem.email,
          Permissão: userItem?.permissao?.nome,
          'Data de criação': new Date(userItem.createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          'Última atualização': new Date(userItem.updatedAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          Status: (Number(user.permissao) > userItem?.permissao?.level && userItem.permissao !== 1000 )? <StatusSwitch key={userItem.id} user={userItem} callback={setTooltipDetails} /> : <></>,
          Editar: Number(user.permissao) > userItem?.permissao?.level ? <ButtonEdit key={userItem.id} id={userItem.id} /> : <></>
        });
      });

      const header = usersFormatted[0] ? Object.entries(usersFormatted[0]).map((usuario) => ({
        id: usuario[0],
        numeric: !isNaN(Number(usuario[1])),
        disablePadding: false,
        label: usuario[0],
      })) : [];

      setUsers(usersFormatted);
      setHeaderTable(header);
    })();
  }, [company, user]);

  return (
    <Container>
      <div className="status">
        <h1>Usuários</h1>
        <div>
          {user.permissao === 1000 && <label className="formatted">
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.nome}</option>)}
            </select>
          </label>}
          <button
            type="button"
            onClick={() => navigate(`${location.pathname}/register`)}
          >
            Criar novo usuário
          </button>
        </div>
      </div>
      <form>
        <div className="formatted">
          <label style={{ width: '95%', margin: '0 auto' }}>
            <Table
              rows={users}
              headCells={headerTable}
              title="Usuários cadastrados"
            />
          </label>
        </div>
        <div className="buttons">
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
