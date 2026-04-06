import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/*
 * ⚠️ IMPORTANTE: global.css se importa UNA SOLA VEZ acá.
 * global.css ya hace @import './variables.css' internamente.
 * Ningún componente debe importar global.css ni variables.css.
 * Los CSS Modules acceden a las variables porque están en :root.
 */
import './styles/global.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
