import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GoogleRegist';

function ResetPassword() {
  return (
    <div className="authpage" style={{ backgroundImage: "url(/images/daftar.jpg)" }}>
      <div className="authcard">
        <h2 className="judulauth">Reset Kata Sandi</h2>
        <p className="subjudulauth">Masukkan email untuk reset password</p>
        <form>
          <input type="email" required placeholder="Masukkan email" />
          <button type="submit">
            <Link to="/register" className="beranda-btn">
                Kirim Link Reset
            </Link>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
