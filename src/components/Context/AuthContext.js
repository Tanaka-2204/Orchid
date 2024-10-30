import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'; 
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const googleProvider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const googleSignIn = async () => {
            await signInWithPopup(auth, googleProvider);
    };

    const logOut = async () => {
            await signOut(auth);
            navigate('/'); 
    };
    const isAdmin = () => {
        return user && user.email === 'khoabdse170432@fpt.edu.vn'; 
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};