import axios from 'axios';

import * as EmpresasService from './empresas.service';
import * as UsuariosService from './usuarios.service';
import * as DashboardsService from './dashboards.service';
import * as PermissoesService from './permissoes.service';

const URL = 'http://192.168.15.76:4000';

const API = axios.create({
  baseURL: URL,
});

export default API;

export const Empresas = EmpresasService;
export const Usuarios = UsuariosService;
export const Dashboards = DashboardsService;
export const Permissoes = PermissoesService;
