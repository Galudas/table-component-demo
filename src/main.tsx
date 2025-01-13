import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TableComponent from './TableComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TableComponent />
  </StrictMode>,
)
