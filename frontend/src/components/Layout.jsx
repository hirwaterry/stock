// components/Layout.jsx
import Sidebar from './Sidebar';

function Layout({ children }) {
  return (
    <div className="flex px-5 py-5 bg-gray-100 min-h-screen min-w-full border border-black overflow-hidden">
      <Sidebar />
      <main className="ml-64 p-6 w-full">{children}</main>
    </div>
  );
}

export default Layout;
