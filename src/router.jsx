import { MainLayout } from "./Layout/MainLayout";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Layout/Pages/Home/Home";
import Shop from "./Layout/Pages/Shop/Shop.jsx";
import Blog from "./Layout/Pages/Blog/Blog.jsx"
import About from "./Layout/Pages/About/About.jsx";
import Contact from "./Layout/Pages/Contact/Contact.jsx";
import { ProductDetails } from "./Layout/Pages/ProductDetails/ProductDetails.jsx";
import { Basket } from "./Layout/Pages/Basket/Basket.jsx";
import Wishlist from "./Layout/Pages/Wishlist/Wishlist.jsx";
import Account from "./Layout/Pages/Account/Account.jsx";
import Login from "./Layout/Pages/LoginAndRegister/Login.jsx";
import Register from "./Layout/Pages/LoginAndRegister/Register.jsx";
import {useContext} from "react";
import {DataContext} from "./Context/DataContext.jsx";
const router = (access) => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [

            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'home',
                element: <Home/>,
            },
            {
                path: 'shop',
                element: <Shop/>,
            },
            {
                path: 'details/:id',
                element: <ProductDetails />,
            },

             {
                path: 'blog',
                element: <Blog/>,
            },
            {
                path: 'about',
                element: <About/>,
            },
            {
                path: 'contact',
                element: <Contact/>,
            },
            {
                path: 'basket',
                element: <Basket />,
            },
            {
                path: 'wishlist',
                element: <Wishlist />,
            },
            {
                path: 'account',
                element: !access? <Home /> : <Account />,
            },      
            {
                path: 'login',
                element: access? <Home /> : <Login />,
            },      
            {
                path: 'register',
                element: access? <Home /> : <Register />,
            },               
         
         
        ],
    }      
]);
const MainRouter = () => {
    const {
        access
    } = useContext(DataContext);

    return <RouterProvider router={router(access)}/>;
};

export default MainRouter;