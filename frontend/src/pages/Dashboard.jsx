// pages/Dashboard.jsx
import { useState } from 'react';
import AllItemsTable from '../components/AllItemsTable';
import StockInTable from '../components/StockInTable';
import StockOutTable from '../components/StockOutTable';
import Header from '../components/Header';
import RemainingStock from '../pages/RemainingStock';
import { Add01Icon } from 'hugeicons-react';
import AddUser from '../pages/AddUser';
import AddItem from '../pages/AddItem';
import Modal from 'react-modal'; // Import a modal library

const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  if (!user) {
    return <div className="p-6 text-center">Please login to continue...</div>;
  }

  return (
    <div className="p-6 mx-auto">
      <Header user={user} />

      <div className='flex mb-4 items-center justify-around'>
        <div className="flex gap-4 mb-4 w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-3 rounded-xl ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => setActiveTab('stockin')}
            className={`px-4 py-3 rounded-xl ${
              activeTab === 'stockin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            Stock In
          </button>
          <button
            onClick={() => setActiveTab('stockout')}
            className={`px-4 py-3 rounded-xl ${
              activeTab === 'stockout'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            Stock Out
          </button>
        </div>
        <div>
          <button
            className='px-4 w-40 font-light flex gap-2 py-3 rounded-xl bg-gray-200 text-black'
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            <Add01Icon /> Add New
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        {activeTab === 'all' && <AllItemsTable />}
        {activeTab === 'stockin' && <StockInTable />}
        {activeTab === 'stockout' && <StockOutTable />}
      </div>

      {/* Modal for AddUser */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add User Modal"
        className="fixed inset-0 flex items-center justify-center z-50" // Tailwind classes for modal
        overlayClassName="fixed inset-0 bg-gray-400/40 backdrop-blur-sm bg-opacity-50" // Tailwind classes for overlay
      >
        <div className="bg-white border relative p-6 rounded-xl shadow-lg">
          <AddItem />
          <button onClick={() => setIsModalOpen(false)} className="mt-4 absolute right-2 top-0 px-4 py-2 rounded text-black">X</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
