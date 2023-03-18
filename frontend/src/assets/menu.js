import {
  Leaderboard,
  AccountCircle,
  AppRegistration,
  Group,
  Business,
  Sell,
} from '@mui/icons-material';

const MENU = [
  {
    name: 'Dashboard',
    icon: <Leaderboard />,
    path: '/dashboard',
    permission: 1,
  },
  {
    name: 'Perfil',
    icon: <AccountCircle />,
    path: '/profile',
    permission: 1,
  },
  {
    name: 'Painel Administrativo',
    icon: <AppRegistration />,
    path: '/dashboard-admin',
    permission: 2,
    children: [
      {
        name: 'Usuários',
        path: '/users',
        icon: <Group />,
        permission: 2,
      },
      {
        name: 'Empresas',
        path: '/companies',
        icon: <Business />,
        permission: 1000,
      },
      {
        name: 'Dashboards',
        path: '/dashboards',
        icon: <Leaderboard />,
        permission: 1000,
      },
      {
        name: 'Permissões',
        path: '/permissions',
        icon: <Sell />,
        permission: 1000,
      },
    ],
  },
];

export default MENU;
