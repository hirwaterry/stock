import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import './App.css'; 
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AddItem from './pages/AddItem';
import AddUser from './components/AddUser';
import RemainingStock from './pages/RemainingStock';
import StockInForm from './pages/StockInForm';
import StockOutForm from './pages/StockOutForm';
import Home from './pages/Home';
import Stock from './pages/Stock';
import Users from './pages/Users';

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://localhost:4000/auth/auth-check', {
          withCredentials: true,
        });
        if (res.data.authenticated) {
          setUser(res.data.user || { username: 'admin' });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth) {
    return <div className="text-center mt-20 text-lg">Checking authentication...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login onLogin={setUser} />}
        />

        {user && (
          <>
            <Route
              path="/"
              element={
                <Layout>
                  <Home user={user} />
                </Layout>
              }
            />
            <Route
              path="/products"
              element={
                <Layout>
                  <Dashboard user={user} />
                </Layout>
              }
            />
            <Route
              path="/add-item"
              element={
                <Layout>
                  <AddItem />
                </Layout>
              }
            />
            <Route
              path="/stock"
              element={
                <Layout>
                  <Stock />
                </Layout>
              }
            />
            <Route
              path="/add-user"
              element={
                <Layout>
                  <Users />
                </Layout>
              }
            />
            <Route path="remaining-stock" element={<Layout><RemainingStock /></Layout>} />
            <Route
              path="/stock-in"
              element={
                <Layout>
                  <StockInForm />
                </Layout>
              }
            />
            <Route
              path="/stock-out"
              element={
                <Layout>
                  <StockOutForm />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
