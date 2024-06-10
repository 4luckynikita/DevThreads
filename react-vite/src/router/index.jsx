import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage/HomePage';
import ItemPage from '../components/ItemPage/ItemPage'
import CartPage from '../components/CartPage/CartPage';
import OrdersPage from '../components/OrdersPage/OrdersPage';
import Layout from './Layout';
import AboutPage from '../components/AboutPage/AboutPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/items/:id",
        element: <ItemPage />
      },
      {
        path: "/cart",
        element: <CartPage/>
      },
      {
        path: "/orders",
        element: <OrdersPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      },
      {
        path: "*",
        element: <h1>Page not found!</h1>
      }
    ],
  },
]);