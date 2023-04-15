import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  AddBox,
  DisabledByDefault,
  Delete
} from '@mui/icons-material';

import { Container } from './style';

import { Empresas, Dashboards } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

export default function EditDashboard() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1) && index !== (array.length - 2)).join('/');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [desc, setDesc] = useState('');
  const [dashboardStatus, toggleDashboardStatus] = useState(true);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();
      const [dashboard] = await Dashboards.get(`id=${params.id}`);

      setCompanies(empresas);
      setCompany(dashboard.empresaId);
      setName(dashboard.nome);
      setUrl(dashboard.url);
      setDesc(dashboard.descricao);
      toggleDashboardStatus(!!Number(dashboard.status));
      setCreatedAt(dashboard.createdAt);
    })();
  }, []);

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {
      await Dashboards.update(params.id, {
        nome: name,
        url,
        descricao: desc,
        empresaId: Number(company),
        status: dashboardStatus,
      });
      setTooltipDetails({ icon: 'sucess', text: 'Dashboard atualizado com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e });
    }
  };

  return (
    <Container>
      <div className="status">
        <h1>Edição de Dashboard</h1>
        <button
          type="button"
          style={{ alignItems: 'center', display: 'flex', backgroundColor: 'transparent', border: 'none', color: 'red' }}
          onClick={async () => {
            await Dashboards.remove(params.id);
            return navigate(pathnameBack);
          }}
        ><Delete /> Apagar empresa</button>
      </div>
      <form onSubmit={onSubmitDashboard}>
        <div>
          <label>
            <span>Nome</span>
            <input
              type="text"
              placeholder="Nome do dashboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            <span>URL</span>
            <input
              type="text"
              placeholder="https://powerbi.com/dashboard"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          <label>
            <span>Empresa</span>
            <select
              placeholder="Empresa"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            >
              {companies?.length > 0 && companies.map((comp) => <option key={comp.id} value={comp.id}>{comp.razaoSocial}</option>)}
            </select>
          </label>
          <h3 className="date-register">Data do Cadastro: {new Date(createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>

          <label>
            <span>Descrição</span>
            <textarea
              placeholder="Descrição sobre o proposito do dashboard"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
            Voltar
          </button>
        </div>
      </form>
    </Container>
  );
}
