import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const axiosPublic = useAxiosPublic()

    // create or sign up
    const signUp = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // sign in
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // google sign in
    const googleProvider = new GoogleAuthProvider()
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    // logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update profile 
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })
    }

    // observe current user
    useEffect(() => {

        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("observe user on auth", currentUser);
            setUser(currentUser)

            if (currentUser) {
                // get token and store client site
                const userInfo = {
                    email: currentUser.email,
                }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data?.token) {
                            localStorage.setItem("access-resturant-token", res.data?.token);
                            setLoading(false)
                        }
                    })
            }
            else {
                // remove token
                localStorage.removeItem('access-resturant-token');
                setLoading(false)
            }

        })

        return () => unSubscribe()

    }, [axiosPublic])


    const authInfo = {
        loading,
        user,
        signUp,
        signIn,
        googleSignIn,
        logOut,
        updateUserProfile
    }

    console.log(auth);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;