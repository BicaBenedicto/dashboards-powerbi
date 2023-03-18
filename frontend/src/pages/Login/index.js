import { useState } from 'react';


import SignIn from './components/SignIn';
import ForgetPassword from './components/ForgetPassword';

const { Container } = require('./style');

export default function Login() {

  const [inSignInPage, toggleInSignInPage] = useState(true);

  return (
    <Container>
      <h1 id="title-login">Dashboard de Power BI</h1>
      <section>
        <h3>{inSignInPage ? 'Login' : 'Recuperar senha'}</h3>
        <div className="linhas">
          <hr className={inSignInPage ? 'active' : ''}/>
          <hr className={!inSignInPage ? 'active' : ''}/>
        </div>
        {inSignInPage ? <SignIn toggleInSignInPage={toggleInSignInPage}/>: <ForgetPassword toggleInSignInPage={toggleInSignInPage}/>}
      </section>
    </Container>
  );
}
