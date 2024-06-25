import {Outlet} from "react-router-dom";
import {SetPageOnTop} from "./Common/SetPageOnTop/SetPageOnTop.jsx";
import {ScrollToTop} from "./Common/ScrollToTop/ScrollToTop.jsx";

export const MainLayout = () => {
    return (
        <>
            <SetPageOnTop/>
            <Outlet/>
            <ScrollToTop/>
        </>
    );
};
