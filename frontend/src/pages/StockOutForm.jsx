// pages/StockOutForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

function StockOutForm() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ product: '', quantity: 0 });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/items', { withCredentials: true })
      .then((res) => setProducts(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/stock/out', form, { withCredentials: true });
      setMessage('Stock removed');
      setForm({ product: '', quantity: 0 });
    } catch (err) {
      setMessage('Failed to remove stock');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Add Stock Out</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <select value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="w-full p-2 border" required>
          <option value="">Select Item</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        <input type="number" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="w-full p-2 border" required />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Add Stock Out</button>
      </form>
    </div>
  );
}

export default StockOutForm;
