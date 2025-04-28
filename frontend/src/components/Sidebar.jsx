// components/Sidebar.jsx
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col py-6 px-4 space-y-4 fixed">
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
  );
}

export default Sidebar;
