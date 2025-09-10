import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {AppProvider} from './context/AppContext.jsx'
// Render the main application wrapped with routing and context providers
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppProvider>
      <App />
    </AppProvider>
  </BrowserRouter>,
)
