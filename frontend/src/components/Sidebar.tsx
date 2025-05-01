import { Add01Icon, DeliveryBox01Icon, Download01Icon, Home01Icon, MailDownload01Icon, MessageUpload01Icon, ShoppingBag02Icon, Upload01Icon, UserGroupIcon } from 'hugeicons-react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-full fixed w-64 text-black/80 space-y-4">
      <div className='bg-white border border-gray-300 border-t-0 px-2 py-7 h-full'>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <Home01Icon/> Home
          </Link>
          <Link to="/products" className="hover:bg-gray-300 flex gap-2 py-4 px-2 rounded-xl">
            <ShoppingBag02Icon/>Products
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
