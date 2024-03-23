import { useState, createContext, useEffect, useContext } from "react";
import {  onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, getUserByEmail } from "firebase/auth"
import auth from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    // const signup = (email, password) => {
    //    return createUserWithEmailAndPassword(auth, email, password);
    // };

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    const logout = () =>{
        return signOut(auth);
    };

    const resetPassword = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    },[]);

    return <AuthContext.Provider value={{currentUser, logout, login, resetPassword}}>
        {!loading && children}
    </AuthContext.Provider>
};

export default AuthProvider;

export const useAuth = () =>{
    return useContext(AuthContext);
};