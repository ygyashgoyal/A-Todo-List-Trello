import TaskBoard from "./components/Taskboard";
import React, { useState, useEffect } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Navbar */}
      <Navbar user={user} handleLogin={handleLogin} handleLogout={handleLogout} />

      <main className="container mx-auto px-4 py-10">
        {/* Header Section */}
        <div className="mb-10 text-center my-10 ">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow">
            📝 Task Board
          </h1>
          <p className="text-gray-300 mt-2 text-lg">Organize. Focus. Accomplish.</p>
        </div>

        {/* Main Content */}
        {user ? (
          <TaskBoard user={user} />
        ) : (
          <div className="relative flex justify-center items-center h-[75vh] text-center rounded-xl overflow-hidden shadow-lg">
            {/* Background Image */}
            <img
              src="/background" // ✅ Make sure this is placed inside /public
              alt="Background"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-10 z-0"
            />

            {/* Optional Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-gray-900/60 z-0" />

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center space-y-6 max-w-xl px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow">
                Welcome to TaskBoard 🚀
              </h2>
              <p className="text-lg text-gray-200">
                Organize your day, track progress, and boost productivity. Log in to start managing your tasks like a pro.
              </p>
              <button
                onClick={handleLogin}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition duration-200"
              >
                Login with Google
              </button>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
}

export default App;
