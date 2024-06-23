import React, {useState, useEffect, useCallback,useMemo} from "react";
import {Bounce, toast} from 'react-toastify';


export const BasketContext = React.createContext({
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    increaseQuantity: () => {
    },
    decreaseQuantity: () => {
    },
    cartItems: [],
    calculateSubtotal: 0,
    emptyCart: () => {
    },
    shippingTypeId: 1,
    setShippingTypeId: () => {},
    setCartItems: () => {}
});

export const BasketContextProvider = ({children}) => {
    const initialCartItems = JSON.parse(localStorage.getItem("basket")) || [];
    const [cartItems, setCartItems] = useState(initialCartItems);
    const [shippingTypeId, setShippingTypeId] = useState(1);


    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = useCallback((product) => {

        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id);

            if (existingItem) {
                toast.success(`${product.title} added to basket`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return prev.map(item =>
                    item.id === product.id ? {...item, count: item.count + 1} : item
                );

            } else if (product.quantity < 1) {
                toast.error(`Product is out of stock!`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return [...prev];
            } else {
                toast.success(`${product.title} added to basket`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return [...prev, {...product, count: 1}];
            }
        });
    }, []);


    const removeFromCart = useCallback((productId) => {
        toast.info(`Product removed from basket`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
        });

        setCartItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    const increaseQuantity = useCallback((productId) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId ? {...item, count: item.count + 1} : item))

    }, []);


    const decreaseQuantity = useCallback((productId) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId ? {...item, count: Math.max(0, item.count - 1)} : item
        ).filter(item => item.id !== productId || item.count > 0));
    }, []);


    const emptyCart = useCallback(() => {
        setCartItems([]);
        toast.success(`Basket successfully cleared!`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
        });
    }, []);


    //Umumi meblegi hesablayir Subtotal
    const calculateSubtotal = useMemo(() => {
        return cartItems?.reduce((acc, b) => b.salePrice * b.count + acc, 0);
    }, [cartItems]);
    
    return (
        <BasketContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
            calculateSubtotal,
            emptyCart,
            shippingTypeId,
            setShippingTypeId,
            setCartItems
        }}>
            {children}
        </BasketContext.Provider>
    );
};
