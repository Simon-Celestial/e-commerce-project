import styles from './Footer.module.scss'
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import {useCallback, useState} from "react";
import {Bounce, toast} from "react-toastify";


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Footer = () => {

    const [inputState, setInputState] = useState("");
    const {t} = useTranslation();

    const handleInputChange = useCallback((e) => {
        setInputState(e.target.value);
    }, [setInputState]);


    const handleFakeSubscription = useCallback((e) => {
        e.preventDefault();
        if (!emailRegex.test(inputState)) {
            toast.error('Please enter a valid email address!', {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
            return;
        }

        setInputState("");
        toast.success('Subscribed successfully!', {
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Bounce,
        });
    }, [inputState]);

    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContainer}>
                <div className={styles.footerLeft}>
                    <div className={styles.footerLogo}>
                        <Link to={"/"}>
                            <img src="/images/logo.png"></img>
                        </Link>
                        <p>{t('footer.topProducts')}</p>
                    </div>
                    <div className={styles.footerTime}>
                        <p>{t('footer.tel')}: (234) 23-45-666</p>
                        <p>{t('footer.days')}</p>
                        <p>{t('footer.daysTwo')}</p>
                    </div>
                </div>
                <div className={styles.footerRight}>
                    <div className={styles.footerEmail}>
                        <h1>{t('footer.signForEmails')}</h1>
                        <p>{t('footer.enjoySale')}</p>
                        <form>
                            <input value={inputState} onChange={handleInputChange} type='email'
                                   placeholder={t('footer.yourEmailAddress')}/>
                            <button onClick={handleFakeSubscription}>{t('footer.subscribe')}</button>
                        </form>
                    </div>
                    <div className={styles.footerList}>
                        <ul>
                            <li>{t('footer.ourStory')}</li>
                            <li>{t('footer.careers')}</li>
                            <li>{t('footer.influencers')}</li>
                            <li>{t('footer.joinOurTeam')}</li>
                        </ul>
                        <ul>
                            <li>{t('footer.contactUs')}</li>
                            <li>{t('footer.customerService')}</li>
                            <li>{t('footer.findStore')}</li>
                            <li>{t('footer.shippingAndReturns')}</li>
                        </ul>
                        <ul>
                            <li>{t('footer.interiorDesign')}</li>
                            <li>{t('footer.roomPlanner')}</li>
                            <li>{t('footer.ourProjects')}</li>
                            <li>{t('footer.designChat')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer

