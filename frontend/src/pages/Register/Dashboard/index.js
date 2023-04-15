import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { Container } from './style';

import { Empresas, Dashboards } from '../../../services/api.service';
import { ThemeContext } from "../../../App";

export default function RegisterDashboard() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [company, setCompany] = useState('');
  const [companies, setCompanies] = useState([]);
  const [desc, setDesc] = useState('');
  const [dashboardStatus, toggleDashboardStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();

      setCompanies(empresas);
      setCompany(empresas[0].id);
    })();
  }, []);

  const onSubmitDashboard = async (e) => {
    e.preventDefault();
    try {
      await Dashboards.create({
        nome: name,
        url,
        descricao: desc,
        empresaId: Number(company),
        status: dashboardStatus,
      });

      setName('');
      setUrl('');
      setDesc('');
      setTooltipDetails({ icon: 'sucess', text: 'Dashboard cadastrado com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <h1>Cadastro de Dashboard</h1>
      <div className="status">
        <span className="type">Status do dashboard</span>
        <Switch
          size="medium"
          checked={dashboardStatus}
          onClick={() => toggleDashboardStatus(!dashboardStatus)}
        />
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
          <h3 className="date-register">Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>

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
            Criar
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
