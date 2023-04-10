import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas, Dashboards, Permissoes } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ dashboard, permissaoId, callback }) => {
  const initStatus = dashboard?.permissoes?.some((perm) => perm.permissaoId === Number(permissaoId));
  const [status, setStatus] = useState(initStatus);

  const onSwitchChange = async () => {
    await callback(dashboard, !status);
    return setStatus(!status)
  };

  return <Switch value={status} checked={status} onClick={onSwitchChange} />;
};

export default function EditPermissions() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1) && index !== (array.length - 2)).join('/');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [level, setLevel] = useState();
  const [companies, setCompanies] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [dashboardsToSend, setDashboardsToSend] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [permissionsStatus, togglePermissionsStatus] = useState(true);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();
      const [permission] = await Permissoes.get(`id=${params.id}`);

      setCompanies(empresas);
      setCompany(permission.empresaId);
      setName(permission.nome);
      setLevel(permission.level);
      togglePermissionsStatus(!!Number(permission.status));
      setCreatedAt(permission.createdAt);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dashboards = await Dashboards.get(`empresaId=${company}`);

      if (dashboards.length === 0) {
        setDashboards([]);
        setHeaderTable([]);
        return;
      }

      const dashboardFormatted = dashboards.map((dash) => {

        return ({
          id: dash.id,
          nome: dash.nome,
          url: dash.url,
          descricao: dash.descricao,
          status: <StatusSwitch dashboard={dash} callback={dashboardsToSendDefine} permissaoId={params.id}/>
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
      await Permissoes.update(params.id, {
        nome: name,
        empresaId: Number(company),
        status: permissionsStatus,
        dashboards: dashboardsToSend,
      });
      setTooltipDetails({ icon: 'sucess', text: 'Permissão atualizada com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e });
    }
  };

  return (
    <Container>
      <h1>Edição de Permissão</h1>
      <div className="status">
        <span className="type">Status da permissão</span>
        <Switch
          size="medium"
          checked={permissionsStatus}
          onClick={() => togglePermissionsStatus(!permissionsStatus)}
        />
      </div>
      <form onSubmit={onSubmitDashboard}>
        <div className="formatted">
          <label className="formatted">
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome do dashboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="formatted">
            <span>Empresa</span>
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.razaoSocial}</option>)}
            </select>
          </label>
          <label className="formatted">
            <span>Level</span>
              <input
                type="number"
                placeholder="Level de permissão - 1 (menor) e 5 (maior)"
                value={level}
                max="5"
                min="1"
                onChange={(e) => setLevel(e.target.value)}
              />
          </label>
          <h3 className="date-register">Data do Cadastro: {new Date(createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>
          <label style={{ width: '95%', margin: '0 auto' }}>
            <Table
              rows={dashboards}
              headCells={headerTable}
              title="Dashboards"
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
