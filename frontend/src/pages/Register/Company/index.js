import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import {
  AddBox,
  DisabledByDefault,
} from '@mui/icons-material';

import { Container } from './style';

import { maskCnpj, convertTel } from '../../../utils/maskConvert';

export default function RegisterCompany() {
  const [companyStatus, toggleCompanyStatus] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [logo, setLogo] = useState('');
  const [razaoSocial, setRazaoSocial] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [responsaveis, setResponsaveis] = useState([]);
  const [emailResponsavel, setEmailResponsavel] = useState('');
  const [telefoneResponsavel, setTelefoneResponsavel] = useState('');
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    if (messageError) {
      setTimeout(() => setMessageError(''), 10000);
    }
  }, [messageError]);

  const validateResponsavel = () => {
    const regexEmailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!responsavel) {
      setMessageError('Nome do responsável vazio');
      return true;
    }
    if (!regexEmailValidation.test(emailResponsavel)) {
      setMessageError('E-mail do responsável vazio ou em formato incorreto');
      return true;
    }
    if (!telefoneResponsavel || telefoneResponsavel.length < 14) {
      setMessageError('Telefone do responsável vazio');
      return true;
    }

    return false;
  };

  const onAddResponsavelButton = () => {
    if (validateResponsavel()) {
      return;
    }

    setResponsaveis((resp) => ([...resp, { nome: responsavel, email: emailResponsavel, telefone: telefoneResponsavel }]));
    setResponsavel('');
    setEmailResponsavel('');
    setTelefoneResponsavel('');
    return;
  };

  const onRemoveResponsavelButton = (index) => {
    setResponsaveis((resp) => resp.filter((_v, i) => i !== index));
  };

  console.log(logo, 'LGO');

  return (
    <Container>
      <h1>Cadastro de Empresas</h1>
      <div className="status">
        <span className="type">Status da empresa</span>
        <Switch
          size="medium"
          checked={companyStatus}
          onClick={() => toggleCompanyStatus(!companyStatus)}
        />
      </div>
      <form>
        <div>
          <label>
            <span>CNPJ</span>
            <input
              type="text"
              placeholder="XX.XXX.XXX/XXX-XX"
              value={maskCnpj(cnpj)}
              maxLength="18"
              onChange={(e) => setCnpj(e.target.value)}
            />
          </label>
          <label>
            <span>Logo</span>
            <div className="logo-corpo">
              <div style={{ backgroundImage:  logo && `url(${logo})` }} className="company-logo"/>
              <div>
                <span>Selecione o arquivo de logo (png, jpeg ou SVG)</span>
                <span className="button">Buscar arquivo</span>
              </div>
              <input
                type="file"
                value={logo.name}
                onChange={(e) => setLogo(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </div>
          </label>
          <label>
            <span>Razão Social</span>
            <input
              type="text"
              placeholder="Empresa LTDA"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
            />
          </label>
          <label>
            <span>Nome fantasia</span>
            <input
              type="text"
              placeholder="Empresa"
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
            />
          </label>
          <div>
            <label>
              <span>Responsável</span>
              <input
                style={{ border: messageError ? '1px solid red' : ''}}
                type="text"
                placeholder="Responsável"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </label>
            <label>
              <span>E-mail</span>
              <input
                style={{ border: messageError ? '1px solid red' : ''}}
                type="email"
                placeholder="responsavel@email.com"
                value={emailResponsavel}
                onChange={(e) => setEmailResponsavel(e.target.value)}
              />
            </label>
            <label>
              <span>Telefone</span>
              <input
                style={{ border: messageError ? '1px solid red' : ''}}
                type="text"
                placeholder="(11) 9.5555-5555"
                maxLength="16"
                value={convertTel(telefoneResponsavel)}
                onChange={(e) => setTelefoneResponsavel(e.target.value)}
              />
            </label>
            <button
              type="button"
              onClick={onAddResponsavelButton}
              className="icon icon-add"
            >
              <AddBox/>
            </button>
          </div>
            {messageError && <h3 style={{ color: 'red' }}>{messageError}</h3>}
          <br/>
          <ul>
            {responsaveis.map((resp, index) => 
              <>
                <li>
                  <b>Nome: </b>{resp.nome}, <b>E-mail: </b>{resp.email}, <b>Telefone: </b>{convertTel(resp.telefone)} <button className="icon icon-remove" onClick={() => onRemoveResponsavelButton(index)}><DisabledByDefault /></button>
                </li>
                <br/>
              </>)}
          </ul>
          <h3 className="date-register">Data do Cadastro: {new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</h3>
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
          >
            Cancelar
          </button>
        </div>
      </form>
    </Container>
  );
}
