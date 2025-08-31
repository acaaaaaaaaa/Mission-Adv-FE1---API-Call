import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/redux/userSlice';
import './LoginReg.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const dispatch = useDispatch();
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Kata sandi dan konfirmasi tidak cocok!");
      return;
    }

    if (password.length < 6) {
      alert("Password minimal 6 karakter!");
      return;
    }

    try {
      const result = await dispatch(createUser({ email, password, myMovies: [] })).unwrap();
      if (result) {
        alert("Akun berhasil dibuat! Silakan login.");
        navigate('/login');
      }
    } catch (error) {
      alert("Gagal membuat akun: " + error);
    }
  };
  return (
    <div className="auth-page" style={{ backgroundImage: "url(/images/daftar.jpg)" }}>
      <div className="auth-card">
        <img src="/images/icon-chill.png" alt="Chill" className="logo-img" />
        <h2 className="judul-auth">Daftar</h2>
        <p className="subjudul-auth">Selamat datang!</p>

        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <div className="label-wrapper">
              <label className="nama-inp">Email</label>
            </div>
            <input
              type="email" required
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <div className="label-wrapper">
              <label className="nama-inp">Kata Sandi</label>
            </div>
            <div className="password-input">
              <input
                type={showPassword1 ? 'text' : 'password'}
                placeholder="Masukkan kata sandi" required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa ${showPassword1 ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                onClick={() => setShowPassword1(!showPassword1)}
              ></i>
            </div>
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label className="nama-inp">Konfirmasi Kata Sandi</label>
            </div>
            <div className="password-input">
              <input
                type={showPassword2 ? 'text' : 'password'}
                placeholder="Konfirmasi kata sandi" required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i
                className={`fa ${showPassword2 ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                onClick={() => setShowPassword2(!showPassword2)}
              ></i>
            </div>
          </div>

          <div className="form-footer">
            <span>Sudah punya akun? <Link to="/login" className="linkk">Masuk</Link></span>
          </div>

          <button type="submit">Daftar</button>

          <div className="separator">Atau</div>

          <button type="button" className="google-btn">
            <Link to="/register-google" className="google-btn-link">
              <img src="/images/google.png" alt="google" className="logo-g" />
            Daftar dengan Google
            </Link> 
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
