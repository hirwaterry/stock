// components/Header.jsx
import axios from 'axios';

function Header({ user }) {
  const handleLogout = async () => {
    await axios.get('http://localhost:4000/auth/logout', { withCredentials: true });
    window.location.reload();
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Welcome, {user.username} 👋</h1>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Header;
