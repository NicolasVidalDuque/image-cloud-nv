import Home from './assets/pages/Home.jsx';
import RegisterUserPage from './assets/pages/RegisterUserPage.jsx';
import LoginPage from './assets/pages/LoginPage.jsx';
import {Routes, Route} from 'react-router-dom';
import Layout from './assets/components/Layout.jsx';
import {UserContextProvider} from './assets/context/UserContext.jsx'
import './App.css'

function App(){
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/registerUser' element={<RegisterUserPage />}/>
          <Route path='/login' element={<LoginPage />}/>
        </Route>
      </Routes>
    </UserContextProvider>
  )
};
export default App;
