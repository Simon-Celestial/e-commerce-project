import MainRouter from "./router"
import { DataContextProvider } from "./Context/DataContext.jsx";
import { BasketContextProvider } from "./Context/BasketContext.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { WishListContextProvider } from "./Context/WishListContext.jsx";
import { ScrollToTop } from "./Layout/Common/ScrollToTop/ScrollToTop.jsx";
import { AuthContextProvider } from "./Context/AuthContext.jsx";


const App = () => {

    return (
        <>
            <AuthContextProvider>
                <WishListContextProvider>
                    <BasketContextProvider>
                        <DataContextProvider>
                            <MainRouter />
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                            />
                            <ScrollToTop />
                        </DataContextProvider>
                    </BasketContextProvider>
                </WishListContextProvider>
            </AuthContextProvider>
        </>
    )
}

export default App
