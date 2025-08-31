import React, { useState } from 'react';
import './GoogleRegist.css';
import { Link } from 'react-router-dom';

function GoogleRegister() {
  return (
    <div className="authpage" style={{ backgroundImage: "url(/images/daftar.jpg)" }}>
      <div className="authcard">
        <img src="/images/icon-chill.png" alt="Chill" className="logoimg" />
        <h2 className="judulauth">Daftar dengan Google</h2>
        <p className="subjudulauth">Lengkapi data dari akun Google kamu</p>
        <form>
          <input type="text" required placeholder="Nama lengkap dari Google" />
          <input type="text" required placeholder="Username" />
          <button type="submit">
            <Link to="/dashboard" className="dashboard-btn">
                Lanjutkan
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoogleRegister;
