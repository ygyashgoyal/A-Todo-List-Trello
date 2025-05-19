import React from "react";

function Navbar({ user, handleLogin, handleLogout }) {
  return (
    <nav className="w-full bg-gray-800 text-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 z-50">
      <div className="text-2xl font-bold tracking-wide">🧠 TaskBoard</div>

      {user ? (
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-200"
        >
          Login with Google
        </button>
      )}
    </nav>
  );
}

export default Navbar;
