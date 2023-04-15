import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Edit,
} from '@mui/icons-material';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas, Permissoes } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ permission, callback }) => {
  const initStatus = Boolean(permission?.status);
  const [status, setStatus] = useState(initStatus);

  const onSwitchChange = async () => {
    try {
      await Permissoes.update(permission.id, {
        status: !status,
      });
      callback({ icon: 'sucess', text: 'Status das permissões salvas com sucesso'});
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

export default function AdminPagesPermissions() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();
      setCompanies(empresas.concat({ id: 0, razaoSocial: 'Todos' }));
      setCompany('0');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const empresaId = company === '0' ? '' : `empresaId=${company}`
      const permissoes = await Permissoes.get(empresaId);

      if (permissoes.length === 0) {
        setPermissions([]);
        setHeaderTable([]);
        return;
      }

      const permissionsFormatted = permissoes.map((permission) => {
        return ({
          id: permission.id,
          Nome: permission.nome,
          Level: permission.level,
          Empresa: companies.find((comp) => comp.id === Number(permission.empresaId))?.razaoSocial,
          Status: <StatusSwitch key={permission.id} permission={permission} callback={setTooltipDetails} />,
          Editar: <ButtonEdit key={permission.id} id={permission.id} />
        })
      });

      const header = permissionsFormatted[0] ? Object.entries(permissionsFormatted[0]).map((permission) => ({
        id: permission[0],
        numeric: !isNaN(Number(permission[1])),
        disablePadding: false,
        label: permission[0],
      })) : [];

      setPermissions(permissionsFormatted);
      setHeaderTable(header);
    })();
  }, [company]);

  return (
    <Container>
      <div className="status">
        <h1>Permissões</h1>
        <div>
          <label className="formatted">
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.razaoSocial}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={() => navigate(`${location.pathname}/register`)}
          >
            Criar nova permissão
          </button>
        </div>
      </div>
      <form>
        <div className="formatted">
          <label style={{ width: '95%', margin: '0 auto' }}>
            <Table
              rows={permissions}
              headCells={headerTable}
              title="Permissões cadastrados"
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
