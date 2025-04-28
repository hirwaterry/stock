// pages/Dashboard.jsx
import { useState } from 'react';
import AllItemsTable from '../components/AllItemsTable';
import StockInTable from '../components/StockInTable';
import StockOutTable from '../components/StockOutTable';
import Header from '../components/Header';
import RemainingStock from '../pages/RemainingStock';



const Dashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    return <div className="p-6 text-center">Please login to continue...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Header user={user} />

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded ${
            activeTab === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          All Items
        </button>
        <button
          onClick={() => setActiveTab('stockin')}
          className={`px-4 py-2 rounded ${
            activeTab === 'stockin'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Stock In
        </button>
        <button
          onClick={() => setActiveTab('stockout')}
          className={`px-4 py-2 rounded ${
            activeTab === 'stockout'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Stock Out
        </button>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {activeTab === 'all' && <AllItemsTable />}
        {activeTab === 'stockin' && <StockInTable />}
        {activeTab === 'stockout' && <StockOutTable />}
      </div>
    </div>
  );
};

export default Dashboard;
