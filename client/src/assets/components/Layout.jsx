import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';

export default function Layout(){
  return (
    <div className='App'>
      <Header />
      <main className='main-content'>
        <Outlet />
      </main>
     </div>
  )
}
