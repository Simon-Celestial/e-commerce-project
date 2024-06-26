import {MainLayout} from "./Layout/MainLayout";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Layout/Pages/Home/Home";
import Shop from "./Layout/Pages/Shop/Shop.jsx";
import Blog from "./Layout/Pages/Blog/Blog.jsx"
import About from "./Layout/Pages/About/About.jsx";
import Contact from "./Layout/Pages/Contact/Contact.jsx";
import {ProductDetails} from "./Layout/Pages/ProductDetails/ProductDetails.jsx";
import {Basket} from "./Layout/Pages/Basket/Basket.jsx";
import Wishlist from "./Layout/Pages/Wishlist/Wishlist.jsx";
import Account from "./Layout/Pages/Account/Account.jsx";
import Login from "./Layout/Pages/LoginAndRegister/Login.jsx";
import Register from "./Layout/Pages/LoginAndRegister/Register.jsx";
import {useContext} from "react";
import {DataContext} from "./Context/DataContext.jsx";
import {AdminLayout} from "./AdminLayout/AdminLayout.jsx";
import AdminLogin from "./AdminLayout/Pages/AdminLogin/AdminLogin.jsx";
import AdminPage from "./AdminLayout/Pages/AdminPage/AdminPage.jsx";
import {AuthContext} from "./Context/AuthContext.jsx";
import {PageNotFound} from "./Layout/Pages/PageNotFound/PageNotFound.jsx";
import {CheckoutPage} from "./Layout/Pages/CheckoutPage/CheckoutPage.jsx";
import {CompletedOrder} from "./Layout/Pages/CompletedOrder/CompletedOrder.jsx";
import {AdminOrderSingle} from "./AdminLayout/Pages/AdminOrderSingle/AdminOrderSingle.jsx";

const router = (access, token) => createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: "*",
                element: <PageNotFound/>
            },

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
                element: <ProductDetails/>,
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
                element: <Basket/>,
            },
            {
                path: 'wishlist',
                element: <Wishlist/>,
            },
            {
                path: 'account',
                element: !access ? <Home/> : <Account/>,
            },
            {
                path: 'login',
                element: access ? <Home/> : <Login/>,
            },
            {
                path: 'register',
                element: access ? <Home/> : <Register/>,
            },
            {
                path: 'checkout',
                element: <CheckoutPage/>,
            },
            {
                path: '/order-completed',
                element: <CompletedOrder/>
            }
        ],
    },
    {
        path: 'admin',
        element: <AdminLayout/>,
        children: [
            {
                path: 'login',
                element: !token ? <AdminLogin/> : <AdminPage/>,
            },
            {
                path: 'dashboard',
                element: token ? <AdminPage/> : <AdminLogin/>,
            },
            {
                path: 'customer-order/:orderId',
                element: !token ? <AdminLogin/> : <AdminOrderSingle/>
            },
        ],
    },

]);
const MainRouter = () => {
    const {
        access
    } = useContext(DataContext);
    const {
        token
    } = useContext(AuthContext);

    return <RouterProvider router={router(access, token)}/>;
};

export default MainRouter;