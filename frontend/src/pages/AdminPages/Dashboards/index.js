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
  const initStatus = dashboard?.status === "1" || dashboard?.status === "true";
  const [status, setStatus] = useState(initStatus);
  
  
  const onSwitchChange = async () => {
      try {
        await Dashboards.update(dashboard.id, {
          status: !status,
        });
        callback({ icon: 'sucess', text: 'Status dos dashboards salvos com sucesso'});
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

export default function AdminPagesDashboards() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [dashboards, setDashboards] = useState([]);
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
          Id: dash.id,
          Nome: dash.nome,
          URL: dash.url,
          'Descrição': dash.descricao,
          Empresa: companies.find((comp) => comp.id === dash?.empresaId)?.razaoSocial,
          Status: <div style={{ width: '30px ', height: '30px', backgroundColor: dash.status == '1' || dash.status == 'true' ? 'green' : 'red', borderRadius:"100%"}}/>,
          // <StatusSwitch dashboard={dash} callback={setTooltipDetails} />,
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

  return (
    <Container>
      <div className="status">
        <h1>Dashboards</h1>
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
      <form>
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
