import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScr
root.render(
  <ThemeProvider theme={ theme }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
