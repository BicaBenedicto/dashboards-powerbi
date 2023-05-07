import { useContext, useState } from 'react';
import { Tooltip } from '@mui/material';

import SignIn from './components/SignIn';
import ForgetPassword from './components/ForgetPassword';
import { ThemeContext } from '../../App';

import logo from '../../assets/logo.png';

const { Container } = require('./style');

export default function Login() {
  const { tooltipDetails } = useContext(ThemeContext);
  const [inSignInPage, toggleInSignInPage] = useState(true);

  return (
    <Container>
      {tooltipDetails && <Tooltip className='tooltip-layout' title="Yo" children={<div>{tooltipDetails.icon}<span>{tooltipDetails.text}</span><button onClick={() => setTooltipDetails('')}>X</button></div>}/>}
      <header>
        <img className="logo-datax" src={logo} alt="logo"/>
      </header>
      <section>
        <h3>{inSignInPage ? 'Login' : 'Recuperar senha'}</h3>
        <div className="linhas">
          <hr className={inSignInPage ? 'active' : ''}/>
          <hr className={!inSignInPage ? 'active' : ''}/>
        </div>
        {inSignInPage ? <SignIn toggleInSignInPage={toggleInSignInPage}/>: <ForgetPassword toggleInSignInPage={toggleInSignInPage}/>}
      </section>
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={logo} alt="logo" height="20px"/>
        <h6>DataX MTI - Todos os direitos reservados à Matos TI ₢ 2023</h6>
      </footer>
    </Container>
  );
}
