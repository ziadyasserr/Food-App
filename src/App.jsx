import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import { ToastContainer } from 'react-toastify';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import Login from './modules/authentication/components/Login/Login';
import Register from './modules/authentication/components/Register/Register';
import Resetpass from './modules/authentication/components/Resetpass/Resetpass';
import ChangePass from './modules/authentication/components/changePass/ChangePass';
import CategorieData from './modules/categories/components/CategorieData/CategorieData';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import RecipeData from './modules/recipes/components/RecipeData/RecipeData';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import UsersList from './modules/users/components/UsersList/UsersList';

function App() {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forget-password', element: <ForgetPass /> },
        { path: 'reset-password', element: <Resetpass /> },
        { path: 'change-password', element: <ChangePass /> },
      ],
    },
    {
      path: 'dashboard',
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> },
        { path: 'catagorys', element: <CategoriesList /> },
        { path: 'catagory-data', element: <CategorieData /> },
        { path: 'users', element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
