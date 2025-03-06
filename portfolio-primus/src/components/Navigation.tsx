import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/primus-high-resolution-logo-transparent-cropped.svg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a nav item
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[#2A2E3D]/95 backdrop-blur-sm shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-[#00FF85] text-4xl font-bold">
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#00FF85] transition">
              HOME
            </Link>
            <a
              href="/#expertise"
              className="text-white hover:text-[#00FF85] transition"
            >
              EXPERTISE
            </a>
            <a
              href="/#portfolio"
              className="text-white hover:text-[#00FF85] transition"
            >
              PORTFOLIO
            </a>
            <a
              href="/#experience"
              className="text-white hover:text-[#00FF85] transition"
            >
              EXPERIENCE
            </a>
            <a
              href="/#contact"
              className="text-white hover:text-[#00FF85] transition"
            >
              CONTACT
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-[#00FF85] transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1E2231] mt-4 p-4 rounded-md shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-white hover:text-[#00FF85] transition py-2"
                onClick={handleNavClick}
              >
                HOME
              </Link>
              <a
                href="/#expertise"
                className="text-white hover:text-[#00FF85] transition py-2"
                onClick={handleNavClick}
              >
                EXPERTISE
              </a>
              <a
                href="/#portfolio"
                className="text-white hover:text-[#00FF85] transition py-2"
                onClick={handleNavClick}
              >
                PORTFOLIO
              </a>
              <a
                href="/#experience"
                className="text-white hover:text-[#00FF85] transition py-2"
                onClick={handleNavClick}
              >
                EXPERIENCE
              </a>
              <a
                href="/#contact"
                className="text-white hover:text-[#00FF85] transition py-2"
                onClick={handleNavClick}
              >
                CONTACT
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
