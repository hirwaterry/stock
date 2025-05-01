import { useState } from 'react';
import AllItemsTable from '../components/AllItemsTable';
import StockInTable from '../components/StockInTable';
import StockOutTable from '../components/StockOutTable';
import Header from '../components/Header';
import RemainingStock from './RemainingStock';
import StatCard from "../components/StatCard";
import Barchart from "../components/BarChart";
import TimeSelector from "../components/TimeSelector";
import { Users, Banknote, ImageIcon, Code } from "lucide-react";
import LineChart from '@/components/LineCharts';
import { DeliveryBox01Icon, PackageOutOfStockIcon, ShoppingBag02Icon, UserAccountIcon } from 'hugeicons-react';



const Home = ({ user }) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    return <div className="p-6 text-center">Please login to continue...</div>;
  }

  return (
    <div className="min-h-screen pt-5">
       <Header user={user} />
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard
            icon={<UserAccountIcon className="w-7 h-7 text-black" />}
            title="Users"
            value="10"
            period="Last 30 days"
            change={32.54}
            increasing={true}
          />
          <StatCard
            icon={<ShoppingBag02Icon className="w-7 h-7 text-black" />}
            title="Products"
            value="40"
            period="Last 30 days"
            change={32.54}
            increasing={false}
          />
          <StatCard
            icon={<DeliveryBox01Icon className="w-7 h-7 text-black" />}
            title="Remaining Stock"
            value="500"
            period="Last 30 days"
            change={32.54}
            increasing={true}
          />
          <StatCard
            icon={<PackageOutOfStockIcon className="w-7 h-7 text-black" />}
            title="Stock-Out"
            value="40"
            period="Last 30 days"
            change={32.54}
            increasing={true}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Total Products</h2>
              <TimeSelector defaultValue="6 months" options={["3 months", "6 months", "1 year"]} />
            </div>
            <Barchart />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
            </div>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
