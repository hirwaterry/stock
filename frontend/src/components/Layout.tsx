import { NameInitialsAvatar } from 'react-name-initials-avatar';
import Sidebar from './Sidebar';
import axios from 'axios';
import Avvvatars from 'avvvatars-react';

function Layout({ children }) {
  const handleLogout = async () => {
    await axios.get('http://localhost:4000/auth/logout', { withCredentials: true });
    window.location.reload();
  };

  return (
    <div className='overflow-hidden min-h-screen'>
      <div className='py-6 px-4 flex justify-between items-center border border-gray-300 fixed top-0 w-full bg-white z-10'>
        <h1 className='text-2xl font-medium'>Stock App</h1>
        <div className='flex items-center gap-3'>
          <Avvvatars value={'Dallas'} size={45} />
          <button className="bg-gray-200 text-black hover:bg-gray-800 hover:text-white px-5 py-3 rounded-lg font-light text-sm cursor-pointer" onClick={handleLogout} > Logout </button>
        </div>
      </div>
      <div className="flex bg-gray-100 min-h-screen min-w-full mt-20 border-black overflow-hidden">
        <Sidebar />
        <main className="ml-64 p-6 w-full">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
