import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { dummyUserData } from '../assets/assets';
import { useSelector } from 'react-redux';
import { Loading, Sidebar } from './../components';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector(state => {
    console.log('🚀 ~ Layout ~ state.user:', state.user);
    return state.user.value;
  });
  return user ? (
    <div className='w-full flex h-screen'>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className='flex-1 bg-slate-50'>
        <Outlet />
      </div>
      {sidebarOpen ? (
        <X
          className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      ) : (
        <Menu
          className='absolute top-3 right-3 p-2 z-100 bg-white rounded-md shadow w-10 h-10 text-gray-600 sm:hidden'
          onClick={() => setSidebarOpen(true)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
};

export default Layout;
