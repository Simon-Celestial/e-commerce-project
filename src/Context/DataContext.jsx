import React, {useCallback, useEffect, useState, useMemo} from "react";
import axios from "axios";
import {Bounce, toast} from "react-toastify";

export const DataContext = React.createContext({
    productsLoading: true,
    productsData: null,
    fetchUserName: () => {
    },
    accountDetails: null,
    access: false,
    handleClearStorage: () => {
    },
    quickView: false,
    setQuickView: () => {
    },
    selectedProduct: [],
    setSelectedProduct: () => {
    },
    setCurrencyState: () => {
    },
    currencyState: "azn",
    currencyConverter: () => {}
})
export const DataContextProvider = ({
                                        children,
                                    }) => {
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsData, setProductsData] = useState(null);
    const [access, setAccess] = useState(false);
    const [accountDetails, setAccountDetails] = useState(null);
    const [quickView, setQuickView] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [currencyState, setCurrencyState] = useState("azn");


    const fetchUserName = useCallback(async () => {
        try {
            const response = await axios.get("http://localhost:8000/user");
            const users = response?.data;
            const userInStorageString = localStorage.getItem("user");
            const userInStorage = JSON.parse(userInStorageString);
            const userInStorageEmail = userInStorage?.email;
            const findUserEmail = users?.find(
                (userData) => userData?.userEmail === userInStorageEmail
            );
            if (userInStorageEmail === findUserEmail?.userEmail) {
                setAccountDetails({
                    name: findUserEmail?.userName,
                    email: findUserEmail?.userEmail,
                    phone: findUserEmail?.phone

                });
                setAccess(true);
            } else {
                setAccess(false);
            }
        } catch (error) {
            console.error("Xeta:", error);
        }
    }, [setAccountDetails, setAccess])
    const handleClearStorage = useCallback(() => {
        localStorage.removeItem("user");
        setAccess(false);
        setAccountDetails(null);
        toast.success(`Hesabınızdan çıxmısız.`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }, [setAccess, setAccountDetails])
    useEffect(() => {
        (async () => {
            setProductsLoading(true);
            try {
                const response = await axios.get("http://localhost:8000/products");
                setProductsData(response.data.map(product => ({
                    ...product,
                    stockStatus: product.quantity > 0 ? 'inStock' : 'outOfStock'
                })));
            } catch (error) {
                console.error('Axios error:', error);
            } finally {
                setProductsLoading(false);
            }
        })();
    }, []);
    const getCard = id => {
        return productsData.find(i => i === id);
    }

    const currencyConverter = useMemo(
        () => (price) => {
            if (currencyState === "azn") {
                return price * 1.7;
            } else if (currencyState === "usd") {
                return price;
            }
        },
        [currencyState]
    );

    return (
        <DataContext.Provider value={{
            productsLoading,
            productsData,
            getCard,
            fetchUserName,
            accountDetails,
            access,
            quickView,
            handleClearStorage,
            setQuickView,
            selectedProduct,
            setSelectedProduct,
            currencyState,
            setCurrencyState,
            currencyConverter
        }}>
            {children}
        </DataContext.Provider>
    )
}
