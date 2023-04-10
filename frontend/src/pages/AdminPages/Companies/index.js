import { Switch } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Edit,
} from '@mui/icons-material';

import { Container } from './style';
import Table from '../../../components/Table';

import { Empresas } from '../../../services/api.service';
import { maskCnpj } from '../../../utils/maskConvert';
import { ThemeContext } from "../../../App";

const StatusSwitch = ({ company, callback }) => {
  const initStatus = Boolean(company?.status);
  const [status, setStatus] = useState(initStatus);

  const onSwitchChange = async () => {
    await callback(company, !status);
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

export default function AdminPagesCompanies() {
  const { setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameBack = location.pathname.split('/').filter((_v, index, array) => index !== (array.length - 1)).join('/');
  const [companies, setCompanies] = useState([]);
  const [companiesToSend, setCompaniesToSend] = useState([]);
  const [headerTable, setHeaderTable] = useState([]);

  useEffect(() => {
    (async () => {
      const empresas = await Empresas.get();

      if (empresas.length === 0) {
        setCompanies([]);
        setHeaderTable([]);
        return;
      }

      const empresasFormatted = empresas.map((company) => {
        return ({
          id: company.id,
          Nome: company.nome,
          'Razão social': company.razaoSocial,
          CNPJ: maskCnpj(company.cnpj),
          'Data de criação': new Date(company.createdAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          'Ultima atualização': new Date(company.updatedAt).toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
          Status: company.id !== 1 ? <StatusSwitch key={company.id} company={company} callback={companiesToSendDefine} /> : '',
          Editar: company.id !== 1 ? <ButtonEdit key={company.id} id={company.id}/> : ''
        })
      });

      const header = Object.entries(empresasFormatted[0]).map((dash, index) => ({
        id: dash[0],
        numeric: !isNaN(Number(dash[1])),
        disablePadding: false,
        label: dash[0],
      }));

      setCompanies(empresasFormatted);
      setHeaderTable(header);
    })();
  }, []);

  const companiesToSendDefine = async (companies, status) => {
    return setCompaniesToSend((companiesToSend) => ([...companiesToSend, {...companies, status}]));
  };

  const onSubmitCompanies = async (e) => {
    e.preventDefault();
    try {
      await Promise.all(companiesToSend.map((company) => Empresas.update(company.id, {
          status: company.status,
        })
      ));
      setTooltipDetails({ icon: 'sucess', text: 'Status das empresas salvos com sucesso'});
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: e});
    }
  };

  return (
    <Container>
      <h1>Empresas</h1>
      <div className="status">
        <button
          type="button"
          className="submit"
          onClick={() => navigate(`${location.pathname}/register`)}
        >
          Cadastrar nova empresa
        </button>
      </div>
      <form onSubmit={onSubmitCompanies}>
        <div className="formatted">
          <label style={{ width: '95%', margin: '0 auto' }}>
            <Table
              rows={companies}
              headCells={headerTable}
              title="Empresas cadastradas"
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
