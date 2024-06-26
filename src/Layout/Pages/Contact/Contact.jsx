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
      <div className={styles.contactUs}>
        <Header />
        <main className={styles.contactWrapper}>
          <section className={styles.contactImages}>
            <div className={styles.contactOverlay}>
              <h1>{t("main.contact.contactGetIn")}</h1>
            </div>
          </section>
          <section className={styles.contactInput}>
            <div className={styles.containerContact}>
              <div className={styles.containerBox}>
                <div className={styles.conatinerLeft}>
                  <h2>{t("main.contact.contactUs")}</h2>
                  <div className={styles.contactTell}>
                    <h4>{t("main.contact.contactCallUs")}</h4>
                    <p>{t("main.contact.contactWereAvailable")}</p>
                    <a href="https://wa.me/9945559020169?text=Salam">+994(055-902-01-69) {t("main.contact.contactTell")}</a>
                  </div>
                  <div className={styles.contactTell}>
                    <h4>{t("main.contact.contactWriteToUs")}</h4>
                    <p>{t("main.contact.contactFillOut")}</p>
                    <a href="mailto:tliyev023@gmail.com">{t("main.contact.contactEmail")} tliyev023@gmail.com</a>
                  </div>
                  <div className={styles.contactTell}>
                    <h4>{t("main.contact.contactHeadquarter")}</h4>
                    <p>{t("main.contact.contactMondayFriday")} 9:00-20:00</p>
                    <p>{t("main.contact.contactSaturday")} 11:00 – 15:00</p>
                    <a href=''>Baku City, Nasimi District</a>
                  </div>
                </div>
                <div className={styles.containerRight}>
                  <h2>{t("main.contact.weWouldLove")}</h2>
                  <form ref={form} onSubmit={handleSendEmail} className={styles.containerFrom}>
                                    <div className={styles.subjectInput}>
                                        <input type='text' name='user_name' placeholder={t("main.contact.contactName")}
                                               required/>
                                        <input type='email' name='user_email'
                                               placeholder={t("main.contact.contactEEmail")} required/>
                                    </div>
                                    <input type='text' name='message_title' placeholder={t("main.contact.contactSubject")}
                                           required/>
                                    <textarea name='message_content' cols="30" rows="10" width="100%"
                                              placeholder={t("main.contact.contactMessage")} required></textarea>
                                    <button
                                        type='submit'
                                        disabled={formLoading}
                                        style={{
                                          pointerEvents: formLoading ? "none" : "auto",
                                          background : formLoading ? "gray" : "black"
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

          <section className={styles.contactLocation}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3038.3934034860745!2d49.84807368303786!3d40.40013488303105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307d5d5a2c1005%3A0x5ede1cc1418ccc54!2sG%C9%99nclik%20Mall!5e0!3m2!1saz!2saz!4v1716887632171!5m2!1saz!2saz"
              width="100%"
              height="600"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>


          </section>
        </main>
        <Footer />
      </div>
    </>

  )
}

export default Contact
