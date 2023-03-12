import { useState } from 'react';
import {
  VisibilityOutlined,
  VisibilityOffOutlined,
} from '@mui/icons-material';

const { Form } = require('./style');

export default function SignIn({ toggleInSignInPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, toggleDisplayPassword] = useState(false);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      return;
    } catch (e) {
      console.error(e);
    }
  };

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
