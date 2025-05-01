import axios from 'axios';

function Header({ user }) {
  const handleLogout = async () => {
    await axios.get('http://localhost:4000/auth/logout', { withCredentials: true });
    window.location.reload();
  };

  return (
    <div className="flex gap-2 items-center mb-5">
      <h1 className="text-2xl font-bold">Welcome Back, </h1>
      <h1 className="text-2xl font-light">{user.username}</h1>
    </div>
  );
}

export default Header;
