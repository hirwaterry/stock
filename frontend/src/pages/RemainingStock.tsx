import { useEffect, useState } from 'react';
import axios from 'axios';

function RemainingStock() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemainingStock = async () => {
      try {
        const res = await axios.get('http://localhost:4000/rem', { withCredentials: true });
        setItems(res.data);
      } catch (err) {
        console.error('Failed to fetch remaining stock:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRemainingStock();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Remaining Items in Stock</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Name</th>
                <th className="px-4 py-2 text-left border">Category</th>
                <th className="px-4 py-2 text-left border">Remaining</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="border-t">
                  <td className="px-4 py-2 border">{item.name}</td>
                  <td className="px-4 py-2 border">{item.category}</td>
                  <td className={`px-4 py-2 border ${item.remaining < 0 ? 'text-red-500' : ''}`}>
                    {item.remaining}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <p className="mt-4 text-gray-500">No stock information available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default RemainingStock;
