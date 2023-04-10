import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Edit,
} from '@mui/icons-material';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas, Dashboards } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ dashboard, callback }) => {
  const initStatus = Boolean(dashboard?.status);
  const [status, setStatus] = useState(initStatus);

  const onSwitchChange = async () => {
    await callback(dashboard, !status);
    return setStatus(!status)
  };

  return <Switch value={status} checked={status} onClick={onSwitchChange} />;
};

const ButtonEdit = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onButtonEditClick = async () => {
    return navigate(`${location.pathname}/edit/${id}`);
  };

  return <button style={{ backgroundColor: 'transparent' }} type="button" onClick={onButtonEditClick}><Edit /></button>;
};

export default function AdminPagesDashboards() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [dashboardsToSend, setDashboardsToSend] = useState([]);
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
      const dashboards = await Dashboards.get(empresaId);

      if (dashboards.length === 0) {
        setDashboards([]);
        setHeaderTable([]);
        return;
      }

      const dashboardFormatted = dashboards.map((dash) => {
        return ({
          id: dash.id,
          Nome: dash.nome,
          URL: dash.url,
          'Descrição': dash.descricao,
          Empresa: companies.find((comp) => comp.id === dash?.empresaId)?.razaoSocial,
          Status: <StatusSwitch dashboard={dash} callback={dashboardsToSendDefine} />,
          Editar: <ButtonEdit id={dash.id} />
        })
      });

      const header = Object.entries(dashboardFormatted[0]).map((dash, index) => ({
        id: dash[0],
        numeric: !isNaN(Number(dash[1])),
        disablePadding: false,
        label: dash[0],
      }));

      setDashboards(dashboardFormatted);
      setHeaderTable(header);
    })();
  }, [company]);

  const dashboardsToSendDefine = async (dashboard, status) => {
    if (status) {
      return setDashboardsToSend((dashboardsToSend) => ([...dashboardsToSend, {...dashboard, status}]));
    }
    return setDashboardsToSend((dashboardsToSend) => dashboardsToSend.filter((dash) => dash?.id !== dashboard?.id));
  };

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(dashboardsToSend.map((dash) => Dashboards.update(dash.id, {
        status: dash.status,
      })
    ));
      setTooltipDetails({ icon: 'sucess', text: 'Status dos dashboards salvos com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <h1>Dashboards</h1>
      <div className="status">
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
            Criar novo dashboard
          </button>
        </div>
      </div>
      <form onSubmit={onSubmitDashboard}>
        <div className="formatted">
          <label style={{ width: '95%', margin: '0 auto' }}>
            <Table
              rows={dashboards}
              headCells={headerTable}
              title="Dashboards cadastrados"
            />
          </label>
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
