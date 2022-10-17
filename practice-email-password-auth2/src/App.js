import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import Main from './layout/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        index: true,
        element: <SignUp />
      },
      {
        path: '/signup',
        element: <SignUp />
      },
      {
        path: 'login',
        element: <Login />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
