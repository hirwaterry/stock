import { useEffect, useState } from 'react';
import axios from 'axios';

function AllItemsTable() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:4000/items', {
          withCredentials: true,
        });
        setItems(res.data);
      } catch (err) {
        setError('Failed to fetch items');
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-3">All Items</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300 rounded shadow table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border border-gray-300 text-left">Name</th>
            <th className="p-2 border border-gray-300 text-left">Category</th>
            
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td className="p-2 border border-gray-300">{item.name}</td>
              <td className="p-2 border border-gray-300">{item.category}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllItemsTable;
