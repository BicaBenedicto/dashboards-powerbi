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
  const { user, setUser } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, toggleDisplayPassword] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const user = await Usuarios.login({ email, senha: password });

      if(!user) throw new Error('Usuário não encontrado');
      setUser(user);
      localStorage.setItem('@LOGIN', JSON.stringify(user));
      return ;
    } catch (e) {
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    const userSaved = localStorage.getItem('@LOGIN');

    if(userSaved) {
      const userParse = JSON.parse(userSaved);
      setUser(userParse);
    }

    if (user?.id) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
