import React, {useState, useCallback, useEffect, useMemo} from "react";
import {Bounce, toast} from "react-toastify";
import axios from "axios";




export const AuthContext = React.createContext({
    handleExit: () => {},
    token: null,
    setToken: () => {},
    categoryData: null,
    setCategoryData: () => {},
    setShouldUpdate: () => {},
    orders: null,
    calculateOrderPrice : () => {},
});

export const AuthContextProvider = ({children}) => {

    const [token,setToken] = useState(localStorage.token);
    const [categoryData, setCategoryData] = useState(null);
    const [orders,setOrders] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(Date.now());



    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("http://localhost:8000/orders");
                setOrders(response.data);
            } catch (error) {
                console.error('Axios error:', error);
            }
        })();
    }, [shouldUpdate]);



    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    const handleExit = useCallback(() => {
        delete localStorage.token;
        setToken(null);
        toast.success('You are logged off', {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }, [setToken]);

    const calculateOrderPrice = useMemo(() => (order) => {
        const productTotal = order?.products.reduce((total, product) => total + product.salePrice * product.count, 0);
        const shippingCost = order?.shippingMethod === "pickup" ? 2.50 : 7.50;
        return (productTotal + shippingCost).toFixed(2);
    }, []);

    return (
        <AuthContext.Provider value={{
            token,
            handleExit,
            setToken: (token) => {
                localStorage.setItem("token", token);
                setToken(token);
            },
            categoryData,
            setCategoryData,
            setShouldUpdate,
            orders,
            calculateOrderPrice
        }}>
            {children}
        </AuthContext.Provider>
    );
};
