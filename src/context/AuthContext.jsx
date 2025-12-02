// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            const uidCookie = Cookies.get("uid");

            if (!uidCookie && user) {
                // If cookies are gone but Firebase session exists → sign out
                signOut(auth);
                setCurrentUser(null);
            } else {
                setCurrentUser(user);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
