import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ThemeContext } from '../../App';
import MENU from '../../assets/menu';

import { Container } from './style';

export default function Layout({ children }) {
  const { user, setUser } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const [displayNameMenu, toggleDisplayNameMenu] = useState(false);

  useEffect(() => {
    const userSaved = localStorage.getItem('@LOGIN');

    if(userSaved) {
      const userParse = JSON.parse(userSaved);
      setUser(userParse);
    }
  }, []);

  useEffect(() => {
    if (MENU.some((item) => (location.pathname.includes(item.path) || location.pathname === item.path) && (
      item.permission > Number(user.permissao)
      || !user.nome
      ))) {
      if (!user.nome) navigate('/');
      else navigate('/dashboard');
    }
  }, [location]);

  return (
    <Container>
      <header className='header-layout'>
        <h1>Dashboards Power BI</h1>
        <div>
          <h4>{user?.nome}</h4>
          <span>{user?.permissaoInfo?.nome}</span>
        </div>
      </header>
      <section className='section-layout'>
        <aside className='aside-layout'>
          <nav>
            <ul>
              {MENU.filter((item) => item.permission <= Number(user?.permissao)).map((item) => 
                <li key={item.name}>
                  <button type="button" onClick={() => navigate(item.path)}>
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
