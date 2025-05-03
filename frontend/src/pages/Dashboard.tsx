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
    <div className="mx-auto">
      <div className="">
        {activeTab === 'all' && <AllItemsTable />}
        {activeTab === 'stockin' && <StockInTable />}
        {activeTab === 'stockout' && <StockOutTable />}
      </div>
    </div>
  );
};

export default Dashboard;
