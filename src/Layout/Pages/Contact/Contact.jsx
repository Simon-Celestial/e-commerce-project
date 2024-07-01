import styles from "./Contact.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import {useTranslation} from "react-i18next";
import emailjs from "@emailjs/browser"
import {useRef, useCallback, useState} from "react";
import {Bounce, toast} from "react-toastify";
import {ThreeCircles} from "react-loader-spinner";

const Contact = () => {
    const [formLoading, setFormLoading] = useState(false);
    const {t} = useTranslation();
    const form = useRef();

    const handleSendEmail = useCallback(async (e) => {
        e.preventDefault();
        try {
            setFormLoading(true);
            const formData = new FormData(form.current);
            const user_name = formData.get('user_name');
            const user_email = formData.get('user_email');
            const message_title = formData.get('message_title');
            const message_content = formData.get('message_content');

            const result = await emailjs.sendForm(import.meta.env.VITE_EMAIL_ID, import.meta.env.VITE_MAIN_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAIL_KEY);
            console.log('Email sent:', result.text);
            const autoReplyResult = await emailjs.send(import.meta.env.VITE_EMAIL_ID, import.meta.env.VITE_REPLY_TEMPLATE_ID, {
                user_name,
                user_email,
                message_title,
                message_content
            }, import.meta.env.VITE_EMAIL_KEY);
            console.log('Auto reply sent:', autoReplyResult.text);
            form.current.reset();
            toast.success(`Your message has been sent successfully!`, {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        } catch (error) {
            toast.error(`Failed to send message. Please try again later!`, {
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            console.log('Error:', error.text);
        } finally {
            setFormLoading(false)
        }
    }, [form, setFormLoading]);


    return (
        <>
            <Header/>
            <main className={styles.contactMain}>
                <section className={styles.topSection}>
                    <div className={styles.sectionContent}>
                        <h1>{t("main.contact.contactGetIn")}</h1>
                    </div>
                </section>
                <section className={styles.contactSection}>
                    <div className={styles.sectionContent}>
                        <div className={styles.formContainer}>
                            <div className={styles.containerLeft}>
                                <h2>{t("main.contact.contactUs")}</h2>
                                <div className={styles.infoBlock}>
                                    <h4>{t("main.contact.contactCallUs")}</h4>
                                    <p>{t("main.contact.contactWereAvailable")}</p>
                                    <a href="https://wa.me/994518280121?text=Hello,i have a question">+994518280121 {t("main.contact.contactTell")}</a>
                                </div>
                                <div className={styles.infoBlock}>
                                    <h4>{t("main.contact.contactWriteToUs")}</h4>
                                    <p>{t("main.contact.contactFillOut")}</p>
                                    <a href="mailto:boutique@shop.com">{t("main.contact.contactEmail")} boutique@shop.com</a>
                                </div>
                                <div className={styles.infoBlock}>
                                    <h4>{t("main.contact.contactHeadquarter")}</h4>
                                    <p>{t("main.contact.contactMondayFriday")} 9:00-20:00</p>
                                    <p>{t("main.contact.contactSaturday")} 11:00 – 15:00</p>
                                    <a href='https://maps.app.goo.gl/GbgRQfd29DHKNJ6v5'
                                       target="_blank">{t("main.contact.bakuCity")}</a>
                                </div>
                            </div>
                            <div className={styles.containerRight}>
                                <h2>{t("main.contact.weWouldLove")}</h2>
                                <form
                                    ref={form}
                                    onSubmit={handleSendEmail}
                                    className={styles.containerForm}
                                >
                                    <div className={styles.inputContainer}>
                                        <input type='text' name='user_name' placeholder={t("main.contact.contactName")}
                                               required/>
                                        <input type='email' name='user_email'
                                               placeholder={t("main.contact.contactEEmail")} required/>
                                    </div>
                                    <input type='text' name='message_title'
                                           placeholder={t("main.contact.contactSubject")}
                                           required/>
                                    <textarea
                                        name='message_content'
                                        placeholder={t("main.contact.contactMessage")}
                                        required
                                    />
                                    <button
                                        type='submit'
                                        disabled={formLoading}
                                        style={{
                                            pointerEvents: formLoading ? "none" : "auto",
                                            background: formLoading ? "gray" : "black"
                                        }}
                                    >
                                        {
                                            formLoading ?
                                                <ThreeCircles
                                                    visible={true}
                                                    height="30"
                                                    width="30"
                                                    color="white"
                                                    ariaLabel="three-circles-loading"
                                                /> :
                                                t("main.contact.contactSendMessage")
                                        }
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.mapSection}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.5327170388014!2d49.85845587642609!3d40.374884458184304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d71b8e4c5b9%3A0xfe50781c5645b252!2sPort%20Baku%20Mall!5e0!3m2!1sru!2saz!4v1719774459257!5m2!1sru!2saz"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </section>
            </main>
            <Footer/>
        </>

    )
}

export default Contact
