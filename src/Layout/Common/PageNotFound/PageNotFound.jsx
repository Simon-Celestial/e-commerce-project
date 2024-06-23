import styles from "./PageNotFound.module.scss";
import { useTranslation } from "react-i18next";
const PageNotFound = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageContent}>
                <h1>404</h1>
                <p>Page not found</p>
            </div>
        </div>
    );
};

export default PageNotFound;