import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import MENU from '../../assets/menu';
import { ThemeContext } from "../../App";

import { Container } from './style';

export default function Dashboard() {
  const { user } = useContext(ThemeContext)
  const navigate = useNavigate();
  const params = window.location.pathname;

  const ITEMS = MENU.find((item) => item.path === params).children;
  return (
    <Container>
      <h1>Painel Administrativo</h1>
      <ul>
        {ITEMS.filter((item) => item.permission <= Number(user.permissao)).map((item) => <li><button type="button" onClick={() => navigate(`${params}${item.path}`)}>{item.icon}<span>{item.name}</span></button></li>)}
      </ul>
    </Container>
  );
}
