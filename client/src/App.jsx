import Home from './assets/pages/Home.jsx';
import RegisterUserPage from './assets/pages/RegisterUserPage.jsx';
import {Routes, Route} from 'react-router-dom';
import Layout from './assets/components/Layout.jsx';
import './App.css'

function App(){
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/registerUser' element={<RegisterUserPage />}/>
      </Route>
    </Routes>
  )
};
export default App;
