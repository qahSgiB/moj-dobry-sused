import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Template from './components/Template/Template.tsx'

import Home from './pages/Home.tsx'
import Add from './pages/Add.tsx'
import Detail from './pages/Detail.tsx'

import './index.css'



const router = createBrowserRouter([
  {
    element: <Template />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'add',
        element: <Add/>
      },
      {
        path: 'detail',
        element: <Detail/>
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
