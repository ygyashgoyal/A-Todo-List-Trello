// Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-sm py-4 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Yash Goyal. All rights reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://github.com/ygyashgoyal" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/yash-goyal-8642b1253/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            LinkedIn
          </a>
          {/* Add more links as needed */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
