import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes.jsx'
import './index.css'


const router = createBrowserRouter(routes)

const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router={router} />)

window.switchTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
};