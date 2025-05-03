import React, { useState } from 'react'
import StockInTable from '../components/StockInTable';
import StockOutTable from '../components/StockOutTable';

const Stock = () => {

    const [activeTab, setActiveTab] = useState('stockin');

    return (
        <div>
            <div className="mt-7 flex gap-4">
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

            <div className=" pt-6">
                {activeTab === 'stockin' && <StockInTable />}
                {activeTab === 'stockout' && <StockOutTable />}
            </div>
        </div>
  )
}

export default Stock
