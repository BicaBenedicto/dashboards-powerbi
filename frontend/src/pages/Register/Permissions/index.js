import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas, Dashboards, Permissoes } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ dashboard, permissaoId, callback }) => {
  const [status, setStatus] = useState(false);

  const onSwitchChange = async () => {
    await callback(dashboard, !status);
    return setStatus(!status)
  };

  return <><button type="button" onClick={() => {}}/><Switch value={status} checked={status} onClick={onSwitchChange} /></>;
};

export default function RegisterPermissions() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [level, setLevel] = useState('');
  const [companies, setCompanies] = useState([]);
  const [dashboards, setDashboards] = useState([]);
  const [dashboardsToSend, setDashboardsToSend] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);
  const [permissionsStatus, togglePermissionsStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();

      setCompanies(empresas);
      setCompany(empresas[0].id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const dashboards = await Dashboards.get(`empresaId=${company}`);

      const dashboardFormatted = dashboards.map((dash) => {

        return ({
          Id: dash.id,
          Nome: dash.nome,
          URL: dash.url,
          'Descrição': dash.descricao,
          Status: <StatusSwitch dashboard={dash} callback={dashboardsToSendDefine} />
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
      await Permissoes.create({
        nome: name,
        empresaId: Number(company),
        status: permissionsStatus,
        dashboards: dashboardsToSend,
        level,
      });

      setName('');
      setLevel('');
      setTooltipDetails({ icon: 'sucess', text: 'Permissão cadastrada com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <div className="status">
        <h1>Cadastro de Permissão</h1>
        <div>
          <span className="type">Status da permissão</span>
          <Switch
            size="medium"
            checked={permissionsStatus}
            onClick={() => togglePermissionsStatus(!permissionsStatus)}
          />
        </div>
      </div>
      <form onSubmit={onSubmitDashboard}>
        <div className="formatted">
          <label className="formatted">
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome da permissão"
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
            <span>Nível</span>
              <input
                type="number"
                placeholder="Nível de permissão - 1 (menor) e 5 (maior)"
                value={level}
                max="5"
                min="1"
                onChange={(e) => setLevel(e.target.value)}
              />
          </label>
          <h3 className="date-register">Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>
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
            onClick={() => {
              setName('');
              setLevel('');
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
