import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorPage from './components/ErrorPage';
import From from './components/From';
import Home from './components/Home';
import Main from './components/Layout/Main';
import Login from './components/Login';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
      children: [
        {
          path: '/home',
          element: <Home></Home>,
        },
        {
          path: 'Register',
          element: <From></From>,
        },
        {
          path: 'login',
          element: <Login></Login>,
        },
      ],
  }
])


  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
