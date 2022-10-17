import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/layout/Main';
import LoginBootstrap from './components/LoginBootstrap';
import RegisterReactBootstrap from './components/RegisterReactBootstrap';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: <RegisterReactBootstrap />
      },
      {
        path: '/register',
        element: <RegisterReactBootstrap />
      },
      {
        path: '/login',
        element: <LoginBootstrap />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
