import { useContext, useEffect, useState, useRef } from "react";
import {
  Refresh,
  Info,
} from '@mui/icons-material';

import { Container } from './style';

import { Dashboards, Empresas } from '../../services/api.service';
import { ThemeContext } from "../../App";

function useOutsideAlerter(ref, toggleEditStatus) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleEditStatus(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function Dashboard() {
  const wrapperRef = useRef();
  const { user } = useContext(ThemeContext);
  const [dashboard, setDashboard] = useState();
  const [dashboardsFiltered, setDashboardsFiltered] = useState([]);
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [displayDashboardInfo, toggleDisplayDashboardInfo] = useState(false);
  useOutsideAlerter(wrapperRef, toggleDisplayDashboardInfo);


  useEffect(() => {
    (async () => {
      setCompany(user?.permissaoInfo?.empresaId);

      const empresas = await Empresas.get();

      setCompanies(empresas);

      const perm = await Dashboards.get(`empresaId=${user?.permissaoInfo?.empresaId}`);

      const filteredDashboards = perm.filter((dash) => dash.status=="1"
      ||dash.status=="true").filter((dash) => dash?.permissoes.some(({ permissaoId }) => user?.permissaoInfo?.id === permissaoId) || user?.permissao === 1000);

      setDashboardsFiltered(filteredDashboards);
      setDashboard(filteredDashboards[0]?.id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const perm = await Dashboards.get(`empresaId=${company}`);
      console.log(perm)
      const filteredDashboards = perm.filter((dash) => dash.status=="1"
      ||dash.status=="true").filter((dash) => dash?.permissoes.some(({ permissaoId }) => user?.permissaoInfo?.id === permissaoId) || user?.permissao === 1000);

      setDashboardsFiltered(filteredDashboards);
      setDashboard(filteredDashboards[0]?.id);
    })();
  }, [company]);

  return (
    <Container>
      <div className="status">
        <h1>Dashboard</h1>
        <select
            placeholder="Dashboard"
            value={dashboard}
            onChange={(e) => setDashboard(e.target.value)}
          >
            {dashboardsFiltered?.length > 0 && dashboardsFiltered.map((dash) => <option key={dash.id} value={dash.id}>{dash.nome}</option>)}
        </select>
        <div className="dashboards-select">
          {user?.permissaoInfo?.level === 1000 && <>
            <span className="type">Empresa: </span>
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.nome}</option>)}
            </select>
          </>}  
        </div>
        <div className="float">
          <button onClick={() => { setDashboardsFiltered((prevState) => prevState.map((dash) => {
            if (dash?.id === Number(dashboard)) return ({
              ...dash, url: dash.url + '&random=' + Math.random().toString() });

            return dash;
          })) }}>
            <Refresh />
          </button>
          <button onClick={() => toggleDisplayDashboardInfo(!displayDashboardInfo)}>
            <Info />
          </button>
          {displayDashboardInfo && 
          <div className="dashboard-info" ref={wrapperRef}>
            <h5>{dashboardsFiltered?.find((dash) => dash?.id === Number(dashboard))?.descricao}</h5>
          </div>
          }
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
