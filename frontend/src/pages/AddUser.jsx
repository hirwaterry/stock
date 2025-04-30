// src/pages/AddUser.jsx
import { useState } from 'react';
import axios from 'axios';
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"

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
    <div className="w-[40vh] mx-auto">
      <h2 className="text-xl font-semibold mb-4">Add User</h2>
      {message && <p className="mb-3 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-5"
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full"
          required
        />
        <Button type="submit" className=" text-white px-4 py-2 rounded">Add User</Button>
      </form>
    </div>
  );
}

export default AddUser;
