import axios from 'axios';

import * as EmpresasService from './empresas.service';
import * as UsuariosService from './usuarios.service';
import * as DashboardsService from './dashboards.service';
import * as PermissoesService from './permissoes.service';

const URL = process.env.REACT_APP_API_URL || 'https://teste-dashboard.onrender.com';

const API = axios.create({
  baseURL: URL,
});

export default API;

export const Empresas = EmpresasService;
export const Usuarios = UsuariosService;
export const Dashboards = DashboardsService;
export const Permissoes = PermissoesService;
