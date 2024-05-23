import React from 'react'
import styles from "./Contact.module.scss";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { useTranslation } from "react-i18next";
const Contact = () => {
  const {t} = useTranslation();
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
                  <div className={styles.containerFrom}>
                    <div className={styles.subjectInput}>
                      <input type='text' placeholder={t("main.contact.contactName")}></input>
                      <input type='Email' placeholder= {t("main.contact.contactEEmail")}></input>
                    </div>
                    <input type='text' placeholder={t("main.contact.contactSubject")}></input>
                    <textarea name="" id="" cols="30" rows="10" width="100%" placeholder={t("main.contact.contactMessage")}></textarea>
                    <button>{t("main.contact.contactSendMessage")}</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.contactLocation}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.6064073197!2d-0.43123970044350396!3d51.52860701956136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2zTG9uZG9uLCBCaXJsyZnFn21pxZ8gS3JhbGzEsXE!5e0!3m2!1saz!2saz!4v1714584164893!5m2!1saz!2saz"
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
