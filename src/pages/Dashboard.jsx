import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './animate.css'; // 🎨 Tambahkan file CSS baru

export default function Dashboard() {
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get('/dashboard')
      .then((res) => {
        setMsg(res.data.message);
        setUser(res.data.user || { name: 'Pengguna' });
      })
      .catch(() => navigate('/login'));
  }, [navigate]);

  const handleLogout = async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="dashboard-card text-white p-5 text-center shadow-lg animate-fade-in">
        <h2 className="fw-bold mb-3">Selamat Datang 👋</h2>
        <h4 className="mb-3">{user?.name || 'User'}</h4>
        <p className="lead mb-4">{msg || 'Berhasil masuk ke sistem.'}</p>

        <div className="d-flex justify-content-center gap-3">
          {/* <button
            className="btn btn-outline-light px-4 py-2 fw-semibold"
            onClick={() => navigate('/profile')}
          >
            Profil
          </button> */}

          <button
            className="btn btn-light px-4 py-2 fw-semibold dashboard-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
