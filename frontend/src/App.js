import { Routes, Route } from 'react-router-dom'

import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';

export default function App() {
  return (
    <Routes>
      <Route path="/register-company" element={ <Layout><Register.Company /></Layout> } />
      <Route path="/" element={ <Login /> } exact />
    </Routes>
  );
}
