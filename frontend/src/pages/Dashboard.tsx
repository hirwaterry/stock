import { useState } from 'react';
import AllItemsTable from '../components/AllItemsTable';
import StockInTable from '../components/StockInTable';
import StockOutTable from '../components/StockOutTable';
import Header from '../components/Header';
import RemainingStock from './RemainingStock';



const Dashboard = ({user}) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    return <div className="p-6 text-center">Please login to continue...</div>;
  }

  return (
    <div className="p-6 mx-auto">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-3 rounded-xl ${
            activeTab === 'all'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          All Products
        </button>
        <button
          onClick={() => setActiveTab('stockin')}
          className={`px-4 py-3 rounded-xl ${
            activeTab === 'stockin'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Stock In
        </button>
        <button
          onClick={() => setActiveTab('stockout')}
          className={`px-4 py-3 rounded-xl ${
            activeTab === 'stockout'
              ? 'bg-black text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Stock Out
        </button>
      </div>

      <div className=" ">
        {activeTab === 'all' && <AllItemsTable />}
        {activeTab === 'stockin' && <StockInTable />}
        {activeTab === 'stockout' && <StockOutTable />}
      </div>
    </div>
  );
};

export default Dashboard;
