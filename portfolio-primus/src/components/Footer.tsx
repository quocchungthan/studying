import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/primus-high-resolution-logo-transparent-cropped.svg'; // Import the logo SVG

export default function Footer() {
  return (
    <footer className="bg-[#2A2E3D] py-8 border-t border-white/10">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="text-[#00FF85] text-4xl font-bold mb-4">
            <img src={logo} alt="Logo" className="logo-image" />
          </Link>
          <p className="text-white/70 text-sm">© 2015 by Primus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}