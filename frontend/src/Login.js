// src/Login.js
import { useEffect, useState } from "react";
import { auth, provider, signInWithPopup, signOut as firebaseSignOut } from "./firebase";

export default function LoginBar({ onUser }) {
  const [user, setUser] = useState(null);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    setUser(user);
    onUser(user); // pass to parent
  };

  const logout = () => {
    firebaseSignOut(auth);
    setUser(null);
    onUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      onUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="p-4 flex justify-end gap-2">
      {user ? (
        <>
          <span>Hello, {user.displayName}</span>
          <button onClick={logout} className="bg-red-500 text-white px-2 py-1 rounded">Logout</button>
        </>
      ) : (
        <button onClick={login} className="bg-blue-600 text-white px-2 py-1 rounded">Sign in with Google</button>
      )}
    </div>
  );
}
