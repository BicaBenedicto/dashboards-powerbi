import { useContext, useState } from 'react';
import { Tooltip } from '@mui/material';

import SignIn from './components/SignIn';
import ForgetPassword from './components/ForgetPassword';
import { ThemeContext } from '../../App';

const { Container } = require('./style');

export default function Login() {
  const { tooltipDetails } = useContext(ThemeContext);
  const [inSignInPage, toggleInSignInPage] = useState(true);

  return (
    <Container>
      {tooltipDetails && <Tooltip className='tooltip-layout' title="Yo" children={<div>{tooltipDetails.icon}<span>{tooltipDetails.text}</span><button onClick={() => setTooltipDetails('')}>X</button></div>}/>}
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
