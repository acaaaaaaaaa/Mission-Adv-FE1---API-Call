import React, { useRef, useState } from 'react';
import './Footer.css';

const genres = [
  'Aksi', 'Drama', 'Komedi', 'Sains & Alam',
  'Anak-anak', 'Fantasi Ilmiah & Fantasi', 'Petualangan', 'Thriller',
  'Anime', 'Kejahatan', 'Perang', 'Romantis',
  'Britania', 'Kdrama' 
];

const Footer = () => {
  return (
    <footer className="footer">
      {/* Kelompok 1 */}
      <div className="footer-left">
        <img src="/images/icon-chill.png" alt="logo" className="footer-logo" />
        <p className="footer-copy">©2025 dev by putri yuni aqsyah</p>
      </div>

      {/* Kelompok 2 */}
      <div className="footer-middle">
        <h4>Genre</h4>
        <div className="genre-grid">
            <div className="genre-col">
                <span>Aksi</span>
                <span>Anak-anak</span>
                <span>Anime</span>
                <span>Britania</span>
            </div>
            <div className="genre-col">
                <span>Drama</span>
                <span>Fantasi Ilmiah & Fantasi</span>
                <span>Kejahatan</span>
                <span>Kdrama</span>
            </div>
            <div className="genre-col">
                <span>Komedi</span>
                <span>Petualangan</span>
                <span>Perang</span>
                <span>Romantis</span>
            </div>
            <div className="genre-col">
                <span>Sains & Alam</span>
                <span>Thriller</span>
            </div>
        </div>
      </div>

      {/* Kelompok 3 */}
      <div className="footer-right">
        <h4>Bantuan</h4>
        <ul>
          <li>FAQ</li>
          <li>Kontak Kami</li>
          <li>Privasi</li>
          <li>Syarat & Ketentuan</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
