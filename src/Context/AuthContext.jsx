import React, {useState} from "react";


export const AuthContext = React.createContext({
    adminAccess: null,
    setAdminAccess: () => {
    },
    token: null,
});

export const AuthContextProvider = ({children}) => {

    const [adminAccess, setAdminAccess] = useState(null);
    const [token,setToken] = useState(localStorage.token);

    return (
        <AuthContext.Provider value={{
            adminAccess,
            setAdminAccess,
            token
        }}>
            {children}
        </AuthContext.Provider>
    );
};
