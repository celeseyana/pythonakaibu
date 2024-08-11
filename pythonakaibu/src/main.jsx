import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainThing from './components/MainThing.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainThing />
  </StrictMode>,
)
