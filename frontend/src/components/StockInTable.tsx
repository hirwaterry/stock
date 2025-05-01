import { useEffect, useState } from 'react';
import axios from 'axios';

function StockInTable() {
  const [stockInRecords, setStockInRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStockIn = async () => {
      try {
        const res = await axios.get('http://localhost:4000/stock/in', {
          withCredentials: true,
        });
        setStockInRecords(res.data);
      } catch (err) {
        setError('Failed to fetch stock-in history');
      }
    };

    fetchStockIn();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">Stock In History</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded shadow table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left">Item</th>
            <th className="p-2 border border-gray-300 text-left">Quantity</th>
            <th className="p-2 border border-gray-300 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {stockInRecords.map((record) => (
            <tr key={record._id}>
              <td className="p-2 border border-gray-300">{record.product?.name}</td>
              <td className="p-2 border border-gray-300">{record.quantity}</td>
              <td className="p-2 border border-gray-300">{new Date(record.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockInTable;
