import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Template } from './components/Template'
import ErrorFallback from './components/ErrorFallback/ErrorFallback.tsx'
import RouteNotFound from './components/RouteNotFound/RouteNotFound.tsx'
import { AuthLoggedIn, AuthLoggedOut } from './components/Auth'

import Home from './pages/Home.tsx'
import Add from './pages/Add.tsx'
import Detail from './pages/Detail.tsx'
import Login from './pages/profile/Login.tsx'
import Signup from './pages/profile/Signup.tsx'
import Profile from './pages/profile/Profile.tsx'
import DebugMe from './pages/profile/DebugMe.tsx'

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
        path: 'add', // unconnected
        element: <Add/>
      },
      {
        path: 'detail', // unconnected
        element: <Detail/>
      },
      {
        path: 'debug-me', // unconnected
        element: <DebugMe/>
      },
      {
        path: '*',
        element: <RouteNotFound />
      },
      {
        element: <AuthLoggedIn/>,
        children: [
          {
            path: 'profile',
            element: <Profile/>
          },
        ]
      },
      {
        element: <AuthLoggedOut/>,
        children: [
          {
            path: 'login',
            element: <Login/>
          },
          {
            path: 'signup',
            element: <Signup/>
          }
        ]
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
