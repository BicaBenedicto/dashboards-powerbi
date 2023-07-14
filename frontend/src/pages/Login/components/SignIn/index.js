import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';

import { ThemeContext } from '../../../../App';

import { Usuarios } from '../../../../services/api.service';

const { Form } = require('./style');

export default function SignIn({ toggleInSignInPage }) {
  const { user, setUser, setTooltipDetails } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, toggleDisplayPassword] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const userApi = await Usuarios.login({ email, senha: password });

      if(!userApi) {
        setTooltipDetails({ icon: 'error', text: 'Usuário(a) não encontrado'});
        return;
      };
      if(userApi?.empresa?.status === '0' || userApi?.empresa?.status === 'false') {
        localStorage.removeItem('@LOGIN');
        setUser({});
        return navigate('/company-offline');
      }

      if (userApi?.status === '0' || userApi?.status === 'false') {
        localStorage.removeItem('@LOGIN');
        setUser({});
        return navigate('/user-offline');
      }

      setUser(userApi);
      localStorage.setItem('@LOGIN', JSON.stringify(userApi));
      setTooltipDetails({ icon: 'sucess', text: 'Logado com sucesso'});
      return navigate('/dashboard');
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: 'E-mail e/ou senha incorretos, por favor tente novamente'});
    }
  };

  // useEffect(() => {
  //   const userSaved = localStorage.getItem('@LOGIN');

  //   if(userSaved) {
  //     const userParse = JSON.parse(userSaved);
  //     setUser(userParse);
  //   }

  //   if (user?.id) {
  //     (async () => {
  //       const [userApi] = await Usuarios.get(`id=${user?.id}`);

  //       if (userApi?.empresa?.status === '0') {
  //         localStorage.removeItem('@LOGIN');
  //         setUser({});
  //         navigate('/company-offline');
  //       }
  //       if (userApi?.empresa?.status === '1') {
  //         navigate('/dashboard');
  //       }
  //     })();
  //   }
  // }, []);

  return (
    <Form onSubmit={onSubmitForm}>
      <label>
        <span>E-mail</span>
        <input
          type="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Senha</span>
        <input
          type={displayPassword ? 'text' : 'password'}
          value={password}
          placeholder="Senha"
          autoComplete="false"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => toggleDisplayPassword(!displayPassword)}
          className="display-password"
        >
          {displayPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
        </button>
      </label>
      <button
        type="button"
        className="forget-password"
        onClick={() => toggleInSignInPage(false)}
      >
        Esqueci a senha?
      </button>
      <button
        type="submit"
        className="submit"
      >
        Entrar
      </button>
    </Form>
  );
}
