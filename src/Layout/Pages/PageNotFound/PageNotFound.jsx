import styles from "./PageNotFound.module.scss";
import {useTranslation} from "react-i18next";

export const PageNotFound = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageContent}>
                <h1>404</h1>
                <p>{t("main.pageNotFound")}</p>
            </div>
        </div>
    );
};

