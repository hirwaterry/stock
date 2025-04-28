// src/pages/AddItem.jsx
import { useState } from 'react';
import axios from 'axios';

function AddItem() {
  const [form, setForm] = useState({
    name: '', price: '', description: '', category: '', quantity: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/items', form, { withCredentials: true });
      setMessage('Item added successfully!');
      setForm({ name: '', price: '', description: '', category: '', quantity: '' });
    } catch (err) {
      setMessage('Failed to add item.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Add Item</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full border p-2" required />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full border p-2" required />
        <input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="w-full border p-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Add Item</button>
      </form>
    </div>
  );
}

export default AddItem;
