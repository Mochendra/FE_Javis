import React, { useState } from 'react';
import api from '../api';
import { useNavigate, useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './animate.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { email, password });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

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
        <div className="login-card p-4 text-white shadow-lg animate-fade-in">
          <h4 className="text-center mb-4 fw-bold">Masuk ke Akun</h4>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input
                type="email"
                className="form-control bg-transparent text-white border-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Password</label>
              <div className="input-group">
                <input
                  type={show ? 'text' : 'password'}
                  className="form-control bg-transparent text-white border-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-light"
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
