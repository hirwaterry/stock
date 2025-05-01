import { useState } from 'react';
import axios from 'axios';
import { Alert01Icon, LockPasswordIcon } from "hugeicons-react";
import { Input } from "../components/ui/input"
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:4000/auth/login',
        { username, password },
        { withCredentials: true }
      );
      onLogin(res.data.user);  // Pass the logged-in user data
    } catch (err) {
      setError(err.response?.data || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen text-gray-800 bg-white flex items-center justify-center">
      <div className=' w-[40vh]'>
        <div className='mb-5 space-y-1'>
          <h2 className="text-2xl text-gray-800 font-bold">Login</h2>
          <p className='text-gray-700 font-extralight text-sm'>Enter your username and password to login in!</p>
        </div>
        <form onSubmit={handleSubmit}>

          <Input 
            placeholder='username@user' 
            type="text"
            className='p-2 h-13 mb-3 w-full'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          
          <div className="relative mb-4">
            <Input 
              placeholder={`Password`} 
              type={showPassword ? 'text' : 'password'}
              className='p-2 h-13 w-full'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-0 bottom-0 select-none flex items-center my-auto h-full cursor-pointer text-sm text-blue-300"
            >
              {showPassword ? 'Hide' : 'Show'}
            </div>
          </div>
          <button
            className="w-full bg-gray-100 text-black rounded-xl py-4 hover:bg-gray-200"
            type="submit"
          >
            Login
          </button>
          {error && <p className="bg-red-500/80 text-white text-sm py-3 rounded-lg mt-2 absolute left-0 right-0 top-4 flex items-center gap-2 w-[40vh] mx-auto border justify-center"> <Alert01Icon/> {error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
