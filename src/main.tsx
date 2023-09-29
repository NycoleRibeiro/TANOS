import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import { MainRoutes } from './routes';
import './style.sass';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <MainRoutes />
    </AuthProvider>
  </BrowserRouter>
);
