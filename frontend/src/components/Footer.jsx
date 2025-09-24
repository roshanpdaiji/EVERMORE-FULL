import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-4 text-center">
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-4">
          <Link to="/" className="hover:text-white text-sm">Home</Link>
          <Link to="/about" className="hover:text-white text-sm">About</Link>
          <Link to="/contact" className="hover:text-white text-sm">Contact</Link>
          <Link to="/shop" className="hover:text-white text-sm">Shop</Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} MyStore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
