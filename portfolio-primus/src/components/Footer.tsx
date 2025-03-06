import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#2A2E3D] py-8 border-t border-white/10">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="text-[#00FF85] text-4xl font-bold mb-4">P</Link>
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} by Primus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}