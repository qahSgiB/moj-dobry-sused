import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Template from './components/Template/Template.tsx'
import ErrorFallback from './components/ErrorFallback/ErrorFallback.tsx'
import RouteNotFound from './components/RouteNotFound/RouteNotFound.tsx'

import Home from './pages/Home.tsx'
import Add from './pages/Add.tsx'
import Detail from './pages/Detail.tsx'
import Profile from './pages/profile/Profile.tsx'

import './index.css'



const router = createBrowserRouter([
  {
    element: <Template />,
    errorElement: <ErrorFallback />,
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
      {
        path: 'profile',
        element: <Profile/>
      },
      {
        path: '*',
        element: <RouteNotFound />
      }
    ]
  },
]);


const queryClient = new QueryClient();



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <RouterProvider router={ router } />
    </QueryClientProvider>
  </React.StrictMode>,
)
