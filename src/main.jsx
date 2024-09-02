// main.js ou index.js (dependendo do seu projeto)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './pages/home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from './pages/NotFound.jsx';
import { UserAuthContextProvider } from './components/UserAuthContext.jsx';
import Login from './pages/login.jsx';
import HomeUser from './pages/HomeUser.jsx';
import ProtectedRouter from './components/protectedRouter.jsx';
import Publication from './pages/publication.jsx';
import Profile from './pages/profile.jsx';
import About from './pages/About.jsx';
import Feedback from './pages/feedback.jsx';
import Contact from './pages/Contact.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/home',
    element: (
      <ProtectedRouter>
        <HomeUser />
      </ProtectedRouter>
    ),
    children: [
      {
        path: '/home/:pubID', // Rota relativa a /home
        element: (
          <ProtectedRouter>
            <Publication />
          </ProtectedRouter>),
      },
    ],
  },
  {
    path: '/profile',
    element: (
      <ProtectedRouter>
        <Profile />
      </ProtectedRouter>
    ),
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/feedback',
    element: <Feedback />,
  },
  {
    path: '/contact',
    element: <Contact />,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <RouterProvider router={router} />
    </UserAuthContextProvider>
  </React.StrictMode>,
);
