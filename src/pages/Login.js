import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/redux/userSlice';
import './LoginReg.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Harap isi email dan password.");
      return;
    }

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      if (result) {
        navigate('/');
      }
    } catch (error) {
      alert(error || "Email atau password salah!");
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: "url(/images/bg-login.jpg)" }}>
      <div className="auth-card">
        <img src="/images/icon-chill.png" alt="Chill" className="logo-img" />
        <h2 className="judul-auth">Masuk</h2>
        <p className="subjudul-auth">Selamat datang kembali!</p>

        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <div className="label-wrapper">
              <label className="nama-inp">Email</label>
            </div>
            <input type="email" required placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className="form-group">
            <div className="label-wrapper">
              <label className="nama-inp">Kata Sandi</label>
            </div>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'} required
                placeholder="Masukkan kata sandi"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'} eye-icon`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          <div className="form-footer">
            <span>Belum punya akun? <Link to="/register" className="linkk">Daftar</Link></span>
            <Link to="/reset-password" style={{ float: 'right' }} className='linkk'>Lupa kata sandi?</Link>
          </div>

          <button type="submit">Masuk</button>

          <div className="separator">Atau</div>

          <button type="button" className="google-btn">
            <Link to="/register-google" className="google-btn-link">
              <img src="/images/google.png" alt="google" className="logo-g" />
              Masuk dengan Google
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
