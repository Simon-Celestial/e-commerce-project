import styles from "./CompletedOrder.module.scss";
import {CheckCircle} from "@phosphor-icons/react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

export const CompletedOrder = () => {
    const {t} = useTranslation();
    return (
        <div>
        <Header/>
        <div className={styles.completedOrderWrapper}>
            <div className={styles.pageContent}>
                <h2>{t("main.completedOrder.completedOrderYour")}</h2>
                <CheckCircle weight="fill"/>
                <h3>{t("main.completedOrder.completedThankYou")}</h3>
                <p>{t("main.completedOrder.completedYouWill")}</p>
                <p>{t("main.completedOrder.completedIfYou")}: <a href="tel:+994559020169">+994 55 902 01 69</a>
                </p>
                <Link to="/home">{t("main.completedOrder.completedReturnHome")}</Link>
            </div>
        <Footer/>
        </div>
        </div>

    )
}
