import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/primus-high-resolution-logo-transparent-cropped.svg'; // Import the logo SVG

export default function Navigation() {
  return (
    <nav className="fixed w-full bg-[#2A2E3D]/95 backdrop-blur-sm z-50 py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-[#00FF85] text-4xl font-bold"><img src={logo} alt="Logo" className="logo-image" /></Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#00FF85] transition">HOME</Link>
            <a href="/#expertise" className="text-white hover:text-[#00FF85] transition">EXPERTISE</a>
            <a href="/#portfolio" className="text-white hover:text-[#00FF85] transition">PORTFOLIO</a>
            <a href="/#experience" className="text-white hover:text-[#00FF85] transition">EXPERIENCE</a>
            <a href="/#contact" className="text-white hover:text-[#00FF85] transition">CONTACT</a>
          </div>
        </div>
      </div>
    </nav>
  );
}