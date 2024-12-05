import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

import { ToastContainer } from 'react-toastify';
import ChangePass from './modules/authentication/components/ChangePass/ChangePass';
import ForgetPass from './modules/authentication/components/ForgetPass/ForgetPass';
import Login from './modules/authentication/components/Login/Login';
import Register from './modules/authentication/components/Register/Register';
import Resetpass from './modules/authentication/components/Resetpass/Resetpass';
import Verify from './modules/authentication/components/Verify/Verify';
import CategoriesList from './modules/categories/components/CategoriesList/CategoriesList';
import Dashboard from './modules/dashboard/components/Dashboard/Dashboard';
import Favorites from './modules/favorites/components/Favorites/Favorites';
import RecipeForm from './modules/recipes/components/RecipeForm/RecipeForm';
import RecipesList from './modules/recipes/components/RecipesList/RecipesList';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import NotFound from './modules/shared/components/NotFound/NotFound';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
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
        { path: 'verify', element: <Verify /> },
        { path: 'forget-password', element: <ForgetPass /> },
        { path: 'reset-password', element: <Resetpass /> },
        { path: 'change-password', element: <ChangePass /> },
      ],
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'recipes', element: <RecipesList /> },
        { path: 'favorites', element: <Favorites /> },
        { path: 'recipes/new-recipe', element: <RecipeForm /> },
        { path: 'recipes/:recipeId', element: <RecipeForm /> },
        { path: 'categories', element: <CategoriesList /> },
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
