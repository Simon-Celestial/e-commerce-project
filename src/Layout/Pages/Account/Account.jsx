import styles from "./Account.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import PageHeading from '../../Common/PageHeading/PageHeading';
import {useContext} from "react";
import {DataContext} from "../../../Context/DataContext.jsx";
import { useTranslation } from "react-i18next";

const Account = () => {
    const {t} = useTranslation();
    const {
        accountDetails
    } = useContext(DataContext);
     
    return (
        <>
            <Header/>
            <main className={styles.accountWrapper}>
                <PageHeading title={t("main.account.MyAccount")}/>
                <div className={styles.accountContent}>
                    <div className={styles.userInfoWrapper}>
                        <div className={styles.actions}>
                            <div className={styles.userImage}>
                                <img src="/images/avatar-design.png" alt="User Photo"/>
                            </div>
                            <p>{accountDetails.name}</p>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.infoBlock}>
                                <p>{t("main.account.accountUsername")}: {accountDetails.name}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <p>{t("main.account.acountEmailAddress")}: {accountDetails.email}</p>
                            </div>
                            <div className={styles.infoBlock}>
                                <p>{t("main.account.accountPhoneNumber")}: {accountDetails.phone? accountDetails.phone : "Not available"}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Account
