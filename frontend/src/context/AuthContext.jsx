import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../config";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(()=>{
        const unsubscribe = () => {
            axios.get(apiUrl+"auth/user")
                .then((res) => {
                    console.log(res.data.user);
                    setCurrentUser(res.data.user);
                })
                .catch((error) => {
                    console.log(error.message)
                });
        };
        return () => {
            unsubscribe();
        }
    },[]);

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
};