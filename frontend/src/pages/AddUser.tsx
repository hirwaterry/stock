import { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/users', form, { withCredentials: true });
      setMessage('User created successfully!');
      setForm({ username: '', password: '' });
    } catch (err) {
      setMessage('Failed to create user.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="username" value={form.username} onChange={handleChange} placeholder="Username" className="w-full border p-2" required />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
