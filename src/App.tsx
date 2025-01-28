
import './App.css'
import { useReducer } from 'react';
import UserReducer from './components/UserReducer';
import UserContext from './components/UserContext';
import { router } from './Router';
import { RouterProvider } from 'react-router';
import { emptyUser } from './components/UserContext';

function App() {

  const [user, userDispatch] = useReducer(UserReducer, emptyUser)

  return (
    <>

      <UserContext value={{ user, userDispatch }}>
        <RouterProvider router={router} />
      </UserContext>

    </>
  )
}

export default App
