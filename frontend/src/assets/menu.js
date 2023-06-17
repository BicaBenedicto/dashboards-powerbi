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
    name: 'Configurações',
    icon: <AppRegistration />,
    path: '/dashboard-admin',
    permission: 1000,
    children: [
      {
        name: 'Empresas',
        path: '/companies',
        icon: <Business />,
        permission: 1000,
      },
      {
        name: 'Usuários',
        path: '/users',
        icon: <Group />,
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
