import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DeliveryBox01Icon, Home01Icon, MessageUpload01Icon, ShoppingBag02Icon, UserGroupIcon } from 'hugeicons-react';

function Sidebar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-full fixed w-64 text-black/80 space-y-4">
      <div className="bg-white border border-gray-300 border-t-0 px-2 py-7 h-full">
        <nav className="flex flex-col space-y-2">
          <Link
            to="/"
            className={`flex gap-2 py-4 px-3 rounded-xl ${
              activeLink === '/' ? 'bg-black text-white' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveLink('/')}
          >
            <Home01Icon /> Home
          </Link>
          <Link
            to="/products"
            className={`flex gap-2 py-4 px-3 rounded-xl ${
              activeLink === '/products' ? 'bg-black text-white' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveLink('/products')}
          >
            <ShoppingBag02Icon /> Products
          </Link>
          <Link
            to="/stock"
            className={`flex gap-2 py-4 px-3 rounded-xl ${
              activeLink === '/stock' ? 'bg-black text-white' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveLink('/stock')}
          >
            <MessageUpload01Icon /> Stock
          </Link>
          <Link
            to="/remaining-stock"
            className={`flex gap-2 py-4 px-3 rounded-xl ${
              activeLink === '/remaining-stock' ? 'bg-black text-white' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveLink('/remaining-stock')}
          >
            <DeliveryBox01Icon /> Remaining Stock
          </Link>
          <Link
            to="/add-user"
            className={`flex gap-2 py-4 px-3 rounded-xl ${
              activeLink === '/add-user' ? 'bg-black text-white' : 'hover:bg-gray-300'
            }`}
            onClick={() => setActiveLink('/add-user')}
          >
            <UserGroupIcon /> Add User
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;