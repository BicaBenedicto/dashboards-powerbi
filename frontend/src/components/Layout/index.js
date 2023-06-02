import { useEffect, useState, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AccountCircle,
  Menu
} from '@mui/icons-material';
import { Tooltip } from '@mui/material';

import { ThemeContext } from '../../App';
import MENU from '../../assets/menu';
import { Usuarios } from '../../services/api.service';

import { Container } from './style';
import logo from '../../assets/logo.png';

function useOutsideAlerter(ref, toggleEditStatus) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        toggleEditStatus(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function Layout({ children }) {
  const { user, setUser, tooltipDetails, setTooltipDetails } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [displayNameMenu, toggleDisplayNameMenu] = useState(false);
  const [displayProfileItems, toggleDisplayProfileItems] = useState(false);
  const MINUTES_REFRESH_USER = 5;
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, toggleDisplayProfileItems);

  useEffect(() => {
    if (user.id) {
      const intervalId = setInterval(() => {
      (async () => {
        const [userApi] = await Usuarios.get(`id=${user?.id}`);

        if (userApi?.empresa?.status === '0' || userApi?.empresa?.status === 'false') {
            localStorage.removeItem('@LOGIN');
            setUser({});
            navigate('/company-offline');
          }
          if (userApi?.status === '0' || userApi?.status === 'false') {
            localStorage.removeItem('@LOGIN');
            setUser({});
            navigate('/user-offline');
          }
        })();
      }, (MINUTES_REFRESH_USER * 60 * 1000));

      return () => clearInterval(intervalId);
    }
  },[user]);

  useEffect(() => {
    const userSaved = localStorage.getItem('@LOGIN');

    if(userSaved) {
      const userParse = JSON.parse(userSaved);
      setUser(userParse);
    }

    if (user.id) {
      (async () => {
        const [userApi] = await Usuarios.get(`id=${user?.id}`);

        if (userApi?.empresa?.status === '0' || userApi?.empresa?.status === 'false') {
          localStorage.removeItem('@LOGIN');
          setUser({});
          navigate('/company-offline');
        }
        if (userApi?.status === '0' || userApi?.status === 'false') {
          localStorage.removeItem('@LOGIN');
          setUser({});
          navigate('/user-offline');
        }
      })();
    }
  }, [setUser]);

  const onLogoutButton = () => {
    localStorage.removeItem('@LOGIN')
    setUser({});
    return navigate('/');
  };

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
        {
         // <button type="button" className="menu-button" onClick={() => toggleDisplayNameMenu(!displayNameMenu)}><Menu /></button>
        }
        {/* <h1>DataX - BI</h1> */}
        <div></div>
        <div></div>
        {/* <h4>{user?.empresa?.razaoSocial}</h4> */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => toggleDisplayProfileItems((prevState) => !prevState)} style={{ color: 'gray', background: 'transparent', border: 'none' }}>
            <AccountCircle />
          </button>
          {displayProfileItems && 
          <div className="profile-items" ref={wrapperRef}>
            <h5>{user?.email}</h5>
            <h4>{user?.permissaoInfo?.nome}</h4>
            {MENU.filter((item) => item.permission <= user?.permissao).map((item) => <button style={{ paddingTop: '5px', paddingBottom: '10px' }} onClick={() => navigate(item.path)}><h5>{item.name}</h5></button>)}
            <button onClick={onLogoutButton}><h4>Sair</h4></button>
          </div>
          }
        </div>
      </header>
      {tooltipDetails && <Tooltip
        className='tooltip-layout'
        children={
          <div>
            {tooltipDetails.icon}
            <span>{tooltipDetails.text}</span>
            <button onClick={() => setTooltipDetails('')}>{
            // Para ativar o fechar do tooltip, descomente o X
            // X
            }</button>
          </div>
      }/>}
      <section className='section-layout'>
        {//<aside className={`aside-layout ${displayNameMenu ? 'active' : ''}`}>
         // <nav>
         //   <ul>
         //     {MENU.filter((item) => item.permission <= Number(user?.permissao)).map((item) => 
         //       <li key={item.name}>
         //         <button type="button" onClick={() => {navigate(item.path); toggleDisplayNameMenu(false)}}>
         //         {item.icon}
         //         <span>{item.name}</span>
         //         </button>
         //       </li>
         //     )}
         //   </ul>
         // </nav>
         //</aside>
        }
        <main className='main-layout'>
          {children}
        </main>
      </section>
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <img src={logo} alt="logo" height="20px"/>
        <h6>DataX MTI - Todos os direitos reservados à Matos TI ₢ 2023</h6>
      </footer>
    </Container>
  );
}
