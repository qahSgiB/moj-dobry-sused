import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.tsx'
import Add from './pages/Add.tsx'
import Profile from './pages/Profile.tsx'

import './index.css'



const router = createBrowserRouter([
  {
    index: true,
    element: <Home/>
  },
  {
    path: 'add',
    element: <Add/>
  },
  {
    path: 'profile',
    element: <Profile/>
  },
]);



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>,
)
