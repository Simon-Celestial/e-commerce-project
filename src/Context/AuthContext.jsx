import React, {useState,useCallback} from "react";
import {Bounce, toast} from "react-toastify";



export const AuthContext = React.createContext({
    adminAccess: null,
    setAdminAccess: () => {
    },
    handleExit: () => {},
    token: null,
});

export const AuthContextProvider = ({children}) => {

    const [adminAccess, setAdminAccess] = useState(null);
    const [token,setToken] = useState(localStorage.token);


    const handleExit = useCallback(() => {
        delete localStorage.token;
        setToken(undefined);
        setAdminAccess(false)
        toast.success('You are logged off', {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }, [setToken,setAdminAccess])

    return (
        <AuthContext.Provider value={{
            adminAccess,
            setAdminAccess,
            token,
            handleExit
        }}>
            {children}
        </AuthContext.Provider>
    );
};
