import styles from "./PageNotFound.module.scss";
const PageNotFound = () => {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.pageContent}>
                <h1>4<span><img src="/images/loader.png" alt="NoMail Logo"/></span>4</h1>
                <p>Page not found</p>
            </div>
        </div>
    );
};

export default PageNotFound;