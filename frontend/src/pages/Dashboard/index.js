import { useContext, useEffect, useState } from "react";

import { Container } from './style';

import { Dashboards, Empresas } from '../../services/api.service';
import { ThemeContext } from "../../App";

export default function Dashboard() {
  const { user } = useContext(ThemeContext);
  const [dashboard, setDashboard] = useState();
  const [dashboardsFiltered, setdashboardsFiltered] = useState([]);
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    (async () => {
      setCompany(user?.permissaoInfo?.empresaId);

      const empresas = await Empresas.get();

      setCompanies(empresas);

      const perm = await Dashboards.get(`empresaId=${user?.permissaoInfo?.empresaId}`);

      const filteredDashboards = perm.filter((dash) => dash?.permissoes.some(({ permissaoId }) => user?.permissaoInfo?.id === permissaoId) || user?.permissao === 1000);

      setdashboardsFiltered(filteredDashboards);
      setDashboard(filteredDashboards[0]?.id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const perm = await Dashboards.get(`empresaId=${company}`);

      const filteredDashboards = perm.filter((dash) => dash?.permissoes.some(({ permissaoId }) => user?.permissaoInfo?.id === permissaoId) || user?.permissao === 1000);

      setdashboardsFiltered(filteredDashboards);
      setDashboard(filteredDashboards[0]?.id);
    })();
  }, [company]);
  return (
    <Container>
      <div className="status">
        <h1>Dashboard</h1>
        <div className="dashboards-select">
          {user?.permissaoInfo?.level === 1000 && <>
            <span className="type">Empresa: </span>
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.razaoSocial}</option>)}
            </select>
          </>}
          <span className="type">Dashboard: </span>
          <select
            placeholder="Dashboard"
            value={dashboard}
            onChange={(e) => setDashboard(e.target.value)}
          >
            {dashboardsFiltered?.length > 0 && dashboardsFiltered.map((dash) => <option key={dash.id} value={dash.id}>{dash.nome}</option>)}
          </select>
        </div>
      </div>
      <div className="dashboard">
        {dashboardsFiltered?.length > 0 && <>
          <iframe
            src={dashboardsFiltered?.find((dash) => dash?.id === Number(dashboard))?.url}
            height='100%'
            width='100%'
          />
          <hr/>
        </>}
      </div>
    </Container>
  );
}
