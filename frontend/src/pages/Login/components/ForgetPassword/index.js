import { useState } from 'react';

const { Form } = require('./style');

export default function ForgetPassword({ toggleInSignInPage }) {
  const [email, setEmail] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      return console.log('HEY');
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
