// src/pages/AddItem.jsx
import { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';


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
    <div className="w-[40vh]">
      <h2 className="text-xl font-semibold mb-4">Add Item</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full" required />
        <Input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="w-full" required />
        <Input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full" required />
        <Input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full" required />
        <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} placeholder="Quantity" className="w-full" required />
        <Button type="submit" className="bg-green-600 text-white px-4 py-6 w-full rounded-xl">Add Item</Button>
      </form>
    </div>
  );
}

export default AddItem;
