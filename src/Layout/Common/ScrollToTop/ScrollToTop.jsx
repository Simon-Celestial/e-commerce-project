import styles from "./ScrollToTop.module.scss";
import {ArrowUp} from "@phosphor-icons/react";
import {useCallback, useEffect, useState} from "react";

export const ScrollToTop = () => {

    const [buttonVisible,setButtonVisible]= useState(false);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const toggleVisibility = useCallback(() => {
        if (window.window.scrollY > 300) {
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
            <ArrowUp />
        </div>
    )
}