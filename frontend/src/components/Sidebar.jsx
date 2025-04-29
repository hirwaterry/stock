// components/Sidebar.jsx
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-full fixed top-0 w-64 py-5 text-white space-y-4">
      <div className='bg-gray-800 p-2 h-full rounded-2xl'>
        <h1 className="text-2xl font-bold mb-6">📊 APADE Stock</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/" className="hover:bg-gray-700 p-2 rounded">
            🏠 Home
          </Link>
          <Link to="/add-item" className="hover:bg-gray-700 p-2 rounded">
            ➕ Add Item
          </Link>
          <Link to="/stock-in" className="hover:bg-gray-700 p-2 rounded">
            📥 Stock In
          </Link>
          <Link to="/stock-out" className="hover:bg-gray-700 p-2 rounded">
            📤 Stock Out
          </Link>
          <Link to="/remaining-stock" className="hover:bg-gray-700 p-2 rounded">
            📦 Remaining Stock
          </Link>
          <Link to="/add-user" className="hover:bg-gray-700 p-2 rounded">
            👤 Add User
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
