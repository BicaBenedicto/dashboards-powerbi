import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react';

import Layout from './components/Layout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import DashboardAdmin from './pages/DashboardAdmin';
import Register from './pages/Register';
import Edit from './pages/Edit';
import AdminPages from './pages/AdminPages';

export const ThemeContext = createContext(null);

export default function App() {
  const [user, setUser] = useState({});

  const context = {
    user,
    setUser,
  };

  return (
    <ThemeContext.Provider value={context}>
      <Routes>
        <Route path="/dashboard-admin/companies/register" element={ <Layout><Register.Company /></Layout> } />
        <Route path="/dashboard-admin/dashboards/register" element={ <Layout><Register.Dashboard /></Layout> } />
        <Route path="/dashboard-admin/users/register" element={ <Layout><Register.User /></Layout> } />
        <Route path="/dashboard-admin/permissions/register" element={ <Layout><Register.Permissions /></Layout> } />

        <Route path="/dashboard-admin/companies/edit/:id" element={ <Layout><Edit.Company /></Layout> } />
        <Route path="/dashboard-admin/dashboards/edit/:id" element={ <Layout><Edit.Dashboard /></Layout> } />
        <Route path="/dashboard-admin/users/edit/:id" element={ <Layout><Edit.User /></Layout> } />
        <Route path="/dashboard-admin/permissions/edit/:id" element={ <Layout><Edit.Permissions /></Layout> } />

        <Route path="/dashboard-admin/companies" element={ <Layout><AdminPages.Company /></Layout> } />
        <Route path="/dashboard-admin/dashboards" element={ <Layout><AdminPages.Dashboard /></Layout> } />
        <Route path="/dashboard-admin/users" element={ <Layout><AdminPages.User /></Layout> } />
        <Route path="/dashboard-admin/permissions" element={ <Layout><AdminPages.Permissions /></Layout> } />

        <Route path="/dashboard-admin" element={ <Layout><DashboardAdmin /></Layout> } />
        <Route path="/dashboard" element={ <Layout><Dashboard /></Layout> } />
        <Route path="/profile" element={ <Layout><Profile /></Layout> } />
        <Route path="/" element={ <Login /> } exact />
      </Routes>
    </ThemeContext.Provider>
  );
}