import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx';
import './style/artigos.css';
import './style/modern-articles.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import { PaginaArtigos } from './pages/PaginaArtigos.tsx';
import { Layout } from './components/Layout.tsx';
import { PaginaDetalhesArtigo } from './pages/PaginaDetalhesArtigo.tsx';
import { PaginaFormularioArtigo } from './pages/PaginaFormularioArtigo.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <PaginaArtigos/>
      },
      {
        path: 'sobre',
        element: <PaginaArtigos/>
      },
      {
        path: 'sobre/adicionar',
        element: <PaginaFormularioArtigo/>,
      },
      {
        path: 'sobre/editar/:artigoId',
        element: <PaginaFormularioArtigo/>,
      },
      {
        path: 'sobre/:artigoId',
        element: <PaginaDetalhesArtigo/>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
