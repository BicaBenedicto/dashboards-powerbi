import { useContext, useState } from 'react';
import { ThemeContext } from '../../../../App';

const { Form } = require('./style');

const { Usuarios } = require('../../../../services/api.service');

export default function ForgetPassword({ toggleInSignInPage }) {
  const { setTooltipDetails } = useContext(ThemeContext);
  const [email, setEmail] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await Usuarios.forgetPassword({ email });
      setTooltipDetails({ icon: 'sucess', text: 'E-mail de recuperação de senha enviado com sucesso'});
      return toggleInSignInPage(true);
    } catch (e) {
      setTooltipDetails({ icon: 'error', text: 'Erro ao enviar e-mail para recuperação de senha'});
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
      <button
        type="submit"
        className="submit"
      >
        Recuperar a senha
      </button>
      <button
        type="button"
        className="back"
        onClick={() => toggleInSignInPage(true)}
      >
        Voltar
      </button>
    </Form>
  );
}
