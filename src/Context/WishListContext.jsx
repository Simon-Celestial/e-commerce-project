import React, {useCallback, useEffect, useState} from "react";
import {Bounce, toast} from "react-toastify";


export const WishListContext = React.createContext({
    wishListItems: [],
    addToWishList: () => {
    },
    removeFromWishList: ()=> {

    }

});

export const WishListContextProvider = ({children}) => {

    const initialItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const [wishListItems, setWishListItems] = useState(initialItems);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishListItems));
    }, [wishListItems]);

    const addToWishList = useCallback((product) => {
        setWishListItems(prev => {
            const isExistingIndex = prev.findIndex(item => item.id === product.id);
            if (isExistingIndex === -1) {
                toast.success(`${product.title} added to wishlist`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                return [...prev, product];
            } else {
                toast.error(`${product.title} removed from wishlist!`, {
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
                const updatedWishlist = [...prev];
                updatedWishlist.splice(isExistingIndex, 1);
                return updatedWishlist;
            }
        });
    }, []);

    const removeFromWishList = useCallback((productId) => {
        toast.info(`Product removed from wishlist`, {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce
        });
        setWishListItems(prev => prev.filter(item => item.id !== productId));
    }, []);

    return (
        <WishListContext.Provider value={{
            wishListItems,
            addToWishList,
            removeFromWishList
        }}>
            {children}
        </WishListContext.Provider>
    );
};
