import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { MainRoutes } from './routes'
import './style.sass'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <MainRoutes />
  </BrowserRouter>,
)
