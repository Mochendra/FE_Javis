import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './animate.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    // ubah background halaman
    if(darkMode) {
      document.body.classList.add('bg-blue-dark');
    } else {
      document.body.classList.remove('bg-blue-dark');
    }
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    const res = await api.post('/auth/login', { email, password }, );
    navigate('/dashboard');

    } catch (err) {
      const msg = err?.response?.data?.error || 'Login gagal';
      toast.error(msg, { position: 'top-center', duration: 3000 });

      const form = document.querySelector('.login-form');
      if (form) {
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 400);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-container d-flex justify-content-center align-items-center vh-100">
        <div className={`login-card p-4 shadow-lg animate-fade-in ${darkMode ? 'dark' : ''}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold">Masuk ke Akun</h4>
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setDarkMode((prev) => !prev)}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label className={`form-label ${darkMode ? 'text-white' : 'text-dark'}`}>Email</label>
              <input
                type="email"
                className={`form-control ${darkMode ? 'bg-secondary text-white border-light' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className={`form-label ${darkMode ? 'text-white' : 'text-dark'}`}>Password</label>
              <div className="input-group">
                <input
                  type={show ? 'text' : 'password'}
                  className={`form-control ${darkMode ? 'bg-secondary text-white border-light' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className={`btn btn-outline-light`}
                  onClick={() => setShow((s) => !s)}
                >
                  {show ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-light w-100 mt-3 fw-semibold login-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Sedang masuk...
                </>
              ) : (
                'Login'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
