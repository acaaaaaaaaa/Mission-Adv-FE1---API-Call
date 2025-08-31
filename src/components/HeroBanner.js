import React, { useRef, useState } from 'react';
import './HeroBanner.css';

function HeroBanner() {
  return (
    <section
      className="hero-banner"
      style={{ backgroundImage: "url('/images/hero-duty.png')" }}
    >
      <div className='gradasi'></div>
      <div className="hero-content">
        <h1>Duty After School</h1>
        <p>
          Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan, Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan dalam perang.
        </p>
        <div className="hero-buttons">
          <button className="btn-start">Mulai</button>
          <button className="btn-more">Selengkapnya</button>
          <span className="age-tag">18+</span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;