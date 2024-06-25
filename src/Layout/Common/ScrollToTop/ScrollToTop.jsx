import styles from "./ScrollToTop.module.scss";
import {useCallback, useEffect, useState} from "react";
import {CaretCircleDoubleUp} from "@phosphor-icons/react";

export const ScrollToTop = () => {

    const [buttonVisible,setButtonVisible]= useState(false);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const toggleVisibility = useCallback(() => {
        if (window.window.scrollY > 800) {
            setButtonVisible(true);
        } else {
            setButtonVisible(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [toggleVisibility]);


    return (
        <div className={`${styles.wrapper} ${buttonVisible? styles.visible : null}`} onClick={scrollToTop}>
            <CaretCircleDoubleUp  />
        </div>
    )
}