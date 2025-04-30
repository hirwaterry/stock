// components/Sidebar.jsx
import { Add01Icon, DeliveryBox01Icon, Download01Icon, Home01Icon, MailDownload01Icon, MessageUpload01Icon, Upload01Icon, UserGroupIcon } from 'hugeicons-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-full fixed top-0 w-64 py-5 text-black/80 space-y-4">
      <div className='bg-white border border-gray-300 px-2 py-7 h-full rounded-2xl'>
        <h1 className="text-2xl font-bold mb-6">📊 APADE Stock</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <Home01Icon/> Home
          </Link>
          <Link to="/add-item" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <Add01Icon/>Add Item
          </Link>
          <Link to="/stock-in" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <MessageUpload01Icon/> Stock In
          </Link>
          <Link to="/stock-out" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <MailDownload01Icon/> Stock Out
          </Link>
          <Link to="/remaining-stock" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <DeliveryBox01Icon/> Remaining Stock
          </Link>
          <Link to="/add-user" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <UserGroupIcon/> Add User
          </Link>

          
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
