import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { ThemeContext } from '../../App';
import MENU from '../../assets/menu';
import { Usuarios } from '../../services/api.service';

import { Container } from './style';

export default function Layout({ children }) {
  const { user, setUser, tooltipDetails, setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [displayNameMenu, toggleDisplayNameMenu] = useState(false);
  const MINUTES_REFRESH_USER = 5;

  useEffect(() => {
    const intervalId = setInterval(() => {
      (async () => {
        const [userApi] = await Usuarios.get(`id=${user?.id}`);
        if (userApi?.empresa?.status === '0') {
          localStorage.removeItem('@LOGIN');
          setUser({});
          navigate('/company-offline');
        }
      })();
  }, (MINUTES_REFRESH_USER * 60 * 1000));

    return () => clearInterval(intervalId);
  },[]);

  useEffect(() => {
    const userSaved = localStorage.getItem('@LOGIN');

    if(userSaved) {
      const userParse = JSON.parse(userSaved);
      setUser(userParse);
    }

    (async () => {
      const [userApi] = await Usuarios.get(`id=${user?.id}`);

      if (userApi?.empresa?.status === '0') {
        localStorage.removeItem('@LOGIN');
        setUser({});
        navigate('/company-offline');
      }
    })();
  }, [setUser]);

  useEffect(() => {
    if (MENU.some((item) => (location.pathname.includes(item.path) || location.pathname === item.path) && (
      item.permission > Number(user.permissao)
      || !user.nome
      ))) {
      if (!user.nome) navigate('/');
      else navigate('/dashboard');
    }
  }, [location, user, navigate]);

  return (
    <Container>
      <header className='header-layout'>
        <button type="button" className="menu-button" onClick={() => toggleDisplayNameMenu(!displayNameMenu)}><Menu /></button>
        <h1>Dashboards Power BI</h1>
        <div>
          <h4>{user?.nome}</h4>
          <span>{user?.permissaoInfo?.nome}</span>
        </div>
      </header>
      {tooltipDetails && <Tooltip className='tooltip-layout' title="Yo" children={<div>{tooltipDetails.icon}<span>{tooltipDetails.text}</span><button onClick={() => setTooltipDetails('')}>X</button></div>}/>}
      <section className='section-layout'>
        <aside className={`aside-layout ${displayNameMenu ? 'active' : ''}`}>
          <nav>
            <ul>
              {MENU.filter((item) => item.permission <= Number(user?.permissao)).map((item) => 
                <li key={item.name}>
                  <button type="button" onClick={() => {navigate(item.path); toggleDisplayNameMenu(false)}}>
                  {item.icon}
                  <span>{item.name}</span>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </aside>
        <main className='main-layout'>
          {children}
        </main>
      </section>
    </Container>
  );
}
